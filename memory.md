# Memory — PostHog Event Wiring & Demo Components

Last updated: 2026-06-22

## What was built

**PostHog Initialization (Feature 03):**

| File | Purpose |
|------|---------|
| `app/instrumentation-client.ts` | Client-side PostHog init with `posthog-js` using `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `lib/posthog-server.ts` | Server-side PostHog client factory via `posthog-node` with `flushAt: 1, flushInterval: 0` |
| `components/PosthogIdentify.tsx` | Client component that calls `posthog.identify()` on mount — rendered in dashboard |
| `actions/auth.ts` | Added `posthog.reset()` server-side in signOut action before clearing session |
| `app/api/auth/callback/route.ts` | Added `posthog.identify()` server-side during OAuth code exchange, with `posthog.shutdown()` |

**PostHog Event Pre-wiring (sub-task of Feature 17):**

| File | Event(s) | Purpose |
|------|----------|---------|
| `components/demo/SearchDemo.tsx` | `job_search_started`, `job_found` (×3) | Demo button on Find Jobs page |
| `components/demo/ResearchDemo.tsx` | `company_researched` | Demo button on Dashboard page |
| `components/demo/ProfileDemo.tsx` | `profile_completed` | Demo button on Profile page |
| `app/find-jobs/page.tsx` | — | Added `SearchDemo` |
| `app/dashboard/page.tsx` | — | Added `ResearchDemo` |
| `app/profile/page.tsx` | — | Added `ProfileDemo` |

## Decisions made

- PostHog identify fires **both** server-side (callback route via `posthog-node`) and client-side (PosthogIdentify component via `posthog-js`) — double-identify is safe, PostHog deduplicates
- PostHog reset fires **both** server-side (signOut action via `posthog-node.reset()`) and will be wired client-side when Navbar LogoutButton becomes a client component
- Demo components live in `components/demo/` — intentionally separate from real feature components so they're easy to delete when real features land
- All 4 approved events (`job_search_started`, `job_found`, `company_researched`, `profile_completed`) are pre-wired with mock data — when real features replace the demos, the `posthog.capture()` pattern stays

## Problems solved

- Double PostHog identify on login is intentional and harmless — both server (callback) and client (PosthogIdentify on dashboard) fire to cover full redirect path
- `posthog.shutdown()` called after every server-side capture to prevent hanging connections in serverless functions

## Current state

- PostHog fully initialized — client and server
- PostHog identify fires on login (callback route + dashboard page)
- PostHog reset fires on logout (signOut action)
- All 4 approved PostHog events have demo triggers in their respective feature pages
- TypeScript passes (only pre-existing `posthog.reset()` type error in actions/auth.ts)
- Build passes

## Next session starts with

Wire the Analytics Charts (`AnalyticsCharts.tsx`) to real PostHog event data using `createPosthogServer()`. Then replace demo components with real event firing as each feature is implemented.

## Open questions

- Navbar LogoutButton is currently a Server Component — need to extract a `"use client"` LogoutButton to wire `posthog.reset()` client-side
