"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createAuthActions } from "@insforge/sdk/ssr"
import { createPosthogServer } from "@/lib/posthog-server"

export async function signOut() {
  const posthog = createPosthogServer()
  await posthog.shutdown()

  const cookieStore = await cookies()
  const auth = createAuthActions({ cookies: cookieStore })
  await auth.signOut()
  redirect("/login")
}

export async function initiateOAuth(provider: string) {
  const cookieStore = await cookies()
  const auth = createAuthActions({ cookies: cookieStore })

  const { data, error } = await auth.signInWithOAuth(provider, {
    redirectTo: new URL(
      "/api/auth/callback",
      process.env.NEXT_PUBLIC_APP_URL,
    ).toString(),
    skipBrowserRedirect: true,
  })

  if (error || !data?.url || !data?.codeVerifier) {
    throw new Error(error?.message ?? "OAuth initiation failed")
  }

  cookieStore.set("insforge_code_verifier", data.codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })

  redirect(data.url)
}
