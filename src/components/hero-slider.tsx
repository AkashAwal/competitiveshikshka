"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  { alt: "Exams",         image: "/heroslider/about exams_5.webp" },
  { alt: "Colleges",      image: "/heroslider/about college_4.webp" },
  { alt: "Study Material",image: "/heroslider/about material_3.webp" },
  { alt: "Community",     image: "/heroslider/community_1.webp" },
  { alt: "Mentorship",    image: "/heroslider/mentorship_2.webp" },
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
    <div className="relative w-full bg-white select-none">
      {/* image — full width, natural height, no crop */}
      <div className={cn("transition-opacity duration-200", animating ? "opacity-0" : "opacity-100")}>
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          width={1440}
          height={600}
          className="w-full h-auto block"
          priority
        />
      </div>

      {/* prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* next arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-300 cursor-pointer",
              i === active
                ? "w-6 h-2 bg-white shadow"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
