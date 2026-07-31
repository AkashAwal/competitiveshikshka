
-- National Institute of Technology Delhi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Delhi', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Delhi (Narela)', 'Delhi', 'https://nitdelhi.ac.in', 'National Institute of Technology Delhi, Plot No. FA7, Zone P1, GT Karnal Road, Delhi - 110036, India',
  'registraroffice@nitdelhi.ac.in', '011-33861005', 'NIT Delhi is an autonomous Institute of National Importance under India''s Ministry of Education, established in 2010. It began academic operations at NIT Warangal before relocating through temporary campuses to its current permanent GT Karnal Road site in Narela. The institute offers UG, PG, and doctoral programs in Engineering, Sciences, Management, and Humanities.', array['Library with e-journals and book bank','Boys'' hostel on main Narela campus','Girls'' hostel at Rohini','Computer Centre','Sports facilities (badminton, basketball, football, volleyball)','Campus-wide Wi-Fi','Medical centre','Startup centre'], 'UG admission is entirely through JEE Main followed by JoSAA centralized counselling; seats are allocated by category, home-state/other-state quota, and JEE Main rank.',
  'JEE Main', 65, 6.44, 17.19, 58.5,
  86.28, 'Google, Amazon, Goldman Sachs, DE Shaw, Morgan Stanley, Oracle, Adobe, Flipkart', 2025, 'nit-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-delhi') and name in ('B.Tech Computer Science and Engineering','B.Tech Artificial Intelligence and Data Science','B.Tech Electronics and Communication Engineering','B.Tech VLSI Design and Technology','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Aerospace Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 60, 6.44, 'AIR ~8971 (2025, round 1)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Main', 10, 6.44, 'AIR ~9420 (2025, round 1)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 35, 6.44, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech VLSI Design and Technology', '4 years', '10+2 with PCM, JEE Main', null, 6.44, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.44, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.44, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.44, 'AIR ~36027 (2025, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-delhi'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.44, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-delhi'), 2023, 51)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-delhi'), 2024, 45)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-delhi'), 2025, 65)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-delhi'), 'How can I get admission into NIT Delhi''s B.Tech program?', 'Admission is exclusively through JEE Main followed by JoSAA centralized counselling; there is no separate institute-level entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-delhi'), 'Is NIT Delhi located in Delhi city?', 'The permanent campus is on GT Karnal Road, Narela, on Delhi''s northern outskirts, not central Delhi.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-delhi'), 'What is NIT Delhi''s total 4-year B.Tech fee?', 'Approximately ₹6.44 lakh total, with substantial tuition remission for students from families earning under ₹5 lakh/year and full waivers for SC/ST/PwD.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-delhi'), 'What was NIT Delhi''s most recent NIRF Engineering rank?', 'Rank 65 in NIRF 2025 (down from 45 in 2024 and 51 in 2023).', 3);

-- National Institute of Technology Durgapur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Durgapur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Durgapur', 'West Bengal', 'https://nitdgp.ac.in', 'National Institute of Technology Durgapur, Mahatma Gandhi Avenue, A-Zone, Durgapur, West Bengal - 713209, India',
  'registrar@nitdgp.ac.in', '0343-2546397', 'Established in 1960 as Regional Engineering College Durgapur, one of India''s original RECs, it is now a fully government-funded Institute of National Importance under the NIT Act, 2007. The 187-acre residential campus, 160 km from Kolkata, is among the oldest technical institutes in eastern India with over 25,000 alumni.', array['Central Library','Computer Centre','7 boys'' hostels + 2 girls'' hostels','Medical unit','Bank and post office branches','Guest house','Training and Placement Cell','Sports grounds'], 'UG admission is via JEE Main scores followed by JoSAA centralized counselling for seat allocation across engineering branches.',
  'JEE Main', 49, 6.48, null, 80,
  82, 'JPMorgan Chase, Microsoft, Adobe, Oracle, Samsung, Texas Instruments, Cisco, Deloitte', 2025, 'nit-durgapur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-durgapur') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, 'AIR ~9010 (2025, closing, other-state)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, 'AIR ~21126 (2025, closing, general)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM, JEE Main', null, 6.48, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-durgapur'), 2023, 43)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-durgapur'), 2024, 44)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-durgapur'), 2025, 49)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-durgapur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'When was NIT Durgapur established?', 'In 1960, as Regional Engineering College Durgapur, one of India''s first RECs, later converted to NIT status under the NIT Act, 2007.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'How many B.Tech branches does NIT Durgapur offer?', 'Nine branches across roughly 936-969 total UG seats, including CSE, IT, ECE, EE, ME, CE, Chemical, Metallurgical & Materials, and Biotechnology.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'What is the admission process for NIT Durgapur B.Tech?', 'JEE Main followed by JoSAA centralized counselling; no separate institute entrance exam.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-durgapur'), 'What was NIT Durgapur''s most recent official NIRF Engineering rank?', 'Rank 49 in NIRF 2025.', 3);

-- National Institute of Technology Goa
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Goa', 'IIT', 'Engineering', 'Government', null, 'Cuncolim', 'Goa', 'https://www.nitgoa.ac.in', 'National Institute of Technology Goa, Kottamoll Plateau, Cuncolim Municipal Area, Salcete Taluka, South Goa District, Goa - 403703, India',
  'asst.registrar@nitgoa.ac.in', '0832-2404200', 'NIT Goa was established in 2010 by an Act of Parliament and designated an Institute of National Importance under the Ministry of Education. It now operates from its permanent Cuncolim campus in South Goa. As one of the newer, smaller NITs, it offers a focused set of five B.Tech disciplines alongside M.Tech and PhD programs.', array['Modern laboratories and workshops','Library with print and e-resources','Sports facilities','Hostel accommodation','Training and Placement Cell','Computer centre'], 'UG admission is via JEE Main followed by JoSAA centralized counselling.',
  'JEE Main', null, 10.1, 8.1, 21.6,
  82.22, 'Amazon, ISRO, Samsung, TCS, Infosys, L&T, Bosch, Wipro', 2025, 'nit-goa'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-goa') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-goa'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 10.1, 'AIR ~11696 (2025, round 1)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-goa'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 10.1, 'AIR ~20666 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-goa'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 10.1, 'AIR ~24214 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-goa'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 10.1, 'AIR ~31754 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-goa'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 10.1, 'AIR ~47155 (2025)', null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-goa');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-goa'), 'How many B.Tech branches does NIT Goa offer?', 'Five: Computer Science and Engineering, Electronics and Communication Engineering, Electrical and Electronics Engineering, Mechanical Engineering, and Civil Engineering.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-goa'), 'What is NIT Goa''s NIRF Engineering ranking?', 'NIT Goa falls in the 101-150 rank band for NIRF Engineering 2025, per NIT Goa''s own uploaded NIRF report; it has not been placed within the published top-100 numeric list.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-goa'), 'What is the total 4-year B.Tech fee at NIT Goa?', 'Approximately ₹10.1 lakh, with significant tuition remission for families earning under ₹5 lakh/year and full waivers for SC/ST/PwD students.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-goa'), 'How is admission to NIT Goa B.Tech decided?', 'Through JEE Main scores and JoSAA centralized counselling, the same process used for all NITs.', 3);

-- National Institute of Technology Hamirpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Hamirpur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Hamirpur', 'Himachal Pradesh', 'https://www.nith.ac.in', 'National Institute of Technology Hamirpur, Hamirpur, Himachal Pradesh - 177005, India',
  'registrar@nith.ac.in', '01972-254010', 'NIT Hamirpur was established in 1986 as Regional Engineering College Hamirpur, a joint venture of the Government of India and Government of Himachal Pradesh, starting with only Civil and Electrical Engineering. It was elevated to Deemed University / NIT status in 2002 and declared an Institute of National Importance under the NIT Act, 2007.', array['Library','Multiple gender-segregated hostels','Computer Centre','Sports facilities','Training and Placement Cell','Medical facility','Departmental labs and workshops'], 'UG admission is via JEE Main followed by JoSAA centralized counselling, with seats split 50% Himachal Pradesh home-state quota and 50% All-India quota, plus reserved-category and female-supernumerary seats.',
  'JEE Main', 97, 6.82, 10.61, 208,
  91.92, 'Infosys, Wipro, IBM, Oracle, SAP, Maruti Suzuki, Bosch, Goldman Sachs', 2024, 'nit-hamirpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-hamirpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Materials Science and Engineering','B.Tech Mathematics and Computing','B.Tech Engineering Physics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 124, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 105, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', 113, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 125, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', 111, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Materials Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Main', null, 6.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Main', null, 6.82, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 2025, 97)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-hamirpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'What is the seat split between Himachal Pradesh and All-India candidates at NIT Hamirpur?', '50% of seats are reserved for Himachal Pradesh home-state candidates, and 50% for All-India (other-state) candidates.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'How many total B.Tech seats does NIT Hamirpur offer?', '944 seats across nine branches, per the JoSAA institute profile.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'What was NIT Hamirpur''s placement rate for 2024-25?', '91.92% overall, with an average package of ₹10.61 LPA.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-hamirpur'), 'What was NIT Hamirpur''s most recent NIRF Engineering rank?', 'Rank 97 in NIRF 2025 (improved from the 101-150 band in 2024).', 3);

