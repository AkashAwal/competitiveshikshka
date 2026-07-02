-- Richer college data: address/overview/admission/facilities/placements on
-- colleges, plus a per-college courses table (seats/cutoff/fees vary by
-- program, so they can't live flat on the college row).

alter table public.colleges rename column description to overview;

alter table public.colleges
  add column if not exists slug text unique,
  add column if not exists address text,
  add column if not exists admission_email text,
  add column if not exists phone text,
  add column if not exists how_to_reach text,
  add column if not exists campus_facilities text[],
  add column if not exists admission_process text,
  add column if not exists avg_package_lpa numeric,
  add column if not exists highest_package_lpa numeric,
  add column if not exists placement_percentage numeric,
  add column if not exists top_recruiters text,
  add column if not exists placement_year int;

create table if not exists public.college_courses (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  name text not null,
  duration text,
  eligibility text,
  seats int,
  fees_total_lpa numeric,
  fees_details text,
  cutoff_general text,
  cutoff_details text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists college_courses_college_id_idx
  on public.college_courses (college_id);

alter table public.college_courses enable row level security;

create policy "Anyone can view college courses"
  on public.college_courses
  for select
  using (true);

create policy "Admins can insert college courses"
  on public.college_courses
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update college courses"
  on public.college_courses
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete college courses"
  on public.college_courses
  for delete
  to authenticated
  using (public.is_admin());
