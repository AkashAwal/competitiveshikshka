import { HeroContent } from "@/components/hero-content";
import { LeadForm } from "@/components/lead-form";
import { AdvantagesSection } from "@/components/advantages-section";
import { TrustSection } from "@/components/trust-section";
import { HighlightsSection } from "@/components/highlights-section";
import { MentorshipSection } from "@/components/mentorship-section";
import { TracksSection } from "@/components/tracks-section";

export default function HomePage() {
  return (
    <>
      <section className="w-full bg-dot-pattern">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-6 pt-16 pb-24 lg:grid-cols-2">
          <HeroContent />
          <div className="w-full max-w-md lg:justify-self-end">
            <LeadForm />
          </div>
        </div>
      </section>
      <AdvantagesSection />
      <TrustSection />
      <HighlightsSection />
      <MentorshipSection />
      <TracksSection />
    </>
  );
}
