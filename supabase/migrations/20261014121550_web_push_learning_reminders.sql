create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null unique check (char_length(endpoint) between 1 and 4096),
  p256dh text not null check (char_length(p256dh) between 1 and 256),
  auth text not null check (char_length(auth) between 1 and 256),
  enabled boolean not null default true,
  reminder_time time not null default '20:00',
  reminder_timezone text not null default 'Asia/Tokyo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index push_subscriptions_enabled_idx
  on public.push_subscriptions (reminder_time, reminder_timezone)
  where enabled;

create trigger push_subscriptions_set_updated_at
  before update on public.push_subscriptions
  for each row execute function public.set_updated_at();

alter table public.push_subscriptions enable row level security;
revoke all on table public.push_subscriptions from anon, authenticated;
grant select, insert, update, delete on table public.push_subscriptions to authenticated;
grant select, insert, update, delete on table public.push_subscriptions to service_role;
grant select on table public.answer_records to service_role;

create policy push_subscriptions_select_own on public.push_subscriptions
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy push_subscriptions_insert_own on public.push_subscriptions
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy push_subscriptions_update_own on public.push_subscriptions
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy push_subscriptions_delete_own on public.push_subscriptions
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create table public.reminder_dispatches (
  subscription_id uuid not null references public.push_subscriptions (id) on delete cascade,
  local_date date not null,
  status text not null check (status in ('claimed', 'sent', 'skipped', 'failed')),
  updated_at timestamptz not null default now(),
  primary key (subscription_id, local_date)
);

alter table public.reminder_dispatches enable row level security;
revoke all on table public.reminder_dispatches from anon, authenticated;
grant select, insert, update, delete on table public.reminder_dispatches to service_role;

create function public.get_due_learning_reminders()
returns table (
  subscription_id uuid,
  user_id uuid,
  endpoint text,
  p256dh text,
  auth text,
  local_date date,
  studied_today boolean
)
language sql
stable
set search_path = ''
as $$
  with local_subscriptions as (
    select
      s.id,
      s.user_id,
      s.endpoint,
      s.p256dh,
      s.auth,
      s.reminder_timezone,
      s.reminder_time,
      timezone(s.reminder_timezone, statement_timestamp()) as local_now
    from public.push_subscriptions as s
    join pg_catalog.pg_timezone_names as zones
      on zones.name = s.reminder_timezone
    where s.enabled
  ), due as (
    select
      s.*,
      s.local_now::date as today
    from local_subscriptions as s
    where extract(hour from s.local_now) = extract(hour from s.reminder_time)
  )
  select
    d.id,
    d.user_id,
    d.endpoint,
    d.p256dh,
    d.auth,
    d.today,
    exists (
      select 1
      from public.answer_records as a
      where a.user_id = d.user_id
        and a.received_at >= (d.today::timestamp at time zone d.reminder_timezone)
        and a.received_at < ((d.today + 1)::timestamp at time zone d.reminder_timezone)
    )
  from due as d
  where not exists (
    select 1
    from public.reminder_dispatches as r
    where r.subscription_id = d.id
      and r.local_date = d.today
  );
$$;

revoke all on function public.get_due_learning_reminders() from public, anon, authenticated;
grant execute on function public.get_due_learning_reminders() to service_role;
