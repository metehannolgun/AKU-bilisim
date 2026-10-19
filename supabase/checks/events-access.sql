-- Run after seed.sql in Supabase SQL Editor with its default postgres role.
-- This script reads data and checks privileges; it does not change records.
-- A failed check raises an error instead of silently returning an empty list.
begin;

do $$
begin
  if (
    select count(*) from public.events
    where (
      id = '00000000-0000-4000-8000-000000000001'
      and status = 'published' and is_demo
    ) or (
      id = '00000000-0000-4000-8000-000000000002'
      and status = 'draft' and is_demo
    )
  ) <> 2 then
    raise exception 'Seed fixtures are missing or have been changed.';
  end if;

  if (
    select count(*) from public.event_translations
    where event_id in (
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000002'
    ) and locale in ('tr', 'en')
  ) <> 4 then
    raise exception 'Expected both translations for both seed events.';
  end if;
end;
$$;

set local role anon;

do $$
begin
  if not exists (
    select 1 from public.events
    where id = '00000000-0000-4000-8000-000000000001'
  ) then
    raise exception 'anon cannot read the published event.';
  end if;

  if exists (
    select 1 from public.events
    where id = '00000000-0000-4000-8000-000000000002'
  ) then
    raise exception 'anon can read the draft event.';
  end if;

  if (
    select count(*) from public.event_translations
    where event_id = '00000000-0000-4000-8000-000000000001'
  ) <> 2 then
    raise exception 'anon cannot read both published translations.';
  end if;

  if exists (
    select 1 from public.event_translations
    where event_id = '00000000-0000-4000-8000-000000000002'
  ) then
    raise exception 'anon can read draft translations.';
  end if;

  if has_table_privilege(
    current_user, 'public.events', 'INSERT,UPDATE,DELETE,TRUNCATE'
  ) then
    raise exception 'anon has an unexpected write grant on events.';
  end if;

  if has_table_privilege(
    current_user, 'public.event_translations', 'INSERT,UPDATE,DELETE,TRUNCATE'
  ) then
    raise exception 'anon has an unexpected write grant on translations.';
  end if;
end;
$$;

set local role authenticated;

do $$
begin
  if not exists (
    select 1 from public.events
    where id = '00000000-0000-4000-8000-000000000001'
  ) then
    raise exception 'authenticated cannot read the published event.';
  end if;

  if exists (
    select 1 from public.events
    where id = '00000000-0000-4000-8000-000000000002'
  ) then
    raise exception 'authenticated can read the draft event.';
  end if;

  if (
    select count(*) from public.event_translations
    where event_id = '00000000-0000-4000-8000-000000000001'
  ) <> 2 then
    raise exception 'authenticated cannot read both published translations.';
  end if;

  if exists (
    select 1 from public.event_translations
    where event_id = '00000000-0000-4000-8000-000000000002'
  ) then
    raise exception 'authenticated can read draft translations.';
  end if;

  if has_table_privilege(
    current_user, 'public.events', 'INSERT,UPDATE,DELETE,TRUNCATE'
  ) then
    raise exception 'authenticated has an unexpected write grant on events.';
  end if;

  if has_table_privilege(
    current_user, 'public.event_translations', 'INSERT,UPDATE,DELETE,TRUNCATE'
  ) then
    raise exception 'authenticated has an unexpected write grant on translations.';
  end if;
end;
$$;

commit;

select
  'passed' as result,
  'anon and authenticated: all 12 access checks passed' as details;
