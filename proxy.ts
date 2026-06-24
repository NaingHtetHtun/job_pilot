import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@insforge/sdk/ssr/middleware"

const protectedPaths = [
  "/dashboard",
  "/profile",
  "/find-jobs",
  "/api/resume/extract",
  "/api/resume/generate",
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CookieStore = any

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  )

  if (!isProtected) {
    return NextResponse.next({ request })
  }

  const response = NextResponse.next({ request })

  await updateSession({
    requestCookies: request.cookies as CookieStore,
    responseCookies: response.cookies as CookieStore,
  })

  return response
}
