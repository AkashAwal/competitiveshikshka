"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, ChevronRight,
  BookOpen, GraduationCap, ClipboardList, Users, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const slides = [
  {
    tag: "Exams",
    heading: "Your Exam, Decoded",
    subtext:
      "Syllabus, eligibility, key dates, and paper patterns — everything about JEE, NEET, NDA & CUET, all in one place.",
    cta: "Explore Exams",
    href: "/exams",
    Icon: ClipboardList,
    color: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    tagColor: "bg-amber-100 text-amber-700",
    accentBar: "bg-amber-400",
  },
  {
    tag: "Colleges",
    heading: "Find Your Dream College",
    subtext:
      "Cutoffs, fees, rankings and admission details for the top engineering and medical colleges — from IITs to AIIMS.",
    cta: "Browse Colleges",
    href: "/colleges",
    Icon: GraduationCap,
    color: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tagColor: "bg-blue-100 text-blue-700",
    accentBar: "bg-blue-400",
  },
  {
    tag: "Study Material",
    heading: "Study with the Best, for Free",
    subtext:
      "NCERT solutions, PYQs with answer keys, and curated notes for JEE, NEET, NDA & CUET — no paywall, ever.",
    cta: "Start Studying",
    href: "/ncert",
    Icon: BookOpen,
    color: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    tagColor: "bg-emerald-100 text-emerald-700",
    accentBar: "bg-emerald-400",
  },
  {
    tag: "Mentorship",
    heading: "Guided by Those Who Made It",
    subtext:
      "Personalised guidance from JEE & NEET toppers. Form-based, completely free to apply — limited spots each batch.",
    cta: "Apply for Mentorship",
    href: "/mentorship",
    Icon: Users,
    color: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    tagColor: "bg-violet-100 text-violet-700",
    accentBar: "bg-violet-400",
  },
  {
    tag: "Community",
    heading: "Your Tribe of Toppers-in-Making",
    subtext:
      "Connect with JEE, NEET, NDA & CUET aspirants on the same grind. Share strategies, hold each other accountable, rise together.",
    cta: "Join the Community",
    href: "/community",
    Icon: Sparkles,
    color: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    tagColor: "bg-rose-100 text-rose-700",
    accentBar: "bg-rose-400",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === active) return;
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 200);
    },
    [active, animating]
  );

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo]);

  useEffect(() => {
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [active, next]);

  const slide = slides[active];

  return (
    <div className={cn("relative w-full overflow-hidden transition-colors duration-500", slide.color)}>
      {/* accent bar top */}
      <div className={cn("h-1 w-full", slide.accentBar)} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-20">
        <div
          className={cn(
            "transition-opacity duration-200",
            animating ? "opacity-0" : "opacity-100"
          )}
        >
          {/* tag */}
          <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-4", slide.tagColor)}>
            {slide.tag}
          </span>

          <div className="flex items-start justify-between gap-8">
            {/* text */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {slide.heading}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                {slide.subtext}
              </p>
              <Link
                href={slide.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 group"
                )}
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* decorative icon */}
            <div className="hidden md:flex shrink-0 items-center justify-center">
              <div className={cn("flex h-36 w-36 items-center justify-center rounded-3xl", slide.iconBg)}>
                <slide.Icon className={cn("h-20 w-20", slide.iconColor)} strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-between">
          {/* dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  i === active
                    ? "w-6 h-2 bg-foreground"
                    : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                )}
              />
            ))}
          </div>

          {/* arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 hover:bg-background cursor-pointer transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 hover:bg-background cursor-pointer transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
