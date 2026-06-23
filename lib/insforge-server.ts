import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@insforge/sdk/ssr"

export async function createInsforgeServer() {
  return createServerClient({
    cookies: await cookies(),
  })
}

export async function requireUser() {
  const insforge = await createInsforgeServer()
  const { data, error } = await insforge.auth.getCurrentUser()
  const user = data?.user ?? null
  if (error || !user) redirect("/login")
  return { user }
}
