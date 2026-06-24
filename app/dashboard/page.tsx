import { Navbar } from "@/components/layout/Navbar"
import { PosthogIdentify } from "@/components/PosthogIdentify"
import { ResearchDemo } from "@/components/demo/ResearchDemo"
import { requireUser } from "@/lib/insforge-server"

export default async function DashboardPage() {
  const { user } = await requireUser()

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <PosthogIdentify userId={user.id} />
      <Navbar isAuthenticated />
      <div className="mx-auto max-w-270 px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-text-muted">
            Welcome back, {user.email}
          </p>
        </div>
        <div className="rounded-xl border p-8 shadow-card">
          <p className="text-text-muted">
            Your dashboard content will appear here.
          </p>
        </div>
        <ResearchDemo userId={user.id} />
      </div>
    </main>
  )
}
