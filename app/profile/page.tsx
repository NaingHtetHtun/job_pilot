import { Navbar } from "@/components/layout/Navbar"
import { PosthogIdentify } from "@/components/PosthogIdentify"
import { ProfileAttentionBanner } from "@/components/profile/ProfileAttentionBanner"
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts"
import { ProfilePageClient } from "@/components/profile/ProfilePageClient"
import { requireUser, createInsforgeServer } from "@/lib/insforge-server"
import { calculateCompletion } from "@/lib/profile-utils"

export default async function ProfilePage() {
  const { user } = await requireUser()
  const insforge = await createInsforgeServer()

  const { data: profile } = await insforge
    .database
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { completionPercent, missingFields } = calculateCompletion(profile ?? {})

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <PosthogIdentify userId={user.id} />
      <Navbar isAuthenticated />
      <div className="mx-auto max-w-270 px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-text-muted">
            Manage your profile and resume
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <ProfileAttentionBanner
            completionPercent={completionPercent}
            missingFields={missingFields}
          />
          <ConnectedAccounts />
          <ProfilePageClient
            profile={profile ?? null}
            userEmail={user.email ?? ""}
          />
        </div>
      </div>
    </main>
  )
}
