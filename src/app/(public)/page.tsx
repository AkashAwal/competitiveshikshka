import { HeroContent } from "@/components/hero-content";
import { LeadForm } from "@/components/lead-form";

export default function HomePage() {
  return (
    <section className="w-full min-h-[60vh] bg-dot-pattern">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2">
        <HeroContent />
        <div className="w-full max-w-md lg:justify-self-end">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
