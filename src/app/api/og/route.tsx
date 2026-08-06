import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const revalidate = 3600;

function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function Frame({ eyebrow, title, meta }: { eyebrow: string; title: string; meta: string }) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        padding: "64px 72px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "#2563eb", display: "flex" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "20px", fontWeight: 800, color: "#2563eb" }}>
        CompetitiveShiksha
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "auto", marginBottom: "auto" }}>
        <div
          style={{
            alignSelf: "flex-start",
            background: "#eff6ff",
            color: "#2563eb",
            fontSize: "18px",
            fontWeight: 700,
            padding: "8px 20px",
            borderRadius: "999px",
            display: "flex",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: "52px", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, display: "flex", maxWidth: "1000px" }}>
          {title}
        </div>
        {meta && (
          <div style={{ fontSize: "24px", color: "#475569", display: "flex" }}>{meta}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "24px" }}>
        <div style={{ fontSize: "16px", color: "#94a3b8", display: "flex" }}>Colleges · Exams · Mentorship</div>
        <div style={{ fontSize: "16px", color: "#2563eb", fontWeight: 700, display: "flex" }}>competitiveshiksha.in</div>
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  let eyebrow = "College Admissions & Exam Guide";
  let title = "CompetitiveShiksha";
  let meta = "Verified colleges, entrance exams & mentorship";

  if (type === "college" && slug) {
    const supabase = publicClient();
    const { data } = await supabase
      .from("colleges")
      .select("name, city, state, type")
      .eq("slug", slug)
      .single();
    if (data) {
      eyebrow = data.type ?? "College";
      title = data.name;
      meta = [data.city, data.state].filter(Boolean).join(", ");
    }
  } else if (type === "exam" && slug) {
    const supabase = publicClient();
    const { data } = await supabase
      .from("exams")
      .select("name, full_name, category, conducting_body")
      .eq("slug", slug)
      .single();
    if (data) {
      eyebrow = `${data.category} Entrance Exam`;
      title = data.name;
      meta = data.full_name ?? data.conducting_body ?? "";
    }
  }

  const imageResponse = new ImageResponse(
    <Frame eyebrow={eyebrow} title={title} meta={meta} />,
    { width: 1200, height: 630 }
  );

  imageResponse.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
  return imageResponse;
}
