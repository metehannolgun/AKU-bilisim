import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/home/PhotoPlaceholder";
import { EmptyState } from "@/components/ui/EmptyState";
import { getGalleryItems } from "@/services/content";
import type { GalleryItem } from "@/types/content";
import type { Locale } from "@/i18n/routing";

function GalleryPhoto({ item, label, main = false }: { item: GalleryItem; label: string; main?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${main ? "min-h-80 md:min-h-[420px]" : "h-56 md:h-64"}`}>
      {item.imageSrc ? (
        <Image src={item.imageSrc} alt={item.imageAlt} fill sizes={main ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"} className="object-cover" unoptimized={item.imageSrc.startsWith("http")} />
      ) : (
        <PhotoPlaceholder label={label} className={main ? "min-h-80 bg-highlight/25 pb-36 md:min-h-[420px]" : "h-full"} />
      )}
    </div>
  );
}

export async function GallerySection() {
  const locale = (await getLocale()) as Locale;
  const [t, common, items] = await Promise.all([
    getTranslations("home"), getTranslations("common"), getGalleryItems(locale),
  ]);
  const [main, detail] = items;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-28 py-12 sm:py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("galleryEyebrow")}</p>
        <h2 id="gallery-title" className="mt-2 text-2xl font-bold text-accent sm:text-3xl">{t("galleryTitle")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t("galleryDescription")}</p>
        <div className="mt-6">
          {!main ? <EmptyState title={t("galleryEmpty")} description={t("galleryEmptyDescription")} /> : (
            <div className="grid gap-4 md:grid-cols-12">
              <figure className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${detail ? "md:col-span-7" : "md:col-span-12"}`}>
                <GalleryPhoto item={main} label={common("photoPending")} main />
                <figcaption className="absolute right-4 bottom-4 left-4 rounded-xl border border-border bg-surface/95 p-4">
                  {main.isDemo && <p className="mb-1 text-[10px] font-semibold text-muted">{common("demoLabel")}</p>}
                  <h3 className="font-semibold text-accent">{main.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{main.description}</p>
                </figcaption>
              </figure>
              {detail && (
                <div className="flex flex-col gap-4 md:col-span-5">
                  <figure className="flex-1 overflow-hidden rounded-2xl border border-border bg-surface">
                    <GalleryPhoto item={detail} label={common("photoPending")} />
                    <figcaption className="p-4">
                      {detail.isDemo && <p className="mb-1 text-[10px] font-semibold text-muted">{common("demoLabel")}</p>}
                      <h3 className="font-semibold text-accent">{detail.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{detail.description}</p>
                    </figcaption>
                  </figure>
                  <div className="rounded-xl bg-surface-elevated p-4">
                    <h3 className="text-sm font-semibold text-accent">{t("galleryNoteTitle")}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{t("galleryNoteDescription")}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

