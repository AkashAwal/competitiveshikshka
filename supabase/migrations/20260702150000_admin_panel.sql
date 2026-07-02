-- Admin panel: role flag, colleges, questions (PYQ + practice banks), and
-- mentorship application triage.

-- ── Admin role ──────────────────────────────────────────────────────────
alter table public.profiles add column if not exists is_admin boolean not null default false;

-- security definer so this can be called from RLS policies on other tables
-- (and on profiles itself) without recursing into profiles' own RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- Additive: does not touch/replace any existing policy on profiles.
create policy "Admins can view all profiles"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

-- ── Mentorship applications: status triage ─────────────────────────────
alter table public.mentorship_applications
  add column if not exists status text not null default 'new'
  check (status in ('new', 'contacted', 'enrolled', 'rejected'));

create policy "Admins can view mentorship applications"
  on public.mentorship_applications
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update mentorship applications"
  on public.mentorship_applications
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Colleges ────────────────────────────────────────────────────────────
create table if not exists public.colleges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('IIT', 'NIT', 'IIIT', 'GFTI', 'State', 'Private', 'Medical', 'Other')),
  city text,
  state text,
  accepts_exams text,
  nirf_rank int,
  avg_fees_lpa numeric,
  website text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.colleges enable row level security;

create policy "Anyone can view colleges"
  on public.colleges
  for select
  using (true);

create policy "Admins can insert colleges"
  on public.colleges
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update colleges"
  on public.colleges
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete colleges"
  on public.colleges
  for delete
  to authenticated
  using (public.is_admin());

-- ── Questions (PYQ + practice banks) ───────────────────────────────────
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  bank text not null check (bank in ('pyq', 'practice')),
  exam text not null,
  subject text not null,
  topic text,
  year int,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null check (correct_option in ('A', 'B', 'C', 'D')),
  explanation text,
  difficulty text not null default 'Medium' check (difficulty in ('Easy', 'Medium', 'Hard')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists questions_bank_exam_subject_idx
  on public.questions (bank, exam, subject);

alter table public.questions enable row level security;

create policy "Authenticated users can view questions"
  on public.questions
  for select
  to authenticated
  using (true);

create policy "Admins can insert questions"
  on public.questions
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update questions"
  on public.questions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete questions"
  on public.questions
  for delete
  to authenticated
  using (public.is_admin());

-- ── Make an account an admin ────────────────────────────────────────────
-- Uncomment and run once you've applied this migration:
-- update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'akash.awal.07@gmail.com');
-- update public.profiles set is_admin = true
--   where id = (select id from auth.users where email = 'ayushbinjola10@gmail.com');
