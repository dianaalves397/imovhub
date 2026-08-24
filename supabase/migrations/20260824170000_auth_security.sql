-- Issue #2: identity boundary. Apply through the Supabase migration workflow.
create extension if not exists pgcrypto;

create type public.account_domain as enum ('client', 'agent');
create type public.app_role as enum ('admin', 'moderator', 'support');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '' check (char_length(full_name) <= 100),
  account_domain public.account_domain not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Privileged roles live outside profiles and are intentionally not writable by users.
create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  granted_by uuid references auth.users(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.security_events (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  event_type text not null check (event_type in ('signed_in', 'signed_out', 'password_changed', 'mfa_enrolled', 'mfa_unenrolled', 'session_revoked')),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.security_events enable row level security;

create policy "profile owner can read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profile owner can update safe fields" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "role holder can read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "event owner can read" on public.security_events for select to authenticated using (user_id = auth.uid());
create policy "event owner can append allowlisted events" on public.security_events for insert to authenticated with check (user_id = auth.uid());

revoke insert, update, delete on public.user_roles from anon, authenticated;
revoke delete on public.profiles from anon, authenticated;
revoke update, delete on public.security_events from anon, authenticated;
grant select on public.user_roles to authenticated;
grant select on public.profiles to authenticated;
grant update(full_name) on public.profiles to authenticated;
grant select, insert on public.security_events to authenticated;
grant usage, select on sequence public.security_events_id_seq to authenticated;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare requested_domain public.account_domain;
begin
  requested_domain := case when new.raw_user_meta_data ->> 'account_domain' = 'agent' then 'agent'::public.account_domain else 'client'::public.account_domain end;
  insert into public.profiles (id, full_name, account_domain)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 100), requested_domain);
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- User updates are constrained to display fields. Domain changes require a later,
-- server-authorized workflow and professional verification remains in separate tables.
create or replace function public.protect_profile_privileges() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.account_domain is distinct from old.account_domain then raise exception 'account_domain cannot be changed directly'; end if;
  new.updated_at := now();
  return new;
end; $$;
create trigger protect_profile_privileges before update on public.profiles for each row execute procedure public.protect_profile_privileges();

create index security_events_user_created_idx on public.security_events (user_id, created_at desc);
