import type {
  ActivityArea,
  Announcement,
  GalleryItem,
  LocalizedContent,
  SiteContent,
  Sponsor,
  TeamMember,
} from "@/types/content";
import type { Locale } from "@/i18n/routing";

type AnnouncementRecord = LocalizedContent<
  Announcement,
  "title" | "summary" | "content"
>;

// All sample records are marked so the public UI can distinguish them from real content.
export const announcementRecords: AnnouncementRecord[] = [
  {
    id: "demo-announcement-groups",
    slug: "ornek-calisma-gruplari",
    publishedAt: "2026-10-15T12:00:00+03:00",
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Çalışma grupları",
        summary: "Çalışma gruplarıyla ilgili kısa açıklamanın örnek görünümü.",
        content:
          "Bu duyuru, içerik sayfalarını geliştirmek için hazırlanmış bir örnektir. Gerçek bir başvuru veya kayıt duyurusu değildir.\n\nÇalışma gruplarının kapsamı, katılım bilgileri ve bağlantıları doğrulandığında bu alana eklenebilecek.",
      },
      en: {
        title: "Study groups",
        summary: "An example preview of a short announcement about study groups.",
        content:
          "This announcement is an example used to develop the content pages. It is not an actual application or registration announcement.\n\nThe scope of the groups, participation details and links can be added here once they are confirmed.",
      },
    },
  },
  {
    id: "demo-announcement-meetup",
    slug: "ornek-topluluk-bulusmasi",
    publishedAt: "2026-10-10T12:00:00+03:00",
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Topluluk buluşması",
        summary: "Buluşmaya ilişkin bilgilerin gösterileceği örnek duyuru.",
        content:
          "Bu kayıt gerçek bir topluluk buluşması duyurusu değildir. Duyuru listesi ve detay sayfasının birlikte çalışmasını görmek için hazırlanmıştır.\n\nBir buluşma duyurusunda tarih, konum ve katılım koşulları gibi bilgiler burada paylaşılabilir.",
      },
      en: {
        title: "Community meetup",
        summary: "An example announcement showing where meetup details will appear.",
        content:
          "This record does not announce an actual community meetup. It demonstrates how the announcement list and detail pages work together.\n\nA meetup announcement can include its date, venue and participation requirements here.",
      },
    },
  },
  {
    id: "demo-announcement-projects",
    slug: "ornek-proje-paylasimlari",
    publishedAt: null,
    coverImage: null,
    status: "published",
    isDemo: true,
    translations: {
      tr: {
        title: "Proje paylaşımları",
        summary: "Birlikte geliştirilen projelerin paylaşımı için örnek içerik.",
        content:
          "Bu metin, proje paylaşımlarının duyuru sayfasında nasıl görüneceğini göstermek için hazırlanmıştır.\n\nHenüz gerçek bir proje veya başvuru bağlantısı eklenmemiştir. Doğrulanmış içerikler hazır olduğunda örnek kayıtların yerini alacak.",
      },
      en: {
        title: "Project updates",
        summary: "Example content for sharing projects developed together.",
        content:
          "This text demonstrates how project updates can appear on the announcement page.\n\nNo actual project or application link has been added. Confirmed content will replace these example records when it is available.",
      },
    },
  },
];

type TeamMemberRecord = LocalizedContent<
  TeamMember,
  "name" | "role" | "department" | "classYear" | "initials"
>;

export const teamMemberRecords: TeamMemberRecord[] = [1, 2, 3, 4].map(
  (number) => ({
    id: `demo-member-${number}`,
    photo: null,
    order: number,
    active: true,
    isDemo: true,
    translations: {
      tr: {
        name: `Örnek üye ${number}`,
        role: "Görev bilgisi eklenecek",
        department: null,
        classYear: null,
        initials: `Ö${number}`,
      },
      en: {
        name: `Example member ${number}`,
        role: "Role to be added",
        department: null,
        classYear: null,
        initials: `E${number}`,
      },
    },
  }),
);

type ActivityAreaRecord = LocalizedContent<
  ActivityArea,
  "title" | "description" | "tools"
>;

export const activityAreaRecords: ActivityAreaRecord[] = [
  {
    id: "demo-area-web",
    slug: "web-mobil",
    order: 1,
    active: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Web ve mobil geliştirme",
        description:
          "Web arayüzleri ve mobil uygulamalar üzerine birlikte çalışmak.",
        tools: ["React", "Flutter", "Node.js"],
      },
      en: {
        title: "Web and mobile development",
        description: "Working together on web interfaces and mobile apps.",
        tools: ["React", "Flutter", "Node.js"],
      },
    },
  },
  {
    id: "demo-area-ai",
    slug: "yapay-zeka-veri",
    order: 2,
    active: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Yapay zekâ ve veri",
        description:
          "Verileri incelemek ve yapay zekâ uygulamalarını keşfetmek.",
        tools: ["Python", "PyTorch", "Pandas"],
      },
      en: {
        title: "AI and data",
        description: "Exploring data and discovering AI applications.",
        tools: ["Python", "PyTorch", "Pandas"],
      },
    },
  },
  {
    id: "demo-area-embedded",
    slug: "gomulu-sistemler",
    order: 3,
    active: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Gömülü sistemler",
        description:
          "Sensörler, devreler ve donanımlarla küçük projeler geliştirmek.",
        tools: ["ESP32", "C/C++", "PCB"],
      },
      en: {
        title: "Embedded systems",
        description:
          "Building small projects with sensors, circuits and hardware.",
        tools: ["ESP32", "C/C++", "PCB"],
      },
    },
  },
  {
    id: "demo-area-games",
    slug: "oyun-gelistirme",
    order: 4,
    active: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Oyun geliştirme",
        description:
          "Oyun mekanikleri tasarlamak ve fikirleri oynanabilir hâle getirmek.",
        tools: ["Godot", "Unity", "Blender"],
      },
      en: {
        title: "Game development",
        description: "Designing game mechanics and turning ideas into play.",
        tools: ["Godot", "Unity", "Blender"],
      },
    },
  },
];

type GalleryRecord = LocalizedContent<
  GalleryItem,
  "title" | "description" | "imageAlt"
>;

export const galleryRecords: GalleryRecord[] = [
  {
    id: "demo-gallery-main",
    imageSrc: null,
    order: 1,
    published: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Topluluk anları",
        description: "Topluluk fotoğrafları daha sonra eklenecek.",
        imageAlt: "Topluluk fotoğrafı için ayrılmış alan",
      },
      en: {
        title: "Community moments",
        description: "Community photos will be added later.",
        imageAlt: "Space reserved for a community photo",
      },
    },
  },
  {
    id: "demo-gallery-detail",
    imageSrc: null,
    order: 2,
    published: true,
    isDemo: true,
    translations: {
      tr: {
        title: "Birlikte üretirken",
        description: "Atölye ve proje çalışmalarından fotoğraflar eklenecek.",
        imageAlt: "Atölye fotoğrafı için ayrılmış alan",
      },
      en: {
        title: "Creating together",
        description: "Photos from workshops and project sessions will be added.",
        imageAlt: "Space reserved for a workshop photo",
      },
    },
  },
];

type SponsorRecord = LocalizedContent<Sponsor, "name" | "description">;

export const sponsorRecords: SponsorRecord[] = [1, 2, 3, 4].map((number) => ({
  id: `demo-sponsor-${number}`,
  logo: null,
  url: null,
  order: number,
  active: true,
  isDemo: true,
  translations: {
    tr: {
      name: `Örnek kurum ${number}`,
      description: "İş birliği alanının yerleşim örneği; gerçek bir destekçi değildir.",
    },
    en: {
      name: `Example organization ${number}`,
      description: "A layout example for partnerships, not an actual sponsor.",
    },
  },
}));

export const siteContent: Record<Locale, SiteContent> = {
  tr: {
    heroTitle: "Teknolojiyi sadece takip etme. Üret.",
    heroDescription:
      "Birlikte öğrenmek, geliştirmek ve üretmek için buluşuyoruz.",
    aboutTitle: "Birlikte öğrenmek ve üretmek için bir aradayız.",
    aboutDescription:
      "AKÜ Bilişim Topluluğu olarak teknolojiye ilgi duyan öğrencileri bir araya getiriyoruz. Bilgimizi paylaşmak, yeni şeyler denemek ve birlikte projeler geliştirmek istiyoruz.",
    joinTitle:
      "Senin de masada bir yerin var. Birlikte öğrenelim, birlikte üretelim.",
    joinDescription:
      "Merak ettiğin konuları keşfetmek ve birlikte projeler geliştirmek için topluluğumuza katıl.",
    membershipUrl: null,
    discordUrl: null,
  },
  en: {
    heroTitle: "Don't just follow technology. Create it.",
    heroDescription: "We come together to learn, develop and create.",
    aboutTitle: "We are here to learn and create together.",
    aboutDescription:
      "AKÜ Computing Community brings together students interested in technology. We want to share what we know, try new things and develop projects together.",
    joinTitle:
      "There is a place for you at the table. Let's learn and create together.",
    joinDescription:
      "Join our community to explore what interests you and develop projects together.",
    membershipUrl: null,
    discordUrl: null,
  },
};
