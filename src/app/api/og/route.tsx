import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "next-sanity";

export const runtime = "nodejs";
export const revalidate = 3600; // cache for 1 hour

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

function blocksToText(blocks: unknown[]): string {
  if (!blocks?.length) return "";
  return (blocks as { children?: { text?: string }[] }[])
    .map((b) => b.children?.map((c) => c.text ?? "").join("") ?? "")
    .join(" ")
    .trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cls = searchParams.get("class");
  const subject = searchParams.get("subject");
  const chapter = searchParams.get("chapter");
  const q = searchParams.get("q") ?? "1";

  if (!cls || !subject || !chapter) {
    return new Response("Missing params", { status: 400 });
  }

  const data = await client.fetch(
    `*[_type == "ncertSolution" && class == $class && subject == $subject && chapter == $chapter][0]{
      chapterTitle,
      "question": questions[${parseInt(q, 10) - 1}]{ questionNumber, questionText }
    }`,
    { class: parseInt(cls, 10), subject, chapter: parseInt(chapter, 10) }
  );

  const chapterTitle = data?.chapterTitle ?? subject;
  const questionNumber = data?.question?.questionNumber ?? q;
  const questionText = blocksToText(data?.question?.questionText ?? []);
  const truncated = questionText.length > 140 ? questionText.slice(0, 137) + "…" : questionText;

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#2563eb", display: "flex" }} />

        {/* Site name */}
        <div style={{ fontSize: "18px", color: "#6b7280", letterSpacing: "0.05em", marginBottom: "auto", display: "flex" }}>
          CompetitiveShikshka
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "auto" }}>
          {/* Chapter badge */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                padding: "6px 16px",
                borderRadius: "999px",
                display: "flex",
              }}
            >
              Chapter {chapter}
            </div>
            <div
              style={{
                background: "#f1f5f9",
                color: "#475569",
                fontSize: "15px",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "999px",
                display: "flex",
              }}
            >
              Class {cls} · {subject}
            </div>
          </div>

          {/* Chapter title */}
          <div style={{ fontSize: "42px", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, display: "flex" }}>
            {chapterTitle}
          </div>

          {/* Divider */}
          <div style={{ width: "60px", height: "4px", background: "#2563eb", borderRadius: "2px", display: "flex" }} />

          {/* Question */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontSize: "14px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "8px",
                  display: "flex",
                }}
              >
                Q. {questionNumber}
              </div>
            </div>
            <div style={{ fontSize: "22px", color: "#334155", lineHeight: 1.5, display: "flex" }}>
              {truncated}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <div style={{ fontSize: "15px", color: "#94a3b8", display: "flex" }}>NCERT Solutions</div>
          <div style={{ fontSize: "15px", color: "#2563eb", fontWeight: 600, display: "flex" }}>competitiveshikshka.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );

  imageResponse.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
  return imageResponse;
}
