
-- National Institute of Technology Meghalaya
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Meghalaya', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Sohra (Cherrapunji)', 'Meghalaya', 'https://www.nitm.ac.in', 'National Institute of Technology Meghalaya, Saitsohpen, Sohra, East Khasi Hills District, Meghalaya - 793108, India',
  'registrar@nitm.ac.in', '0364-2501294', 'NIT Meghalaya is one of the 10 new NITs established in 2010 under the NIT Act 2007, as an Institute of National Importance fully funded by India''s Ministry of Education. It is located on a hill campus at Sohra (Cherrapunji) in the East Khasi Hills district. As a younger NIT, it has a compact but growing campus and infrastructure, with Computer Science and Engineering as its most sought-after and best-placed branch.', array['Student hostels','Health centre','Canteen','Student Activity Center (SAC)','Central Library','Transport services'], 'Admission to B.Tech is purely rank-based: candidates must qualify JEE Main and register for JoSAA counselling, where seats are allotted by All-India Rank, category, and state quota across rounds.',
  'JEE Main', 83, 6, 10.1, 51.03,
  null, null, 2025, 'nit-meghalaya'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-meghalaya') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, 'AIR ~19623 (General, 2025, round 1)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 2023, 72)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 2024, 68)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 2025, 83)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-meghalaya');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'How can I get admission to NIT Meghalaya''s B.Tech program?', 'Admission is through JEE Main followed by JoSAA counselling; there is no separate NIT Meghalaya entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'What is the minimum Class XII eligibility?', 'Candidates generally need 75% aggregate in Class XII (65% for SC/ST/PwD) with Physics, Chemistry and Mathematics, or rank in the top 20 percentile of their board.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'Which B.Tech branch is considered the best at NIT Meghalaya?', 'Computer Science and Engineering has the strongest placement record and highest closing rank.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-meghalaya'), 'Is NIT Meghalaya an Institute of National Importance?', 'Yes — it is a centrally-funded technical institute established under the NIT Act, 2007.', 3);

-- National Institute of Technology Mizoram
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Mizoram', 'IIT', 'Engineering', 'Government', null, 'Aizawl', 'Mizoram', 'https://www.nitmz.ac.in', 'National Institute of Technology Mizoram, Chaltlang, Aizawl - 796012, Mizoram, India',
  'registrar@nitmz.ac.in', '0389-2391236', 'NIT Mizoram was established in 2010 as an Institute of National Importance under the Ministry of Education, Government of India. It currently enrolls roughly 850 students across engineering, sciences, humanities and social sciences, spread over 11 departments. As one of the newer NITs formed in the North-East, its campus and programs are still expanding.', array['Hostels','Health facility','Transportation','Library','NCC/NSS student activities'], 'B.Tech admission is via JEE Main followed by JoSAA counselling; seats are allotted by All-India Rank, category and quota.',
  'JEE Main', null, 6.1, 8.4, 35,
  93.1, 'Adobe, Deloitte, L&T, TCS, Indian Oil Corporation, Microsoft', 2025, 'nit-mizoram'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-mizoram') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 36, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', 36, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 36, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-mizoram');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'How do I apply for B.Tech at NIT Mizoram?', 'Through JEE Main and the JoSAA centralized counselling process — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'Where is NIT Mizoram located?', 'At Chaltlang, Aizawl, Mizoram, in North-East India.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'When was NIT Mizoram established?', 'In 2010, as an Institute of National Importance under the Ministry of Education.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-mizoram'), 'Does NIT Mizoram offer M.Tech and PhD programs?', 'Yes — M.Tech admission is via CCMT/GATE and Institute mode, and PhD admissions run through the institute''s own annual notification.', 3);

-- National Institute of Technology Nagaland
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Nagaland', 'IIT', 'Engineering', 'Government', null, 'Chumukedima, Dimapur', 'Nagaland', 'https://www.nitnagaland.ac.in', 'National Institute of Technology Nagaland, Chumukedima, Dimapur, Nagaland - 797103, India',
  'tnpcell@nitnagaland.ac.in', '03862-282748', 'NIT Nagaland was established in 2009 (began academic operations in 2010) as one of ten new NITs approved under India''s 11th Five-Year Plan. It moved to its permanent 291-acre campus in Chumukedima, near Dimapur, in 2012. As one of the youngest NITs, it is still developing its infrastructure and placement ecosystem.', array['Library','Data centre','Sports centre','Hostels','Medical services','Banking facility'], 'B.Tech admission is through JEE Main and JoSAA counselling, with seats allotted by All-India Rank, category and state quota.',
  'JEE Main', null, 6, null, null,
  null, 'Deloitte, Infosys', null, 'nit-nagaland'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-nagaland') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Electronics and Instrumentation Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, 'AIR ~32717-39594 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'B.Tech Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-nagaland');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'How do I get admission to NIT Nagaland''s B.Tech program?', 'Through JEE Main followed by JoSAA counselling; there is no separate institute entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'When was NIT Nagaland established?', 'Approved in 2009, it began operations in 2010 and moved to its permanent Chumukedima campus in 2012.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'How large is the NIT Nagaland campus?', 'The permanent campus at Chumukedima spans approximately 291 acres of hilly terrain.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-nagaland'), 'What B.Tech branches does NIT Nagaland offer?', 'CSE, ECE, EEE, Mechanical, Civil, and Electronics & Instrumentation Engineering.', 3);

-- National Institute of Technology Patna
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Patna', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Patna', 'Bihar', 'https://www.nitp.ac.in', 'National Institute of Technology Patna, Ashok Rajpath, Mahendru, Patna, Bihar - 800005, India',
  'info@nitp.ac.in', '0612-2371715', 'NIT Patna traces its roots to 1886 as the Bihar College of Engineering, making it one of the oldest engineering institutions in India; it was later declared the 18th National Institute of Technology by the Ministry of Education. It offers 10 undergraduate programs across 11 departments. Its long history and central Patna location give it a stronger legacy reputation and more developed placement ecosystem than most North-East NITs.', array['Computer Centre','Health Centre','Sports facilities','Library','Bank branch','Incubation Centre','Hostels','Mess facilities'], 'B.Tech admission is via JEE Main followed by JoSAA counselling, with seats allotted by All-India Rank, category, and home-state/other-state quota across rounds.',
  'JEE Main', 53, 6.1, 9.9, 41.37,
  null, 'Microsoft, Amazon, Google, Adobe, Oracle, Goldman Sachs, Deloitte, Infosys', 2025, 'nit-patna'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-patna') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Science and Technology','B.Tech Applied Physics and Materials Engineering','B.Tech Mathematics and Computing Technology','B.Tech Mechatronics and Automation Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 100, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 79, 6.12, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', 64, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Chemical Science and Technology', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Applied Physics and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Mathematics and Computing Technology', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-patna'), 'B.Tech Mechatronics and Automation Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.1, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-patna'), 2025, 53)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-patna');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-patna'), 'How do I apply for B.Tech at NIT Patna?', 'Through JEE Main followed by JoSAA centralized counselling; NIT Patna does not conduct its own separate entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-patna'), 'What is the history of NIT Patna?', 'It traces back to 1886 as the Bihar College of Engineering, one of India''s oldest engineering institutions, before being designated the 18th NIT.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-patna'), 'Does NIT Patna offer Architecture programs?', 'Yes, B.Arch is offered, admitted via JEE Main Paper 2 / NATA, separate from the JoSAA B.Tech process.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-patna'), 'How is M.Tech admission handled at NIT Patna?', 'Via a valid GATE score and CCMT (Centralized Counselling for M.Tech) counselling.', 3);

