import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface PostDetail {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  category: string | null;
  published_at: string | null;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — CompetitiveShiksha Blog`,
    description: post.excerpt?.slice(0, 155) ?? post.title,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { images: [{ url: "/api/og", width: 1200, height: 630 }] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single<PostDetail>();

  if (!post) notFound();

  const paragraphs = (post.content ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    datePublished: post.published_at ?? undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {post.category && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
              {post.category}
            </span>
          )}
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.author_name && (
              <span className="flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" /> {post.author_name}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.published_at)}
              </span>
            )}
          </div>
        </div>
      </section>

      {post.cover_image_url && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered arbitrary URL, not worth whitelisting every domain */}
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-2xl border border-border object-cover aspect-[16/9]"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 flex flex-col gap-5">
        {paragraphs.length === 0 ? (
          <p className="text-sm text-muted-foreground">This post doesn&apos;t have content yet.</p>
        ) : (
          paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {p}
            </p>
          ))
        )}
      </div>

      <section className="w-full px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6 bg-primary">
        <h2 className="text-4xl font-black text-white leading-tight">Ready to start preparing?</h2>
        <p className="text-white/70 max-w-md text-sm leading-relaxed">
          Talk to a mentor who has already cracked your exam — free to apply.
        </p>
        <Link
          href="/mentorship"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-colors bg-white text-primary hover:bg-zinc-100"
        >
          Talk to a mentor <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
