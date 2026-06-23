# Memory — Database Schema Reorganization (Feature 04)

Last updated: 2026-06-23

## What was built

**Feature 04 — Database Schema Reorganization:**

All SQL migrations and TypeScript types split into one file per table.

**SQL Migrations:**

| File | Purpose |
|------|---------|
| `migrations/20260623000001_profiles.sql` | Profiles table, auth trigger, updated_at trigger, RLS, pgcrypto extension, storage note |
| `migrations/20260623000002_agent_runs.sql` | Agent runs table + RLS |
| `migrations/20260623000003_jobs.sql` | Jobs table + RLS |
| `migrations/20260623000004_agent_logs.sql` | Agent logs table + RLS |

Original `20260622055638_initial-schema.sql` kept as-is. `20260622152255_fix-auth-trigger-raw-user-meta-data.sql` deleted — its fix (`new.profile ->> 'name'`) was baked directly into `20260623000001_profiles.sql`.

**TypeScript Types:**

| File | Exports |
|------|---------|
| `types/profile.ts` | `Profile`, `WorkExperience`, `Education` |
| `types/agent-run.ts` | `AgentRun` |
| `types/job.ts` | `Job`, `CompanyResearchDossier` |
| `types/agent-log.ts` | `AgentLog` |
| `types/missing-field.ts` | `MissingField` |
| `types/index.ts` | Re-exports all types from the above files |

## Decisions made

- Each table gets its own migration file and its own TypeScript type file — one table, one file for each
- Split migration files use `IF NOT EXISTS` and `create policy if not exists` — safe to apply against existing DB (no-ops for existing objects)
- Original `initial-schema.sql` stays as the foundational migration — no reason to delete what already ran
- `types/index.ts` re-exports via `export type { ... } from "./file"` pattern — zero impact on any future imports from `@/types`
- No types are imported in app code yet, so there was zero breakage risk
- Fix migration file deleted and its fix (`new.profile ->> 'name'`) baked directly into `profiles.sql` — each per-table migration must be self-contained and correct

## Problems solved

- Auth trigger now uses the correct `auth.users.profile` JSONB column path instead of the non-existent `raw_user_meta_data`

## Current state

- All 4 tables have standalone SQL migration files
- All 4 tables + helper types have standalone TypeScript files
- `types/index.ts` re-exports everything for convenient `@/types` imports
- Build passes with zero TypeScript errors

## Next session starts with

Wire the Analytics Charts (`AnalyticsCharts.tsx`) to real PostHog event data using `createPosthogServer()`. Then replace demo components with real event firing as each feature is implemented.

## Open questions

- (none)
