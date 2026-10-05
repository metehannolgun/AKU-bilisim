# AKÜ Bilişim Topluluğu

Topluluğun etkinliklerini, duyurularını ve çalışmalarını bir araya getirecek,
mobil öncelikli web sitesi. Kodlar ilişkili bileşenlerden oluşan paketler halinde
paylaşılıyor; kullanıcı yazarak öğreniyor, ardından birlikte inceleniyor.

## Mevcut durum

- Next.js 16.3.7 App Router, React 19, TypeScript strict ve Tailwind CSS 4 kurulu.
- next-intl ile Türkçe `/` ve İngilizce `/en`, dil seçimi ve çevrilen metadata hazır.
- Public layout, ortak navbarı ve tek `<main>` alanını yönetiyor.
- Navbarın mobil menüsü, Escape ile kapanma ve bölüm bağlantıları hazır.
- Hero, fotoğraf alanı ve iki CTA içeriyor; gerçek fotoğraf henüz eklenmedi.
- Kısa topluluk tanıtımı ve etkinliklerin boş durumu hazır.
- Krem, koyu yeşil ve sarı renk tokenları; Plus Jakarta Sans ve ortak Container kullanılıyor.
- Supabase, admin paneli, CRUD ve diğer public sayfalar henüz uygulanmadı.
- Bu aşama production'a hazır nihai ürün değildir.

## Yerel geliştirme

Kurulu Next.js rehberinin istediği minimum Node.js sürümü 20.9'dur.
Proje zaten initialize edildi; aynı klasörde tekrar create-next-app çalıştırma.

```powershell
cd C:\dev\personal\aku-bilisim
npm ci
npm run dev
```

Bağımlılıklar zaten kuruluysa doğrudan `npm run dev` yeterli.
Tarayıcıda Türkçe için http://localhost:3000, İngilizce için
http://localhost:3000/en adresini aç.

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

`start` için önce başarılı bir build gerekir. Build, next/font/google nedeniyle
ilk derlemede font sağlayıcısına erişim gerektirebilir.

Windows'ta SWC'nin varsayılan önbellek klasörü izin denetiminden geçmezse
`next.config.ts`, kullanıcı profili altındaki `.cache/aku-bilisim-swc` konumunu
kullanır. Bu ayar yalnızca Next.js işlemi için geçerlidir; Windows izinlerini
değiştirmez. Önceden tanımlanmış `SWC_NATIVE_BINDING_CACHE` değerini korur.
Plugin, önbellek yolu ayarlandıktan sonra yüklenir. SWC'nin desteklediği davranış:
https://github.com/swc-project/swc/blob/main/docs/native-addon-carriers.md

## Teknoloji kararları

| Teknoloji | Kullanım |
| --- | --- |
| Next.js App Router | Sayfalar, ortak layout, sunucuda veri okuma, metadata |
| TypeScript strict | Props, içerik modelleri ve veritabanı tipleri |
| Tailwind CSS 4 | Mobil öncelikli responsive tasarım ve tasarım tokenları |
| Supabase PostgreSQL | Kalıcı içerik ve ilişkiler; veri aşamasında bağlanacak |
| Supabase Auth / Storage | Admin oturumu ve görsel yükleme |
| Zod / React Hook Form | Sunucuda doğrulama ve etkileşimli admin formları |
| shadcn/ui / Lucide | Gerektikçe eklenecek ortak UI ve ikonlar |

Son dört satırdaki paket ve servisler henüz projeye eklenmedi. Animasyon
kütüphanesini somut ihtiyaç oluşursa değerlendireceğiz.

## Hedef mimari

Aşağıdaki yapı hedeftir; klasörleri ilgili özellik geliştirildiğinde oluşturacağız.

```text
src/
  app/
    globals.css              # ortak stiller ve tasarım tokenları
    [locale]/
      layout.tsx             # html, body, fontlar, dil ve metadata
      (public)/
        layout.tsx           # public navbar, main; footer daha sonra
        page.tsx             # Türkçe /, İngilizce /en
        etkinlikler/
          page.tsx
          [slug]/page.tsx
        duyurular/
          page.tsx
          [slug]/page.tsx
        hakkimizda/page.tsx
        ekibimiz/page.tsx
        iletisim/page.tsx
    admin/
      layout.tsx             # public siteden ayrı admin görünümü
      login/page.tsx
      (protected)/
        layout.tsx           # sunucuda admin kontrolü
        page.tsx             # dashboard
        etkinlikler/
        duyurular/
        ekip/
        galeri/
        sponsorlar/
        faaliyet-alanlari/
        site-icerikleri/
        sosyal-medya/
        ayarlar/
    sitemap.ts
    robots.ts
  components/
    home/
    layout/
    events/
    admin/
    ui/
  lib/
    supabase/                # tarayıcı / sunucu istemcileri
    auth/                    # ortak sunucu yetki kontrolü
    validations/             # Zod şemaları
    utils/
  services/                  # içerik sorguları ve yazma işlemleri
  types/                     # ortak modeller, üretilmiş DB tipleri
  config/                    # site.ts: ad, üniversite ve Instagram
  i18n/                      # routing, navigation, request
  messages/                  # tr.json, en.json
  proxy.ts                   # locale yönlendirmesi
public/
  images/                    # topluluk fotoğrafları
supabase/
  migrations/
  seed.sql
```

(public) ve (protected) route group adları URL'ye eklenmez. Ana sayfa
src/app/[locale]/(public)/page.tsx konumundadır. Galeri/projeler public sayfaları
gerçek içerik ihtiyacı oluşursa eklenecek. Admin ve içerik detayları bu yapıda
gelecek aşamaları gösterir; henüz uygulanmadı.

Sayfalar varsayılan olarak Server Component kalacak. State, olay işleyici veya
tarayıcı API'si gereken küçük bileşenler Client Component olacak. Normal bir link
göstermek tek başına use client gerektirmez.

## Geliştirme aşamaları

Her aşamada ilişkili bileşenlerin kodları ve açıklamaları birlikte paylaşılır.
Kullanıcı bunları uygular; inceleme ve doğrulama sonrasında sonraki pakete geçilir.
Doğrudan dosya değişiklikleri kullanıcının isteğiyle yapılır.

1. Hero ve tasarım temeli: Mobil tipografi, aralıklar, CTA, focus ve tokenlar.
2. Public layout: Navbar, hamburger menü, footer ve route group mantığı.
3. Etkinlik modeli: TypeScript modeli, açıkça demo etiketli veri, kart ve liste.
4. Public içerik: Etkinlik/duyuru detayları, hakkında, ekip ve iletişim;
   loading, empty ve not-found durumları.
5. Supabase: İlişkisel schema, migration, RLS, üretilmiş tipler ve sunucuda okuma.
6. Admin erişimi: Login ekranı, oturum, sunucuda admin yetkisi ve korunan layout.
7. Etkinlik CRUD: Zod, React Hook Form, Server Actions, yayın durumu ve hatalar.
8. Diğer yönetim alanları: Duyuru, ekip, sponsor, kategori, galeri ve Storage.
9. Site yönetimi: Metinler, sayılar, sosyal linkler, logo, CTA ve tema ayarları.
10. Yayın hazırlığı: Dinamik metadata, OpenGraph, sitemap, robots, takvime ekle,
    mobil/tablet/desktop, erişilebilirlik, yetki/CRUD testleri ve Vercel yayını.

## Son tasarım paketi (uygulandı)

- `globals.css`: Krem zemin, koyu yeşil ana vurgu ve sarı ikincil vurgu.
  Renkler değiştirilebilir; doğrulanmış marka renkleri değildir.
- `[locale]/layout.tsx`: Plus Jakarta Sans, belge dili ve çevrilen metadata.
- `Container`: Ortak maksimum genişlik ve mobil/masaüstü yatay boşluklar.
- `(public)/layout.tsx`: Navbar, içeriğe atlama bağlantısı ve ortak main alanı.
- `SiteHeader`: Ortak site bilgileri, bölüm bağlantıları ve dil seçimi.
- `MobileMenu`: Client Component; state, aria-expanded ve Escape ile odak dönüşü.
- `Hero`: Server Component; kendi çevirilerini okur. Başlık vurgusu t.rich ile
  biçimlenir; etkinlikler ve Instagram CTA'ları bulunur.
- `page.tsx`: Hero, topluluk tanıtımı ve etkinliklerin boş durumunu sıralar.

Fotoğrafı `public/images/community-hero.jpg` konumuna ekledikten sonra sayfada
`<Hero imageSrc="/images/community-hero.jpg" />` kullanılabilir. Fotoğraf yokken
çevrilen yer tutucu gösterilir. `imageAlt`, seçilen fotoğrafa göre düzenlenmelidir.

Son kontrolde build, lint ve typecheck geçti. 1280px masaüstü ve 375px mobil
görünümde yatay taşma bulunmadı. Mobil menü, Escape ile kapanma, TR/EN geçişi
ve locale koruyan bölüm bağlantıları tarayıcıda doğrulandı.

## Kaynaklar ve içerik doğruluğu

İnceleme tarihi: 30 Eylül 2026.

- Kullanıcının verdiği Instagram: https://www.instagram.com/akubilisimtoplulugu/
  İnceleme aracı profili okuyamadı. Logo, marka renkleri, iletişim dili ve güncel
  Instagram içerikleri doğrulanamadı.
- AKÜ resmi topluluk listesi: https://topluluklar.aku.edu.tr/index.php
  Bilişim Topluluğu kaydı ve bilişim eğitimi/etkinlikleriyle ilgili amaç bulunuyor.
- AKÜ YBS'nin 27 Kasım 2025 tarihli haberi, toplulukla birlikte yapılan
  “Yapay Zekâ Çağında Üniversite Öğrencisi Olmak” söyleşisini doğruluyor:
  https://ybs.aku.edu.tr/2025/11/27/bolum-baskanimiz-doc-dr-ozdinc-yapay-zeka-caginda-universite-ogrencisi-olmayi-anlatti/

Eski haberler güncel yönetimi veya planlanan etkinlikleri kanıtlamaz. Üye sayısı,
güncel ekip, sponsorlar, e-posta, telefon ve WhatsApp doğrulanmadan yayımlanmayacak.
Demo içerikler gerçek etkinlik/kişi gibi sunulmayacak. Bilinmeyen değerler boş veya
admin tarafından düzenlenebilir olacak; sayı bulunmaması sıfır olduğu anlamına gelmez.

## Supabase aşamasındaki kurulum

Henüz bağlantı veya SQL uygulanmadı. İlgili aşamada birlikte:

1. Supabase projesini oluşturup URL ve publishable key'i .env.local içine alacağız.
   .env.example yalnızca değişken adları ve örnek değerler içerecek.
2. events, announcements, team_members, activity_categories, sponsors,
   gallery, site_settings ve social_links migration'larını yazacağız.
   Admin yetkisi için kullanıcı tarafından değiştirilemeyen bir rol kaydı ekleyeceğiz.
3. RLS ile public okumanın published/active içerikle sınırlı olmasını sağlayacağız.
   Completed/cancelled etkinliklerin public görünürlüğünü açıkça tanımlayacağız.
4. Supabase Auth kullanıcısını oluşturup güvenilir yönetim işlemiyle admin atayacağız.
   Sadece giriş yapmış olmak içerik yönetme yetkisi vermeyecek.
5. Her Server Action'da oturum, admin yetkisi ve Zod doğrulaması uygulayacağız.
   Layout kontrolü tek başına güvenlik sınırı olmayacak.
6. Storage için bucket politikaları, boyut sınırı, izin verilen görsel türleri ve
   güvenli dosya adları tanımlayacağız.

Gizli/service role anahtarı client bundle'a veya NEXT_PUBLIC_ değişkenine konmaz.
Publishable key'in tarayıcıda bulunabilmesi RLS ihtiyacını ortadan kaldırmaz.

## Deployment aşamasında

Hedef Vercel + Supabase. Git deposu Vercel'e bağlanacak; production ortam
değişkenleri ve Supabase Auth site/redirect URL'leri gerçek domain ile ayarlanacak.
Production migration'ları, admin hesabı ve Storage politikaları yayın öncesi
kontrol edilecek. Demo veriler production'a otomatik yüklenmeyecek.

Build/lint/typecheck ve mobil testlere ek olarak admin login/logout, yetkisiz
erişim, RLS, CRUD ve upload akışları gerçek test projesinde sınanacak. Bunlar
tamamlanmadan uygulama production-ready olarak tanımlanmayacak.

Sonraki olası özellikler: etkinlik kayıt sistemi, e-posta bildirimleri, çoklu admin
rolleri, içerik değişiklik geçmişi ve proje vitrini.
