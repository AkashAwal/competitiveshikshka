"use client";

import { BookOpen } from "lucide-react";

const placeholderBooks = [
  { title: "Concepts of Physics Vol. 1", author: "H.C. Verma", subject: "Physics", color: "#60a5fa" },
  { title: "Concepts of Physics Vol. 2", author: "H.C. Verma", subject: "Physics", color: "#60a5fa" },
  { title: "Organic Chemistry", author: "O.P. Tandon", subject: "Chemistry", color: "#34d399" },
  { title: "Inorganic Chemistry", author: "O.P. Tandon", subject: "Chemistry", color: "#34d399" },
  { title: "Mathematics for JEE", author: "Cengage", subject: "Maths", color: "#a78bfa" },
  { title: "Problems in Calculus", author: "I.A. Maron", subject: "Maths", color: "#a78bfa" },
  { title: "Physical Chemistry", author: "N. Avasthi", subject: "Chemistry", color: "#34d399" },
];

export function ResourcesSection() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.13)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold text-base" style={{ color: "rgba(255,255,255,0.95)" }}>
            Most Imp Digital Books for IIT-JEE
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            No need to buy bulky physical books. Get them all in one place!
          </p>
        </div>
        <button
          className="text-xs font-bold shrink-0 cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "#60a5fa" }}
        >
          VIEW ALL
        </button>
      </div>

      {/* Books grid */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {placeholderBooks.slice(0, 5).map((book, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 cursor-pointer group"
          >
            {/* Book cover */}
            <div
              className="rounded-lg flex flex-col items-center justify-center gap-1.5 transition-opacity group-hover:opacity-80 w-full"
              style={{
                aspectRatio: "3/4",
                backgroundColor: `${book.color}15`,
                border: `1px solid ${book.color}25`,
              }}
            >
              <BookOpen className="h-7 w-7" style={{ color: book.color }} />
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-2 text-center leading-tight"
                style={{ color: book.color }}
              >
                {book.subject}
              </span>
            </div>
            {/* Title */}
            <p
              className="text-[11px] leading-tight line-clamp-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {book.title}
            </p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              {book.author}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
