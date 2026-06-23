"use client"

import { useRef } from "react"
import { ResumeSection } from "./ResumeSection"
import { ProfileForm, type ProfileFormHandle } from "./ProfileForm"
import type { Profile } from "@/types"

type Props = {
  profile: Profile | null
  userEmail: string
}

export function ProfilePageClient({ profile, userEmail }: Props) {
  const formRef = useRef<ProfileFormHandle>(null)

  function handleExtracted(data: Record<string, unknown>) {
    formRef.current?.applyExtracted(data)
  }

  return (
    <div className="flex flex-col gap-6">
      <ResumeSection
        existingResumeUrl={profile?.resume_pdf_url}
        onExtracted={handleExtracted}
      />
      <ProfileForm
        ref={formRef}
        profile={profile}
        userEmail={userEmail}
      />
    </div>
  )
}
