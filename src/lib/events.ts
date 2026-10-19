import type { CommunityEvent } from "@/types/event";

export function isPublicEvent(event: CommunityEvent): boolean {
  return (
    event.status === "published" ||
    event.status === "completed" ||
    event.status === "cancelled"
  );
}

function getEventTimestamp(event: CommunityEvent): number | null {
  if (!event.eventDate) {
    return null;
  }

  const timestamp = Date.parse(event.eventDate);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function compareMostRecent(a: CommunityEvent, b: CommunityEvent): number {
  const first = getEventTimestamp(a);
  const second = getEventTimestamp(b);

  if (first === null) {
    return second === null ? 0 : 1;
  }

  if (second === null) {
    return -1;
  }

  return second - first;
}

export function getUpcomingEvents(
  events: readonly CommunityEvent[],
  now: number,
): CommunityEvent[] {
  return events
    .filter((event) => {
      const timestamp = getEventTimestamp(event);

      return (
        event.status === "published" &&
        timestamp !== null &&
        timestamp >= now
      );
    })
    .sort(
      (a, b) =>
        (getEventTimestamp(a) ?? 0) - (getEventTimestamp(b) ?? 0),
    );
}

export type EventGroups = {
  upcoming: CommunityEvent[];
  past: CommunityEvent[];
  undated: CommunityEvent[];
  cancelled: CommunityEvent[];
};

export function groupEventsByDate(
  events: readonly CommunityEvent[],
  now: number,
): EventGroups {
  const groups: EventGroups = {
    upcoming: [],
    past: [],
    undated: [],
    cancelled: [],
  };

  for (const event of events) {
    if (!isPublicEvent(event)) {
      continue;
    }

    if (event.status === "cancelled") {
      groups.cancelled.push(event);
      continue;
    }

    const timestamp = getEventTimestamp(event);

    if (event.status === "completed") {
      groups.past.push(event);
    } else if (timestamp === null) {
      groups.undated.push(event);
    } else if (timestamp >= now) {
      groups.upcoming.push(event);
    } else {
      groups.past.push(event);
    }
  }

  groups.upcoming.sort(
    (a, b) => (getEventTimestamp(a) ?? 0) - (getEventTimestamp(b) ?? 0),
  );
  groups.past.sort(compareMostRecent);
  groups.cancelled.sort(compareMostRecent);

  return groups;
}
