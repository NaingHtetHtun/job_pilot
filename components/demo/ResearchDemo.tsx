"use client"

import posthog from "posthog-js"
import { useState } from "react"

type Props = {
  userId: string
}

export function ResearchDemo({ userId }: Props) {
  const [status, setStatus] = useState<string | null>(null)

  function handleSimulateResearch() {
    posthog.capture("company_researched", {
      userId,
      jobId: "job_001",
      company: "Acme Corp",
    })
    setStatus("Fired company_researched event")
  }

  return (
    <div className="mt-6 rounded-xl border bg-surface p-6 shadow-card">
      <h3 className="mb-2 font-semibold text-text-primary">PostHog Demo — Company Research</h3>
      <p className="mb-4 text-sm text-text-muted">
        Simulates company research dossier generation.
      </p>
      <button
        onClick={handleSimulateResearch}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
      >
        Simulate Company Research
      </button>
      {status && (
        <p className="mt-3 text-sm text-text-muted">{status}</p>
      )}
    </div>
  )
}
