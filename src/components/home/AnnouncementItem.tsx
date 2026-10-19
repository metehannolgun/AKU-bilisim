import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/types/content";

export async function AnnouncementItem({ announcement }: { announcement: Announcement }) {
  const [t, format] = await Promise.all([getTranslations("common"), getFormatter()]);
  const hasDate = announcement.publishedAt && !Number.isNaN(Date.parse(announcement.publishedAt));

  return (
    <li>
      <Link href={`/duyurular/${announcement.slug}`} className="group flex items-start gap-3 rounded-lg py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-4">
        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent font-bold text-accent-foreground">!</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-accent group-hover:underline">{announcement.title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{announcement.summary}</p>
          {announcement.isDemo && <p className="mt-1 text-[10px] font-medium text-muted">{t("demoLabel")}</p>}
          {hasDate && <time dateTime={announcement.publishedAt!} className="mt-2 block text-xs text-muted">{format.dateTime(new Date(announcement.publishedAt!), {dateStyle: "medium"})}</time>}
        </div>
        <span aria-hidden="true" className="pt-1 text-accent">→</span>
      </Link>
    </li>
  );
}

