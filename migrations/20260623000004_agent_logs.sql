-- ============================================================
-- Migration: agent_logs
-- Creates the agent_logs table and RLS policies
-- ============================================================

create table if not exists public.agent_logs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.agent_runs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  level text not null default 'info' check (level in ('info', 'success', 'warning', 'error')),
  job_id uuid references public.jobs(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.agent_logs enable row level security;

create policy if not exists "agent_logs_select_own" on public.agent_logs
  for select using (auth.uid() = user_id);

create policy if not exists "agent_logs_insert_own" on public.agent_logs
  for insert with check (auth.uid() = user_id);
