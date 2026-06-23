"use client"

import posthog from "posthog-js"
import { useEffect } from "react"

export function PosthogIdentify({ userId }: { userId: string }) {
  useEffect(() => {
    posthog.identify(userId)
  }, [userId])

  return null
}
