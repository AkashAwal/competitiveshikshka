import type { Metadata } from "next";
import { ApplyForm } from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Mentorship",
  description: "Apply for free 1-on-1 mentorship from JEE and NEET rankers — takes two minutes.",
  alternates: { canonical: "/mentorship/apply" },
};

export default function MentorshipApplyPage() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 lg:py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight text-foreground">
            Apply for <span className="text-primary">Mentorship</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Takes two minutes. We will match you with a mentor and reach out shortly after.
          </p>
        </div>

        <ApplyForm userId={null} initialName="" initialEmail="" />
      </div>
    </section>
  );
}
