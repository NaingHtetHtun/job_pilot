"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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

  const { completionPercent, missingFields, isComplete } = calculateCompletion(raw)
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
        is_complete: raw.is_complete,
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
  redirect("/profile")
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

      const path = `${user.id}/resume.pdf`

      const { data: storageData } = await insforge.storage
        .from("resumes")
        .upload(path, file)
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
