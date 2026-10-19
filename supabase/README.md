# Etkinlik veritabanı

- `migrations/20261019000100_create_events.sql`: İlk tablo ve okuma politikaları.
- `seed.sql`: Bir yayınlanmış, bir taslak örnek etkinlik; her biri için Türkçe ve İngilizce çeviri.
- `checks/events-access.sql`: İki rol için okuma ve yazma izinlerini sınayan bağımsız SQL kontrolü.

## Mevcut Supabase projesi

İlk şema Dashboard üzerinden elle oluşturuldu. Migration dosyası aynı yapının
depodaki kaydıdır; mevcut veritabanında tekrar çalıştırılmaz. CLI ile migration
geçmişi henüz eşleştirilmedi.

SQL Editor'da varsayılan `postgres` rolüyle önce `seed.sql`, sonra
`checks/events-access.sql` çalıştırılır. Kontrol başarılıysa son sonuç
`result = passed` olur. Başarısız kontrol hata üretir; boş liste başarı sayılmaz.
Sorgu hata verip açık bir transaction bırakırsa yeni sorgudan önce `rollback;`
çalıştırılır.

Seed dosyası sabit örnek kimliklerini kullanır. Tekrar çalıştırılması mevcut
kayıtları değiştirmez. Örneklerin içeriği/durumu elle değiştirilirse kontrol
dosyası bunu bildirir; gerçek içerikler otomatik olarak üzerine yazılmaz.

## Yeni veritabanı

Sıra: migration, seed, erişim kontrolü. Seed verileri gerçek duyuru değildir;
`is_demo = true` olarak işaretlenmiştir. Site hâlâ yerel örnek veri servislerini
kullanır; Supabase sorgusuna geçiş ayrı uygulama adımıdır.

## Kontrolün kapsamı

`anon` ve `authenticated` rollerinin yayınlanmış etkinliği ve iki çevirisini
okuyabildiği, taslak etkinlik ve çevirilerini okuyamadığı doğrulanır. Her iki
tablo için INSERT/UPDATE/DELETE/TRUNCATE yetkilerinin kapalı olması da sınanır.
Bu dosya SQL Editor için hazırlanmıştır; pgTAP veya Supabase CLI kurulumu
gerektirmez. Admin yetkileri ileride ayrıca tanımlanacaktır.
