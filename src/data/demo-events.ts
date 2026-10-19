import type { LocalizedContent } from "@/types/content";
import type { CommunityEvent } from "@/types/event";

type EventRecord = LocalizedContent<
  CommunityEvent,
  "title" | "shortDescription" | "description" | "location" | "coverImageAlt"
>;

// These records are development examples, not confirmed community events.
export const demoEventRecords: EventRecord[] = [
  {
    id: "demo-web",
    slug: "ornek-web-gelistirme-atolyesi",
    eventDate: "2026-11-05T14:00:00+03:00",
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Web geliştirme atölyesi",
        shortDescription:
          "Birlikte küçük bir web arayüzü geliştireceğimiz örnek bir atölye.",
        description:
          "Bu etkinlik, liste ve detay sayfalarını geliştirmek için hazırlanmış örnek içeriktir.\n\nÖrnekte küçük bir web arayüzünün tasarlanması ve birlikte geliştirilmesi ele alınır. Tarih ve konum gerçek bir etkinlik duyurusu değildir.",
        location: "Örnek atölye alanı",
        coverImageAlt: null,
      },
      en: {
        title: "Web development workshop",
        shortDescription:
          "An example workshop about building a small web interface together.",
        description:
          "This is example content used to develop the event list and detail pages.\n\nThe example explores designing and building a small web interface together. Its date and location do not represent a confirmed event.",
        location: "Example workshop venue",
        coverImageAlt: null,
      },
    },
  },
  {
    id: "demo-open-source",
    slug: "ornek-acik-kaynak-bulusmasi",
    eventDate: "2026-09-05T14:00:00+03:00",
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Açık kaynak buluşması",
        shortDescription:
          "Açık kaynak projelere katkı vermeyi konuşacağımız örnek bir buluşma.",
        description:
          "Bu buluşma gerçek bir etkinlik duyurusu değildir. Geliştirme sırasında geçmiş etkinlik görünümünü denemek için kullanılır.\n\nÖrnek içerikte bir projeyi incelemek, katkı rehberini okumak ve küçük bir değişiklik hazırlamak ele alınır.",
        location: null,
        coverImageAlt: null,
      },
      en: {
        title: "Open source meetup",
        shortDescription:
          "An example meetup about contributing to open source projects.",
        description:
          "This is not a confirmed event announcement. It is used during development to demonstrate a past event.\n\nThe example covers exploring a project, reading its contribution guide and preparing a small change.",
        location: null,
        coverImageAlt: null,
      },
    },
  },
  {
    id: "demo-hardware",
    slug: "ornek-donanim-calismasi",
    eventDate: null,
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Donanım çalışması",
        shortDescription:
          "Sensörlerle ve küçük devrelerle çalışacağımız örnek bir etkinlik.",
        description:
          "Donanım etkinliğinin detay görünümünü denemek için hazırlanmış örnek içeriktir.\n\nTarih ve konum henüz belirlenmemiş kayıtların sitede nasıl gösterileceğini görmek için kullanılır.",
        location: null,
        coverImageAlt: null,
      },
      en: {
        title: "Hardware session",
        shortDescription:
          "An example session about experimenting with sensors and small circuits.",
        description:
          "This is example content used to develop the hardware event detail view.\n\nIt demonstrates how an event appears when its date and location have not been set.",
        location: null,
        coverImageAlt: null,
      },
    },
  },
];

// Kept for learning examples that import the Turkish development data directly.
export const demoEvents: CommunityEvent[] = demoEventRecords.map(
  ({ translations, ...event }) => ({ ...event, ...translations.tr }),
);
