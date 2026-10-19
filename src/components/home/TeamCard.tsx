import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { TeamMember } from "@/types/content";

export async function TeamCard({ member }: { member: TeamMember }) {
  const t = await getTranslations("common");
  return (
    <article className="h-full rounded-xl border border-border/60 bg-surface p-5">
      {member.photo ? (
        <Image src={member.photo} alt="" width={48} height={48} unoptimized={member.photo.startsWith("http")} className="size-12 rounded-xl object-cover" />
      ) : (
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-xl bg-accent font-semibold text-accent-foreground">{member.initials}</span>
      )}
      <h3 className="mt-4 font-semibold text-accent">{member.name}</h3>
      <p className="mt-1 text-sm text-muted">{member.role}</p>
      {member.department && <p className="mt-2 text-xs leading-5 text-muted">{member.department}</p>}
      {member.classYear && <p className="mt-1 text-xs text-muted">{member.classYear}</p>}
      {member.isDemo && <p className="mt-3 text-[10px] font-medium text-muted">{t("demoLabel")}</p>}
    </article>
  );
}

