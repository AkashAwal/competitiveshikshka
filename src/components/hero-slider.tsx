"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const slides = [
  {
    tag: "Community",
    heading: "Your Tribe of Toppers-in-Making",
    subtext:
      "Connect with JEE, NEET, NDA & CUET aspirants on the same grind. Share strategies, hold each other accountable, rise together.",
    cta: "Join the Community",
    href: "/community",
    image: "/heroslider/community_1.webp",
    tagColor: "bg-white/20 text-white",
  },
  {
    tag: "Mentorship",
    heading: "Guided by Those Who Made It",
    subtext:
      "Personalised guidance from JEE & NEET toppers. Form-based, completely free to apply — limited spots each batch.",
    cta: "Apply for Mentorship",
    href: "/mentorship",
    image: "/heroslider/mentorship_2.webp",
    tagColor: "bg-white/20 text-white",
  },
  {
    tag: "Study Material",
    heading: "Study with the Best, for Free",
    subtext:
      "NCERT solutions, PYQs with answer keys, and curated notes for JEE, NEET, NDA & CUET — no paywall, ever.",
    cta: "Start Studying",
    href: "/ncert",
    image: "/heroslider/about material_3.webp",
    tagColor: "bg-white/20 text-white",
  },
  {
    tag: "Colleges",
    heading: "Find Your Dream College",
    subtext:
      "Cutoffs, fees, rankings and admission details for the top engineering and medical colleges — from IITs to AIIMS.",
    cta: "Browse Colleges",
    href: "/colleges",
    image: "/heroslider/about college_4.webp",
    tagColor: "bg-white/20 text-white",
  },
  {
    tag: "Exams",
    heading: "Your Exam, Decoded",
    subtext:
      "Syllabus, eligibility, key dates, and paper patterns — everything about JEE, NEET, NDA & CUET, all in one place.",
    cta: "Explore Exams",
    href: "/exams",
    image: "/heroslider/about exams_5.webp",
    tagColor: "bg-white/20 text-white",
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
    <div className="relative w-full h-[520px] md:h-[580px] overflow-hidden">
      {/* background image */}
      <Image
        key={slide.image}
        src={slide.image}
        alt={slide.heading}
        fill
        className={cn(
          "object-cover transition-opacity duration-300",
          animating ? "opacity-0" : "opacity-100"
        )}
        priority
      />

      {/* dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

      {/* content */}
      <div
        className={cn(
          "relative z-10 h-full flex flex-col justify-center",
          "mx-auto max-w-6xl px-4 sm:px-6",
          "transition-opacity duration-200",
          animating ? "opacity-0" : "opacity-100"
        )}
      >
        <span className={cn("inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 backdrop-blur-sm", slide.tagColor)}>
          {slide.tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl">
          {slide.heading}
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
          {slide.subtext}
        </p>
        <Link
          href={slide.href}
          className={cn(buttonVariants({ size: "lg" }), "w-fit gap-2 group")}
        >
          {slide.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* controls */}
      <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
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
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>

        {/* arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/25 cursor-pointer transition-colors backdrop-blur-sm text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/25 cursor-pointer transition-colors backdrop-blur-sm text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
