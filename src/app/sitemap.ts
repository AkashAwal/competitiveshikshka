import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://competitiveshiksha.in";

function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = publicClient();

  const [{ data: colleges }, { data: exams }] = await Promise.all([
    supabase.from("colleges").select("slug, updated_at").not("slug", "is", null),
    supabase.from("exams").select("slug, updated_at").not("slug", "is", null),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/colleges`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/exams`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/calculators`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/mentorship`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mentorship/apply`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const collegeRoutes: MetadataRoute.Sitemap = (colleges ?? []).map((c) => ({
    url: `${SITE_URL}/colleges/${c.slug}`,
    lastModified: c.updated_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const examRoutes: MetadataRoute.Sitemap = (exams ?? []).map((e) => ({
    url: `${SITE_URL}/exams/${e.slug}`,
    lastModified: e.updated_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...collegeRoutes, ...examRoutes];
}
