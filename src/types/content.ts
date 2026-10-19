import type { Locale } from "@/i18n/routing";

export type LocalizedContent<T, Fields extends keyof T> = Omit<T, Fields> & {
  translations: Record<Locale, Pick<T, Fields>>;
};

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string | null;
  coverImage: string | null;
  status: "draft" | "published";
  isDemo: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string | null;
  classYear: string | null;
  photo: string | null;
  initials: string;
  order: number;
  active: boolean;
  isDemo: boolean;
};

export type ActivityArea = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tools: string[];
  order: number;
  active: boolean;
  isDemo: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string | null;
  imageAlt: string;
  order: number;
  published: boolean;
  isDemo: boolean;
};

export type Sponsor = {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  url: string | null;
  order: number;
  active: boolean;
  isDemo: boolean;
};

export type SiteContent = {
  heroTitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  joinTitle: string;
  joinDescription: string;
  membershipUrl: string | null;
  discordUrl: string | null;
};
