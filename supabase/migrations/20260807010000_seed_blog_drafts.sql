-- Draft blog posts to seed the new blog system with real, reviewable
-- content instead of launching empty. Inserted unpublished (published =
-- false) — nothing appears on the public site or homepage until an
-- admin reviews and publishes each one via /admin/blog.

insert into public.posts (slug, title, excerpt, content, author_name, category, published)
values
  (
    'how-to-read-your-rank-predictor-result',
    'How to Read Your Rank Predictor Result (Without Panicking)',
    'A rank predictor gives you a range, not a verdict — here''s how to actually use it when planning your college shortlist.',
    'A rank predictor takes your expected percentile or marks and maps it against previous years'' rank-vs-percentile trends to estimate roughly where you''ll land. It''s a projection, not a guarantee — exam difficulty, the number of test-takers, and category-wise reservation all shift the actual cutoff every year.

The number you should pay attention to isn''t the single rank figure — it''s the range around it. Look at the best-case and worst-case estimates together, and use the worst case to plan your safety options. Students who only anchor to the optimistic number are the ones who panic when counselling doesn''t go their way.

Once you have a rank range, don''t stop at "which college can I get." Cross-check it against the actual cutoff trend for the specific branch and category you''re applying under — a college''s overall cutoff and a specific branch''s cutoff can differ by thousands of ranks.

If your predicted range spans two very different tiers of colleges, that''s useful information too. It means your final rank is genuinely uncertain, and you should prepare a shortlist that covers both tiers rather than fixating on one outcome.

Most importantly: a predictor is a planning tool, not a verdict on your preparation. Use it to make counselling decisions faster and calmer, not to judge how the last year went.',
    'Team CompetitiveShiksha',
    'Exam Tips',
    false
  ),
  (
    'neet-vs-jee-how-to-decide-in-class-11',
    'NEET vs JEE: How to Decide Where to Focus in Class 11',
    'The syllabus overlap between NEET and JEE is real, but it thins out fast. Here''s a practical way to decide without wasting a year.',
    'Class 11 is when most students are asked to commit to a single competitive exam track, and the honest answer is that you don''t have to decide immediately — but you do need a plan for how long you''ll wait.

NEET and JEE share a lot of the Class 11 syllabus in Physics and Chemistry, which is exactly why many students delay the decision. The overlap is real, but it thins out fast once you get into Class 12 topics and, more importantly, once you start solving previous-year papers — NEET rewards accuracy and recall under time pressure, JEE rewards problem-solving depth and speed across trickier, multi-concept questions.

A practical way to decide: after your first full round of Physics and Chemistry chapters, take one full-length NEET-style test and one full-length JEE-style test under real time constraints. Don''t just compare your scores — compare how the two experiences felt. Which paper did you finish with time to spare? Which one did you enjoy solving, independent of the score?

If you''re still unsure by the end of Class 11, that''s not a failure — it just means you should keep Biology (for NEET) or advanced Maths (for JEE) as light maintenance subjects rather than dropping either completely, so a late switch in Class 12 doesn''t start from zero.

What you shouldn''t do is split your daily study hours evenly between both tracks all the way through Class 12. At some point — ideally by the start of Class 12 — the exam that gets 80% of your time needs to be decided, even if you keep the other one on standby.',
    'Team CompetitiveShiksha',
    'Exam Tips',
    false
  ),
  (
    'habits-of-second-attempt-toppers',
    '5 Habits of Students Who Improve the Most on Their Second Attempt',
    'The biggest rank jumps rarely come from just "studying harder." Here''s the pattern mentors see again and again.',
    'Every year, some of the biggest rank improvements come from students on their second attempt — and it''s rarely because they simply "studied harder." The pattern that shows up again and again is more specific than that.

First, they stop re-reading and start re-testing. First-attempt students often spend a lot of time reviewing notes and textbooks passively. Second-attempt students who improve the most switch almost entirely to solving previous-year papers and timed mocks, then spend more time analyzing wrong answers than solving new questions.

Second, they fix their weakest subject instead of polishing their strongest one. It''s tempting to keep practicing what you''re already good at, because it feels productive. The bigger rank jumps come from dragging a weak subject from mediocre to solid — that''s usually where the most marks are sitting unclaimed.

Third, they build an error log, not just a revision folder. Every mistake gets written down with why it happened — concept gap, calculation slip, or misread question — and that log gets revisited weekly. This turns repeated mistakes into one-time mistakes.

Fourth, they treat mock test scores as data, not as a verdict. A bad mock two months before the exam is information about what to fix, not a prediction of the final result. Students who spiral after a low mock score lose more time to demotivation than to the actual gap in knowledge.

Fifth — and this is the one mentors notice most — they ask for help earlier. Struggling alone with a concept for two weeks before asking a mentor or teacher is common on a first attempt. On a second attempt, the students who improve the most flag confusion within a day or two, because they''ve learned that time is the one resource they can''t get back.',
    'Team CompetitiveShiksha',
    'Mentorship',
    false
  )
on conflict (slug) do nothing;
