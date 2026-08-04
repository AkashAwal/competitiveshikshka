
-- Indian Institute of Information Technology, Sri City
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Sri City', 'IIIT', 'Engineering', 'Government', null, 'Sri City', 'Andhra Pradesh', 'https://iiits.ac.in', '630 Gnan Marg, Sri City, Satyavedu Mandal, Chittoor District - 517646, Andhra Pradesh, India',
  'admissions@iiits.in', '+91-70328-51919', 'Established in 2013 under the Public-Private Partnership (PPP) model with the Ministry of Education, the Government of Andhra Pradesh, and industry partners, IIIT Sri City is an Institute of National Importance located within the planned Sri City industrial and educational township near Chennai. It focuses on Computer Science and Electronics engineering, and its location amid numerous multinational companies based in Sri City gives students unusually close industry linkages for internships and placements.', array['Central Library','Hostels for men and women','Health Centre','Wi-Fi enabled campus','Sports facilities','Computer Centre and labs','Auditorium','Located inside the Sri City industrial and educational township'], 'B.Tech admission is through JEE Main rank followed by JoSAA/CSAB centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, null, 18.44, 120,
  93.6, 'Amazon, Branch International, Capgemini, Deloitte, AI Palette, IndiaMart, ITC Infotech', 2025, 'iiit-sri-city'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-sri-city') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Computer Science and Engineering (Artificial Intelligence and Data Science)');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'B.Tech Computer Science and Engineering (Artificial Intelligence and Data Science)', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-sri-city');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'How can I get admission into IIIT Sri City''s B.Tech program?', 'Only through JEE Main followed by JoSAA/CSAB counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'What makes IIIT Sri City distinctive among IIITs?', 'It is located inside the Sri City industrial and educational township near Chennai, giving students close proximity to numerous multinational companies for internships, projects, and placements.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'Where is the campus located?', 'Sri City, Satyavedu Mandal, Chittoor District, Andhra Pradesh - 517646, roughly an hour from Chennai.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sri-city'), 'What is the official admissions contact?', 'admissions@iiits.in, phone +91-70328-51919.', 3);

-- Indian Institute of Information Technology, Tiruchirappalli
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Tiruchirappalli', 'IIIT', 'Engineering', 'Government', null, 'Tiruchirappalli', 'Tamil Nadu', 'https://iiitt.ac.in', 'Sethurappatti, Tiruchirappalli-Madurai Highway (NH 45), Tiruchirappalli - 620012, Tamil Nadu, India',
  'admissions@iiitt.ac.in', '0431-2501000', 'Established in 2013 as a Public-Private Partnership Institute of National Importance under the Ministry of Education, the Government of Tamil Nadu, and industry partners, IIIT Tiruchirappalli (IIIT Trichy) initially operated out of the NIT Trichy campus before moving to its own permanent campus at Sethurappatti on the Tiruchirappalli-Madurai highway. It offers B.Tech programs in Computer Science and Electronics & Communication Engineering, and has seen average placement packages rise sharply in recent years.', array['Central Library','Hostels','Health Centre','Computer Centre','Sports facilities','Wi-Fi campus','Permanent campus at Sethurappatti','Student research and project labs'], 'B.Tech admission is through JEE Main rank followed by JoSAA/CSAB centralized counselling; no separate institute-level entrance test.',
  'JEE Main', null, null, 19.51, 46.67,
  null, 'Amazon, Walmart, NVIDIA, IBM, Infosys, Paytm, TCS, Cognizant, Siemens, Juspay', 2025, 'iiit-trichy'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-trichy') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-trichy');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'How can I get admission into IIIT Trichy''s B.Tech program?', 'Only through JEE Main followed by JoSAA/CSAB counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'Is IIIT Trichy the same as NIT Trichy?', 'No. IIIT Trichy is a separate, newer PPP-model Institute of National Importance that initially shared the NIT Trichy campus before moving to its own permanent campus at Sethurappatti.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'Where is the campus located?', 'Sethurappatti, on the Tiruchirappalli-Madurai Highway (NH 45), Tiruchirappalli, Tamil Nadu.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-trichy'), 'What is the official admissions contact?', 'admissions@iiitt.ac.in, phone 0431-2501000.', 3);

-- Indian Institute of Information Technology, Una
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Una', 'IIIT', 'Engineering', 'Government', null, 'Una', 'Himachal Pradesh', 'https://www.iiitu.ac.in', 'Village Saloh, Tehsil Haroli, District Una, Himachal Pradesh - 177209, India',
  'ugadmission@iiitu.ac.in', '01975-257908', 'Established in 2014 under the IIIT Public-Private Partnership Act as an Institute of National Importance, IIIT Una is jointly promoted by the Ministry of Education, the Government of Himachal Pradesh, and industry partners, and is the only IIIT in the state. It offers B.Tech programs in Computer Science, Electronics & Communication, and Information Technology, with a curriculum oriented toward producing industry-ready engineers.', array['Central Library','Hostels for men and women','Health Centre','Wi-Fi enabled campus','Computer Centre','Sports facilities','Training & Placement Cell','Campus set amid the Shivalik foothills'], 'B.Tech admission is via JEE Main rank followed by JoSAA/CSAB counselling; candidates must also meet minimum Class XII eligibility (75% aggregate or top 20 percentile of their board, 65% for SC/ST/PwD).',
  'JEE Main', null, null, 11.02, 32,
  82.95, 'Google, Samsung, Amazon, TCS, Jio, Deloitte, Infosys, Wipro, IBM, Tech Mahindra', 2025, 'iiit-una'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-una') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Information Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-una'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-una'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-una'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-una');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-una'), 'How can I get admission into IIIT Una''s B.Tech program?', 'Through JEE Main rank followed by JoSAA/CSAB counselling, along with meeting the minimum Class XII eligibility criteria; there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-una'), 'What makes IIIT Una distinctive?', 'It is the only IIIT located in Himachal Pradesh, established in 2014 under the PPP Act with a focus on CSE, ECE, and IT education for the hill state.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-una'), 'Where is the campus located?', 'Village Saloh, Tehsil Haroli, District Una, Himachal Pradesh - 177209.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-una'), 'What is the official admissions contact?', 'ugadmission@iiitu.ac.in, phone 01975-257908.', 3);

-- Indian Institute of Information Technology, Sonepat
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Sonepat', 'IIIT', 'Engineering', 'Government', null, 'Sonepat', 'Haryana', 'https://iiitsonepat.ac.in', 'SBIT Campus (transit campus), Meerut Road, Pallri, Sonepat - 131001, Haryana, India',
  'admissions@iiitsonepat.ac.in', '0130-2987910', 'Established in 2014 as a Public-Private Partnership Institute of National Importance under the Ministry of Education and the Government of Haryana, IIIT Sonepat (also spelled IIIT Sonipat) currently functions from a transit campus while its permanent campus is developed. It offers B.Tech programs in Computer Science Engineering, Information Technology, and the comparatively distinctive Data Science and Analytics branch, and its proximity to Delhi-NCR gives students strong access to the region''s technology and startup ecosystem for internships and placements.', array['Library','Hostels','Health Centre','Wi-Fi enabled campus','Computer Centre','Sports facilities','Training & Placement Office','Transit campus near NH-44, close to Delhi-NCR'], 'B.Tech admission is via JEE Main rank followed by JoSAA/CSAB centralized counselling; no separate institute-level entrance exam.',
  'JEE Main', null, null, 12.9, 62,
  null, 'Amazon, Microsoft, Adobe, Deloitte, Goldman Sachs, Paytm, PhonePe, Zomato', 2025, 'iiit-sonepat'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-sonepat') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Data Science and Analytics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'B.Tech Data Science and Analytics', '4 years', '10+2 with PCM, JEE Main', 60, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-sonepat');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'How can I get admission into IIIT Sonepat''s B.Tech program?', 'Through JEE Main rank followed by JoSAA/CSAB counselling; there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'What makes IIIT Sonepat distinctive?', 'It is one of the few IIITs offering a dedicated B.Tech in Data Science and Analytics alongside CSE and IT, and its location near Delhi-NCR gives students easy access to the region''s tech industry.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'Where is the campus located?', 'Currently at a transit campus on Meerut Road, Pallri, Sonepat, Haryana - 131001, about 60 km from Delhi, pending completion of the permanent campus.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-sonepat'), 'What is the official admissions contact?', 'admissions@iiitsonepat.ac.in, phone 0130-2987910.', 3);

-- Indian Institute of Information Technology Senapati, Manipur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology Senapati, Manipur', 'IIIT', 'Engineering', 'Government', null, 'Imphal', 'Manipur', 'https://www.iiitmanipur.ac.in', 'Indian Institute of Information Technology Manipur, City Campus, Mantripukhri, Imphal, Manipur - 795002, India',
  'director@iiitmanipur.ac.in', '+91-94852-00604', 'Established in 2015 as a Public-Private Partnership Institute of National Importance under the Ministry of Education, IIIT Manipur began academic operations from a temporary campus hosted at NIT Manipur, Langol (its mentor institute), before moving to its own interim city campus at Mantripukhri, Imphal. A permanent 150-acre campus is under construction in Senapati district, which will eventually give the institute its full official name. It offers B.Tech programs in Computer Science and Electronics & Communication Engineering.', array['Library','Computer labs','Hostels for men and women','Wi-Fi enabled campus','Sports facilities','Health Centre','Training & Placement Cell','Interim city campus at Mantripukhri, Imphal; mentored initially by NIT Manipur'], 'B.Tech admission is via JEE Main rank followed by JoSAA/CSAB counselling; candidates must also meet minimum Class XII eligibility (75% aggregate or top 20 percentile of their board, 65% for SC/ST/PwD).',
  'JEE Main', null, null, null, 40,
  null, 'TCS, Deloitte, Nykaa, Capgemini, Jio, Amazon, Virtusa', 2024, 'iiit-manipur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-manipur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 50, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 50, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-manipur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'How can I get admission into IIIT Manipur''s B.Tech program?', 'Through JEE Main rank followed by JoSAA/CSAB counselling, along with the minimum Class XII eligibility criteria; there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'Does IIIT Manipur still operate from NIT Manipur''s campus?', 'It began in 2015 at a temporary campus hosted by its mentor institute, NIT Manipur (Langol), and has since moved to its own interim city campus at Mantripukhri, Imphal, while a permanent 150-acre campus is built in Senapati district.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'Where is the campus located?', 'Currently at Mantripukhri, Imphal, Manipur - 795002; the permanent campus is being developed in Senapati district.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-manipur'), 'What is the official admissions contact?', 'director@iiitmanipur.ac.in, phone +91-94852-00604.', 3);

-- Indian Institute of Information Technology, Dharwad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Dharwad', 'IIIT', 'Engineering', 'Government', null, 'Dharwad', 'Karnataka', 'https://iiitdwd.ac.in', 'Indian Institute of Information Technology Dharwad, Ittigatti Road, near Sattur Colony, Dharwad - 580009, Karnataka, India',
  'contact@iiitdwd.ac.in', '0836-2250879', 'Established in 2015 in PPP mode between the Ministry of Education, the Government of Karnataka, and industry partner Keonics under an Act of Parliament, IIIT Dharwad initially functioned from a temporary campus at the IT Park in Hubli before moving to its own campus in Dharwad. It offers B.Tech programs in Computer Science Engineering, Electronics & Communication Engineering, and the comparatively distinctive Data Science and Artificial Intelligence branch, and has posted a marked rise in placement outcomes in recent years, with its highest package crossing Rs 78 lakh in 2025.', array['Central Library','Hostels','Health Centre','Wi-Fi enabled campus','Computer Centre','Sports facilities','Training & Placement Cell','Located in the Hubli-Dharwad twin-city IT corridor'], 'B.Tech admission is via JEE Main rank followed by JoSAA/CSAB centralized counselling; no separate institute-level entrance test.',
  'JEE Main', null, null, 12, 78.12,
  82, 'Amazon, Cognizant, Deloitte, IBM, Infosys, TCS, Wipro, Capgemini', 2025, 'iiit-dharwad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-dharwad') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Data Science and Artificial Intelligence');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'B.Tech Data Science and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-dharwad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'How can I get admission into IIIT Dharwad''s B.Tech program?', 'Only through JEE Main followed by JoSAA/CSAB counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'What makes IIIT Dharwad distinctive?', 'It offers a dedicated B.Tech in Data Science and Artificial Intelligence alongside CSE and ECE, and sits within the growing Hubli-Dharwad IT corridor in Karnataka.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'Where is the campus located?', 'Ittigatti Road, near Sattur Colony, Dharwad, Karnataka - 580009; the institute started out at a temporary campus in Hubli''s IT Park.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-dharwad'), 'What is the official admissions contact?', 'contact@iiitdwd.ac.in, phone 0836-2250879.', 3);
