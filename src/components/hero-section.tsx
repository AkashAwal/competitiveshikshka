"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLS = 6;
const ROWS = 4;

const phrases: string[][] = [
  ["ACE",   "YOUR",  "NEXT",  "EXAM"  ],
  ["STUDY", "SMART", "SCORE", "HIGH"  ],
  ["FREE",  "NOTES", "PYQS",  "NCERT" ],
  ["FIND",  "YOUR",  "DREAM", "SCHOOL"],
  ["LEARN", "FREE",  "RANK",  "HIGHER"],
];

const SCRAMBLE        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!*&?";
const SCRAMBLE_COLORS = ["#fde047","#86efac","#fdba74","#d8b4fe","#93c5fd"];
const EMPTY_BG        = "#f4f4f5";

type Cell = { char: string; bg: string };

function buildGrid(words: string[]): Cell[][] {
  return words.map(word =>
    Array.from({ length: COLS }, (_, c) => ({
      char: word[c] ?? "",
      bg:   EMPTY_BG,
    }))
  );
}

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [grid, setGrid]           = useState<Cell[][]>(() => buildGrid(phrases[0]));
  const phraseIdxRef               = useRef(0);
  const transitioningRef           = useRef(false);
  const hoverIntervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  const runTransition = useCallback((nextIdx: number) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    const nextGrid = buildGrid(phrases[nextIdx]);

    const scrambleInterval = setInterval(() => {
      const lit = new Set<string>();
      while (lit.size < 2 + Math.floor(Math.random() * 2)) {
        lit.add(`${Math.floor(Math.random() * ROWS)}-${Math.floor(Math.random() * COLS)}`);
      }
      setGrid(prev =>
        prev.map((row, r) =>
          row.map((_, c) => ({
            char: SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
            bg: lit.has(`${r}-${c}`)
              ? SCRAMBLE_COLORS[Math.floor(Math.random() * SCRAMBLE_COLORS.length)]
              : EMPTY_BG,
          }))
        )
      );
    }, 50);

    const revealTimeout = setTimeout(() => {
      clearInterval(scrambleInterval);

      for (let c = 0; c < COLS; c++) {
        setTimeout(() => {
          setGrid(prev =>
            prev.map((row, r) =>
              row.map((cell, col) => (col === c ? nextGrid[r][col] : cell))
            )
          );
        }, c * 90);
      }

      setTimeout(() => {
        phraseIdxRef.current = nextIdx;
        setPhraseIdx(nextIdx);
        transitioningRef.current = false;
      }, COLS * 90 + 60);
    }, 600);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(revealTimeout);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    const t = setTimeout(
      () => runTransition((phraseIdxRef.current + 1) % phrases.length),
      4000
    );
    return () => clearTimeout(t);
  }, [phraseIdx, runTransition]);

  // Hover: scramble only the hovered tile
  const handleMouseEnter = useCallback((r: number, c: number) => {
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current);
    hoverIntervalRef.current = setInterval(() => {
      setGrid(prev =>
        prev.map((row, ri) =>
          row.map((cell, ci) =>
            ri === r && ci === c
              ? {
                  char: SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
                  bg: Math.random() < 0.25
                    ? SCRAMBLE_COLORS[Math.floor(Math.random() * SCRAMBLE_COLORS.length)]
                    : EMPTY_BG,
                }
              : cell
          )
        )
      );
    }, 80);
  }, []);

  const handleMouseLeave = useCallback((r: number, c: number) => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
    }
    const originalChar = phrases[phraseIdxRef.current][r]?.[c] ?? "";
    setGrid(prev =>
      prev.map((row, ri) =>
        row.map((cell, ci) =>
          ri === r && ci === c ? { char: originalChar, bg: EMPTY_BG } : cell
        )
      )
    );
  }, []);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-foreground">
              Everything you need to crack<br />
              <span className="text-[#2563EB]">JEE, NEET and more.</span>
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
              <Link href="/colleges" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                Browse Colleges
              </Link>
            </div>
          </div>

          {/* Right: animated phrase grid */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 68px)`,
                gridTemplateRows:    `repeat(${ROWS}, 68px)`,
              }}
            >
              {grid.map((row, r) =>
                row.map((cell, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="rounded-xl flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: cell.bg }}
                    onClick={() => runTransition((phraseIdxRef.current + 1) % phrases.length)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    onMouseLeave={() => handleMouseLeave(r, c)}
                  >
                    {cell.char && cell.bg === EMPTY_BG && (
                      <span className="text-3xl font-semibold text-black">
                        {cell.char}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
