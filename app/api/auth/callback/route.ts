import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { createAuthActions } from "@insforge/sdk/ssr"
import { createPosthogServer } from "@/lib/posthog-server"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("insforge_code")
  const oauthError = request.nextUrl.searchParams.get("error")

  const loginErrorUrl = (msg: string) => {
    const url = new URL("/login", request.url)
    url.searchParams.set("error", msg)
    return NextResponse.redirect(url)
  }

  if (oauthError) {
    return loginErrorUrl(oauthError)
  }

  if (!code) {
    return loginErrorUrl("No authorization code received from provider")
  }

  const cookieStore = await cookies()
  const codeVerifier = cookieStore.get("insforge_code_verifier")?.value

  if (!codeVerifier) {
    return loginErrorUrl("Session expired — please try signing in again")
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url))

  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  })

  const { data, error } = await auth.exchangeOAuthCode(code, codeVerifier)

  if (error || !data?.user) {
    const message =
      (error as { error?: string })?.error ??
      (error as { message?: string })?.message ??
      "exchange_failed"
    return loginErrorUrl(message)
  }

  response.cookies.delete("insforge_code_verifier")

  const posthog = createPosthogServer()
  posthog.identify({
    distinctId: data.user.id,
    properties: { email: data.user.email },
  })
  await posthog.shutdown()

  return response
}
