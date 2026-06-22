# Memory — Homepage Component Split + Convention Docs

Last updated: 2026-06-22

## What was built

**Extracted 9 inline components from `app/page.tsx` into separate files:**

| File | Component |
|---|---|
| `components/layout/Navbar.tsx` | Landing navbar — logo, nav links, Start for free CTA |
| `components/layout/Footer.tsx` | Landing footer — logo, nav links, legal links |
| `components/homepage/Hero.tsx` | Headline, dual CTAs, dashboard preview |
| `components/homepage/FeatureRows.tsx` | Shared row renderer (title + description + accent border) |
| `components/homepage/JobsPreview.tsx` | Mock jobs table card with hardcoded data |
| `components/homepage/HowItWorks.tsx` | "Manage Your Job Search" panel |
| `components/homepage/Features.tsx` | "Apply With More Confidence" panel |
| `components/homepage/SuccessStory.tsx` | Testimonial blockquote |
| `components/homepage/CTASection.tsx` | Bottom CTA banner |

**Rewrote `app/page.tsx`** — dropped from 349 lines to 14 lines. Pure composition of imported components.

**Updated context files:**
- `context/code-standards.md` — added **Page Composition Rule** (page files must only import/compose, no inline components)
- `context/ui-registry.md` — updated all Landing* entries with actual classes from extracted code; added `FeatureRows` and `JobsPreview` entries
- `context/ui-tokens.md` — added **Tailwind v4 Spacing & Sizing Scale** section (4px base unit, conversion table, exceptions list)
- `context/ui-rules.md` — added rule to "Do Nots": no arbitrary `[Xpx]` when built-in scale class exists

## Decisions made

- Page files are pure composition only — every page section gets its own component file
- Data arrays co-located with the component that uses them (not in page files)
- `FeatureRows` is a shared sub-component accepting `rows` as props, reused by both `HowItWorks` and `Features`
- All fluid typography `text-[clamp(...)]` kept as arbitrary — no built-in equivalent

## Problems solved

- `components/` directory and `components/homepage/`, `components/layout/` subdirectories did not exist — created from scratch
- `ui-registry.md` documented Landing* components with classes that didn't match the actual inline code — updated to match reality
- Tailwind v4 scale convention undocumented — added reference table documenting `px ÷ 4` conversion

## Current state

- Homepage renders identically to before (verified via `npm run lint && npm run build`)
- All pages pass lint and build
- 334 lines of inline component code moved out of `app/page.tsx` into proper component files
- One remaining inconsistency: `Navbar.tsx` still uses `max-w-[1080px]` while `page.tsx` uses `max-w-270` (same value, different form)

## Next session starts with

Feature 17 — Analytics Charts — PostHog Data. Wire three dashboard charts (`AnalyticsCharts.tsx` already has UI) to real PostHog event data.

## Open questions

- Should `Navbar.tsx` `max-w-[1080px]` be normalized to `max-w-270` for consistency? (low priority — visual output is identical)
