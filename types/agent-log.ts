export interface AgentLog {
  id: string
  run_id: string | null
  user_id: string
  message: string
  level: "info" | "success" | "warning" | "error"
  job_id: string | null
  created_at: string
}
