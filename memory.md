# Memory — Tailwind v4 Canonical Class Enforcement

Last updated: 2026-06-24

## What was built

**Tailwind v4 canonical class name enforcement:**

- `components/profile/ConnectedAccounts.tsx` — `flex-shrink-0` → `shrink-0` (line 27)
- `components/profile/ProfileAttentionBanner.tsx` — `flex-shrink-0` → `shrink-0` (line 33)
- `eslint.config.mjs` — installed and configured `eslint-plugin-tailwindcss` v4.0.3 with `cssConfigPath: "./app/globals.css"`. Rules enabled: `classnames-order` (warn), `enforces-shorthand` (warn), `no-custom-classname` (warn with whitelist for `landing-*`, `hover:text-accent-hover`, `**:not-[]:border-x`), `enforces-negative-arbitrary-values` (warn), `no-unnecessary-arbitrary-value` (warn), `no-contradicting-classname` (error). Ran `--fix` — 67 class order warnings auto-corrected.
- `AGENTS.md` — added rule: "Always use canonical Tailwind v4 class names — e.g. `shrink-0` not `flex-shrink-0`, `grow` not `flex-grow`, `size-4` not `h-4 w-4`. The ESLint config enforces this."

## Decisions made

- ESLint config uses recommended preset from `eslint-plugin-tailwindcss` (v4) with explicit `cssConfigPath` pointing to `app/globals.css` (Tailwind v4 CSS-first config).
- Custom classes (`landing-*`, `hover:text-accent-hover`, `**:not-[]:border-x`) whitelisted in `no-custom-classname` rule to avoid false positives.
- `landing-.*` regex pattern used (not `landing-*`) to match the plugin's regex-based whitelist engine.

## Problems solved

- `flex-shrink-0` is a Tailwind v3 class name — Tailwind v4 uses `shrink-0`. Two occurrences in the codebase fixed.
- No ESLint rule was catching deprecated v3 class names — now the `no-custom-classname` rule treats them as unknown classes and warns.
- 67 class ordering inconsistencies across the codebase auto-fixed via `--fix`.

## Current state

- Lint passes with 0 warnings, 0 errors.
- Build passes cleanly.
- Any future use of deprecated Tailwind v3 class names (like `flex-shrink-0`, `flex-grow`) or non-shorthand patterns (like `h-4 w-4` instead of `size-4`) will be flagged by ESLint.
- AGENTS.md documents the canonical class name rule.

## Next session starts with

Feature 17: Analytics Charts — wire `AnalyticsCharts.tsx` to real PostHog event data using `createPosthogServer()`.

## Open questions

- (none)
