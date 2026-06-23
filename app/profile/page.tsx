import { Navbar } from "@/components/layout/Navbar"
import { ProfileDemo } from "@/components/demo/ProfileDemo"
import { requireUser } from "@/lib/insforge-server"

export default async function ProfilePage() {
  const { user } = await requireUser()

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <Navbar isAuthenticated />
      <div className="mx-auto max-w-270 px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-text-muted text-sm">
            Signed in as {user.email}
          </p>
        </div>
        <div className="rounded-xl border p-8 shadow-card">
          <p className="text-text-muted">
            Your profile information will appear here.
          </p>
        </div>
        <ProfileDemo userId={user.id} />
      </div>
    </main>
  )
}
