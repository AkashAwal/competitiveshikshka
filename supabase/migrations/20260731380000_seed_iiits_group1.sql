
-- Indian Institute of Information Technology, Allahabad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Allahabad', 'IIIT', 'Engineering', 'Government', 'Tier 2', 'Prayagraj', 'Uttar Pradesh', 'https://www.iiita.ac.in', 'Indian Institute of Information Technology, Devghat, Jhalwa, Prayagraj - 211015, Uttar Pradesh, India',
  'admissions@iiita.ac.in', '0532-2922000', 'Established in 1999 and granted Deemed University status in 2000, IIIT Allahabad was among the first institutes designated a ''Centre of Excellence in Information Technology'' by the Government of India. It is an Institute of National Importance focused on IT, Electronics & Communication, and Management education, widely regarded as one of the strongest IIITs for computer science placements.', array['Central Library','Health Centre','Hostels','Sports complex with basketball court and gymkhana','Computer Centre','Wi-Fi campus','Auditorium','Multiple student research labs'], 'UG (B.Tech) admission is entirely through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test for B.Tech.',
  'JEE Main', 87, null, 33, 120,
  97.91, 'Microsoft, Amazon, Google, Adobe, Samsung, Qualcomm, Deloitte, Goldman Sachs', 2025, 'iiit-allahabad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-allahabad') and name in ('B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Information Technology (Business Informatics)');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'B.Tech Information Technology (Business Informatics)', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 2022, 93)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 2023, 89)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 2024, 87)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-allahabad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'How can I get admission into IIIT Allahabad''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'Is IIIT Allahabad a government institute?', 'Yes, it is a fully government-funded Institute of National Importance (Deemed University since 2000), not a PPP-model IIIT.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'Where is the campus located?', 'Devghat, Jhalwa, Prayagraj (formerly Allahabad), Uttar Pradesh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-allahabad'), 'What is the official admissions contact?', 'admissions@iiita.ac.in, phone 0532-2922000.', 3);

-- Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior', 'IIIT', 'Engineering', 'Government', 'Tier 2', 'Gwalior', 'Madhya Pradesh', 'https://www.iiitm.ac.in', 'ABV-Indian Institute of Information Technology and Management, Morena Link Road, Gwalior, Madhya Pradesh - 474015, India',
  null, '0751-2449801', 'Established in 1997 by the Ministry of Education, ABV-IIITM Gwalior is an Institute of National Importance uniquely combining IT and Management education. It is distinctive among IIITs for its integrated dual-degree structure (B.Tech + M.Tech / B.Tech + MBA), alongside a flagship 2-year MBA program. A standalone B.Tech in Computer Science and Engineering was introduced in 2017.', array['Central Library','Hostels (separate for men/women)','Computer Centre','Health Centre','Sports facilities','Wi-Fi campus','Auditorium','Incubation / E-Cell'], 'UG admission is through JEE Main rank followed by JoSAA/CSAB centralized counselling.',
  'JEE Main', 96, null, 27.23, 67.5,
  97.76, 'Google, Microsoft, Amazon, Uber, CRED, Deloitte, Dell, American Express', 2025, 'abv-iiitm-gwalior'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'abv-iiitm-gwalior') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~9527 (2025, gender-neutral open)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~14000 (2025, approx.)', null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 2025, 96)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'abv-iiitm-gwalior');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'Does ABV-IIITM Gwalior offer a standalone 4-year B.Tech?', 'Yes, since 2017 it offers B.Tech in Computer Science Engineering (and IT), in addition to its long-standing integrated postgraduate programs.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'Is ABV-IIITM Gwalior different from other IIITs?', 'Yes — it''s the only IIIT with ''Management'' in its name and mandate, historically focused on integrated M.Tech/MBA programs rather than a large standalone B.Tech intake.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'How is UG admission done?', 'Via JEE Main score and JoSAA/CSAB counselling, the same national process as other government IIITs/NITs.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'abv-iiitm-gwalior'), 'Where is the campus?', 'Morena Link Road, Gwalior, Madhya Pradesh - 474015.', 3);

-- PDPM Indian Institute of Information Technology, Design and Manufacturing, Jabalpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'PDPM Indian Institute of Information Technology, Design and Manufacturing, Jabalpur', 'IIIT', 'Engineering', 'Government', null, 'Jabalpur', 'Madhya Pradesh', 'https://www.iiitdmj.ac.in', 'PDPM IIITDM Jabalpur, Dumna Airport Road, Jabalpur, Madhya Pradesh - 482005, India',
  'admissions@iiitdmj.ac.in', '0761-2794035', 'IIITDM Jabalpur (named after former President Pratibha Devisingh Patil) is an Institute of National Importance established in 2005, specializing in the convergence of IT with Design and Manufacturing engineering. It offers B.Tech programs blending core engineering with design-oriented and smart-manufacturing curricula, alongside B.Des, M.Tech, and PhD programs.', array['Central Library','Hostels','Health Centre','Computer Centre','Sports facilities','Wi-Fi campus','Design/Manufacturing labs and workshops','Innovation and Incubation Centre'], 'B.Tech and B.Des admissions are through JEE Main rank followed by JoSAA counselling (with CSAB for leftover seats).',
  'JEE Main', null, null, 21.49, 87.54,
  72, 'Amazon, Microsoft, Samsung, Bosch, Qualcomm, TCS, Infosys, L&T', 2025, 'iiitdm-jabalpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiitdm-jabalpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Smart Manufacturing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'B.Tech Smart Manufacturing', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiitdm-jabalpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'What makes IIITDM Jabalpur''s B.Tech different from a typical IIIT?', 'It emphasizes Design and Manufacturing alongside CSE/ECE — offering a dedicated Smart Manufacturing branch not found at most other IIITs.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'How do I apply for B.Tech at IIITDM Jabalpur?', 'Through JEE Main followed by JoSAA (and CSAB for special/leftover rounds); no separate entrance test.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'What is the full official name of the institute?', 'PDPM Indian Institute of Information Technology, Design and Manufacturing, Jabalpur — named after former President Pratibha Devisingh Patil.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-jabalpur'), 'What is the admissions contact?', 'admissions@iiitdmj.ac.in, phone 0761-2794035.', 3);

-- Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram', 'IIIT', 'Engineering', 'Government', null, 'Chennai', 'Tamil Nadu', 'https://www.iiitdm.ac.in', 'IIITDM Kancheepuram, Off Vandalur-Kelambakkam Road, Chennai - 600127, Tamil Nadu, India',
  'office@iiitdm.ac.in', '044-27476300', 'Established in 2007, IIITDM Kancheepuram is an Institute of National Importance located near Chennai, dedicated to IT-enabled Design and Manufacturing. It is structured around Computer Science, Electronics and Communication, Mechanical Engineering, and an interdisciplinary Design and Innovation school, emphasizing design-thinking integrated into core engineering education.', array['Central Library','Institute Computer Centre','Institute Instrumentation Centre','Hostels','Health Centre','Sports facilities','Cultural and technical student clubs'], 'B.Tech admission is via JEE Main score followed by JoSAA centralized counselling; no separate institute-level entrance exam.',
  'JEE Main', null, null, 9.42, 32.57,
  61.9, 'Visa, AMD, Amazon, Accenture, TCS, Cognizant, Bosch, Samsung', 2025, 'iiitdm-kancheepuram'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiitdm-kancheepuram') and name in ('B.Tech Computer Science and Engineering','B.Tech Computer Science and Engineering (Artificial Intelligence)','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Smart Manufacturing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 68, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'B.Tech Computer Science and Engineering (Artificial Intelligence)', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~22123 (2025, approx)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 101, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'B.Tech Smart Manufacturing', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiitdm-kancheepuram');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'Is IIITDM Kancheepuram the same as any PPP-model IIIT in Chennai?', 'No — IIITDM Kancheepuram is a fully government-funded Institute of National Importance established in 2007, distinct from PPP-model IIITs.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'What is unique about IIITDM Kancheepuram''s curriculum?', 'It integrates design thinking and manufacturing engineering into IT education, with a dedicated interdisciplinary Design and Innovation school alongside CSE, ECE, and Mechanical Engineering.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'How is UG admission conducted?', 'Through JEE Main rank and JoSAA counselling, same as other government-funded IIITs.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kancheepuram'), 'Where exactly is the campus located?', 'Off Vandalur-Kelambakkam Road, Chennai - 600127 (near Kancheepuram, in the Chennai metropolitan area).', 3);

