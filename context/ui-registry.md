# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Global Theme Tokens

File: app/globals.css
Last updated: 2026-06-22

| Property      | Class / Token                                                                 |
| ------------- | ------------------------------------------------------------------------------ |
| Tailwind setup | `@import "tailwindcss"` followed by CSS-first `@theme` tokens                 |
| Font          | `--font-sans: "Inter", sans-serif`; root layout applies `Inter` via `next/font/google` |
| Colors        | Project semantic tokens only, e.g. `--color-background`, `--color-surface`, `--color-accent`, `--color-success` |
| Radius        | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-full` |
| Shadows       | `--shadow-card`, `--shadow-landing-card`, `--shadow-landing-browser` generate `shadow-card` and landing shadow utilities |
| Base styles   | `html` and `body` use `bg-background`, `text-text-primary`, and `font-sans` via CSS variables |

**Pattern notes:**
Tailwind v4 configuration lives in CSS, not `tailwind.config.ts`. New colors, radii, shadows, and fonts should be added to `@theme` only when they are approved project tokens. Component files should consume generated semantic utilities such as `bg-surface`, `text-text-primary`, `border-border`, and `shadow-card`.

### Login Card

File: components/auth/LoginCard.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface` outer shell with `landing-hero-glow` on the left auth storytelling panel                    |
| Border           | `border border-border`, `border-b border-border` on mobile split, `lg:border-r` on desktop split        |
| Border radius    | `rounded-[24px]` outer shell, `rounded-full` on the small OAuth security badge, `rounded-md` buttons     |
| Text — primary   | Hero `text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-text-slate`, form title `text-3xl font-semibold leading-9 text-text-primary` |
| Text — secondary | `text-base leading-7 text-text-secondary sm:text-lg` for supporting copy, `text-sm leading-6 text-text-secondary` for form guidance |
| Spacing          | Outer `mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] items-center justify-center px-4 py-12 sm:px-6 lg:px-8`, panels `p-8 sm:p-10`, actions `mt-8 grid gap-3` |
| Hover state      | Provider form buttons use `hover:bg-surface-secondary`; focus uses `focus-visible:outline-accent`        |
| Shadow           | `shadow-card` on the outer auth shell                                                                   |
| Accent usage     | `text-accent` on the InsForge security badge icon and Google provider icon                              |

**Pattern notes:**
Auth screens use a two-panel shell: a left explanatory panel with the established landing glow treatment and a right focused action panel. Provider actions are token-driven bordered form buttons with lucide icons and no hardcoded provider colors.

### Landing Navbar

File: components/layout/Navbar.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                                             |
| Border           | `border-b border-border`                                                                                 |
| Border radius    | `rounded-md` on CTA only                                                                                 |
| Text — primary   | `text-sm font-medium text-text-dark`                                                                     |
| Text — secondary | `text-sm font-medium text-accent-foreground` on CTA                                                      |
| Spacing          | `mx-auto flex h-16 max-w-[1080px] items-center justify-between px-5 sm:px-8`                           |
| Hover state      | `hover:text-text-primary` on nav links; `hover:opacity-90` on CTA                                        |
| Shadow           | `none`                                                                                                   |
| Accent usage     | `bg-overlay` for the top-right CTA                                                                       |

**Pattern notes:**
Top navigation is always a full-width white bar with a single bottom border and restrained typography. Content width is 1080px centered. The only high-contrast element is the dark CTA on the right.

### Landing Hero

File: components/homepage/Hero.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Background       | `landing-hero-glow` on copy section; `bg-surface-tertiary` on preview section                                  |
| Border           | `border-b border-border` separating hero sections                                                              |
| Border radius    | `rounded-md` on url bar; `rounded-[26px]` on browser frame; `landing-button-*` on buttons                      |
| Text — primary   | `text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-text-slate`            |
| Text — secondary | `text-base font-medium leading-7 text-text-secondary`                                                          |
| Spacing          | `px-6 py-16 sm:px-10 sm:py-20 lg:px-16` for copy; `px-5 py-12 sm:px-10 lg:px-14` for preview                  |
| Hover state      | Shared hover from `landing-button-primary` and `landing-button-secondary`                                      |
| Shadow           | `landing-browser-shadow` on the dashboard image frame                                                          |
| Accent usage     | `landing-hero-glow` pastel band plus `landing-button-primary` primary CTA and `landing-button-secondary` secondary CTA |

**Pattern notes:**
Hero sections use the soft multicolor glow helper, centered headline copy, paired CTA buttons, and a large bordered product preview resting on a muted surface strip.

### HowItWorks — Feature Panel

File: components/homepage/HowItWorks.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Background       | `landing-grid` outer shell with `bg-surface` content and `bg-surface-tertiary` media side      |
| Border           | `border-b border-border` on section; `lg:border-r` split; `border-t border-border` row dividers|
| Border radius    | `rounded-2xl` on JobsPreview card; `rounded-lg` on company icon boxes                         |
| Text — primary   | `text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-text-slate` heading |
| Text — secondary | `text-base font-medium leading-7 text-text-secondary`                                          |
| Spacing          | Headings `px-8 py-14 sm:px-14 lg:py-16`; rows `px-8 py-7 sm:px-14`                            |
| Hover state      | `none`                                                                                         |
| Shadow           | `shadow-card` on JobsPreview card                                                              |
| Accent usage     | `border-l-2 border-accent` on first feature row                                                |

### Features — Confidence Panel

File: components/homepage/Features.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Background       | `landing-grid` with `bg-surface-tertiary` image side and `bg-surface` content side             |
| Border           | `border-b border-border` on section; `lg:border-r` split; `border-t border-border` row dividers|
| Border radius    | `rounded-xl` on image card                                                                     |
| Text — primary   | `text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-text-slate` heading |
| Text — secondary | `text-base font-medium leading-7 text-text-secondary`                                          |
| Spacing          | Headings `px-8 py-14 sm:px-14 lg:py-16`; rows `px-8 py-7 sm:px-14`; image `px-6 py-14 sm:px-10` |
| Hover state      | `none`                                                                                         |
| Shadow           | `landing-card-shadow` on image card                                                            |
| Accent usage     | `border-l-2 border-success` on middle feature row                                              |

**Pattern notes:**
Feature storytelling panels alternate which side carries the visual using `landing-grid` two-column layout. Copy stacks in bordered rows, and one row per panel gets a colored left-rule (`border-accent` in HowItWorks, `border-success` in Features) to anchor the section.

### Testimonial Section

File: components/homepage/SuccessStory.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Background       | `bg-surface` (inherited from page)                                                            |
| Border           | `border-b border-border`                                                                      |
| Border radius    | `rounded-full` on avatar only                                                                 |
| Text — primary   | `text-[clamp(1.65rem,3vw,2.35rem)] font-medium leading-[1.22] tracking-[-0.035em] text-text-slate-medium` |
| Text — secondary | `text-xs font-medium text-text-secondary`                                                     |
| Spacing          | `px-6 py-20 sm:px-12 lg:py-24`; eyebrow `mt-7` above quote; avatar row `mt-8 flex gap-3`     |
| Hover state      | `none`                                                                                        |
| Shadow           | `none`                                                                                        |
| Accent usage     | `text-xs font-semibold uppercase tracking-[0.22em] text-accent` for section eyebrow          |

**Pattern notes:**
Social proof is centered and quiet: one accent eyebrow, a large editorial quote, then a compact identity row with the avatar and role.

### CTA Banner

File: components/homepage/CTASection.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Background       | `landing-hero-glow`                                                                                         |
| Border           | `border-b border-border`                                                                                    |
| Border radius    | `landing-button-*` on buttons                                                                                |
| Text — primary   | `text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] text-text-slate`             |
| Text — secondary | `text-base font-medium leading-7 text-text-secondary`                                                       |
| Spacing          | `px-6 py-20 sm:px-10 lg:py-24`; actions `mt-8 flex gap-3`                                                  |
| Hover state      | Shared hover from `landing-button-primary` and `landing-button-secondary`                                  |
| Shadow           | `none`                                                                                                      |
| Accent usage     | Same dark primary CTA and pastel glow pattern as the hero                                                   |

**Pattern notes:**
Bottom conversion banners reuse the hero treatment exactly, only with tighter copy width and no embedded product screenshot.

### ConnectedAccounts

File: components/profile/ConnectedAccounts.tsx
Last updated: 2026-06-04

| Property      | Class                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Section shell | `rounded-2xl border border-border bg-surface p-6 shadow-card`                                         |
| Row           | `flex items-center justify-between gap-4 rounded-xl border border-border p-4`                         |
| Icon wrapper  | `flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-linkedin-light`               |
| Connect btn   | `rounded-lg bg-linkedin px-4 py-2 text-sm font-medium text-linkedin-foreground transition-opacity hover:opacity-90 disabled:opacity-60` |
| Save btn      | `rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60` |
| Disconnect    | `text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary`                      |
| Error text    | `text-xs text-error`                                                                                   |

**Pattern notes:**
Client component with 3 button states: Connect (no context) → "I'm Connected" (pending context, new tab open) → Disconnect (connected). State held locally; `isConnected` initialised from server-fetched `linkedinConnected` prop. Fetch pattern matches `handleGenerate` in ResumeSection — plain `fetch` with loading/error state, no `useTransition`.

---

### Landing Buttons

File: app/globals.css
Last updated: 2026-06-03

| Property         | Class                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| Background       | `landing-button-primary` uses a dark token-based gradient, `landing-button-secondary` uses a soft surface fill |
| Border           | `landing-button-primary` has a dark mixed border, `landing-button-secondary` uses `var(--color-border)` |
| Border radius    | `var(--radius-md)`                                                                            |
| Text — primary   | `landing-button-primary` sets `color: var(--color-accent-foreground)`                        |
| Text — secondary | `landing-button-secondary` sets `color: var(--color-text-primary)`                           |
| Spacing          | `min-height: 3rem`, `padding: 0.75rem 1.5rem`, `font-size: 0.875rem`, `font-weight: 500`    |
| Hover state      | Primary lifts and brightens, secondary lightens and shifts border toward accent              |
| Shadow           | Primary gets depth shadow plus inset highlight, secondary gets a subtle card-like shadow     |
| Accent usage     | Focus ring uses `var(--color-accent)`                                                        |

**Pattern notes:**
All landing-page CTAs should use these shared semantic classes instead of duplicating button styling inline. This keeps contrast and polish consistent across navbar, hero, and footer CTA areas.

### Landing Footer

File: components/layout/Footer.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface` (inherited from page)                                                    |
| Border           | `none`                                                                                |
| Border radius    | `none`                                                                                |
| Text — primary   | `text-sm font-medium text-text-secondary`                                             |
| Text — secondary | `text-sm font-medium text-text-secondary`                                             |
| Spacing          | `flex flex-col items-center justify-between gap-8 px-8 py-14 sm:flex-row`            |
| Hover state      | `hover:text-text-primary`                                                             |
| Shadow           | `none`                                                                                |
| Accent usage     | `none`                                                                                |

**Pattern notes:**
Footer stays minimal and horizontal at larger sizes. Logo on the left, nav links on the right.

### FeatureRows

File: components/homepage/FeatureRows.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface` (inherited)                                                              |
| Border           | `border-t border-border` row separators; `border-l-2` with accent class               |
| Border radius    | `none`                                                                                |
| Text — primary   | `text-lg font-semibold leading-6 text-text-primary` title                             |
| Text — secondary | `text-base font-medium leading-7 text-text-secondary` description                     |
| Spacing          | `px-8 py-7 sm:px-14` per row; `mt-3` description below title                          |
| Hover state      | `none`                                                                                |
| Shadow           | `none`                                                                                |
| Accent usage     | Accent class passed via `accent` prop — `border-accent` or `border-transparent` or `border-success` |

**Pattern notes:**
Shared sub-component consumed by both `HowItWorks` and `Features`. Renders an array of `{ title, description, accent }` objects as bordered rows with a colored left rule. The `accent` prop controls the left border color.

### JobsPreview

File: components/homepage/JobsPreview.tsx
Last updated: 2026-06-22

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border` card; `border-b border-border` row separators                 |
| Border radius    | `rounded-2xl` card; `rounded-lg` company icon box; `rounded-md` source badge; `rounded-full` score bar |
| Text — primary   | `text-sm font-semibold text-text-primary` company name; `text-xs font-semibold text-text-primary` score |
| Text — secondary | `text-xs font-semibold uppercase tracking-wide text-text-secondary` column headers; `text-sm font-medium text-text-secondary` salary |
| Spacing          | `p-5` card; `gap-3` column layout; `pb-3` header; `py-4` rows                         |
| Hover state      | `none`                                                                                |
| Shadow           | `shadow-card`                                                                         |
| Accent usage     | Score bar colors: `bg-success` (94%+), `bg-info-medium` (88%), `bg-warning` (72%); source badge `bg-surface-secondary text-info-foreground` |

**Pattern notes:**
Static mock data card used in the landing page `HowItWorks` section. Intended as a visual preview only — data is hardcoded in the component file. Grid layout mimics the real `JobsTable` without being interactive.

### Analytics Logout Link

File: components/analytics/PostHogLogoutLink.tsx
Last updated: 2026-06-03

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | Inherited through `className`; current usage passes `bg-surface`                      |
| Border           | Inherited through `className`; current usage passes `border border-border`            |
| Border radius    | Inherited through `className`; current usage passes `rounded-md`                      |
| Text — primary   | Inherited through `className`; current usage passes `text-sm font-medium text-text-primary` |
| Text — secondary | `none`                                                                                |
| Spacing          | Inherited through `className`; current usage passes `min-h-10 px-4 py-2`              |
| Hover state      | Inherited through `className`; current usage passes `hover:bg-surface-secondary`      |
| Shadow           | `none`                                                                                |
| Accent usage     | `none`                                                                                |

**Pattern notes:**
Analytics wrapper links should preserve the exact visual classes of the link or button they replace. The component owns only the PostHog reset behavior and must not introduce standalone styling.

---

### Profile Attention Banner

File: components/profile/ProfileAttentionBanner.tsx
Last updated: 2026-06-23

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border`                                                                |
| Border radius    | `rounded-2xl`                                                                         |
| Text — primary   | `text-sm font-semibold text-text-primary`                                             |
| Text — secondary | `text-sm text-text-secondary`                                                         |
| Spacing          | `p-6`, banner layout `flex items-start justify-between gap-6`                         |
| Hover state      | `none`                                                                                |
| Shadow           | `shadow-card`                                                                         |
| Accent usage     | SVG ring stroke uses `var(--color-accent)`; warning badges use `bg-warning text-warning-foreground` |

**Pattern notes:**
Completion ring is a pure SVG circle with `stroke-dashoffset` driven by the `completionPercent` prop. Missing field badges use `rounded-sm` (not pill) with warning color. Ring is 88×88px, radius 34, stroke-width 8. Returns `null` when `completionPercent === 100`.

---

### Connected Accounts

File: components/profile/ConnectedAccounts.tsx
Last updated: 2026-06-23

**Pattern notes:**
Single card with a single provider row: inline SVG LinkedIn icon + label (left) / connected status + disconnect button (right). Uses `flex items-center justify-between gap-4`. LinkedIn icon is an inline SVG (lucide-react does not export `LinkedinIcon`). Connect btn: `text-sm font-medium text-accent hover:text-accent-hover`. Disconnect btn: `text-sm text-error hover:text-error-hover`. Container: `rounded-2xl border border-border bg-surface p-6 shadow-card`.

---

### Resume Section

File: components/profile/ResumeSection.tsx
Last updated: 2026-06-24

**Pattern notes:**
Drop zone switches from `border-border bg-surface-secondary` to `border-accent bg-accent-muted` on `isDragging`. Hidden `<input type="file">` triggered by click on the drop zone via a `ref`. Only PDF files accepted. `Extract Profile` button only renders when a resume exists (`hasResume = !!existingResumeUrl || !!selectedFile`). Accepts `onExtracted` callback prop. Uses separate `useTransition` instances: `isUploading` for upload flow, `isExtracting` for extract flow, `isGenerating` for generate flow. Both "View current resume" and "Generate Resume from Profile" use Server Actions returning `data:application/pdf;base64,...` data URLs, converted to blob URLs via `fetch()` → `URL.createObjectURL()` → `window.open(blobUrl, "_blank")` — avoids InsForge Storage auth headers in new tabs. `uploadResume` removes the old file (`bucket.remove()`) before uploading to prevent dedup copies. Action rows show error/success feedback below the button using `text-xs text-error` / `text-xs text-success`. Container: `rounded-2xl border border-border bg-surface p-6 shadow-card`. Extract button: `min-h-10 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:opacity-60`. Generate button: `min-h-10 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60`. "View current resume" link: `inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover underline underline-offset-2 cursor-pointer`.

### Profile Page Client

File: components/profile/ProfilePageClient.tsx
Last updated: 2026-06-23

Thin client wrapper that owns the `useRef<ProfileFormHandle>` connecting `ResumeSection.onExtracted` to `ProfileForm.applyExtracted`. Has no visible UI of its own — renders `<ResumeSection>` then `<ProfileForm>` with the ref wired between them.

---

### Profile Form

File: components/profile/ProfileForm.tsx
Last updated: 2026-06-23

**Pattern notes:**
Form card: `rounded-2xl border border-border bg-surface shadow-card`. Header: `px-6 py-5 border-b border-border`. Footer: `px-6 py-4 border-t border-border`. Section gap: `space-y-8`. Section headings: `text-base font-semibold text-text-primary`. Form labels: `text-xs font-medium uppercase tracking-wide text-text-secondary`. All inputs/selects: `rounded-lg border border-border bg-surface-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent`. Work Experience entries are individually bordered sub-cards (`rounded-xl border border-border p-4`). Tag inputs render removable pill chips with `bg-accent-light text-accent`. Month/Year pickers use two adjacent `<select>` elements. Save Profile button is `inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:opacity-50` — not full-width, sits in a flex row alongside error/success messages. `forwardRef`-based with `useImperativeHandle` exposing `applyExtracted(data)`.

---

### SearchControls

File: components/find-jobs/SearchControls.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border`                                                                |
| Border radius    | `rounded-2xl` card, `rounded-lg` inputs and button                                   |
| Text — primary   | `text-sm text-text-primary`                                                           |
| Text — secondary | `text-xs font-medium uppercase tracking-wide text-text-secondary` labels              |
| Spacing          | `p-6` card, `gap-4` grid                                                              |
| Hover state      | `hover:opacity-90` Find Jobs button                                                   |
| Shadow           | `shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]`             |
| Accent usage     | `bg-accent text-accent-foreground` button; `focus:ring-accent` inputs; `bg-success-lightest border-success-light text-success-foreground` success banner |

**Pattern notes:**
Three-column grid at `sm:` breakpoint — job title (with search icon), location, Find Jobs button aligned to bottom. Success banner uses `✨` emoji + green pill. Button disabled when job title empty or search in progress.

---

### JobFilters

File: components/find-jobs/JobFilters.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border` on inputs and selects                                          |
| Border radius    | `rounded-lg`                                                                          |
| Text — primary   | `text-sm font-medium text-text-primary`                                               |
| Text — secondary | `text-text-muted` placeholder and chevron icons                                       |
| Spacing          | `gap-3` layout, `gap-2` dropdown row                                                  |
| Hover state      | `none`                                                                                |
| Shadow           | `none`                                                                                |
| Accent usage     | `focus:ring-accent focus:border-accent`                                               |

**Pattern notes:**
`appearance-none` on `<select>` with absolute `ChevronDown` icon overlay. Filter/sort dropdowns sit in a flex row on the right; text search stretches to fill the left. All filter/sort changes reset pagination to page 1 (handled by parent).

---

### JobsTable

File: components/find-jobs/JobsTable.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`, `hover:bg-surface-secondary` rows                                       |
| Border           | `border border-border` card, `border-b border-border` row separators                 |
| Border radius    | `rounded-2xl` card, `rounded-full` score bar, `rounded-lg` company icon box          |
| Text — primary   | `text-sm font-medium text-text-primary` company; `text-sm text-text-primary` role    |
| Text — secondary | `text-xs font-medium uppercase tracking-wide text-text-secondary` column headers; `text-sm text-text-muted` date |
| Spacing          | `px-6 py-3` headers, `px-6 py-4` cells                                               |
| Hover state      | `hover:bg-surface-secondary` on `<tr>`                                                |
| Shadow           | `shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]`             |
| Accent usage     | Score bar fill: `bg-success` (≥80), `bg-info` (60-79), `bg-warning` (<60); source badge `bg-accent-light text-accent` for Search |

**Pattern notes:**
Each cell wraps its content in `<Link href="/find-jobs/{id}">` for full-row clickability. Score bar is `h-1 w-24 bg-border-light` track with colored fill div driven by `style={{ width: \`${score}%\` }}`. Company icon uses `Building2` from lucide as a placeholder. Source badge is pill-shaped. Accepts optional `isLoading` prop — dims table with `opacity-60 transition-opacity` during server fetch and skips empty-state when loading.

---

### JobsPagination

File: components/find-jobs/JobsPagination.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface` on page number and Previous/Next buttons                                 |
| Border           | `border border-border`                                                                |
| Border radius    | `rounded-lg`                                                                          |
| Text — primary   | `text-sm font-medium text-text-primary`                                               |
| Text — secondary | `text-sm text-text-muted` "Showing X to Y of Z" label                                |
| Spacing          | `gap-1` between page buttons, `h-8 w-8` page number buttons                          |
| Hover state      | `hover:bg-surface-secondary` on Previous/Next and inactive page numbers               |
| Shadow           | `none`                                                                                |
| Accent usage     | `bg-accent text-accent-foreground` active page button                                 |

**Pattern notes:**
`getPageNumbers()` returns ellipsis items as `"..."` strings alongside page numbers. Always shows first/last page; ellipsis collapses middle range. `disabled:opacity-40` on Previous/Next at boundaries. Returns `null` when `totalCount === 0`.

---

### Job Details Page

File: app/find-jobs/[id]/page.tsx and components/job-details/*
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Page shell       | `mx-auto flex min-h-[calc(100vh-4rem)] max-w-[820px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-0` |
| Cards            | `rounded-2xl border border-border bg-surface p-6 shadow-card`; research card uses `overflow-hidden` and a `border-b border-border` header |
| Header icon      | `flex h-14 w-14 ... rounded-2xl border border-border bg-surface-secondary`; info icons use `h-10 w-10 rounded-xl` with token backgrounds |
| Text — primary   | Page title `text-2xl font-semibold leading-8 text-text-primary`; card headings `text-base font-semibold leading-6 text-text-primary`; body `whitespace-pre-line text-sm font-medium leading-6 text-text-primary` |
| Text — secondary | Section eyebrows `text-xs font-semibold uppercase leading-4 tracking-wide text-text-secondary`; labels `text-xs font-medium uppercase leading-4 tracking-wide text-text-muted` |
| Buttons          | Primary CTA `min-h-12 w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground`; secondary external link `min-h-10 rounded-lg border border-border bg-surface px-4 py-2` |
| Badges           | Match score `rounded-full bg-success-lightest px-3 py-1 text-xs font-medium text-success-foreground`; matched skills `bg-success-lightest text-success-foreground`; gap skills `bg-accent-muted text-accent` |
| Empty state      | `flex min-h-64 flex-col items-center justify-center px-6 py-14 text-center` with `h-12 w-12 rounded-2xl bg-surface-secondary` icon shell and `bg-accent-muted text-accent` helper badge |

**Pattern notes:**
Job detail pages use a narrow centered column rather than the full dashboard width. Job descriptions render the complete stored text with `whitespace-pre-line`, append any populated structured bullet sections, and show a bordered `View Full Job Post` notice when the saved Adzuna preview ends with `…` or `...`. Company research now renders a saved 9-field dossier read-only; once research exists, the generate action is hidden. Authenticated app pages pass `isAuthenticated` to `Navbar` so the top-right user icon and sign-out action match the signed-in designs.

### Company Research Dossier

File: components/job-details/CompanyResearch.tsx and components/job-details/ResearchCompanyButton.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface` outer card; `bg-surface-secondary` inner dossier panels                  |
| Border           | `border border-border` outer card and inner panels; `border-b border-border` header; `border-t border-border` sources footer |
| Border radius    | `rounded-2xl` outer card, `rounded-xl` panels, `rounded-lg` section icons and button, `rounded-full` tags |
| Text — primary   | `text-base font-semibold leading-6 text-text-primary` card heading; `text-sm font-semibold leading-5 text-text-primary` section headings; `text-sm font-medium leading-6 text-text-primary` body |
| Text — secondary | `text-xs font-medium uppercase tracking-wide text-text-muted` source label; `text-xs text-error` and `text-xs text-success` button feedback |
| Spacing          | Header `p-6`, body `p-6` with `gap-6`, inner panels `p-4`, list items `space-y-2`     |
| Hover state      | Research button `hover:opacity-90`; source links `hover:text-text-primary`            |
| Shadow           | `shadow-card` on outer card only                                                      |
| Accent usage     | Button `bg-accent text-accent-foreground`; tech tags `bg-accent-muted text-accent`; section icon shells rotate between `bg-accent-muted`, `bg-success-lightest`, and `bg-info-lightest` token backgrounds |

**Pattern notes:**
The research card preserves the Feature 12 card shell and header, then swaps between an empty state with a client action and a dense read-only dossier. The client action lives in its own component, uses plain `fetch` plus `useTransition`, and calls `router.refresh()` after the API saves research. Dossier sections should stay compact, token-driven, and source-linked; do not add a refresh action unless Feature 13 scope changes.

---

### StatsBar

File: components/dashboard/StatsBar.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border`                                                                |
| Border radius    | `rounded-2xl`                                                                         |
| Text — primary   | `text-3xl font-semibold leading-9 text-text-primary` stat value                       |
| Text — secondary | `text-sm font-medium text-text-secondary` label; `text-xs text-text-muted` sub-label  |
| Spacing          | `p-6` card, `mt-2` between value and trend row, `gap-2` trend row                    |
| Trend badge      | `rounded-sm bg-success-lightest px-2 py-0.5 text-xs font-medium text-success-darker` |
| Shadow           | `shadow-card`                                                                         |

**Pattern notes:**
Four cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). Trend badge only renders when a `trend` string is present. Badge uses `TrendingUp` lucide icon at `h-3 w-3`.

---

### RecentActivity

File: components/dashboard/RecentActivity.tsx
Last updated: 2026-06-05

| Property         | Class                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Background       | `bg-surface`                                                                          |
| Border           | `border border-border`                                                                |
| Border radius    | `rounded-2xl`                                                                         |
| Text — primary   | `text-sm font-medium leading-5 text-text-primary` activity text                       |
| Text — secondary | `text-xs text-text-muted` timestamp                                                   |
| Spacing          | `p-6` card, `mt-5 space-y-5` list, `gap-3` item row                                  |
| Shadow           | `shadow-card`                                                                         |
| Dot — job_found  | outer `h-4 w-4 rounded-full bg-success-light`, inner `h-2 w-2 rounded-full bg-success-alt` |
| Dot — researched | outer `h-4 w-4 rounded-full bg-info-light`, inner `h-2 w-2 rounded-full bg-info`     |

**Pattern notes:**
Activity dots use inline `style` with CSS variables for the exact token colors (success-light/success-alt, info-light/info) since Tailwind v4 generates classes from these tokens but the dot outer ring needs the `background` shorthand. `mt-0.5` on the dot aligns it with the first line of multi-line activity text.

---

### Analytics Charts

File: components/dashboard/AnalyticsCharts.tsx
Last updated: 2026-06-05

| Property      | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| Library       | `recharts` — `BarChart`, `AreaChart`, `ResponsiveContainer`                     |
| Chart height  | `h-55` (220px) container, `ResponsiveContainer width="100%" height="100%"`      |
| Grid lines    | `vertical={false}`, `stroke="var(--color-border)"`, `strokeDasharray="4 4"`    |
| Axis labels   | `fill: "#9CA3AF"`, `fontSize: 12`, `axisLine={false}`, `tickLine={false}`       |
| Tooltip       | `borderRadius: 8`, `border: "1px solid var(--color-border)"`, `fontSize: 12`   |
| Research bars | `fill="var(--color-info)"`, `radius={[4,4,0,0]}`, `maxBarSize={40}`             |
| Jobs area     | `stroke="var(--color-accent)"`, `strokeWidth={3}`, gradient fill id `jobsGradient` (opacity 0.2→0) |
| Match bars    | `fill="var(--color-success)"`, `radius={[4,4,0,0]}`, `maxBarSize={60}`          |
| Card shell    | `rounded-2xl border border-border bg-surface p-6 shadow-card`                  |

**Pattern notes:**
Three named exports from one file — `CompanyResearchChart`, `JobsOverTimeChart`, `MatchDistributionChart`. All are `"use client"` (recharts needs browser). Colors use CSS variable references (`var(--color-*)`) so they stay token-driven inside recharts props. Left margin is `left: -20` on all charts to trim excess YAxis whitespace. Area gradient defined in `<defs>` with id `jobsGradient`.
