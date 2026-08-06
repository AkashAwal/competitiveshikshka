import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const badges = ["Verified cutoffs", "1-on-1 mentor sessions", "Real-time rank tracking"];

export function TrustSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 bg-[#eef3fe] p-10 sm:p-14">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
                <span className="text-[#1c67f6]">Trusted</span> guidance
              </h2>
              <p className="max-w-md text-lg text-muted-foreground">
                Get personalized mentorship, verified cutoffs, and a clear path to the college
                that fits your rank.
              </p>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-black text-[#1c67f6]">50k+ students</p>
                <p className="max-w-[200px] border-l-2 border-border pl-3 text-sm text-muted-foreground">
                  trust us for exam prep and college selection guidance.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-black text-[#1c67f6]">190+ colleges</p>
                <p className="max-w-[200px] border-l-2 border-border pl-3 text-sm text-muted-foreground">
                  with verified cutoffs and admission data you can rely on.
                </p>
              </div>
            </div>

            <Link
              href="/exams"
              className="flex items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-zinc-50"
            >
              Explore all exams
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src="/hero-banners/3_3.webp"
              alt="Student preparing for exams with CompetitiveShiksha"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="w-fit rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
