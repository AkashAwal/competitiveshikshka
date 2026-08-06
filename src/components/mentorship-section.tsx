import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const badges = ["Verified rank holders", "1-on-1 sessions"];

const steps = [
  "Tell us your target exam and current prep level — JEE, NEET, or any other competitive exam.",
  "We match you with a verified mentor who scored a top rank in that exact exam.",
  "Get a personalized study plan, weekly check-ins, and doubt support until exam day.",
];

export function MentorshipSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src="/hero-banners/2_2.webp"
              alt="Student in a mentorship session"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="w-fit rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 bg-[#eef3fe] p-10 sm:p-14">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
                For <span className="text-[#1c67f6]">aspirants</span>
              </h2>
              <p className="max-w-md text-lg text-muted-foreground">
                Get matched with a mentor who&apos;s already cracked your exam and knows the
                path. Here&apos;s how mentorship works:
              </p>
            </div>

            <ol className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-foreground">
                  <span className="font-bold">{i + 1}.</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/mentorship/apply"
                className="btn-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
              >
                Talk to a mentor
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="/mentorship"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-zinc-50"
              >
                Meet our mentors
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
