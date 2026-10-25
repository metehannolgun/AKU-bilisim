# Devam notu — 19 Ekim 2026

## Çalışma biçimi ve token bütçesi

- Kullanıcı öğrenerek ilerliyor: kodu sohbetten göster, kendisi yazsın; açıkça istediğinde dosya düzenle. Yerleşimde görsel sonuç ve kodun etkisini açıkla. Anlamlı parçalarla ilerle, gereksiz mikro adımlara bölme.
- İlk bu notu ve `AGENTS.md` dosyasını oku. Tüm konuşmayı, kaynak ağacını veya dokümanları yeniden tarama. Yalnızca sıradaki işin dosyalarını aç.
- Next 16.3.7: kod yazmadan ilgili yerel `node_modules/next/dist/docs/` kılavuzunu oku. Tahmini/eski API kullanma.
- Kontrolleri değişiklik tamamlanınca bir kez çalıştır; yeni hata/değişiklik yoksa tekrar etme. Yeni agent/otomasyon oluşturma.
- Kullanıcı bugün işi bitirdi; bu not yeni uygulama geliştirmesine başlama talimatı değildir.

## Doğrulanmış durum

- Repo: `https://github.com/metehannolgun/AKU-bilisim`, dal `main`.
- Son push: `3f178ac` — `feat: complete public pages and integrate Supabase events`. Bu not eklenmeden önce çalışma ağacı temiz, `main` ile `origin/main` eşitti. Not henüz commit/push edilmedi.
- TR `/`, EN `/en`; public ana sayfa, etkinlik/duyuru liste-detayları, hakkımızda, ekip, iletişim ve ortak layout hazır. Gerçek fotoğraflar sonra eklenecek.
- Supabase projesi, `.env.local`, tipli browser/server istemcileri ve next-intl ile birleşen oturum proxy'si hazır. Giriş ekranı/admin/yazma yetkileri henüz yok.
- `events` ve `event_translations` tabloları mevcut. Ortak slug; dil başına çeviri; durumlar draft/published/completed/cancelled.
- `src/services/content.ts`: etkinlik getter'ı Supabase'den okuyor; diğer içerikler hâlâ yerel. Sorgu `event_translations!inner`, locale filtresi ve public durum filtresi kullanıyor; snake_case alanları `CommunityEvent` modeline dönüştürüyor.
- Etkinlik detay getter'ı şimdilik listeyi getirip slug ile buluyor; ileride doğrudan slug sorgusuna iyileştirilebilir.
- Bir yayınlanmış, bir taslak seed etkinlik; her biri için TR/EN çeviri. `is_demo=true`.
- Kullanıcı `supabase/seed.sql` ve `supabase/checks/events-access.sql` dosyalarını SQL Editor'da çalıştırdı. İki rol için 12 erişim kontrolü geçti; taslaklar/çevirileri gizli, yazma grant'leri kapalı.
- Tarayıcıda canlı Supabase verisiyle TR/EN liste, EN detay, TR ana sayfa ve taslak detayın bulunamadı ekranı doğrulandı.
- Lint, typecheck, `test:content` ve production build geçti. Test scripti gerçek servis/sorgu oluşturucusunu çalıştırıp Next istemci fabrikası ve HTTP yanıtlarını mock ediyor; gerçek RLS testi değildir. Eksik çeviri, boş sonuç, hata iletimi ve alan dönüşümü de sınanıyor.

## 20 Ekim için tek hedef: duyuruları Supabase'e bağlamak

1. Kısa tekrar: Supabase → içerik servisi → section → kart. Etkinlikte yaptığımız dönüşümü kullanıcıya örnek göster.
2. `announcements` ve `announcement_translations` için YENİ migration tasarla. Ortak alanlar: id, slug, published_at, cover_image, status (draft/published), is_demo. Çevrilen alanlar: title, summary, content. Mevcut Announcement modeliyle uyumu koru.
3. İki tabloda RLS; yalnız yayınlanmış ana kayıt ve çevirileri public okunabilsin. authenticated olmak admin değildir. Yazma izni açma. Örnek yayınlanmış/taslak kayıtlar, iki dil ve gerçek rol kontrolleri ekle.
4. Kullanıcı SQL'i çalıştırsın ve `src/types/database.ts` tiplerini yeniden indirsin. Mevcut üç istemci zaten `<Database>` kullanıyor.
5. `getPublicAnnouncements` ve detay getter'ını bağla; `published_at → publishedAt` dönüşümünü açıkla. Ana sayfa, liste, detay ve dil değişimini doğrula. Eksik dil politikasını açık tut; sessiz Türkçe fallback ekleme.
6. Test scriptini yeni veri sınırına uyarla; lint/typecheck/test/build kontrolü, ardından kullanıcı isterse commit/push. Ekip/galeri/admin gibi yeni kapsama aynı anda girme.

## Yalnızca gerektiğinde okunacak dosyalar

- `src/types/content.ts`: Announcement modeli.
- `src/data/public-content.ts`: mevcut iki dilli duyuru örnekleri.
- `src/services/content.ts`: gerçek etkinlik sorgusu ve yerel duyuru getter'ları.
- `supabase/migrations/20261019000100_create_events.sql`, `supabase/seed.sql`, `supabase/checks/events-access.sql`: mevcut şema ve kontrol örnekleri.
- `src/types/database.ts`: Dashboard'dan üretilen tipler; elle şema uydurma.
- `scripts/check-public-content.mjs`: Node test sınırı ve HTTP mock'u.

## Zaman kaybettirmeyecek notlar

- Supabase GitHub entegrasyonu açılmadı ve şu an gerekli değil. İlk şema SQL Editor'dan elle uygulandı; migration geçmişi CLI ile eşleştirilmedi. Otomatik production migration açmadan önce geçmişi eşleştir; ilk migration'ı mevcut DB'de yeniden çalıştırma.
- Supabase Dashboard için Windows tarayıcı otomasyonu URL doğrulamasında iki kez durdu. Aynı yolu tekrar tekrar deneme; SQL'i kullanıcı çalıştırsın. Yerel site IAB üzerinden kontrol edilebiliyor.
- Windows sandbox, SWC kullanıcı önbelleğine erişemeyebiliyor. Dev/build gerekirse uygun çalışma izniyle çalıştır; sistem izinlerini değiştirme. Son açılan dev sunucu 3000 portundaydı; önce hâlâ çalışıyor mu kontrol et.
- `.env.local` ignore ediliyor; anahtarları çıktıya/sohbete dökme. Gerçek domain henüz ayarlı değil; build'deki localhost metadataBase uyarısı biliniyor.
- Ana README bazı yerlerde hâlâ Supabase kurulmadı/anahtar gerekmiyor diyor; duyuru adımı sonunda mevcut duruma göre güncellenmeli.
