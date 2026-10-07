create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  posse text check (posse is null or char_length(posse) <= 80),
  cohort text check (cohort is null or char_length(cohort) <= 40),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learning_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  phase text not null default 'ph1' check (phase in ('ph1', 'ph2')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.answer_records (
  user_id uuid not null references auth.users (id) on delete cascade,
  record_id text not null check (char_length(record_id) between 1 and 300),
  session_id text not null check (char_length(session_id) between 1 and 160),
  question_id text not null check (char_length(question_id) between 1 and 160),
  revision integer not null check (revision > 0),
  week_unit_id text not null check (char_length(week_unit_id) between 1 and 160),
  correct boolean not null,
  hint_used boolean not null default false,
  option_id text not null check (char_length(option_id) <= 2000),
  received_at timestamptz not null default now(),
  primary key (user_id, record_id),
  unique (user_id, session_id, question_id),
  check (record_id = session_id || ':' || question_id)
);

create index answer_records_user_received_idx
  on public.answer_records (user_id, received_at desc, record_id desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger learning_settings_set_updated_at
  before update on public.learning_settings
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.learning_settings enable row level security;
alter table public.answer_records enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.learning_settings from anon, authenticated;
revoke all on table public.answer_records from anon, authenticated;

grant select on table public.profiles to authenticated;
grant insert (user_id, display_name, posse, cohort)
  on table public.profiles to authenticated;
grant update (display_name, posse, cohort)
  on table public.profiles to authenticated;

grant select on table public.learning_settings to authenticated;
grant insert (user_id, phase)
  on table public.learning_settings to authenticated;
grant update (phase)
  on table public.learning_settings to authenticated;

grant select on table public.answer_records to authenticated;
grant insert (user_id, record_id, session_id, question_id, revision,
  week_unit_id, correct, hint_used, option_id)
  on table public.answer_records to authenticated;

create policy profiles_select_own on public.profiles
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy profiles_update_own on public.profiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy learning_settings_select_own on public.learning_settings
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy learning_settings_insert_own on public.learning_settings
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy learning_settings_update_own on public.learning_settings
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy answer_records_select_own on public.answer_records
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy answer_records_insert_own on public.answer_records
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
