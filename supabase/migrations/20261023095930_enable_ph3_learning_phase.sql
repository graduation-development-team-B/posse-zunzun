-- Learning phase is a display preference, not an authorization role.
begin;
set local lock_timeout = '5s';

alter table public.learning_settings
  drop constraint if exists learning_settings_phase_check,
  add constraint learning_settings_phase_check
    check (phase in ('ph1', 'ph2', 'ph3'));

commit;
