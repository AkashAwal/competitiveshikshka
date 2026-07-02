"use client";

import { useEffect } from "react";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div
        className="rounded-2xl p-8 flex flex-col items-center text-center gap-3"
        style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
      >
        <p className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
          Something went wrong loading this page.
        </p>
        <p className="text-sm" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
          Please try again. If the problem persists, contact support.
        </p>
        <button
          onClick={reset}
          className="mt-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer"
          style={{ backgroundColor: "#2563eb" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
