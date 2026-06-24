# Memory — Profile Page Bug Fixes (Post-Build Session)

Last updated: 2026-06-24

## What was built

**Bug fixes across profile page and server actions:**

- `components/profile/ResumeSection.tsx` — "View current resume" and "Generate Resume from Profile" now use blob URLs instead of raw data URLs or storage URLs. Both call Server Action → receive `data:application/pdf;base64,...` → `fetch(dataUrl)` → `URL.createObjectURL(blob)` → `window.open(blobUrl, "_blank")`. Fixes browser PDF rendering and auth-requiring storage URLs.
- `actions/profile.tsx` — added `parseLlmJson()` helper that strips markdown code fences (```` ```json ````) before `JSON.parse`; used by both `extractResume()` and `generateResume()`. Fixed `isComplete` not written to DB (`raw.is_complete = isComplete`). Changed `generateResume()` to return data URL instead of raw storage URL. Changed `uploadResume()` to call `bucket.remove(filePath)` before uploading (prevents dedup copies). Added `path` import (was using `require("path")` which doesn't work in ESM).
- `components/profile/ProfileForm.tsx` — added `?? ""` guards on all 8 `.split(" ")` calls for `role.startDate`/`role.endDate` to prevent crash when values are `null` from DB or resume extraction.
- `context/ui-registry.md` — updated ResumeSection entry with current blob URL pattern and upload-overwrite behavior.

## Decisions made

- PDF view: Server Action → data URL → client-side blob conversion via `fetch()` + `URL.createObjectURL()`. Avoids both InsForge Storage auth headers (which raw storage URLs require) and browser data URL size limits in new tabs.
- LLM JSON parsing: always strip markdown fences via shared `parseLlmJson()` helper before `JSON.parse`.
- Resume re-upload: always `bucket.remove()` before uploading to same path, matching the pattern `generateResume()` already uses.

## Problems solved

- `window.open(dataUrl, "_blank")` with `data:application/pdf;base64,...` doesn't render PDFs in most browsers — converted to blob URLs via `fetch()` + `URL.createObjectURL()`.
- `generateResume()` returned raw InsForge Storage URL that requires auth headers — invisible in Server Action result but fails when opened in new tab.
- GPT-4o wraps JSON in markdown code fences (```` ```json … ``` ````) — `JSON.parse` throws `SyntaxError: Unexpected token '`'`.
- `role.startDate`/`role.endDate` can be `null` from DB NULL columns or resume extraction — `.split(" ")` crashes with `Cannot read properties of null (reading 'split')`.
- Re-uploading a PDF to same path created dedup copies (`resume(1).pdf`) — old file persisted, extract/download always got stale data.

## Current state

- Profile page fully functional: save, upload resume, view resume, extract from resume, generate resume — all paths tested and working.
- PDF view and generate both open correctly in new tabs via blob URLs.
- Re-upload correctly overwrites old file — no more stale data.
- Null dates handled gracefully — form doesn't crash.
- LLM responses with markdown fences parse correctly.
- `is_complete` saved to DB — PostHog `profile_completed` event fires on first completion.
- Build passes cleanly.

## Next session starts with

Feature 17: Analytics Charts — wire `AnalyticsCharts.tsx` components to real PostHog event data using `createPosthogServer()`.

## Open questions

- (none)
