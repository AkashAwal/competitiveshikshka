-- Seed the three exams the homepage tracks section already links to.
-- Only structural facts that don't change year-to-year are filled in —
-- application windows, exam dates and recent cutoffs are left null for
-- an admin to fill in via /admin/exams once the current cycle's numbers
-- are confirmed, rather than guessing values that would go stale or be
-- wrong on day one.

insert into public.exams (slug, name, full_name, category, conducting_body, about, marking_scheme, official_link, eligible_institutes, syllabus)
values
  (
    'jee-main',
    'JEE Main',
    'Joint Entrance Examination (Main)',
    'Engineering',
    'National Testing Agency (NTA)',
    'JEE Main is the entry-level national engineering entrance exam in India, held over two sessions each year (typically January and April). It is both a standalone admission route to NITs, IIITs and GFTIs, and the qualifying exam for JEE Advanced.',
    'Multiple-choice questions: +4 for a correct answer, -1 for an incorrect answer. Numerical-value questions: +4 for a correct answer, 0 for an incorrect or unattempted answer (no negative marking on numericals).',
    'https://jeemain.nta.nic.in',
    'NITs, IIITs, GFTIs, and many state and private engineering colleges. A qualifying score is also required to sit for JEE Advanced.',
    'Physics, Chemistry and Mathematics, drawn from the NCERT Class 11 and 12 curriculum.'
  ),
  (
    'jee-advanced',
    'JEE Advanced',
    'Joint Entrance Examination (Advanced)',
    'Engineering',
    'One of the IITs, on a yearly rotation set by the Joint Admission Board (JAB)',
    'JEE Advanced is the second-stage engineering entrance exam, open only to a fixed number of top-ranking JEE Main candidates each year. Clearing it is the sole route into undergraduate programs at the IITs.',
    'Marking scheme varies by question type (single-correct, multiple-correct, numerical) and is announced each year in the official information bulletin — partial marking applies to some multiple-correct questions.',
    'https://jeeadv.ac.in',
    'All 23 Indian Institutes of Technology (IITs).',
    'Physics, Chemistry and Mathematics at a depth beyond the JEE Main syllabus, with a greater emphasis on application and multi-concept problems.'
  ),
  (
    'neet-ug',
    'NEET UG',
    'National Eligibility cum Entrance Test (Undergraduate)',
    'Medical',
    'National Testing Agency (NTA)',
    'NEET UG is India''s single national entrance exam for undergraduate medical, dental and AYUSH courses, held once a year for admission to both government and private institutes.',
    '+4 for a correct answer, -1 for an incorrect answer, 0 for an unattempted question.',
    'https://neet.nta.nic.in',
    'AIIMS, JIPMER, and all MBBS, BDS and AYUSH colleges in India that admit through a national or state counselling process.',
    'Physics, Chemistry and Biology (Botany + Zoology), drawn from the NCERT Class 11 and 12 curriculum.'
  )
on conflict (slug) do nothing;
