-- ============================================================
-- Migration: jobs
-- Creates the jobs table and RLS policies
-- ============================================================

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.agent_runs(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (source in ('search', 'url')),
  source_url text,
  external_apply_url text,
  title text not null,
  company text not null,
  location text,
  salary text,
  job_type text default 'fulltime' check (job_type in ('fulltime', 'parttime', 'contract')),
  about_role text,
  responsibilities text[] default '{}',
  requirements text[] default '{}',
  nice_to_have text[] default '{}',
  benefits text[] default '{}',
  about_company text,
  match_score integer check (match_score >= 0 and match_score <= 100),
  match_reason text,
  matched_skills text[] default '{}',
  missing_skills text[] default '{}',
  company_research jsonb,
  found_at timestamptz default now()
);

alter table public.jobs enable row level security;

create policy if not exists "jobs_select_own" on public.jobs
  for select using (auth.uid() = user_id);

create policy if not exists "jobs_insert_own" on public.jobs
  for insert with check (auth.uid() = user_id);

create policy if not exists "jobs_update_own" on public.jobs
  for update using (auth.uid() = user_id);

create policy if not exists "jobs_delete_own" on public.jobs
  for delete using (auth.uid() = user_id);
