-- ============================================================
-- Migration: fix-auth-trigger-raw-user-meta-data
-- Fixes handle_new_user() to use auth.users.profile JSONB column
-- instead of the non-existent raw_user_meta_data column.
-- ============================================================

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
