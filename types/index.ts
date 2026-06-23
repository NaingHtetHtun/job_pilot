export interface WorkExperience {
  company: string
  title: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  responsibilities: string
}

export interface Education {
  degree: string
  field: string
  institution: string
  year: string
}

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  location: string | null
  current_title: string | null
  experience_level: string | null
  years_experience: number | null
  skills: string[]
  industries: string[]
  work_experience: WorkExperience[]
  education: Education | null
  job_titles_seeking: string[]
  remote_preference: string | null
  preferred_locations: string[]
  salary_expectation: string | null
  cover_letter_tone: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  work_authorization: string | null
  resume_pdf_url: string | null
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface AgentRun {
  id: string
  user_id: string
  status: "running" | "completed" | "failed"
  job_title_searched: string | null
  location_searched: string | null
  jobs_found: number | null
  started_at: string
  completed_at: string | null
}

export interface CompanyResearchDossier {
  companyOverview: string
  techStack: string[]
  culture: string[]
  whyThisRole: string
  yourEdge: string[]
  gapsToAddress: string[]
  smartQuestions: string[]
  interviewPrep: string[]
  sources: string[]
}

export interface Job {
  id: string
  run_id: string | null
  user_id: string
  source: "search" | "url"
  source_url: string | null
  external_apply_url: string | null
  title: string
  company: string
  location: string | null
  salary: string | null
  job_type: string | null
  about_role: string | null
  responsibilities: string[]
  requirements: string[]
  nice_to_have: string[]
  benefits: string[]
  about_company: string | null
  match_score: number | null
  match_reason: string | null
  matched_skills: string[]
  missing_skills: string[]
  company_research: CompanyResearchDossier | null
  found_at: string
}

export interface AgentLog {
  id: string
  run_id: string | null
  user_id: string
  message: string
  level: "info" | "success" | "warning" | "error"
  job_id: string | null
  created_at: string
}

export type MissingField =
  | "FULL_NAME"
  | "PHONE"
  | "LOCATION"
  | "CURRENT_TITLE"
  | "EXPERIENCE_LEVEL"
  | "YEARS_EXPERIENCE"
  | "SKILLS"
  | "WORK_EXPERIENCE"
  | "EDUCATION"
