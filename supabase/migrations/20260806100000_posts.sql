-- Blog: articles written by admins, shown publicly once published.
-- Content is stored as plain text (paragraphs split on blank lines and
-- rendered with whitespace-pre-line), matching the long-text fields on
-- exams/colleges rather than introducing a markdown/HTML pipeline.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  author_name text,
  category text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

alter table public.posts enable row level security;

create policy "Anyone can view published posts"
  on public.posts
  for select
  using (published = true);

create policy "Admins can insert posts"
  on public.posts
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update posts"
  on public.posts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete posts"
  on public.posts
  for delete
  to authenticated
  using (public.is_admin());
