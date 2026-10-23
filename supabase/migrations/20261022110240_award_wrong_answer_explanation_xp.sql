alter table public.answer_records
  add column explanation_read_at timestamptz;

grant update (explanation_read_at)
  on table public.answer_records to authenticated;

create policy answer_records_claim_wrong_explanation on public.answer_records
  for update to authenticated
  using (
    (select auth.uid()) = user_id
    and explanation_read_at is null
  )
  with check (
    (select auth.uid()) = user_id
    and explanation_read_at is not null
  );
