-- ============================================================
-- Migration: initial-schema
-- Creates all JobPilot tables, triggers, RLS, and storage bucket
-- ============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  location text,
  current_title text,
  experience_level text check (experience_level in ('junior', 'mid', 'senior', 'lead')),
  years_experience integer,
  skills text[] default '{}',
  industries text[] default '{}',
  work_experience jsonb default '[]'::jsonb,
  education jsonb default '{}'::jsonb,
  job_titles_seeking text[] default '{}',
  remote_preference text check (remote_preference in ('remote', 'onsite', 'hybrid', 'any')),
  preferred_locations text[] default '{}',
  salary_expectation text,
  cover_letter_tone text check (cover_letter_tone in ('formal', 'casual', 'enthusiastic')),
  linkedin_url text,
  portfolio_url text,
  work_authorization text check (work_authorization in ('citizen', 'permanent_resident', 'visa_required')),
  resume_pdf_url text,
  is_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Auto-insert profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at on profile change
create or replace function public.handle_profile_updated()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_profile_updated();

-- RLS: users can read/update own profile only
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- 2. agent_runs
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

create policy "agent_runs_select_own" on public.agent_runs
  for select using (auth.uid() = user_id);

create policy "agent_runs_insert_own" on public.agent_runs
  for insert with check (auth.uid() = user_id);

create policy "agent_runs_update_own" on public.agent_runs
  for update using (auth.uid() = user_id);

-- ============================================================
-- 3. jobs
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

create policy "jobs_select_own" on public.jobs
  for select using (auth.uid() = user_id);

create policy "jobs_insert_own" on public.jobs
  for insert with check (auth.uid() = user_id);

create policy "jobs_update_own" on public.jobs
  for update using (auth.uid() = user_id);

create policy "jobs_delete_own" on public.jobs
  for delete using (auth.uid() = user_id);

-- ============================================================
-- 4. agent_logs
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

create policy "agent_logs_select_own" on public.agent_logs
  for select using (auth.uid() = user_id);

create policy "agent_logs_insert_own" on public.agent_logs
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- 5. Storage: resumes bucket (created via CLI: insforge storage create-bucket resumes)
-- RLS policies on storage.objects are configured by the platform.
-- ============================================================
