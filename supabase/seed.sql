-- Development examples only; these are not confirmed community events.
-- Stable fixture IDs make this script safe to rerun without overwriting rows.
begin;

insert into public.events (
  id, slug, event_date, status, is_demo
)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'ornek-web-atolyesi',
    '2026-11-05T14:00:00+03:00',
    'published',
    true
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'ornek-taslak-etkinlik',
    null,
    'draft',
    true
  )
on conflict (id) do nothing;

insert into public.event_translations (
  event_id, locale, title, short_description, description
)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'tr',
    'Örnek web atölyesi',
    'Birlikte küçük bir web arayüzü geliştiriyoruz.',
    'Bu kayıt geliştirme amacıyla eklenmiştir. Gerçek etkinlik duyurusu değildir.'
  ),
  (
    '00000000-0000-4000-8000-000000000001',
    'en',
    'Example web workshop',
    'We build a small web interface together.',
    'This record is development content. It is not a confirmed event.'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'tr',
    'Örnek taslak etkinlik',
    'Bu taslak ziyaretçilere görünmemeli.',
    'Taslak görünürlüğünü sınamak için oluşturulmuştur.'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'en',
    'Example draft event',
    'Visitors should not see this draft.',
    'This record tests draft visibility.'
  )
on conflict (event_id, locale) do nothing;

commit;
