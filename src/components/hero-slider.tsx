"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  { alt: "Slide 1", image: "/hero-banners/1_1.webp" },
  { alt: "Slide 2", image: "/hero-banners/2_2.webp" },
  { alt: "Slide 4", image: "/hero-banners/4_4.webp" },
  { alt: "Slide 5", image: "/hero-banners/5_5.webp" },
  { alt: "Slide 3", image: "/hero-banners/3_3.webp" },
];

const DURATION = 400;

export function HeroSlider() {
  const [active, setActive]   = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [dir, setDir]         = useState<1 | -1>(1);
  const animating = exiting !== null;

  const goTo = useCallback((index: number, direction: 1 | -1 = 1) => {
    if (animating || index === active) return;
    setDir(direction);
    setExiting(active);
    setActive(index);
    setTimeout(() => setExiting(null), DURATION);
  }, [active, animating]);

  const goPrev = useCallback(() => goTo((active - 1 + slides.length) % slides.length, -1), [active, goTo]);
  const goNext = useCallback(() => goTo((active + 1) % slides.length, 1), [active, goTo]);

  // Keep a stable ref so the autoplay timer doesn't restart on animating state changes
  const goNextRef = useRef(goNext);
  useEffect(() => { goNextRef.current = goNext; }, [goNext]);

  useEffect(() => {
    const t = setTimeout(() => goNextRef.current(), 3000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="relative w-full bg-white select-none">
      <style>{`
        @keyframes cs-in-right  { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes cs-in-left   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes cs-out-left  { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes cs-out-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
      `}</style>

      <div className="relative w-full aspect-[72/25] overflow-hidden">
        {/* Outgoing slide */}
        {exiting !== null && (
          <div
            className="absolute inset-0"
            style={{ animation: `${dir === 1 ? "cs-out-left" : "cs-out-right"} ${DURATION}ms ease-in-out forwards` }}
          >
            <Image src={slides[exiting].image} alt={slides[exiting].alt} fill className="object-cover" />
          </div>
        )}

        {/* Incoming slide */}
        <div
          className="absolute inset-0"
          style={animating ? { animation: `${dir === 1 ? "cs-in-right" : "cs-in-left"} ${DURATION}ms ease-in-out forwards` } : undefined}
        >
          <Image src={slides[active].image} alt={slides[active].alt} fill className="object-cover" priority />
        </div>
      </div>

      {/* prev arrow */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* next arrow */}
      <button
        onClick={goNext}
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
            onClick={() => goTo(i, i > active ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-300 cursor-pointer",
              i === active
                ? "w-6 h-2 bg-[#2563EB] shadow"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
