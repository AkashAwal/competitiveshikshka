export function subjectToSlug(subject: string): string {
  return subject.toLowerCase().replace(/\s+/g, "-");
}

export function slugToSubject(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
