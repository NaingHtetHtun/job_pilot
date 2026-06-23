"use client"

import { forwardRef, useCallback, useImperativeHandle, useState, useTransition } from "react"
import { saveProfile } from "@/actions/profile"
import type { Education, Profile } from "@/types"
import { calculateCompletion } from "@/lib/profile-utils"

export type ProfileFormHandle = {
  applyExtracted: (data: Record<string, unknown>) => void
}

type Props = {
  profile: Profile | null
  userEmail: string
}

const EXPERIENCE_LEVELS = ["junior", "mid", "senior", "lead"] as const
const WORK_AUTHORIZATIONS = ["citizen", "permanent_resident", "visa_required"] as const
const REMOTE_PREFERENCES = ["remote", "onsite", "hybrid", "any"] as const
const COVER_LETTER_TONES = ["formal", "casual", "enthusiastic"] as const
const DEGREES = ["High School", "Associate", "Bachelor's", "Master's", "PhD", "Other"] as const
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 51 }, (_, i) => String(CURRENT_YEAR - i))

export const ProfileForm = forwardRef<ProfileFormHandle, Props>(function ProfileForm(
  { profile, userEmail },
  ref,
) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "")
  const [phone, setPhone] = useState(profile?.phone ?? "")
  const [location, setLocation] = useState(profile?.location ?? "")
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url ?? "")
  const [portfolioUrl, setPortfolioUrl] = useState(profile?.portfolio_url ?? "")
  const [workAuthorization, setWorkAuthorization] = useState(profile?.work_authorization ?? "")

  const [currentTitle, setCurrentTitle] = useState(profile?.current_title ?? "")
  const [experienceLevel, setExperienceLevel] = useState(profile?.experience_level ?? "")
  const [yearsExperience, setYearsExperience] = useState(profile?.years_experience ?? null)
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? [])
  const [skillInput, setSkillInput] = useState("")
  const [industries, setIndustries] = useState<string[]>(profile?.industries ?? [])
  const [industryInput, setIndustryInput] = useState("")

  const [workExperience, setWorkExperience] = useState<Profile["work_experience"]>(
    profile?.work_experience ?? [],
  )
  const [education, setEducation] = useState(
    profile?.education ?? { degree: "", field: "", institution: "", year: "" },
  )

  const [jobTitlesSeeking, setJobTitlesSeeking] = useState<string[]>(profile?.job_titles_seeking ?? [])
  const [titleInput, setTitleInput] = useState("")
  const [remotePreference, setRemotePreference] = useState(profile?.remote_preference ?? "")
  const [salaryExpectation, setSalaryExpectation] = useState(profile?.salary_expectation ?? "")
  const [preferredLocations, setPreferredLocations] = useState<string[]>(profile?.preferred_locations ?? [])
  const [locationInput, setLocationInput] = useState("")
  const [coverLetterTone, setCoverLetterTone] = useState(profile?.cover_letter_tone ?? "")

  const [isPending, startTransition] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const missingFields = calculateCompletion({
    full_name: fullName,
    phone,
    location,
    current_title: currentTitle,
    experience_level: experienceLevel,
    years_experience: yearsExperience,
    skills,
    work_experience: workExperience,
    education,
  }).missingFields

  useImperativeHandle(ref, () => ({
    applyExtracted(data: Record<string, unknown>) {
      if (data.full_name) setFullName(data.full_name as string)
      if (data.phone) setPhone(data.phone as string)
      if (data.location) setLocation(data.location as string)
      if (data.current_title) setCurrentTitle(data.current_title as string)
      if (data.experience_level) setExperienceLevel(data.experience_level as string)
      if (data.years_experience) setYearsExperience(data.years_experience as number)
      if (data.skills) setSkills(data.skills as string[])
      if (data.industries) setIndustries(data.industries as string[])
      if (data.work_experience) setWorkExperience(data.work_experience as Profile["work_experience"])
      if (data.education) setEducation(data.education as Education)
      if (data.job_titles_seeking) setJobTitlesSeeking(data.job_titles_seeking as string[])
      if (data.remote_preference) setRemotePreference(data.remote_preference as string)
      if (data.salary_expectation) setSalaryExpectation(data.salary_expectation as string)
      if (data.linkedin_url) setLinkedinUrl(data.linkedin_url as string)
      if (data.portfolio_url) setPortfolioUrl(data.portfolio_url as string)
      if (data.work_authorization) setWorkAuthorization(data.work_authorization as string)
      if (data.preferred_locations) setPreferredLocations(data.preferred_locations as string[])
      if (data.cover_letter_tone) setCoverLetterTone(data.cover_letter_tone as string)
    },
  }))

  function addSkill() {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill))
  }

  function addIndustry() {
    const trimmed = industryInput.trim()
    if (trimmed && !industries.includes(trimmed)) {
      setIndustries([...industries, trimmed])
      setIndustryInput("")
    }
  }

  function removeIndustry(ind: string) {
    setIndustries(industries.filter((i) => i !== ind))
  }

  function addTitle() {
    const trimmed = titleInput.trim()
    if (trimmed && !jobTitlesSeeking.includes(trimmed)) {
      setJobTitlesSeeking([...jobTitlesSeeking, trimmed])
      setTitleInput("")
    }
  }

  function removeTitle(title: string) {
    setJobTitlesSeeking(jobTitlesSeeking.filter((t) => t !== title))
  }

  function addLocation() {
    const trimmed = locationInput.trim()
    if (trimmed && !preferredLocations.includes(trimmed)) {
      setPreferredLocations([...preferredLocations, trimmed])
      setLocationInput("")
    }
  }

  function removeLocation(loc: string) {
    setPreferredLocations(preferredLocations.filter((l) => l !== loc))
  }

  function addWorkRole() {
    if (workExperience.length >= 3) return
    setWorkExperience([
      ...workExperience,
      { company: "", title: "", startDate: "", endDate: "", currentlyWorking: false, responsibilities: "" },
    ])
  }

  function updateWorkRole(index: number, field: string, value: unknown) {
    setWorkExperience(
      workExperience.map((role, i) =>
        i === index ? { ...role, [field]: value } : role,
      ),
    )
  }

  function removeWorkRole(index: number) {
    setWorkExperience(workExperience.filter((_, i) => i !== index))
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSaveError(null)
      setSaveSuccess(false)

      startTransition(async () => {
        const form = e.currentTarget
        const formData = new FormData(form)
        formData.set("skills", JSON.stringify(skills))
        formData.set("industries", JSON.stringify(industries))
        formData.set("work_experience", JSON.stringify(workExperience))
        formData.set("education", JSON.stringify(education))
        formData.set("job_titles_seeking", JSON.stringify(jobTitlesSeeking))
        formData.set("preferred_locations", JSON.stringify(preferredLocations))
        formData.set("years_experience", String(yearsExperience ?? ""))

        try {
          await saveProfile(formData)
          setSaveSuccess(true)
        } catch {
          setSaveError("Failed to save profile. Please try again.")
        }
      })
    },
    [skills, industries, workExperience, education, jobTitlesSeeking, preferredLocations, yearsExperience],
  )

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface shadow-card">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-base font-semibold text-text-primary">Profile Information</h2>
      </div>

      <div className="space-y-8 p-6">
        {/* Personal Info */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Personal Info</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Full Name</label>
              <input
                name="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Email</label>
              <input
                value={userEmail}
                disabled
                className="mt-1 w-full rounded-lg border border-border bg-surface-secondary px-3 py-2 text-sm text-text-muted"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Phone Number</label>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Location</label>
              <input
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">LinkedIn URL</label>
              <input
                name="linkedin_url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Portfolio / GitHub</label>
              <input
                name="portfolio_url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Work Authorization</label>
              <select
                name="work_authorization"
                value={workAuthorization}
                onChange={(e) => setWorkAuthorization(e.target.value)}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {WORK_AUTHORIZATIONS.map((wa) => (
                  <option key={wa} value={wa}>
                    {wa.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Professional Info */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Professional Info</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Current Job Title</label>
              <input
                name="current_title"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Experience Level</label>
              <select
                name="experience_level"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {EXPERIENCE_LEVELS.map((el) => (
                  <option key={el} value={el}>
                    {el.charAt(0).toUpperCase() + el.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Years of Experience</label>
              <input
                name="years_experience"
                type="number"
                min="0"
                max="50"
                value={yearsExperience ?? ""}
                onChange={(e) => setYearsExperience(e.target.value ? parseInt(e.target.value) : null)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="5"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Skills</label>
            <div className="mt-1 flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Type a skill and press Enter or Add"
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-md bg-accent-light px-2 py-1 text-xs font-medium text-accent"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-accent-dark">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Industries</label>
            <div className="mt-1 flex gap-2">
              <input
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIndustry())}
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Type an industry and press Enter or Add"
              />
              <button
                type="button"
                onClick={addIndustry}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {industries.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-1 rounded-md bg-accent-light px-2 py-1 text-xs font-medium text-accent"
                  >
                    {ind}
                    <button type="button" onClick={() => removeIndustry(ind)} className="hover:text-accent-dark">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Work Experience</h3>
            {workExperience.length < 3 && (
              <button
                type="button"
                onClick={addWorkRole}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
              >
                + Add Role
              </button>
            )}
          </div>
          <div className="space-y-4">
            {workExperience.map((role, index) => (
              <div key={index} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    Role {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeWorkRole(index)}
                    className="text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                      Company Name
                    </label>
                    <input
                      value={role.company}
                      onChange={(e) => updateWorkRole(index, "company", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                      placeholder="Company Inc."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                      Job Title
                    </label>
                    <input
                      value={role.title}
                      onChange={(e) => updateWorkRole(index, "title", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                      Start Date
                    </label>
                    <div className="mt-1 flex gap-2">
                      <select
                        value={role.startDate.split(" ")[1] || ""}
                        onChange={(e) => {
                          const month = e.target.value
                          const year = role.startDate.split(" ")[2] || ""
                          updateWorkRole(index, "startDate", `${month} ${year}`)
                        }}
                        className="flex-1 appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={role.startDate.split(" ")[2] || ""}
                        onChange={(e) => {
                          const month = role.startDate.split(" ")[1] || ""
                          const year = e.target.value
                          updateWorkRole(index, "startDate", `${month} ${year}`)
                        }}
                        className="flex-1 appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
                      >
                        <option value="">Year</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                      End Date
                    </label>
                    <div className="mt-1 flex gap-2">
                      <select
                        value={role.currentlyWorking ? "" : (role.endDate.split(" ")[1] || "")}
                        onChange={(e) => {
                          const month = e.target.value
                          const year = role.endDate.split(" ")[2] || ""
                          updateWorkRole(index, "endDate", `${month} ${year}`)
                        }}
                        disabled={role.currentlyWorking}
                        className="flex-1 appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent disabled:opacity-40"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={role.currentlyWorking ? "" : (role.endDate.split(" ")[2] || "")}
                        onChange={(e) => {
                          const month = role.endDate.split(" ")[1] || ""
                          const year = e.target.value
                          updateWorkRole(index, "endDate", `${month} ${year}`)
                        }}
                        disabled={role.currentlyWorking}
                        className="flex-1 appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent disabled:opacity-40"
                      >
                        <option value="">Year</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`currently-working-${index}`}
                    checked={role.currentlyWorking}
                    onChange={(e) => updateWorkRole(index, "currentlyWorking", e.target.checked)}
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label htmlFor={`currently-working-${index}`} className="text-sm text-text-primary">
                    I currently work here
                  </label>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                    Key Responsibilities
                  </label>
                  <textarea
                    value={role.responsibilities}
                    onChange={(e) => updateWorkRole(index, "responsibilities", e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                    placeholder="Describe your key responsibilities..."
                  />
                </div>
              </div>
            ))}
            {workExperience.length === 0 && (
              <p className="text-sm text-text-muted">No work experience added yet.</p>
            )}
          </div>
        </section>

        {/* Education */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Education</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Highest Degree</label>
              <select
                value={(education as { degree: string }).degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {DEGREES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Field of Study</label>
              <input
                value={(education as { field: string }).field}
                onChange={(e) => setEducation({ ...education, field: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Institution Name</label>
              <input
                value={(education as { institution: string }).institution}
                onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="University of California"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Graduation Year</label>
              <select
                value={(education as { year: string }).year}
                onChange={(e) => setEducation({ ...education, year: e.target.value })}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Job Preferences */}
        <section>
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Job Preferences</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Remote Preference</label>
              <select
                name="remote_preference"
                value={remotePreference}
                onChange={(e) => setRemotePreference(e.target.value)}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {REMOTE_PREFERENCES.map((rp) => (
                  <option key={rp} value={rp}>
                    {rp.charAt(0).toUpperCase() + rp.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Salary Expectation</label>
              <input
                name="salary_expectation"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="$100,000 - $130,000"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Cover Letter Tone</label>
              <select
                name="cover_letter_tone"
                value={coverLetterTone}
                onChange={(e) => setCoverLetterTone(e.target.value)}
                className="mt-1 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-accent"
              >
                <option value="">Select...</option>
                {COVER_LETTER_TONES.map((clt) => (
                  <option key={clt} value={clt}>
                    {clt.charAt(0).toUpperCase() + clt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Job Titles Seeking</label>
            <div className="mt-1 flex gap-2">
              <input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTitle())}
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Type a title and press Enter or Add"
              />
              <button
                type="button"
                onClick={addTitle}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {jobTitlesSeeking.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {jobTitlesSeeking.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md bg-accent-light px-2 py-1 text-xs font-medium text-accent"
                  >
                    {t}
                    <button type="button" onClick={() => removeTitle(t)} className="hover:text-accent-dark">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium uppercase tracking-wide text-text-secondary">Preferred Locations</label>
            <div className="mt-1 flex gap-2">
              <input
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent"
                placeholder="Type a location and press Enter or Add"
              />
              <button
                type="button"
                onClick={addLocation}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {preferredLocations.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {preferredLocations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1 rounded-md bg-accent-light px-2 py-1 text-xs font-medium text-accent"
                  >
                    {loc}
                    <button type="button" onClick={() => removeLocation(loc)} className="hover:text-accent-dark">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="flex flex-col items-start gap-3">
          {missingFields.length > 0 && (
            <p className="text-xs text-text-muted">
              Missing required fields: {missingFields.map((f) => f.replace(/_/g, " ")).join(", ")}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Profile"}
            </button>
            {saveError && <p className="text-xs text-error">{saveError}</p>}
            {saveSuccess && <p className="text-xs text-success">Profile saved successfully!</p>}
          </div>
        </div>
      </div>
    </form>
  )
})
