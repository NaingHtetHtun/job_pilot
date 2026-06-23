"use client"

import posthog from "posthog-js"
import { useState } from "react"

type Props = {
  userId: string
}

export function SearchDemo({ userId }: Props) {
  const [status, setStatus] = useState<string | null>(null)

  function handleSimulateSearch() {
    posthog.capture("job_search_started", {
      userId,
      jobTitle: "Software Engineer",
      location: "Remote",
    })
    setStatus("Searching for jobs...")

    const jobs = [
      { source: "Adzuna", matchScore: 85 },
      { source: "Adzuna", matchScore: 72 },
      { source: "LinkedIn", matchScore: 91 },
    ]

    jobs.forEach((job) => {
      posthog.capture("job_found", {
        userId,
        source: job.source,
        matchScore: job.matchScore,
      })
    })

    setStatus(`Fired job_search_started + ${jobs.length} job_found events`)
  }

  return (
    <div className="mt-6 rounded-xl border bg-surface p-6 shadow-card">
      <h3 className="mb-2 font-semibold text-text-primary">PostHog Demo — Job Search</h3>
      <p className="mb-4 text-sm text-text-muted">
        Simulates a job search flow to verify PostHog event tracking.
      </p>
      <button
        onClick={handleSimulateSearch}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
      >
        Simulate Job Search
      </button>
      {status && (
        <p className="mt-3 text-sm text-text-muted">{status}</p>
      )}
    </div>
  )
}
