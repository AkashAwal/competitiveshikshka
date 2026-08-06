"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Verified cutoffs & rankings",
    description:
      "Every cutoff and ranking is cross-checked against official sources for 190+ colleges, so you shortlist with real numbers instead of rumours.",
    image: "/hero-banners/1_1.webp",
    primaryLabel: "View colleges",
    primaryHref: "/colleges",
    secondaryHref: "/colleges",
  },
  {
    title: "Mentorship from toppers",
    description:
      "Get 1-on-1 guidance from students who've cracked the exam you're targeting, with study plans built around your actual strengths and gaps.",
    image: "/hero-banners/2_2.webp",
    primaryLabel: "Talk to a mentor",
    primaryHref: "/mentorship",
    secondaryHref: "/mentorship",
  },
  {
    title: "Smart rank & college predictor",
    description:
      "Run our calculators to estimate your rank and see which colleges are realistically in reach, instantly and without guesswork.",
    image: "/hero-banners/4_4.webp",
    primaryLabel: "Try calculators",
    primaryHref: "/calculators",
    secondaryHref: "/calculators",
  },
  {
    title: "Every exam, one platform",
    description:
      "From syllabus to cutoffs to placement data, track every major entrance exam in one place instead of hunting across a dozen sites.",
    image: "/hero-banners/5_5.webp",
    primaryLabel: "Explore exams",
    primaryHref: "/exams",
    secondaryHref: "/exams",
  },
];

const NAV_HEIGHT = 64;

function StepButtons({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <Link
        href={step.primaryHref}
        className="btn-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
      >
        {step.primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href={step.secondaryHref}
        className="inline-flex items-center rounded-full border border-[#1c67f6] px-6 py-3 text-sm font-bold text-[#1c67f6] transition-colors hover:bg-[#1c67f6] hover:text-white"
      >
        Read more
      </Link>
    </div>
  );
}

export function AdvantagesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = steps[active];
  const progress = (active / (steps.length - 1)) * 100;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mql = window.matchMedia("(min-width: 1024px)");
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!mql.matches) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - (window.innerHeight - NAV_HEIGHT);
      if (scrollable <= 0) return;

      const scrolled = -rect.top;
      const ratio = Math.min(Math.max(scrolled / scrollable, 0), 1);
      const index = Math.min(steps.length - 1, Math.floor(ratio * steps.length));
      setActive((prev) => (prev === index ? prev : index));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollable = wrapper.offsetHeight - (window.innerHeight - NAV_HEIGHT);
    const target =
      wrapper.offsetTop + (scrollable * index) / steps.length + 1;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile / tablet: plain stacked list — scroll-pinning doesn't translate well below lg */}
      <section className="w-full bg-white py-16 lg:hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <h2 className="mb-10 text-4xl font-black text-foreground sm:text-5xl">
            Our advantages over others:
          </h2>

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-5">
                <div className="relative w-full overflow-hidden rounded-2xl aspect-[3/2]">
                  <Image src={step.image} alt={step.title} fill className="object-cover" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c67f6] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <StepButtons step={step} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: scroll-pinned stepper */}
      <section
        ref={wrapperRef}
        className="relative hidden w-full bg-white lg:block"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div
          className="sticky flex flex-col justify-center py-12"
          style={{ top: NAV_HEIGHT, height: `calc(100vh - ${NAV_HEIGHT}px)` }}
        >
          <div className="mx-auto w-full max-w-7xl px-6">
            <h2 className="mb-10 text-4xl font-black text-foreground sm:text-5xl">
              Our advantages over others:
            </h2>

            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex gap-4">
                <div className="hidden w-6 flex-shrink-0 flex-col items-center sm:flex">
                  <span className="text-sm font-bold text-[#1c67f6]">01</span>
                  <div className="relative my-2 w-px flex-1 bg-border">
                    <div
                      className="absolute left-0 top-0 w-px bg-[#1c67f6] transition-all duration-300"
                      style={{ height: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1c67f6]">
                    {String(steps.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-2xl aspect-[3/2]">
                  {steps.map((s, i) => (
                    <Image
                      key={s.image}
                      src={s.image}
                      alt={s.title}
                      fill
                      className={cn(
                        "object-cover transition-opacity duration-300",
                        i === active ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="border-t border-border" />

                <div className="flex flex-1 flex-col gap-4 py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c67f6] text-base font-bold text-white">
                    {active + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{current.title}</h3>
                  <p className="max-w-lg text-muted-foreground">{current.description}</p>

                  <StepButtons step={current} />
                </div>

                <div className="border-t border-border" />

                <div className="mt-6 flex gap-2">
                  {steps.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => scrollToStep(i)}
                      aria-label={`Show advantage ${i + 1}: ${s.title}`}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors cursor-pointer",
                        i === active ? "bg-[#1c67f6]" : "bg-border hover:bg-[#1c67f6]/40"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
