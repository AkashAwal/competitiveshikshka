import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog — Exam Tips, College Guides & Prep Advice",
  description:
    "Practical advice on JEE, NEET and Foundation prep, college selection, and everything else on the way to your rank — from the CompetitiveShiksha team and mentors.",
  alternates: { canonical: "/blog" },
  openGraph: { images: [{ url: "/api/og", width: 1200, height: 630 }] },
};

interface PostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  category: string | null;
  published_at: string | null;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image_url, author_name, category, published_at")
    .eq("published", true)
    .not("slug", "is", null)
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
        From the <span className="text-primary">blog</span>
      </h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Practical advice on exam prep, college selection, and everything in between — written by
        the CompetitiveShiksha team and mentors who&apos;ve been through it.
      </p>

      {!posts || posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-16 text-center">
          <p className="text-sm font-semibold text-muted-foreground">New posts are coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts as PostCard[]).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/5"
            >
              <div className="relative aspect-[16/10] w-full bg-secondary">
                {post.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-entered arbitrary URL, not worth whitelisting every domain
                  <img src={post.cover_image_url} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
                {post.category && (
                  <span className="w-fit text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    {post.category}
                  </span>
                )}
                <h2 className="font-bold text-foreground leading-snug">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-2">
                  {post.published_at && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.published_at)}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
