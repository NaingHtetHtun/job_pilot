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
