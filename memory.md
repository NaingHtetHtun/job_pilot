# Memory — Profile Page UI + Save Logic (Features 05–06)

Last updated: 2026-06-23

## What was built

**Feature 05 — Profile Page UI:**
- `components/profile/ProfileAttentionBanner.tsx` — SVG circular progress ring + warning badge tags, returns null at 100%
- `components/profile/ConnectedAccounts.tsx` — LinkedIn connect/disconnect row with inline SVG icon
- `components/profile/ResumeSection.tsx` — drag-drop zone, file select, upload to server action, extract/generate resume buttons
- `components/profile/ProfileForm.tsx` — full 5-section form (Personal Info, Professional Info, Work Experience, Education, Job Preferences), tag inputs, `forwardRef` + `useImperativeHandle` exposing `applyExtracted()`
- `components/profile/ProfilePageClient.tsx` — client wrapper wiring `ResumeSection.onExtracted` → `ProfileForm.applyExtracted`
- `app/profile/page.tsx` — server component: fetches profile from DB via InsForge SDK, calculates completion, renders all real components

**Feature 06 — Save Logic:**
- `lib/profile-utils.ts` — `calculateCompletion()` pure function: checks 9 required fields matching `MissingField` type
- `actions/profile.ts` — `saveProfile()` server action: updates DB, fires `profile_completed` PostHog event on first completion; `uploadResume()` server action: uploads to InsForge Storage, saves URL to profile

**Infrastructure updates:**
- Installed `lucide-react`
- Updated `context/ui-registry.md` entries for all 5 profile components with correct patterns

## Decisions made

- `calculateCompletion()` checks 9 required fields: FULL_NAME, PHONE, LOCATION, CURRENT_TITLE, EXPERIENCE_LEVEL, YEARS_EXPERIENCE, SKILLS, WORK_EXPERIENCE, EDUCATION — matches `MissingField` type
- `profile_completed` PostHog event fires only once (first time `is_complete` transitions false → true) — prevents repeated events on subsequent saves
- `uploadResume()` uses `insforge.storage.from("resumes").upload(path, file)` — 2 args only (no `upsert`/`contentType` options); InsForge SDK accepts `File | Blob` directly
- LinkedIn icon uses inline SVG — lucide-react does not export a `LinkedinIcon` in current installed version
- Save button is `inline-flex` in a flex row with error/success messages — not full-width (deviates from earlier registry pattern)
- "use client" boundary: ProfileForm, ResumeSection, ConnectedAccounts, ProfilePageClient are client components
- `calculateCompletion()` is a pure function — imported by both client (ProfileForm) and server (page.tsx), no "use server" needed

## Problems solved

- InsForge Storage `upload()` only accepts `(path, file)` — no options object. Removed `Buffer` conversion and `contentType`/`upsert` options that existed in a first draft.
- `LinkedinIcon` does not exist in lucide-react — replaced with hand-written inline SVG path
- TypeScript `z.infer` needed `z.array(...)` not spread for union type — fixed tag field schema

## Current state

- Profile page renders all 5 real components with correct styling
- `saveProfile()` saves to DB and fires PostHog events
- `uploadResume()` uploads files and saves URL to profile
- Build passes with zero TypeScript errors
- `ui-registry.md` updated with profile component patterns

## Next session starts with

Wire the Analytics Charts (`AnalyticsCharts.tsx`) to real PostHog event data using `createPosthogServer()`. Then replace demo components with real event firing as each feature is implemented.

## Open questions

- (none)
