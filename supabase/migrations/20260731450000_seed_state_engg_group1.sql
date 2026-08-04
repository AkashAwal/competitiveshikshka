-- Jadavpur University, Faculty of Engineering & Technology
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Jadavpur University, Faculty of Engineering & Technology', 'State', 'Engineering', 'Government', 'Tier 1', 'Kolkata', 'West Bengal', 'https://jadavpuruniversity.in', '188, Raja S.C. Mallick Road, Kolkata - 700032, West Bengal, India',
  null, '033-2457-2227', 'Tracing its roots to the Bengal Technical Institute founded in 1906 and formally established as Jadavpur University in 1955, its Faculty of Engineering & Technology is one of India''s oldest and most respected state-run engineering institutions. It is consistently ranked among NIRF''s top-20 engineering institutes nationally, known for strong research output and a culture of producing engineers who excel at product-based technology companies rather than only service firms.', array['Central Library','Hostels (separate for men and women)','Health Centre','Sports grounds and gymnasium','Wi-Fi campus','Multiple specialised engineering labs and workshops','Auditorium','Technology Innovation and incubation centre'], 'Admission to B.E./B.Tech programmes is primarily through the West Bengal Joint Entrance Examination (WBJEE) for West Bengal domicile and other WBJEE-eligible candidates, who fill the large majority of seats via West Bengal state counselling. A smaller share of seats (All India category, historically around 10% of general-category seats) is open to candidates from outside West Bengal, filled using All-India WBJEE/JEE Main merit as notified each year; there is no JoSAA-based JEE Main admission route into the main B.E./B.Tech programme.',
  'WBJEE, JEE Main (All India quota seats only)', 18, null, null, null,
  null, null, null, 'jadavpur-university'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'jadavpur-university') and name in ('B.E. Computer Science and Engineering','B.E. Electronics and Telecommunication Engineering','B.E. Instrumentation and Electronics Engineering','B.E. Food Technology and Bio-Chemical Engineering','B.Pharm (Pharmaceutical Technology)','B.E. Metallurgical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.E. Computer Science and Engineering', '4 years', '10+2 with PCM, WBJEE', null, null, 'WBJEE rank ~67-5435 (2025, General, round-wise, AIQ)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.E. Electronics and Telecommunication Engineering', '4 years', '10+2 with PCM, WBJEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.E. Instrumentation and Electronics Engineering', '4 years', '10+2 with PCM, WBJEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.E. Food Technology and Bio-Chemical Engineering', '4 years', '10+2 with PCM, WBJEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.Pharm (Pharmaceutical Technology)', '4 years', '10+2 with PCM/PCB, WBJEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'B.E. Metallurgical Engineering', '4 years', '10+2 with PCM, WBJEE', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jadavpur-university'), 2023, 10)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jadavpur-university'), 2024, 12)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jadavpur-university'), 2025, 18)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'jadavpur-university');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'Does Jadavpur University accept JEE Main for B.E./B.Tech admission?', 'No, not for the large majority of seats. Admission is primarily through WBJEE for West Bengal domicile and WBJEE-eligible candidates. A smaller All India quota (historically around 10% of general seats) is open to outside-state candidates via All-India WBJEE/JEE Main merit as notified each year — there is no JoSAA counselling route into the main programme.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'What makes Jadavpur University''s engineering faculty distinctive?', 'It is one of India''s oldest engineering institutions (roots to 1906), consistently ranks in NIRF''s engineering top-20, and is well known for research output and graduates who are strongly preferred by product-based technology companies.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'Where is the campus located?', '188, Raja S.C. Mallick Road, Kolkata - 700032, West Bengal.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jadavpur-university'), 'What is the official admissions contact?', 'Phone 033-2457-2227; visit jadavpuruniversity.in for current admission notices and application details.', 3);

-- Delhi Technological University
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Delhi Technological University', 'State', 'Engineering', 'Government', 'Tier 2', 'Delhi', 'Delhi', 'https://www.dtu.ac.in', 'Shahbad Daulatpur, Main Bawana Road, Delhi - 110042, India',
  'mail@dce.edu', '011-27871018', 'Established in 1941 as Delhi Polytechnic and later reconstituted as Delhi College of Engineering, the institute was granted university status in 2009 and renamed Delhi Technological University. It is Delhi government''s flagship technical university, widely regarded as one of the strongest non-IIT/NIT engineering institutes in India for placements, with a large multi-branch B.Tech intake and a growing research and startup ecosystem.', array['Central Library','Hostels for men and women','Health Centre','Sports complex','Wi-Fi campus','Multiple engineering department labs and workshops','Innovation and Incubation Centre','Auditorium and seminar halls'], 'B.Tech admission is through JEE Main score and rank, with seat allotment done via JAC Delhi (Joint Admission Counselling Delhi) rather than JoSAA. Seats are split by region: a large majority (around 85%) go to the Delhi quota (candidates who studied classes 11 and 12 in Delhi), while the remaining seats (around 15%) are for the Outside-Delhi quota, which is significantly more competitive.',
  'JEE Main', 30, null, 15.75, 85,
  60.8, 'Microsoft, Google, Adobe, Amazon, Atlassian, JP Morgan Chase, Salesforce, Bain & Company', 2025, 'dtu-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'dtu-delhi') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Information Technology','B.Tech Mechanical Engineering','B.Tech Electrical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'JAC Delhi Outside-Delhi CRL ~3430, Delhi CRL ~9170 (Round 1, 2026, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'dtu-delhi'), 2022, 35)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'dtu-delhi'), 2024, 27)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'dtu-delhi'), 2025, 30)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'dtu-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'How can I get admission into DTU''s B.Tech program?', 'Through JEE Main followed by JAC Delhi (Joint Admission Counselling Delhi) — DTU does not participate in JoSAA. Seats are split into a Delhi quota (~85%) for students who studied classes 11-12 in Delhi and an Outside-Delhi quota (~15%) that is considerably more competitive.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'Is DTU the same as the old Delhi College of Engineering?', 'Yes — DTU was formerly Delhi Polytechnic (1941) and then Delhi College of Engineering, and was upgraded to full university status as Delhi Technological University in 2009.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'Where is DTU located?', 'Shahbad Daulatpur, Main Bawana Road, Delhi - 110042.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'dtu-delhi'), 'What is the official admissions contact?', 'mail@dce.edu, phone 011-27871018; JAC Delhi counselling details are published at jacdelhi.admissions.nic.in.', 3);

-- Netaji Subhas University of Technology
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Netaji Subhas University of Technology', 'State', 'Engineering', 'Government', 'Tier 2', 'Delhi', 'Delhi', 'https://www.nsut.ac.in', 'Netaji Subhas University of Technology, Sector-3, Dwarka, New Delhi - 110078, India',
  'designadmissions@nsut.ac.in', '011-25099290', 'Established in 1983 as Delhi Institute of Technology and later known as Netaji Subhas Institute of Technology, it was formerly affiliated with Delhi University before being converted into an autonomous state university (NSUT) in 2018. It is one of Delhi''s premier government technical universities, known for strong CSE/IT placements and a research-driven, engineering-and-technology-focused curriculum.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','Wi-Fi campus','Engineering department labs and workshops','Innovation and Incubation Centre','Auditorium'], 'B.Tech admission is through JEE Main score and rank, with seat allocation done via JAC Delhi (Joint Admission Counselling Delhi) rather than JoSAA, using the same Delhi/Outside-Delhi regional quota structure applied across JAC Delhi institutes.',
  'JEE Main', 70, null, 18, 94,
  null, 'Adobe, Amazon, Apple, De Shaw, Google, Atlassian, Microsoft, Zomato, EY, Deloitte', 2025, 'nsut-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nsut-delhi') and name in ('B.Tech Computer Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Mathematics and Computing','B.Tech Bio-Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'B.Tech Bio-Technology', '4 years', '10+2 with PCM/PCB, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nsut-delhi'), 2025, 70)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nsut-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'How can I get admission into NSUT''s B.Tech program?', 'Through JEE Main followed by JAC Delhi (Joint Admission Counselling Delhi) — the same centralized counselling used for DTU and other Delhi government technical institutes, not JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'Is NSUT the same as the old NSIT?', 'Yes — it was established in 1983 as Delhi Institute of Technology, later renamed Netaji Subhas Institute of Technology (NSIT) under Delhi University affiliation, and converted into the autonomous Netaji Subhas University of Technology (NSUT) in 2018.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'Where is the campus located?', 'Sector-3, Dwarka, New Delhi - 110078.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nsut-delhi'), 'What is the official admissions contact?', 'designadmissions@nsut.ac.in, phone 011-25099290; JAC Delhi counselling details are published at jacdelhi.admissions.nic.in.', 3);

-- COEP Technological University, Pune
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'COEP Technological University, Pune', 'State', 'Engineering', 'Government', 'Tier 2', 'Pune', 'Maharashtra', 'https://www.coeptech.ac.in', 'Wellesley Road, Shivajinagar, Pune - 411005, Maharashtra, India',
  null, '020-25507000', 'Established in 1854 as the Poona Engineering Class and Mechanical School, COEP is the third-oldest engineering institute in India and Asia, with over 170 years of history under the Government of Maharashtra. Converted into an autonomous, unitary technological university (COEP Technological University) in 2023, it remains a highly regarded state institute for core engineering branches like Mechanical, Civil, and Metallurgy alongside modern programs in Computer Science and AI/ML.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds','Wi-Fi campus','Heritage buildings and workshops','Innovation and Incubation Centre','Alumni-funded research centres'], 'B.Tech admission for Maharashtra-domicile candidates is primarily through MHT-CET scores followed by the state CAP (Centralized Admission Process) counselling; a smaller share of seats is available to All-India candidates through JEE Main under the All India Quota, also routed via CAP/institute-level counselling. Around 80% of sanctioned seats are filled via MHT-CET.',
  'MHT-CET, JEE Main (All India quota seats)', 90, 6.02, 12, 52.57,
  80.7, 'Accenture, TCS, Infosys, L&T, Persistent Systems, Bajaj Auto, Cummins, Tata Motors', 2025, 'coep-pune'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'coep-pune') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Telecommunication Engineering','B.Tech Electrical Engineering','B.Tech Civil Engineering','B.Tech Mechanical Engineering','B.Tech Instrumentation and Control Engineering','B.Tech Manufacturing Science and Engineering','B.Tech Metallurgy and Materials Technology','B.Tech Artificial Intelligence and Machine Learning');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, 'MHT-CET percentile ~98.4-99.9 (2025, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Electronics and Telecommunication Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Instrumentation and Control Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Manufacturing Science and Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Metallurgy and Materials Technology', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 6.02, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'coep-pune'), 'B.Tech Artificial Intelligence and Machine Learning', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, 5.45, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'coep-pune'), 2025, 90)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'coep-pune');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'coep-pune'), 'How can I get admission into COEP''s B.Tech program?', 'Primarily through MHT-CET followed by Maharashtra state CAP counselling (around 80% of seats), for Maharashtra-domicile eligible candidates. A smaller All India Quota is available to outside-Maharashtra candidates via JEE Main. COEP does not use JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'coep-pune'), 'What makes COEP distinctive among Indian engineering colleges?', 'Founded in 1854, it is the third-oldest engineering institute in India and Asia, with a 170+ year legacy; it was converted from an autonomous government college into COEP Technological University in 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'coep-pune'), 'Where is the campus located?', 'Wellesley Road, Shivajinagar, Pune - 411005, Maharashtra.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'coep-pune'), 'What is the official admissions contact?', 'Phone 020-25507000; visit coeptech.ac.in for current admission notices, as a direct admissions email address was not published.', 3);
