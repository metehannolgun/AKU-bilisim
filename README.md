# AKÜ Bilişim Topluluğu

Afyon Kocatepe Üniversitesi Bilişim Topluluğu için geliştirilen, Türkçe ve İngilizce public site. Tasarım; krem zemin, koyu yeşil, sarı vurgu, fotoğraf odaklı bölümler ve mobil öncelikli yerleşim kullanır.

## Mevcut durum

- Ana sayfanın bütün bölümleri, ortak navbar, mobil menü ve footer mevcut.
- Etkinlik listesi ve slug üzerinden açılan detay sayfaları çalışır.
- Etkinlikler yaklaşan, geçmiş, tarihi belirlenmemiş ve iptal edilmiş gruplarına ayrılır.
- Duyuru listesi/detayı, hakkımızda, ekip ve iletişim sayfaları mevcut.
- Türkçe `/`, İngilizce `/en`; dil değişimi mevcut sayfanın yolunu korur.
- Liste, detay ve ana sayfa aynı içerik servislerini kullanır.
- Boş durum, yüklenme, hata ve bulunamayan sayfa görünümleri vardır.
- Yerelleştirilmiş metadata, Open Graph görseli, robots ve sitemap temeli hazırdır.
- Supabase projesi/bağlantısı, giriş ve admin paneli henüz kurulmadı; bunları birlikte geliştireceğiz.

Bu aşama public site uygulamasıdır. Veriler yerel örnek kayıtlardan gelir; kalıcı içerik yönetimi ve admin güvenlik kontrolleri tamamlanmadan production'a hazır kabul edilmez.

## Yerel geliştirme

Node.js 20.9 veya üzeri gerekir. Mevcut projede yeniden create-next-app çalıştırma.

```powershell
npm ci
npm run dev
```

Türkçe: http://localhost:3000

İngilizce: http://localhost:3000/en

```powershell
npm run lint
npm run typecheck
npm run test:content
npm run build
npm run start
```

`start`, başarılı bir build gerektirir. İlk build, Google fontlarını alabilmek için internet erişimi gerektirebilir. Windows SWC önbelleği, mevcut `next.config.ts` ayarıyla kullanıcı profili altındaki `.cache/aku-bilisim-swc` klasöründe tutulur; sistem izinleri değiştirilmez.

## Sayfalar

| Türkçe yol | İçerik |
| --- | --- |
| `/` | Ana sayfa |
| `/etkinlikler` | Gruplanmış etkinlik listesi |
| `/etkinlikler/[slug]` | Etkinlik detayı |
| `/duyurular` | Yayımlanmış duyurular |
| `/duyurular/[slug]` | Duyuru detayı |
| `/hakkimizda` | Topluluk ve çalışma alanları |
| `/ekibimiz` | Aktif ekip üyeleri |
| `/iletisim` | Doğrulanmış iletişim bağlantıları |

İngilizce yollar aynı segmentleri `/en` önekiyle kullanır. Örneğin `/en/etkinlikler`. Menü bağlantıları, `src/i18n/navigation.ts` üzerinden locale'i korur.

## Klasör ve veri akışı

```text
src/
  app/
    [locale]/
      layout.tsx                 # belge dili, font, provider ve metadata
      opengraph-image.tsx        # yerelleştirilmiş paylaşım görseli
      (public)/
        layout.tsx               # ortak header + main + footer
        page.tsx                 # ana sayfadaki bölümlerin sırası
        etkinlikler/[slug]/
        duyurular/[slug]/
        hakkimizda/
        ekibimiz/
        iletisim/
        not-found.tsx
        loading.tsx
        error.tsx
    robots.ts
    sitemap.ts
  components/
    home/                        # ana sayfa bölümleri
    events/                      # ortak etkinlik kartı
    announcements/               # ortak duyuru görünümü
    layout/                      # navbar, footer ve dil seçimi
    ui/                          # içerikten bağımsız ortak parçalar
  types/                         # içerik ve etkinlik modelleri
  data/                          # açıkça örnek olarak işaretlenen kayıtlar
  services/content.ts            # public içerik okuma sınırı
  lib/                           # tarih, görünürlük, gruplama, metadata
  i18n/                          # routing, navigation, request
  messages/
    tr.json / en.json            # ortak layout ve ana sayfa metinleri
    pages/tr.json / en.json      # public sayfa ve kart metinleri
    system/tr.json / en.json     # hata, yüklenme ve 404 metinleri
scripts/
  check-public-content.mjs        # veri davranışlarının regresyon kontrolü
```

```text
Yerel iki dilli kayıtlar
        ↓
services/content.ts
        ↓ yerelleştirilmiş, public görünür modeller
Sayfa ve section componentleri
        ↓
Kartlar ve ortak UI
```

Supabase aşamasında asıl değişecek katman içerik servisleridir. Sayfalar ve kartlar aynı modelleri kullanmaya devam eder. Site metinleri, faaliyet alanları, galeri, ekip ve iş birlikleri de ortak veri kaynağından okunur.

Sayfalar ve içerik bölümleri Server Component'tir. Mobil menü, dil seçimi ve hata durumunu yeniden deneme gibi etkileşim gereken küçük parçalar Client Component'tir. Salt sayfa bağlantısı göstermek `use client` gerektirmez.

## İçerik kuralları

- `isDemo`, örnek içerikleri işaretler; arayüz bunları gerçek kayıt gibi sunmaz.
- Güncel ekip, sponsor, üye sayısı, WhatsApp veya e-posta bilgisi uydurulmaz.
- Henüz gerçek fotoğraf yoktur; görsel alanları açık yer tutucular gösterir.
- Eksik tarih, konum ve görseller `null` olarak saklanır.
- Etkinlik zamanları saat dilimi içeren ISO 8601 metnidir. Gösterimde `Europe/Istanbul` kullanılır.
- `draft` etkinlikler hem listeden hem doğrudan detay erişiminden gizlenir.
- `published`, `completed` ve `cancelled` etkinlikler public okunabilir. İptaller ayrı gösterilir ve yaklaşanlar arasına girmez.
- Ana sayfa en yakın üç yayımlanmış etkinliği gösterir. Geçmiş veya tarihsiz bir kayıt otomatik olarak yayından kaldırılmaz.
- Geçmiş/yaklaşan ayrımı başlangıç zamanı üzerinden yapılır; canlı süre veya devam eden etkinlik durumu bu aşamada yoktur.
- Duyurularda yalnızca `published`, ekip ve iş birliklerinde yalnızca aktif kayıtlar görünür.
- İçerik metinleri düz metin olarak güvenli biçimde render edilir; rich-text editörü henüz yoktur.
- Örnek etkinlik/duyuru detayları arama motorlarında indekslenmez ve sitemap'e eklenmez.

## Ortam ayarları ve SEO

`.env.example` dosyasını `.env.local` olarak kopyalayabilirsin. Şu an gerçek bağlantı anahtarı gerekmiyor.

| Değişken | Kullanım |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yayınlanacak sitenin gerçek origin'i. Yerelde boş bırakılabilir. |
| `NEXT_PUBLIC_SUPABASE_URL` | Birlikte yapılacak Supabase kurulumu için ayrıldı; henüz kullanılmıyor. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Aynı kurulum için ayrıldı; henüz kullanılmıyor. |

Gerçek site adresi ayarlanmadan canonical/hreflang için alan adı uydurulmaz. Sitemap, site adresi yokken boş döner. Yayın öncesi gerçek HTTPS adresi ayarlanıp build yeniden alınmalıdır. Yeni gerçek görseller eklendiğinde Supabase Storage alan adı da Next Image yapılandırmasına açıkça eklenmelidir.

## Birlikte devam edeceğimiz aşama

1. Supabase projesi ve yerel bağlantı ayarları.
2. Migration dosyaları: etkinlik, çeviri, duyuru, ekip, galeri, faaliyet alanı, sponsor, site ayarı ve sosyal bağlantı modelleri.
3. Public okuma servislerini gerçek veritabanına bağlama ve RLS politikaları.
4. `/admin` için ayrı layout, Supabase Auth ve sunucuda admin yetki kontrolü.
5. Etkinlik/duyuru CRUD; ardından ekip, galeri, kategori, sponsor ve site içeriği yönetimi.
6. Storage yükleme kuralları, form doğrulaması ve hata akışları.
7. Gerçek verilerle güvenlik, erişilebilirlik, performans ve yayın kontrolleri.

Admin layout kontrolü tek başına yetkilendirme sağlamaz. İlgili aşamada her yazma işlemi sunucuda doğrulanacak, veritabanı ve Storage erişimi ayrıca RLS politikalarıyla korunacak. Secret/service-role anahtarları client'a veya `NEXT_PUBLIC_` değişkenlerine konmayacak.

Supabase ve admin aşamasına hazır olduğumuzda çalışma biçimi yeniden mentor moduna dönecek: birlikte adım adım geliştireceğiz.
