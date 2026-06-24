"use server"

import path from "path"
import { revalidatePath } from "next/cache"
import { createInsforgeServer, requireUser } from "@/lib/insforge-server"
import { createPosthogServer } from "@/lib/posthog-server"
import { calculateCompletion } from "@/lib/profile-utils"

export async function saveProfile(formData: FormData) {
  const { user } = await requireUser()

  const raw: Record<string, unknown> = {
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    current_title: formData.get("current_title"),
    experience_level: formData.get("experience_level"),
    years_experience: formData.get("years_experience") ? parseInt(formData.get("years_experience") as string) : null,
    skills: formData.get("skills") ? JSON.parse(formData.get("skills") as string) : [],
    industries: formData.get("industries") ? JSON.parse(formData.get("industries") as string) : [],
    work_experience: formData.get("work_experience") ? JSON.parse(formData.get("work_experience") as string) : [],
    education: formData.get("education") ? JSON.parse(formData.get("education") as string) : null,
    job_titles_seeking: formData.get("job_titles_seeking") ? JSON.parse(formData.get("job_titles_seeking") as string) : [],
    remote_preference: formData.get("remote_preference"),
    preferred_locations: formData.get("preferred_locations") ? JSON.parse(formData.get("preferred_locations") as string) : [],
    salary_expectation: formData.get("salary_expectation"),
    cover_letter_tone: formData.get("cover_letter_tone"),
    linkedin_url: formData.get("linkedin_url"),
    portfolio_url: formData.get("portfolio_url"),
    work_authorization: formData.get("work_authorization"),
  }

  const { completionPercent, isComplete } = calculateCompletion(raw)
  raw.is_complete = isComplete

  try {
    const insforge = await createInsforgeServer()

    const { data: existing } = await insforge
      .database
      .from("profiles")
      .select("id, is_complete")
      .eq("id", user.id)
      .maybeSingle()

    await insforge
      .database
      .from("profiles")
      .update({
        full_name: raw.full_name,
        phone: raw.phone,
        location: raw.location,
        current_title: raw.current_title,
        experience_level: raw.experience_level,
        years_experience: raw.years_experience,
        skills: raw.skills,
        industries: raw.industries,
        work_experience: raw.work_experience,
        education: raw.education,
        job_titles_seeking: raw.job_titles_seeking,
        remote_preference: raw.remote_preference,
        preferred_locations: raw.preferred_locations,
        salary_expectation: raw.salary_expectation,
        cover_letter_tone: raw.cover_letter_tone,
        linkedin_url: raw.linkedin_url,
        portfolio_url: raw.portfolio_url,
        work_authorization: raw.work_authorization,
        is_complete: raw.is_complete ?? false,
      })
      .eq("id", user.id)

    if (!existing?.is_complete && isComplete) {
      const posthog = createPosthogServer()
      posthog.capture({
        distinctId: user.id,
        event: "profile_completed",
        properties: { completionPercent },
      })
      await posthog.shutdown()
    }
  } catch {
    throw new Error("Failed to save profile")
  }

  revalidatePath("/profile")
}

export async function uploadResume(formData: FormData) {
  const { user } = await requireUser()

  const file = formData.get("resume") as File | null
  if (!file) throw new Error("No file provided")

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are accepted")
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size must be under 5MB")
  }

  try {
    const insforge = await createInsforgeServer()
    const bucket = insforge.storage.from("resumes")
    const filePath = `${user.id}/resume.pdf`

    await bucket.remove(filePath)

    const { data: storageData } = await bucket.upload(filePath, file)
    const url = storageData?.url

    await insforge
      .database
      .from("profiles")
      .update({ resume_pdf_url: url })
      .eq("id", user.id)
  } catch {
    throw new Error("Failed to upload resume")
  }

  revalidatePath("/profile")
}

export async function extractResume() {
  const { user } = await requireUser()
  const insforge = await createInsforgeServer()

  const { data: blob, error: dlError } = await insforge.storage
    .from("resumes")
    .download(`${user.id}/resume.pdf`)

  if (dlError || !blob) {
    throw new Error("No resume found. Please upload your resume first.")
  }

  const buffer = new Uint8Array(await blob.arrayBuffer())
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist/legacy/build/pdf.mjs")
  GlobalWorkerOptions.workerSrc = path.join(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs")

  const pdf = await getDocument({ data: buffer }).promise
  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const text = content.items
      .filter((item: unknown) => "str" in (item as Record<string, unknown>))
      .map((item: unknown) => (item as { str: string }).str)
      .join(" ")
    pages.push(text)
  }
  const text = pages.join("\n")

  if (!text || text.length < 50) {
    throw new Error("Could not extract text from this PDF. Please try a different file.")
  }

  const completion = await insforge.ai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content: `You extract structured profile data from resume text. Return ONLY valid JSON matching this schema:
{
  "full_name": string,
  "phone": string | null,
  "location": string | null,
  "current_title": string | null,
  "experience_level": "junior" | "mid" | "senior" | "lead" | null,
  "years_experience": number | null,
  "skills": string[],
  "industries": string[],
  "work_experience": array of { company: string, title: string, startDate: string, endDate: string, currentlyWorking: boolean, responsibilities: string },
  "education": { degree: string, field: string, institution: string, year: string } | null,
  "linkedin_url": string | null,
  "portfolio_url": string | null,
  "work_authorization": string | null
}`,
      },
      {
        role: "user",
        content: `Extract profile data from this resume:\n\n${text}`,
      },
    ],
    temperature: 0.1,
    maxTokens: 4000,
  })

  return parseLlmJson(completion.choices[0].message.content)
}

function parseLlmJson<T = Record<string, unknown>>(content: string | null | undefined): T {
  if (!content) throw new Error("Empty response from AI")
  let cleaned = content.trim()
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "")
  }
  return JSON.parse(cleaned) as T
}

type ResumeData = {
  name: string
  title: string
  summary: string
  skills: string[]
  experience: Array<{
    company: string
    title: string
    startDate: string
    endDate: string
    responsibilities: string[]
  }>
  education: { degree: string; field: string; institution: string; year: string }
}

export async function generateResume() {
  const { user } = await requireUser()
  const insforge = await createInsforgeServer()

  const { data: profile, error: profileError } = await insforge.database
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    throw new Error("Profile not found")
  }

  const completion = await insforge.ai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional resume writer. Generate a concise, single-page resume from the user's profile data. Return ONLY valid JSON with this structure:
{
  "name": string,
  "title": string,
  "summary": string (2-3 sentences),
  "skills": string[],
  "experience": array of { company: string, title: string, startDate: string, endDate: string, responsibilities: string[] (3-4 bullet points each) },
  "education": { degree: string, field: string, institution: string, year: string }
}`,
      },
      {
        role: "user",
        content: `Generate a professional resume from this profile data: ${JSON.stringify(profile)}`,
      },
    ],
    temperature: 0.4,
    maxTokens: 4000,
  })

  const resumeData = parseLlmJson<ResumeData>(completion.choices[0].message.content)

  const { renderToBuffer, Document, Page, Text, View, StyleSheet } = await import("@react-pdf/renderer")

  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.4 },
    name: { fontSize: 24, fontWeight: "bold", marginBottom: 2 },
    title: { fontSize: 14, color: "#555", marginBottom: 16 },
    sectionTitle: { fontSize: 13, fontWeight: "bold", marginTop: 14, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#333", paddingBottom: 3 },
    body: { marginBottom: 4 },
    company: { fontSize: 12, fontWeight: "bold", marginTop: 8 },
    dates: { fontSize: 10, color: "#777", marginBottom: 2 },
    bullet: { marginLeft: 12, marginBottom: 1 },
  })

  const ResumeDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{resumeData.name}</Text>
        <Text style={styles.title}>{resumeData.title}</Text>

        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.body}>{resumeData.summary}</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.body}>{resumeData.skills.join(", ")}</Text>

        <Text style={styles.sectionTitle}>Experience</Text>
        {resumeData.experience.map((exp: { company: string; title: string; startDate: string; endDate: string; responsibilities: string[] }, i: number) => (
          <View key={i}>
            <Text style={styles.company}>{exp.title} at {exp.company}</Text>
            <Text style={styles.dates}>{exp.startDate} — {exp.endDate}</Text>
            {exp.responsibilities.map((r: string, j: number) => (
              <Text key={j} style={[styles.body, styles.bullet]}>• {r}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.body}>{resumeData.education.degree} in {resumeData.education.field}</Text>
        <Text style={styles.body}>{resumeData.education.institution} — {resumeData.education.year}</Text>
      </Page>
    </Document>
  )

  const pdfBuffer = await renderToBuffer(ResumeDoc)

  const bucket = insforge.storage.from("resumes")
  const filePath = `${user.id}/resume.pdf`

  await bucket.remove(filePath)

  const file = new File([new Uint8Array(pdfBuffer)], "resume.pdf", { type: "application/pdf" })
  const { data: storageData, error: uploadError } = await bucket.upload(filePath, file)

  if (uploadError) {
    throw new Error("Failed to upload generated resume")
  }

  const url = storageData?.url ?? ""

  await insforge.database
    .from("profiles")
    .update({ resume_pdf_url: url })
    .eq("id", user.id)

  revalidatePath("/profile")

  const dataUrl = `data:application/pdf;base64,${Buffer.from(pdfBuffer).toString("base64")}`
  return dataUrl
}

export async function downloadResume() {
  const { user } = await requireUser()
  const insforge = await createInsforgeServer()

  const key = `${user.id}/resume.pdf`
  const { data, error } = await insforge.storage.from("resumes").download(key)

  if (error || !data) {
    throw new Error("Failed to download resume")
  }

  const buffer = await data.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")
  return `data:application/pdf;base64,${base64}`
}
