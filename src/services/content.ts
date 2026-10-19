import { createClient } from "@/lib/supabase/server";
import {
  activityAreaRecords,
  announcementRecords,
  galleryRecords,
  siteContent,
  sponsorRecords,
  teamMemberRecords,
} from "@/data/public-content";
import type { Locale } from "@/i18n/routing";

import type {
  ActivityArea,
  Announcement,
  GalleryItem,
  SiteContent,
  Sponsor,
  TeamMember,
} from "@/types/content";
import type { CommunityEvent } from "@/types/event";

function compareAnnouncementDates(a: Announcement, b: Announcement): number {
  const first = Date.parse(a.publishedAt ?? "");
  const second = Date.parse(b.publishedAt ?? "");

  if (!Number.isFinite(first)) {
    return Number.isFinite(second) ? 1 : 0;
  }

  if (!Number.isFinite(second)) {
    return -1;
  }

  return second - first;
}

export async function getPublicEvents(
  locale: Locale,
): Promise<CommunityEvent[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      slug,
      event_date,
      cover_image,
      status,
      is_demo,
      event_translations!inner (
        title,
        short_description,
        description,
        location,
        cover_image_alt
      )
    `)
    .eq("event_translations.locale", locale)
    .in("status", ["published", "completed", "cancelled"])
    .order("event_date", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((event) => {
    const translation = event.event_translations[0];

    if (!translation) {
      throw new Error("Etkinlik çevirisi bulunamadı.");
    }

    return {
      id: event.id,
      slug: event.slug,
      title: translation.title,
      shortDescription: translation.short_description,
      description: translation.description,
      eventDate: event.event_date,
      location: translation.location,
      coverImage: event.cover_image,
      coverImageAlt: translation.cover_image_alt,
      status: event.status,
      isDemo: event.is_demo,
    };
  });
}

export async function getPublicEventBySlug(
  slug: string,
  locale: Locale,
): Promise<CommunityEvent | undefined> {
  const events = await getPublicEvents(locale);
  return events.find((event) => event.slug === slug);
}

export async function getPublicAnnouncements(
  locale: Locale,
): Promise<Announcement[]> {
  return announcementRecords
    .filter((announcement) => announcement.status === "published")
    .map(({ translations, ...announcement }) => ({
      ...announcement,
      ...translations[locale],
    }))
    .sort(compareAnnouncementDates);
}

export async function getPublicAnnouncementBySlug(
  slug: string,
  locale: Locale,
): Promise<Announcement | undefined> {
  const announcements = await getPublicAnnouncements(locale);
  return announcements.find((announcement) => announcement.slug === slug);
}

export async function getTeamMembers(locale: Locale): Promise<TeamMember[]> {
  return teamMemberRecords
    .filter((member) => member.active)
    .map(({ translations, ...member }) => ({
      ...member,
      ...translations[locale],
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getActivityAreas(locale: Locale): Promise<ActivityArea[]> {
  return activityAreaRecords
    .filter((area) => area.active)
    .map(({ translations, ...area }) => ({
      ...area,
      ...translations[locale],
      tools: [...translations[locale].tools],
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getGalleryItems(locale: Locale): Promise<GalleryItem[]> {
  return galleryRecords
    .filter((item) => item.published)
    .map(({ translations, ...item }) => ({
      ...item,
      ...translations[locale],
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getSponsors(locale: Locale): Promise<Sponsor[]> {
  return sponsorRecords
    .filter((sponsor) => sponsor.active)
    .map(({ translations, ...sponsor }) => ({
      ...sponsor,
      ...translations[locale],
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  return { ...siteContent[locale] };
}
