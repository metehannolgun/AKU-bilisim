export type EventStatus =
  | "draft"
  | "published"
  | "completed"
  | "cancelled";

export type CommunityEvent = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  eventDate: string | null;
  location: string | null;
  coverImage: string | null;
  coverImageAlt: string | null;
  status: EventStatus;
  isDemo: boolean;
};

