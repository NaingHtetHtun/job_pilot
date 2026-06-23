import type { MissingField } from "@/types"

const REQUIRED_FIELDS: { key: MissingField; check: (profile: Record<string, unknown>) => boolean }[] = [
  { key: "FULL_NAME", check: (p) => !!p.full_name },
  { key: "PHONE", check: (p) => !!p.phone },
  { key: "LOCATION", check: (p) => !!p.location },
  { key: "CURRENT_TITLE", check: (p) => !!p.current_title },
  { key: "EXPERIENCE_LEVEL", check: (p) => !!p.experience_level },
  { key: "YEARS_EXPERIENCE", check: (p) => typeof p.years_experience === "number" && p.years_experience > 0 },
  { key: "SKILLS", check: (p) => Array.isArray(p.skills) && p.skills.length > 0 },
  { key: "WORK_EXPERIENCE", check: (p) => Array.isArray(p.work_experience) && p.work_experience.length > 0 },
  { key: "EDUCATION", check: (p) => !!p.education && typeof p.education === "object" && !!(p.education as Record<string, unknown>).degree },
]

export function calculateCompletion(profile: Record<string, unknown>): {
  completionPercent: number
  missingFields: MissingField[]
  isComplete: boolean
} {
  const missingFields: MissingField[] = []

  for (const field of REQUIRED_FIELDS) {
    if (!field.check(profile)) {
      missingFields.push(field.key)
    }
  }

  const completedCount = REQUIRED_FIELDS.length - missingFields.length
  const completionPercent = Math.round((completedCount / REQUIRED_FIELDS.length) * 100)
  const isComplete = missingFields.length === 0

  return { completionPercent, missingFields, isComplete }
}
