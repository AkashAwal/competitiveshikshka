
-- Punjab Engineering College (Deemed to be University), Chandigarh
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Punjab Engineering College (Deemed to be University), Chandigarh', 'GFTI', 'Engineering', 'Deemed', null, 'Chandigarh', 'Chandigarh', 'https://pec.ac.in', 'Punjab Engineering College (Deemed to be University), Sector 12, Chandigarh - 160012, India',
  'admissions@pec.edu.in', '0172-2753813', 'Founded in 1921, PEC is one of India''s oldest engineering institutions and is run by the Chandigarh (UT) Administration. It was declared a Deemed-to-be-University by the MHRD in 2003 (briefly renamed PEC University of Technology from 2009-2017, then reverted to its original name), and remains fully government-funded rather than privately managed. It offers a broad spread of core and emerging engineering branches and participates in JoSAA as a Government Funded Technical Institute (GFTI).', array['Central Library','Hostels for men and women','Health Centre','Sports complex and gymnasium','Wi-Fi campus','Multiple engineering department labs and workshops','Innovation and Incubation Centre','Auditorium'], 'B.Tech admission is through JEE Main rank followed by JoSAA centralized counselling (with CSAB special rounds for leftover seats); PEC participates in JoSAA as a Government Funded Technical Institute (GFTI), not as an NIT/IIT. There is no separate institute-level entrance test for B.Tech.',
  'JEE Main', null, 7.71, 13.60, 61.02,
  null, 'Adobe, L&T, Accenture, LG Electronics, Amazon, Microsoft, Cisco, Maruti, DE Shaw, TCS', 2025, 'pec-chandigarh'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'pec-chandigarh') and name in ('B.Tech Computer Science and Engineering','B.Tech Artificial Intelligence','B.Tech Data Science','B.Tech Mathematics and Computing','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Civil Engineering','B.Tech Mechanical Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, 'AIR ~18868-19702 (2025, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main', null, 7.71, 'AIR ~20061-21260 (2025, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Data Science', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, 'AIR ~24380-36774 (2025, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.71, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'pec-chandigarh');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'How can I get admission into PEC Chandigarh''s B.Tech program?', 'Through JEE Main rank followed by JoSAA centralized counselling (with CSAB special rounds for leftover seats) — PEC participates as a Government Funded Technical Institute (GFTI), not as an IIT/NIT. There is no separate institute-level entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'Is PEC Chandigarh a private or government institute?', 'It is fully government-run, administered by the Chandigarh (UT) Administration. It was declared a Deemed-to-be-University in 2003 and is not a privately owned or trust-run college.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'Where is the campus located?', 'Sector 12, Chandigarh - 160012.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'pec-chandigarh'), 'What is the official admissions contact?', 'admissions@pec.edu.in, phone 0172-2753813.', 3);

-- Puducherry Technological University (formerly Pondicherry Engineering College)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Puducherry Technological University', 'GFTI', 'Engineering', 'Government', null, 'Puducherry', 'Puducherry', 'https://ptuniv.edu.in', 'Puducherry Technological University, Pillaichavady, Puducherry - 605014, India',
  null, null, 'Formerly known as Pondicherry Engineering College (established 1984) and long a JoSAA-participating Government Funded Technical Institute, the institute was upgraded to full university status with UGC approval effective September 2020 and formally inaugurated as Puducherry Technological University in September 2021. It remains fully funded and promoted by the Government of Puducherry, offering nine B.Tech specializations including the distinctive Banking Technology program.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','Wi-Fi campus','Engineering department labs and workshops','Innovation and Incubation Centre','Auditorium'], 'B.Tech admission runs on two parallel tracks: Government Quota (domicile) seats are filled through Puducherry''s own CENTAC (Centralised Admission Committee) counselling based on Class 12 marks in Maths, Physics and an optional subject; Self-Supporting seats (open to all) are filled through JEE Main rank via JoSAA/CSAB centralized counselling. It is not exclusively a JoSAA-only admission like an NIT.',
  'JEE Main (JoSAA/CSAB self-supporting seats), Puducherry CENTAC (Class 12 marks-based, domicile government-quota seats)', null, null, 4.75, 26,
  92.46, 'Zoho, Accenture, L&T, TCS, Cognizant, Deloitte', 2025, 'puducherry-technological-university'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'puducherry-technological-university') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Instrumentation Engineering','B.Tech Banking Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, 'CENTAC (domicile) approx Rs.32,101; JoSAA/CSAB self-supporting approx Rs.1,62,401 per year');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Instrumentation Engineering', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'B.Tech Banking Technology', '4 years', '10+2 with PCM, JEE Main or CENTAC (Puducherry domicile)', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'puducherry-technological-university');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'Is Puducherry Technological University the same as Pondicherry Engineering College?', 'Yes — PEC (established 1984) was upgraded to full university status with UGC approval in September 2020 and formally inaugurated as Puducherry Technological University in September 2021. JoSAA listings may still show it under its old name/code.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'How can I get admission into PTU''s B.Tech program?', 'Government Quota (Puducherry domicile) seats go through the local CENTAC counselling based on Class 12 marks; Self-Supporting seats (open to all-India candidates) are filled via JEE Main rank through JoSAA/CSAB. It is not a pure JoSAA-only institute.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'What is distinctive about PTU''s B.Tech offerings?', 'Alongside standard branches like CSE, IT, ECE and Mechanical, it offers a rare B.Tech in Banking Technology, reflecting its Government of Puducherry-funded, technology-plus-finance orientation.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'puducherry-technological-university'), 'Where is the campus located?', 'Pillaichavady, Puducherry - 605014.', 3);

-- Sant Longowal Institute of Engineering and Technology (SLIET), Longowal
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Sant Longowal Institute of Engineering and Technology', 'GFTI', 'Engineering', 'Deemed', 'Tier 2', 'Longowal', 'Punjab', 'https://sliet.ac.in', 'Sant Longowal Institute of Engineering and Technology, Longowal - 148106, District Sangrur, Punjab, India',
  'dracad@sliet.ac.in', '01672-280057', 'Set up in 1989 under the Rajiv Gandhi-Longowal Accord and named in memory of Sant Harchand Singh Longowal, SLIET was accorded Deemed-to-be-University status in 2007-08 and is fully funded by the Government of India (Ministry of Education). Spread across a 451-acre campus, it is a Government Funded Technical Institute participating in JoSAA, known for its rural-technology and core-engineering focus alongside modern CSE/IT programs.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','451-acre green campus','Wi-Fi campus','Engineering department labs and workshops','Rural technology and food processing incubation centres'], 'B.Tech admission is through JEE Main score followed by JoSAA centralized counselling (with CSAB for leftover seats); SLIET participates in JoSAA as a Government Funded Technical Institute (GFTI), and there is no separate institute-level entrance test for B.Tech.',
  'JEE Main', 79, null, 4, null,
  null, 'TCS, Cognizant, HCL, Infosys, IBM, Amazon', 2024, 'sliet-longowal'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'sliet-longowal') and name in ('B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~51942-87172 (2025, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'sliet-longowal'), 2025, 79)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'sliet-longowal');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'How can I get admission into SLIET''s B.Tech program?', 'Through JEE Main rank followed by JoSAA counselling (with CSAB for leftover seats) — SLIET participates as a Government Funded Technical Institute (GFTI); there is no separate institute-level entrance test for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'Is SLIET a government institute?', 'Yes — it was set up in 1989 under the Rajiv Gandhi-Longowal Accord, is fully funded by the Government of India (Ministry of Education), and was accorded Deemed-to-be-University status in 2007-08.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'Where is the campus located?', 'Longowal - 148106, District Sangrur, Punjab, on a 451-acre campus.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'sliet-longowal'), 'What is the official admissions contact?', 'dracad@sliet.ac.in, phone 01672-280057.', 3);

-- North Eastern Regional Institute of Science and Technology (NERIST), Nirjuli
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'North Eastern Regional Institute of Science and Technology', 'GFTI', 'Engineering', 'Deemed', null, 'Nirjuli', 'Arunachal Pradesh', 'https://nerist.ac.in', 'North Eastern Regional Institute of Science and Technology, Nirjuli - 791109, Papum Pare District, Arunachal Pradesh, India',
  'infonerist@gmail.com', '0360-2257401', 'Established in 1984, NERIST is a Deemed-to-be-University under the Ministry of Education (with DoNER involvement), created as the flagship technical and science institute serving all eight North Eastern states. It is fully government-funded and offers B.Tech, integrated, diploma and doctoral programs, with admission structured heavily around state-quota seats for the North East region.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','Wi-Fi campus','Engineering and science department labs and workshops','Agricultural Engineering research farms','Auditorium'], 'The large majority of seats (around 80%) are filled through NERIST''s own Combined/NERIST Entrance Examination (NEE) under a state-quota system reserving roughly 10% for each of the eight North Eastern states, plus a Permanent Residence Certificate (PRC) quota (~7%) and a Persons-with-Disability quota (~3%). A smaller share (around 10%) of seats is open to All-India candidates via JEE Main scores, allotted through CSAB-NEUT special counselling rather than the main JoSAA round.',
  'NERIST Entrance Examination (NEE), JEE Main (CSAB-NEUT quota)', null, 0.7, 6, null,
  null, 'Oil India Limited, Tata Projects, Godrej, Reliance, HCL, Wipro, TCS, IBM, Capgemini', 2024, 'nerist'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nerist') and name in ('B.Tech Agricultural Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Agricultural Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nerist'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, NEE or JEE Main', null, 0.7, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nerist');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nerist'), 'Does NERIST admit students through JoSAA like an NIT?', 'Only partially. Around 80% of seats are filled through NERIST''s own Combined Entrance Examination (NEE) under a state-quota system for the eight North Eastern states. The remaining minority of seats is open to All-India JEE Main candidates via CSAB-NEUT special counselling, not the main JoSAA round.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nerist'), 'What makes NERIST distinctive?', 'It is the flagship technical and science institute for India''s North Eastern region, established in 1984 as a Deemed-to-be-University fully funded by the Government of India, with dedicated state-quota seats for all eight North Eastern states.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nerist'), 'Where is the campus located?', 'Nirjuli - 791109, Papum Pare District, Arunachal Pradesh (near Itanagar).', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nerist'), 'What is the official admissions contact?', 'infonerist@gmail.com, phone 0360-2257401 (EPBX); registrar@nerist.ac.in for registrar-level queries.', 3);

-- College of Engineering Trivandrum (CET), Thiruvananthapuram
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'College of Engineering Trivandrum', 'State', 'Engineering', 'Government', null, 'Thiruvananthapuram', 'Kerala', 'https://www.cet.ac.in', 'College of Engineering Trivandrum, Engineering College P.O., Sreekaryam, Thiruvananthapuram, Kerala - 695016, India',
  'principal@cet.ac.in', '0471-2598370', 'Established in 1939, CET is the oldest engineering college in Kerala (and the former Travancore State), run directly by the Government of Kerala and academically affiliated to the APJ Abdul Kalam Technological University (KTU). It is known for a century-adjacent legacy in Civil, Electrical and Mechanical Engineering, alongside strong newer programs in Computer Science and Electronics.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','Wi-Fi campus','Engineering department labs and workshops','Innovation and startup incubation cell','Auditorium'], 'B.Tech admission is through KEAM (Kerala Engineering Architecture Medical) — a state entrance exam combined with Class 12 marks for merit rank — followed by Kerala state centralized allotment (CAP). There is no JoSAA/JEE Main route for the main state-quota B.Tech intake.',
  'KEAM', null, null, 6.95, 33,
  null, 'Amazon, IBM, Oracle, Wipro, Infosys, TCS, Accenture, ITC, Adobe, Ford, Nissan', 2024, 'cet-trivandrum'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'cet-trivandrum') and name in ('B.Tech Civil Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Electrical and Computer Engineering','B.Tech Electronics and Communication Engineering','B.Tech Applied Electronics and Instrumentation','B.Tech Mechanical Engineering','B.Tech Computer Science and Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, KEAM', 120, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, KEAM', 120, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Electrical and Computer Engineering', '4 years', '10+2 with PCM, KEAM', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, KEAM', 120, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Applied Electronics and Instrumentation', '4 years', '10+2 with PCM, KEAM', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, KEAM', 120, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, KEAM', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'cet-trivandrum');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'How can I get admission into CET Trivandrum''s B.Tech program?', 'Through KEAM (Kerala Engineering Architecture Medical), a state entrance exam combined with Class 12 marks, followed by Kerala''s centralized allotment process (CAP). It does not use JoSAA or JEE Main for its main state-quota intake.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'What makes CET Trivandrum distinctive?', 'Founded in 1939, it is the oldest engineering college in Kerala, directly run by the Government of Kerala and affiliated to APJ Abdul Kalam Technological University (KTU), with a long-standing reputation in Civil, Electrical and Mechanical Engineering.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'Where is the campus located?', 'Engineering College P.O., Sreekaryam, Thiruvananthapuram, Kerala - 695016.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cet-trivandrum'), 'What is the official admissions contact?', 'principal@cet.ac.in, phone 0471-2598370.', 3);

-- Government College of Technology (GCT), Coimbatore
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Government College of Technology, Coimbatore', 'State', 'Engineering', 'Government', null, 'Coimbatore', 'Tamil Nadu', 'https://www.gct.ac.in', 'Government College of Technology, Thadagam Road, Coimbatore, Tamil Nadu - 641013, India',
  'principal@gct.ac.in', '0422-2432221', 'Founded in 1945 as Arthur Hope College of Technology under the patronage of industrialist G.D. Naidu, and later renamed Government College of Technology, GCT is an autonomous, state-funded institution run by the Government of Tamil Nadu and academically affiliated to Anna University. It is regarded as one of Tamil Nadu''s oldest and most respected government engineering colleges, known for its core-engineering strength (Mechanical, Production, Textile Technology origins) alongside modern Computer Science and IT programs.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds','Wi-Fi campus','Engineering department labs and workshops','Innovation and Incubation Centre','Auditorium'], 'B.E./B.Tech admission is entirely through TNEA (Tamil Nadu Engineering Admissions) — a centralized, marks-based counselling process using Class 12 cutoff marks; there is no separate entrance exam, and JoSAA/JEE Main is not used for the main state-quota intake.',
  'TNEA (Class 12 marks-based)', null, null, 6.05, 15,
  null, 'Bosch, TCS, HCL, Microsoft, Amazon', 2024, 'gct-coimbatore'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'gct-coimbatore') and name in ('B.E. Civil Engineering','B.E. Mechanical Engineering','B.E. Electrical and Electronics Engineering','B.E. Electronics and Communication Engineering','B.E. Computer Science and Engineering','B.E. Instrumentation and Control Engineering','B.E. Production Engineering','B.Tech Information Technology','B.Tech Industrial Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Civil Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Electrical and Electronics Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Computer Science and Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Instrumentation and Control Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.E. Production Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'B.Tech Industrial Biotechnology', '4 years', '10+2 with PCM/PCB, TNEA', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'gct-coimbatore');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'How can I get admission into GCT Coimbatore''s B.E./B.Tech program?', 'Entirely through TNEA (Tamil Nadu Engineering Admissions), a centralized marks-based counselling process using Class 12 cutoff marks — there is no entrance exam, and it does not use JoSAA or JEE Main.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'What makes GCT Coimbatore distinctive?', 'Founded in 1945 as Arthur Hope College of Technology under the patronage of industrialist G.D. Naidu, it is one of Tamil Nadu''s oldest government engineering colleges, run by the state government and affiliated to Anna University, with deep roots in core engineering branches like Mechanical and Production Engineering.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'Where is the campus located?', 'Thadagam Road, Coimbatore, Tamil Nadu - 641013.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'gct-coimbatore'), 'What is the official admissions contact?', 'principal@gct.ac.in, phone 0422-2432221.', 3);
