import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface PostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  published_at: string | null;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export async function BlogSection() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image_url, category, published_at")
    .eq("published", true)
    .not("slug", "is", null)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">
              From the blog
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              Practical advice on exam prep, college selection, and everything in between.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1c67f6] px-6 py-3 text-sm font-bold text-[#1c67f6] transition-colors hover:bg-[#1c67f6] hover:text-white"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {!posts || posts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-[#f5f6f8] p-16 text-center">
            <p className="text-sm font-semibold text-muted-foreground">New posts are coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(posts as PostCard[]).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/5"
              >
                <div className="relative aspect-[16/10] w-full bg-secondary">
                  {post.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element -- admin-entered arbitrary URL, not worth whitelisting every domain
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
                  {post.category && (
                    <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      {post.category}
                    </span>
                  )}
                  <h3 className="font-bold leading-snug text-foreground">{post.title}</h3>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    {post.published_at && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.published_at)}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
