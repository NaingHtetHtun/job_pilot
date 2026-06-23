-- ============================================================
-- Migration: agent_runs
-- Creates the agent_runs table and RLS policies
-- ============================================================

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'running' check (status in ('running', 'completed', 'failed')),
  job_title_searched text,
  location_searched text,
  jobs_found integer default 0,
  started_at timestamptz default now(),
  completed_at timestamptz
);

alter table public.agent_runs enable row level security;

create policy if not exists "agent_runs_select_own" on public.agent_runs
  for select using (auth.uid() = user_id);

create policy if not exists "agent_runs_insert_own" on public.agent_runs
  for insert with check (auth.uid() = user_id);

create policy if not exists "agent_runs_update_own" on public.agent_runs
  for update using (auth.uid() = user_id);
