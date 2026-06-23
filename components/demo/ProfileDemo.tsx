"use client"

import posthog from "posthog-js"
import { useState } from "react"

type Props = {
  userId: string
}

export function ProfileDemo({ userId }: Props) {
  const [status, setStatus] = useState<string | null>(null)

  function handleCompleteProfile() {
    posthog.capture("profile_completed", { userId })
    setStatus("Fired profile_completed event")
  }

  return (
    <div className="mt-6 rounded-xl border bg-surface p-6 shadow-card">
      <h3 className="mb-2 font-semibold text-text-primary">PostHog Demo — Profile</h3>
      <p className="mb-4 text-sm text-text-muted">
        Simulates completing a user profile for the first time.
      </p>
      <button
        onClick={handleCompleteProfile}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
      >
        Complete Profile Demo
      </button>
      {status && (
        <p className="mt-3 text-sm text-text-muted">{status}</p>
      )}
    </div>
  )
}
