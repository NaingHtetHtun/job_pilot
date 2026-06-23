-- ============================================================
-- Migration: profiles
-- Creates the profiles table, triggers, RLS policies
-- ============================================================

create extension if not exists "pgcrypto";

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
    new.profile ->> 'name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

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

create policy if not exists "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy if not exists "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy if not exists "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- Storage: resumes bucket (created via CLI)
-- insforge storage create-bucket resumes
-- RLS policies on storage.objects are configured by the platform.
-- ============================================================
