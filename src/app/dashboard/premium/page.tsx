import { Sparkles } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Get Premium</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Unlock the full CompetitiveShiksha experience.</p>
      <div
        className="rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4"
        style={{ backgroundColor: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.2)", minHeight: "300px" }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(234,179,8,0.12)" }}
        >
          <Sparkles className="h-7 w-7" style={{ color: "#fbbf24" }} />
        </span>
        <div>
          <p className="text-lg font-black" style={{ color: "#fde68a" }}>Premium coming soon</p>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Priority mentorship, ad-free experience, and exclusive test series.
          </p>
        </div>
      </div>
    </div>
  );
}
