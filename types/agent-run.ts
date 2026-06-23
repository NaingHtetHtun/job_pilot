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
