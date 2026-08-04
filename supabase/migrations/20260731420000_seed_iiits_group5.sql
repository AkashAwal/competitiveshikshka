
-- Indian Institute of Information Technology, Agartala (PPP model, Institute of National Importance)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Agartala', 'IIIT', 'Engineering', 'Government', null, 'Agartala', 'Tripura', 'https://www.iiitagartala.ac.in', 'IIIT Agartala, NIT Agartala Campus, Barjala, Jirania, Agartala, Tripura - 799046, India',
  'registrarnita@rediffmail.com', '0381-2546629', 'Established in 2018 under the Public-Private Partnership (PPP) model between the Government of India, the Government of Tripura and an industry partner, IIIT Agartala is one of India''s youngest Institutes of National Importance. It is mentored by NIT Agartala, whose campus it currently shares, and offers a single flagship undergraduate branch, Computer Science and Engineering.', array['Shared campus and labs with NIT Agartala','Hostels','Central Library access','Computer Centre','Health Centre','Wi-Fi campus','Sports facilities','Training & Placement Cell'], 'B.Tech admission is through JEE Main rank followed by JoSAA/CSAB centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 2.17, 18.33, 60,
  null, null, 2025, 'iiit-agartala'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-agartala') and name in ('B.Tech Computer Science and Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-agartala'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 70, 8.68, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-agartala');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-agartala'), 'How can I get admission into IIIT Agartala?', 'Through JEE Main followed by JoSAA/CSAB counselling — there is no separate institute entrance exam, and only one B.Tech branch (CSE) is currently offered.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-agartala'), 'What makes IIIT Agartala distinctive?', 'It is one of the newest PPP-model IIITs (established 2018), currently mentored by and co-located with NIT Agartala, and offers a single flagship CSE branch with 70 seats.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-agartala'), 'Where is the campus located?', 'On the NIT Agartala campus at Barjala, Jirania, Agartala, Tripura - 799046.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-agartala'), 'What is the official admissions contact?', 'registrarnita@rediffmail.com, phone 0381-2546629 (administered via the NIT Agartala registrar''s office).', 3);

-- Dr. Shyama Prasad Mukherjee International Institute of Information Technology, Naya Raipur
-- (Chhattisgarh's IIIT; there is no institute officially named "IIIT Bhilai" — this is the real
-- Chhattisgarh IIIT, a state-government + NTPC joint venture, substituted here to avoid fabricating
-- a non-existent institute. See migration summary notes.)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Dr. Shyama Prasad Mukherjee International Institute of Information Technology, Naya Raipur', 'IIIT', 'Engineering', 'Government', null, 'Naya Raipur', 'Chhattisgarh', 'https://www.iiitnr.ac.in', 'IIIT Naya Raipur, Plot No. 7, Sector 24, Near Purkhoti Muktangan, Atal Nagar, Naya Raipur - 493661, Chhattisgarh, India',
  'btech_admissions@iiitnr.ac.in', '0771-2474182', 'Established in 2015 as a joint venture between the Government of Chhattisgarh and NTPC Limited via a dedicated State Act (the IIIT Naya Raipur Act, 2013), IIIT-NR is located in the planned smart city of Naya Raipur. It runs three B.Tech branches — Computer Science and Engineering, Electronics and Communication Engineering, and Data Science and Artificial Intelligence (India''s first integrated undergraduate DSAI program) — with admission driven by JEE Main.', array['50-acre fully residential campus','Central Library','Hostels','Health Centre','Computer Centre','Wi-Fi campus','Sports facilities','Incubation Centre'], 'B.Tech admission is via JEE Main rank, with seats allocated across three quotas: ~35% through JoSAA/CSAB (All India Quota), ~50% via institutional counselling under the Chhattisgarh State Quota, and ~15% under an NTPC (industry partner) quota.',
  'JEE Main', null, null, 18.9, null,
  90, null, 2025, 'iiit-naya-raipur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-naya-raipur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Data Science and Artificial Intelligence');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'B.Tech Data Science and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-naya-raipur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'How do I get admission into IIIT Naya Raipur?', 'Through JEE Main rank; seats are split across a JoSAA/CSAB All-India quota (~35%), a Chhattisgarh state quota (~50%), and an NTPC quota (~15%), each administered via institutional or national counselling.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'What makes IIIT Naya Raipur distinctive?', 'It was set up in 2015 as a joint venture between the Chhattisgarh state government and NTPC Limited, and was the first institute in India to launch an integrated undergraduate Data Science and Artificial Intelligence program.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'Where is the campus located?', 'Plot No. 7, Sector 24, Near Purkhoti Muktangan, Atal Nagar, Naya Raipur - 493661, Chhattisgarh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-naya-raipur'), 'What is the official B.Tech admissions contact?', 'btech_admissions@iiitnr.ac.in, phone 0771-2474182.', 3);

-- Indian Institute of Information Technology, Raichur (PPP model, mentored by IIT Hyderabad)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Raichur', 'IIIT', 'Engineering', 'Government', null, 'Raichur', 'Karnataka', 'https://iiitr.ac.in', 'IIIT Raichur, Transit Campus at Government Engineering College (GEC), Yermarus Camp, Raichur, Karnataka - 584135, India',
  'office.acad@iiitr.ac.in', '91083-92729', 'Established in 2019 under the Public-Private Partnership (PPP) model, IIIT Raichur is an Institute of National Importance that began academic activity from a temporary IIT Hyderabad campus, with IIT Hyderabad mentoring the institute until a formal handover in 2022. It currently operates from a transit campus at the Government Engineering College, Raichur, offering B.Tech programs in Computer Science and Artificial Intelligence & Data Science.', array['Transit campus at Government Engineering College, Raichur','Hostels','Computer Centre','Library','Health Centre','Wi-Fi campus','Sports facilities','Training & Placement Cell'], 'B.Tech admission is through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 3.21, 18, 46,
  68.8, null, 2025, 'iiit-raichur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-raichur') and name in ('B.Tech Computer Science and Engineering','B.Tech Artificial Intelligence and Data Science');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 80, 12.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Main', 60, 12.82, 'AIR ~48538 (2025, approx.)', null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-raichur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'How can I get admission into IIIT Raichur?', 'Through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'What makes IIIT Raichur distinctive?', 'It was established in 2019 and mentored by IIT Hyderabad (which ran its academics from IIT Hyderabad''s own campus initially) until a formal handover in 2022; it now runs from a transit campus at Government Engineering College, Raichur.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'Where is the campus located?', 'Transit campus at Government Engineering College (GEC), Yermarus Camp, Raichur, Karnataka - 584135.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-raichur'), 'What is the official admissions contact?', 'office.acad@iiitr.ac.in; general queries info@iiitr.ac.in, toll-free 63639 96166.', 3);

-- International Institute of Information Technology, Hyderabad (IIIT-H) — autonomous Deemed University
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'International Institute of Information Technology, Hyderabad', 'IIIT', 'Engineering', 'Deemed', 'Tier 2', 'Hyderabad', 'Telangana', 'https://www.iiit.ac.in', 'IIIT Hyderabad, Prof. C R Rao Road, Gachibowli, Hyderabad - 500032, Telangana, India',
  'ugadmissions@iiit.ac.in', '040-6653-1000', 'Founded in 1998, IIIT Hyderabad was India''s first IIIT and remains structurally distinct from the JoSAA-governed IIITs: it is a self-financed, not-for-profit Public-Private Partnership (N-PPP) society and UGC-recognized Deemed University, not a JoSAA-participating Institute of National Importance. It runs its own admission process and is internationally recognized for research strength in AI, machine learning and computer science.', array['Fully residential campus','Research Centres of Excellence (CVIT, LTRC, Data Sciences, etc.)','Central Library','Hostels','Health Centre','Sports complex','Wi-Fi campus','Innovation and incubation centre (CIE)'], 'Admission to the B.Tech (CSE/ECE) and 5-year dual-degree programmes is primarily via IIIT-H''s own Undergraduate Entrance Examination (UGEE) — a computer-based test combining a Subject Proficiency section (SUPR) and a Research Aptitude section (REAP) — followed by on-campus interviews for shortlisted candidates. Additional channels admit a smaller number of candidates directly via JEE Main/Advanced rank, board-topper credentials, or Olympiad merit; IIIT-H does not participate in JoSAA counselling.',
  'UGEE, JEE Main', 38, null, 33.96, 128,
  96.14, 'Microsoft, Google, Amazon, Apple, Goldman Sachs, JP Morgan, Adobe, Qualcomm', 2025, 'iiit-hyderabad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-hyderabad') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','Dual Degree B.Tech CSE + MS (Computer Science and Engineering)','Dual Degree B.Tech ECE + MS (Electronics and Communication)','Dual Degree B.Tech CS + MS (Computational Linguistics)','Dual Degree B.Tech CS + MS (Computational Natural Sciences)');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, UGEE (or qualifying JEE Main/Advanced rank)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, UGEE (or qualifying JEE Main/Advanced rank)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Dual Degree B.Tech CSE + MS (Computer Science and Engineering)', '5 years', '10+2 with PCM, UGEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Dual Degree B.Tech ECE + MS (Electronics and Communication)', '5 years', '10+2 with PCM, UGEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Dual Degree B.Tech CS + MS (Computational Linguistics)', '5 years', '10+2 with PCM, UGEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Dual Degree B.Tech CS + MS (Computational Natural Sciences)', '5 years', '10+2 with PCM, UGEE', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 2025, 38)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-hyderabad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Does IIIT Hyderabad accept JEE Main/Advanced scores, or only its own exam?', 'Primarily its own Undergraduate Entrance Examination (UGEE), a two-part test (SUPR + REAP) followed by interviews. A smaller number of seats are also filled via qualifying JEE Main/Advanced rank, board-topper, or Olympiad routes — but IIIT-H is not part of JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'Is IIIT Hyderabad a government IIIT like IIIT Allahabad?', 'No — it is a self-financed, not-for-profit Deemed University run as a Public-Private Partnership society, distinct from the JoSAA-governed government/PPP IIITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'What is IIIT Hyderabad known for?', 'Founded in 1998 as India''s first IIIT, it is internationally recognized for research in AI, machine learning, computer vision, and language technologies, with strong placement outcomes.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-hyderabad'), 'What is the official UG admissions contact?', 'ugadmissions@iiit.ac.in, phone 040-6653-1000. Campus address: Prof. C R Rao Road, Gachibowli, Hyderabad - 500032.', 3);

-- Indraprastha Institute of Information Technology, Delhi (IIIT-Delhi) — autonomous state university
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indraprastha Institute of Information Technology, Delhi', 'IIIT', 'Engineering', 'Government', 'Tier 2', 'New Delhi', 'Delhi', 'https://iiitd.ac.in', 'IIIT-Delhi, Okhla Industrial Estate, Phase III, New Delhi - 110020, India',
  'btech-admissions@iiitd.ac.in', '011-71985300', 'Established on 10 June 2008 as an autonomous State University by an Act of the Government of NCT of Delhi (the IIIT-Delhi Act, 2007), IIIT-Delhi is distinct from the centrally-governed JoSAA IIITs. It offers a wide range of interdisciplinary Computer Science-combination B.Tech programmes (CSE, ECE and specializations blending CS with Applied Mathematics, AI, Biosciences, Design, Social Sciences, Economics and VLSI) and admits students directly via JEE Main rank through its own state-level counselling.', array['Central Library','Hostels','Health Centre','Computer Centre','Wi-Fi campus','Research Centres (e.g. Infosys Centre for AI)','Sports facilities','Innovation and incubation centre'], 'B.Tech admission is based on JEE Main All-India Rank, with seat allocation done through JAC Delhi (Joint Admission Counselling, Delhi) — IIIT-Delhi''s own state counselling process — rather than the national JoSAA counselling used by other IIITs.',
  'JEE Main', 63, null, 19.44, 99.28,
  99, null, 2025, 'iiit-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-delhi') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Computer Science and Applied Mathematics','B.Tech Computer Science and Artificial Intelligence','B.Tech Computer Science and Biosciences','B.Tech Computer Science and Design','B.Tech Computer Science and Social Sciences','B.Tech Electronics and VLSI Engineering','B.Tech Computer Science and Economics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, 'JEE Main CRL ~820-4600 (2026, Round 1, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Applied Mathematics', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, 'JEE Main CRL ~758 (2026, closing, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Biosciences', '4 years', '10+2 with PCM/PCB, JEE Main, JAC Delhi counselling', null, null, 'JEE Main CRL ~7148 (2026, closing, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Design', '4 years', '10+2 with PCM, JEE Main, IIITD admission process', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Social Sciences', '4 years', '10+2 with PCM, JEE Main, IIITD admission process', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Electronics and VLSI Engineering', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'B.Tech Computer Science and Economics', '4 years', '10+2 with PCM, JEE Main, JAC Delhi counselling', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-delhi'), 2025, 63)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'Does IIIT Delhi use JoSAA counselling like other IIITs?', 'No. IIIT-Delhi is an autonomous Delhi state university and runs its own counselling, JAC Delhi (Joint Admission Counselling, Delhi), using JEE Main rank — it does not participate in the national JoSAA process.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'Is IIIT Delhi a central or state institute?', 'It is a state university, established in 2008 by an Act of the Government of NCT of Delhi — not a centrally-funded Institute of National Importance like the original IIITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'What makes IIIT Delhi distinctive?', 'It offers a uniquely wide spread of interdisciplinary CS-combination B.Tech programmes — pairing Computer Science with Applied Mathematics, AI, Biosciences, Design, Social Sciences, Economics — alongside standard CSE/ECE and VLSI.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-delhi'), 'What is the official B.Tech admissions contact?', 'btech-admissions@iiitd.ac.in, phone 011-71985300. Campus: Okhla Industrial Estate, Phase III, New Delhi - 110020.', 3);

-- International Institute of Information Technology, Bangalore (IIIT-B) — Deemed University, primarily PG/research
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'International Institute of Information Technology, Bangalore', 'IIIT', 'Engineering', 'Deemed', 'Tier 2', 'Bengaluru', 'Karnataka', 'https://www.iiitb.ac.in', 'IIIT Bangalore, 26/C, Opp. Infosys Gate 1, Electronics City Phase 1, Hosur Road, Bengaluru - 560100, Karnataka, India',
  'admissions@iiitb.ac.in', '080-4140-7777', 'Established in 1999 as a self-financed, not-for-profit Deemed University, IIIT Bangalore spent most of its history as a postgraduate and research-focused institute, offering only the 5-year Integrated M.Tech (admitted after Class 12) alongside M.Tech, MS and PhD programmes. It launched a standalone 4-year undergraduate B.Tech programme — in Computer Science and Engineering, Electronics and Communication Engineering, and Artificial Intelligence & Data Science — only from the 2024-25 academic year, making it one of the newest UG programmes among the IIITs.', array['Electronics City campus (with an East Bengaluru campus expansion underway)','Central Library','Hostels','Computer labs and research centres','Wi-Fi campus','Health Centre','Sports facilities','Placement and Corporate Relations Cell'], 'Admission to both the B.Tech (since 2024-25) and Integrated M.Tech programmes is via a common online application; candidates are ranked by the best All India Rank secured in JEE Main or JEE Advanced. IIIT-B conducts this admission independently and does not participate in JoSAA counselling.',
  'JEE Main, JEE Advanced', 69, null, 36.75, 145,
  100, 'Adobe, Microsoft, Flipkart, Google, Infosys, Intel, Qualcomm', 2025, 'iiit-bangalore'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-bangalore') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Artificial Intelligence and Data Science','Integrated M.Tech Computer Science and Engineering','Integrated M.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main/Advanced AIR (launched 2024-25)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main/Advanced AIR (launched 2024-25)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Main/Advanced AIR (launched 2024-25)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'Integrated M.Tech Computer Science and Engineering', '5 years', '10+2 with PCM, JEE Main/Advanced AIR', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'Integrated M.Tech Electronics and Communication Engineering', '5 years', '10+2 with PCM, JEE Main/Advanced AIR', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 2025, 69)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-bangalore');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'Does IIIT Bangalore offer a 4-year B.Tech, or only postgraduate programmes?', 'For most of its history (since 1999) IIIT-B offered only the 5-year Integrated M.Tech and postgraduate/research programmes. It introduced a standalone 4-year B.Tech (CSE, ECE, AI & Data Science) for the first time in the 2024-25 academic year.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'How is admission to IIIT Bangalore done — via JoSAA?', 'No. Admission to both the B.Tech and Integrated M.Tech programmes is via IIIT-B''s own application process, based on the best All India Rank in JEE Main or JEE Advanced; it is not part of JoSAA.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'Is IIIT Bangalore a government institute?', 'No — it is a self-financed, not-for-profit Deemed University, distinct from the government-funded and PPP-model IIITs.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bangalore'), 'Where is the campus and what is the admissions contact?', '26/C, Electronics City Phase 1, Hosur Road, Bengaluru - 560100; admissions@iiitb.ac.in, phone 080-4140-7777.', 3);
