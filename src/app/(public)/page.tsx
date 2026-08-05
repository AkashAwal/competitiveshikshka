import { LeadForm } from "@/components/lead-form";

export default function HomePage() {
  return (
    <section className="w-full min-h-[60vh] bg-dot-pattern">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-24">
        <div className="w-full max-w-2xl">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
