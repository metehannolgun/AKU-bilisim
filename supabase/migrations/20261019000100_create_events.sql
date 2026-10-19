-- Initial schema. Already applied manually to the current Supabase project.
-- Apply once on a new database; do not rerun it against existing tables.
begin;

create type public.event_status as enum (
  'draft',
  'published',
  'completed',
  'cancelled'
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  event_date timestamptz,
  cover_image text,
  status public.event_status not null default 'draft',
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.event_translations (
  event_id uuid not null
    references public.events(id) on delete cascade,
  locale text not null check (locale in ('tr', 'en')),
  title text not null check (btrim(title) <> ''),
  short_description text not null,
  description text not null,
  location text,
  cover_image_alt text,
  primary key (event_id, locale)
);

alter table public.events enable row level security;
alter table public.event_translations enable row level security;

revoke all on public.events, public.event_translations
  from public, anon, authenticated;

grant select on public.events, public.event_translations
  to anon, authenticated;

create policy "read_public_events"
on public.events
for select
to anon, authenticated
using (status in ('published', 'completed', 'cancelled'));

create policy "read_public_event_translations"
on public.event_translations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.events as event
    where event.id = event_translations.event_id
      and event.status in ('published', 'completed', 'cancelled')
  )
);

commit;
