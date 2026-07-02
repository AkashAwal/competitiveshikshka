import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Award, Globe, Mail, Phone, Navigation, CheckCircle2,
  GraduationCap, ArrowRight, TrendingUp, Users, Trophy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "admission", label: "Admission" },
  { id: "courses", label: "Courses & Seats" },
  { id: "placements", label: "Placements" },
  { id: "reach", label: "How to Reach" },
];

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: college } = await supabase.from("colleges").select("*").eq("slug", slug).single();
  if (!college) notFound();

  const { data: courses } = await supabase
    .from("college_courses")
    .select("*")
    .eq("college_id", college.id)
    .order("name");

  const hasPlacements = college.avg_package_lpa || college.highest_package_lpa || college.placement_percentage;

  return (
    <div>
      {/* Header */}
      <section className="w-full border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-muted-foreground">{college.type}</span>
                {college.nirf_rank && (
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
                    <Award className="h-3.5 w-3.5" /> NIRF #{college.nirf_rank}
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1]">{college.name}</h1>
              <p className="flex items-center gap-1.5 mt-3 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {college.address || `${college.city ?? ""}${college.state ? `, ${college.state}` : ""}`}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-w-[220px]">
              {college.website && (
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors hover:bg-zinc-900" style={{ backgroundColor: "#2563eb" }}>
                  <Globe className="h-4 w-4" /> Visit website
                </a>
              )}
              {college.admission_email && (
                <a href={`mailto:${college.admission_email}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-foreground border border-foreground transition-colors hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb]">
                  <Mail className="h-4 w-4" /> Contact admissions
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky section nav */}
      <div className="sticky top-[64px] z-30 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-[#2563eb] whitespace-nowrap transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          {/* Edge fade hints that the tab row scrolls horizontally on narrow screens */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:hidden" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col gap-14">

        {/* Overview */}
        <section id="overview" className="scroll-mt-32">
          <h2 className="text-2xl font-black text-foreground mb-4">Overview</h2>
          {college.overview ? (
            <p className="text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">{college.overview}</p>
          ) : (
            <p className="text-sm text-zinc-400">Overview coming soon.</p>
          )}

          {college.campus_facilities && college.campus_facilities.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-foreground mb-3">Campus facilities</h3>
              <div className="flex flex-wrap gap-2">
                {college.campus_facilities.map((f: string) => (
                  <span key={f} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-[#2563eb]/5 text-muted-foreground border border-border">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb]" /> {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Admission */}
        <section id="admission" className="scroll-mt-32">
          <h2 className="text-2xl font-black text-foreground mb-4">Admission</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {college.admission_process ? (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{college.admission_process}</p>
              ) : (
                <p className="text-sm text-zinc-400">Admission process details coming soon.</p>
              )}
              {college.accepts_exams && (
                <p className="text-sm font-semibold text-muted-foreground mt-4">Accepts: <span className="text-[#2563eb]">{college.accepts_exams}</span></p>
              )}
            </div>
            <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 h-fit">
              {college.admission_email && (
                <a href={`mailto:${college.admission_email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2563eb]">
                  <Mail className="h-4 w-4 shrink-0" /> {college.admission_email}
                </a>
              )}
              {college.phone && (
                <a href={`tel:${college.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2563eb]">
                  <Phone className="h-4 w-4 shrink-0" /> {college.phone}
                </a>
              )}
              {!college.admission_email && !college.phone && (
                <p className="text-sm text-zinc-400">Contact details coming soon.</p>
              )}
            </div>
          </div>
        </section>

        {/* Courses & Seats */}
        <section id="courses" className="scroll-mt-32">
          <h2 className="text-2xl font-black text-foreground mb-4">Courses & seats</h2>
          {!courses || courses.length === 0 ? (
            <p className="text-sm text-zinc-400">Course details coming soon.</p>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-500">
                      {["Course", "Duration", "Eligibility", "Seats", "Cutoff", "Fees (LPA)"].map(h => (
                        <th key={h} className="text-left font-semibold px-4 py-3 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c.id} className="border-t border-border">
                        <td className="px-4 py-3 font-semibold text-foreground">{c.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.duration || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.eligibility || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.seats ?? "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.cutoff_general || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.fees_total_lpa ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Placements */}
        <section id="placements" className="scroll-mt-32">
          <h2 className="text-2xl font-black text-foreground mb-4">Placements{college.placement_year ? ` (${college.placement_year})` : ""}</h2>
          {hasPlacements ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { icon: TrendingUp, label: "Avg. package", value: college.avg_package_lpa ? `₹${college.avg_package_lpa} LPA` : "—" },
                { icon: Trophy, label: "Highest package", value: college.highest_package_lpa ? `₹${college.highest_package_lpa} LPA` : "—" },
                { icon: Users, label: "Students placed", value: college.placement_percentage ? `${college.placement_percentage}%` : "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2">
                  <Icon className="h-5 w-5 text-[#2563eb]" />
                  <p className="text-2xl font-black text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
              {college.top_recruiters && (
                <div className="col-span-2 md:col-span-3 rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">Top recruiters</p>
                  <p className="text-sm text-muted-foreground">{college.top_recruiters}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Placement data coming soon.</p>
          )}
        </section>

        {/* How to reach */}
        <section id="reach" className="scroll-mt-32">
          <h2 className="text-2xl font-black text-foreground mb-4">How to reach</h2>
          {college.how_to_reach ? (
            <p className="flex items-start gap-2 text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
              <Navigation className="h-4 w-4 mt-1 shrink-0 text-[#2563eb]" /> {college.how_to_reach}
            </p>
          ) : (
            <p className="text-sm text-zinc-400">Directions coming soon.</p>
          )}
        </section>
      </div>

      {/* Closing CTA */}
      <section className="w-full px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6" style={{ backgroundColor: "#2563eb" }}>
        <GraduationCap className="h-8 w-8 text-white/70" />
        <h2 className="text-4xl font-black text-white leading-tight">Not sure if this is the right fit?</h2>
        <p className="text-white/70 max-w-md text-sm leading-relaxed">
          Talk to a mentor who has been through admissions at colleges like this one — free to apply.
        </p>
        <Link
          href="/mentorship"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-colors bg-white text-[#2563eb] hover:bg-zinc-100"
        >
          Talk to a mentor <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
