-- Entrance exam directory: cards on the public /exams page open a detail
-- popup covering everything a student needs — marking scheme, application
-- window, syllabus, cutoffs, eligible institutes, tips.

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  full_name text,
  category text not null default 'Engineering' check (category in ('Engineering', 'Medical', 'Other')),
  conducting_body text,
  about text,
  marking_scheme text,
  application_window text,
  exam_dates text,
  official_link text,
  eligible_institutes text,
  recent_cutoffs text,
  syllabus text,
  tips_and_tricks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists exams_category_idx on public.exams (category);

alter table public.exams enable row level security;

create policy "Anyone can view exams"
  on public.exams
  for select
  using (true);

create policy "Admins can insert exams"
  on public.exams
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update exams"
  on public.exams
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete exams"
  on public.exams
  for delete
  to authenticated
  using (public.is_admin());
