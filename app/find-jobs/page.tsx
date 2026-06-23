import { Navbar } from "@/components/layout/Navbar"
import { SearchDemo } from "@/components/demo/SearchDemo"
import { requireUser } from "@/lib/insforge-server"

export default async function FindJobsPage() {
  const { user } = await requireUser()

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <Navbar isAuthenticated />
      <div className="mx-auto max-w-270 px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Find Jobs</h1>
          <p className="text-text-muted text-sm">
            Signed in as {user.email}
          </p>
        </div>
        <div className="rounded-xl border p-8 shadow-card">
          <p className="text-text-muted">
            Job search and discovery will appear here.
          </p>
        </div>
        <SearchDemo userId={user.id} />
      </div>
    </main>
  )
}
