import { Hero } from "@/components/home/Hero";
import { EventsSection } from "@/components/home/EventSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { AreasSection } from "@/components/home/AreasSection";
import { GallerySection } from "@/components/home/GallerySection";
import { AnnouncementsSection } from "@/components/home/AnnouncementsSection";
import { TeamSection } from "@/components/home/TeamSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { JoinSection } from "@/components/home/JoinSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CommunitySection />
      <EventsSection />
      <AreasSection />
      <GallerySection />
      <AnnouncementsSection />
      <TeamSection />
      <PartnersSection />
      <JoinSection />
    </>
  );
}
