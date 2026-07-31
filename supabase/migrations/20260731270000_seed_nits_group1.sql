
-- National Institute of Technology Agartala
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Agartala', 'IIT', 'Engineering', 'Government', null, 'Agartala (Jirania)', 'Tripura', 'https://www.nita.ac.in', 'National Institute of Technology Agartala, Jirania, West Tripura - 799046, India',
  'director@nita.ac.in', '+91-381-2546630', 'NIT Agartala began as Tripura Engineering College in 1965 and was converted into a National Institute of Technology (Institute of National Importance) on April 1, 2006, under the Ministry of Education. It is the only NIT in Tripura and a key technical institute for India''s north-east region, offering undergraduate, postgraduate and doctoral programs across engineering, science and management.', array['Central Library','Boys'' and girls'' hostels','Health Centre','Computer Centre','Sports Complex','Placement Cell','Campus-wide Wi-Fi','Workshops and Laboratories'], 'UG admission to B.Tech is entirely through JEE Main scores followed by centralized counselling via JoSAA, with CSAB handling leftover-seat rounds. Roughly 50% of seats are reserved for home-state (Tripura) candidates.',
  'JEE Main', null, 5.73, 9.83, 52,
  null, 'Nvidia, TCS, Infosys, Wipro, Amazon, Cognizant, L&T, Capgemini', 2025, 'nit-agartala'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-agartala') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Production Engineering','B.Tech Chemical Engineering','B.Tech Biotechnology and Biochemical Engineering','B.Tech Electronics and Instrumentation Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Production Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Biotechnology and Biochemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-agartala'), 'B.Tech Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.73, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-agartala'), 2023, 91)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-agartala'), 2024, 82)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-agartala');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-agartala'), 'What exam is required for B.Tech admission at NIT Agartala?', 'JEE Main, followed by centralized counselling through JoSAA (and CSAB for spot rounds).', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-agartala'), 'What is the total B.Tech tuition fee for 4 years at NIT Agartala?', 'Approximately ₹5.73 lakh; SC/ST/PwD and low-income (below ₹1 lakh/year family income) students get full tuition remission.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-agartala'), 'What was the highest placement package at NIT Agartala in 2025?', '₹52 LPA was the highest package reported for the 2025 placement season.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-agartala'), 'Is NIT Agartala''s NIRF rank published as a single number or a band?', 'For NIRF 2025 Engineering, NIT Agartala fell into the 101-150 rank-band rather than a single numeric rank, versus rank 82 in 2024 and 91 in 2023.', 3);

-- National Institute of Technology, Andhra Pradesh
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Andhra Pradesh', 'IIT', 'Engineering', 'Government', null, 'Tadepalligudem', 'Andhra Pradesh', 'https://nitandhra.ac.in', 'National Institute of Technology Andhra Pradesh, Kadakatla, Tadepalligudem - 534101, West Godavari District, Andhra Pradesh, India',
  'admissions@nitandhra.ac.in', '08818-235073', 'NIT Andhra Pradesh was established in 2015 as part of the government''s initiative to have at least one NIT in every state, and now operates from its permanent campus near Tadepalligudem. As one of the newer NITs, it offers a compact set of core and emerging engineering B.Tech branches, admitting students exclusively through JEE Main/JoSAA.', array['Central Library','Hostels','Health Centre','Sports facilities','Campus-wide Wi-Fi','Computer Centre','Placement Cell','Laboratories and Workshops'], 'UG admission to B.Tech is through JEE Main scores followed by centralized counselling via JoSAA, with CSAB/CCMT handling later rounds. Roughly 50% of seats in each branch are reserved for Andhra Pradesh home-state candidates.',
  'JEE Main', null, 7.81, 7.24, 65,
  81, 'Google, Oracle, Cognizant, IBM, Accenture, Wipro, Tech Mahindra, Infosys', 2025, 'nit-andhra-pradesh'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-andhra-pradesh') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 45, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', 45, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.81, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM, JEE Main', 15, 7.81, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-andhra-pradesh');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'How is admission to NIT Andhra Pradesh''s B.Tech program conducted?', 'Purely via JEE Main rank, allocated through JoSAA centralized counselling, with roughly half the seats per branch reserved for Andhra Pradesh home-state candidates.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'What is NIT Andhra Pradesh''s NIRF 2025 Engineering ranking?', 'It falls in the 201-300 rank-band in NIRF 2025 Engineering rankings, reflecting its status as a newer NIT still building its research/outcome profile.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'What is the total 4-year B.Tech fee at NIT Andhra Pradesh?', 'Approximately ₹7.81 lakh total, with income-based fee remission for lower-income families.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-andhra-pradesh'), 'What was the highest package offered at NIT Andhra Pradesh placements?', '₹65 LPA was reported as the highest package in the most recent (2025) placement season.', 3);

-- National Institute of Technology Arunachal Pradesh
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Arunachal Pradesh', 'IIT', 'Engineering', 'Government', null, 'Jote (near Itanagar)', 'Arunachal Pradesh', 'https://www.nitap.ac.in', 'National Institute of Technology Arunachal Pradesh, Village Jote, Papum Pare District, Arunachal Pradesh - 791113, India',
  'nitapadmin@nitap.ac.in', '0360-2954549', 'NIT Arunachal Pradesh was established in 2010 as one of the newer NITs and now runs from its permanent campus at Jote. It is the sole NIT in Arunachal Pradesh and serves the north-eastern region with a compact set of core engineering B.Tech branches.', array['Library','Hostels','Health Centre','Computer Centre','Sports facilities','Campus-wide Wi-Fi','Workshops and Laboratories','Placement Cell'], 'UG admission to B.Tech is through JEE Main scores followed by centralized counselling via JoSAA/CSAB.',
  'JEE Main', null, 5.63, 7.37, 58,
  95, 'Deloitte, Nokia, Samsung, Jio, TCS, Capgemini, Wipro, Infosys', 2025, 'nit-arunachal-pradesh'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-arunachal-pradesh') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.63, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.63, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.63, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.63, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.63, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-arunachal-pradesh');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'How many B.Tech branches does NIT Arunachal Pradesh currently offer?', 'Five confirmed active B.Tech branches: Computer Science & Engineering, Electrical Engineering, Electronics & Communication Engineering, Mechanical Engineering, and Civil Engineering.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'What was NIT Arunachal Pradesh''s placement rate in 2025?', '95% of eligible students were placed in the 2025 season, with 287 students securing offers from 100+ recruiting companies.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'What is the total 4-year B.Tech fee at NIT Arunachal Pradesh?', 'Roughly ₹5.63 lakh total, with full tuition remission for family incomes below ₹1 lakh/year and partial remission for ₹1-5 lakh/year.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-arunachal-pradesh'), 'Has NIT Arunachal Pradesh''s NIRF rank-band changed recently?', 'It has held steady in the 101-150 Engineering rank-band across NIRF 2023, 2024 and 2025.', 3);

-- National Institute of Technology Calicut
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Calicut', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Kozhikode (Calicut)', 'Kerala', 'https://nitc.ac.in', 'National Institute of Technology Calicut, NIT Campus P.O., Kozhikode, Kerala - 673601, India',
  'ugadmissions@nitc.ac.in', '0495-2286118', 'NIT Calicut was established on September 1, 1961 as Calicut Regional Engineering College (REC) and was granted Institute of National Importance/NIT status in 2002. It is one of the oldest and most reputed NITs in India, with a 120-hectare residential campus about 22 km from Kozhikode city. It is consistently ranked among India''s top-25 engineering institutes by NIRF, with its Architecture & Planning and Management programs also nationally ranked.', array['Central Library (1.5+ lakh books, 190+ journals)','13 hostels (10 boys, 3 girls)','Health Centre','Sports Complex','Computer Centre with 24-hour internet','Training and Placement Office','Workshops and Laboratories','Guest House and Auditorium'], 'UG admission to B.Tech and B.Arch is based purely on JEE Main (Paper 1) performance, with seats allocated through centralized JoSAA/CSAB counselling — there is no separate institute application for domestic students. A limited number of supernumerary seats exist for foreign nationals/NRIs/PIOs via the DASA scheme.',
  'JEE Main', 21, 8.5, 12.17, 56.59,
  82.16, 'Google, Microsoft, Goldman Sachs, DE Shaw, Salesforce, Qualcomm, Cisco, Atlassian', 2025, 'nit-calicut'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-calicut') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Production and Industrial Engineering','B.Tech Information Technology','B.Tech Biotechnology and Bioscience Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 89, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 102, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, 8.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-calicut'), 'B.Tech Biotechnology and Bioscience Engineering', '4 years', '10+2 with PCM, JEE Main', 19, 8.5, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-calicut'), 2023, 22)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-calicut'), 2024, 23)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-calicut'), 2025, 21)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-calicut');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-calicut'), 'How is B.Tech admission conducted at NIT Calicut?', 'Solely via JEE Main (Paper 1) rank, allocated through centralized JoSAA/CSAB counselling; there''s no separate institute-level application for domestic students, only a limited DASA quota for foreign nationals/NRIs.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-calicut'), 'What was NIT Calicut''s NIRF 2025 Engineering rank?', 'Rank 21 nationally, with a score of 63.05, per the official NIRF 2025 Engineering ranking.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-calicut'), 'What is the average and highest package in NIT Calicut''s most recent placement season?', 'For the 2025 season, the average package was ₹12.17 LPA and the highest was ₹56.59 LPA, with an overall placement percentage around 82%.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-calicut'), 'How many hostels does NIT Calicut have?', '13 hostels on campus — 10 for boys and 3 for girls — each with 24-hour internet access.', 3);

