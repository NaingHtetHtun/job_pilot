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
