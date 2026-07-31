
-- Dr. B. R. Ambedkar National Institute of Technology, Jalandhar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Dr. B. R. Ambedkar National Institute of Technology, Jalandhar', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Jalandhar', 'Punjab', 'https://nitj.ac.in', 'Dr. B. R. Ambedkar National Institute of Technology, Grand Trunk Road, Barnala-Amritsar Bypass Road, Jalandhar, Punjab - 144011, India',
  'registrar@nitj.ac.in', '0181-2690301', 'Established in 1987 as Regional Engineering College Jalandhar and converted to an NIT (renamed after Dr. B. R. Ambedkar) in 2002, it is one of Punjab''s premier technical institutes and an Institute of National Importance. Its campus sits along the GT Road corridor on the Jalandhar-Amritsar bypass.', array['Central Library','Hostels (separate for boys and girls)','Central Computer Centre','Sports complex and gymnasium','Wi-Fi campus','Health centre/dispensary','Auditorium','Central workshop and engineering labs'], 'UG admission to B.Tech programs is through JEE Main scores followed by centralized counselling under JoSAA. Seats are allotted across multiple rounds based on rank, category, and home-state/other-state quota.',
  'JEE Main', 55, null, 9.78, 52,
  91.88, 'Google, Amazon, Nvidia, Atlassian, Microsoft, Samsung, Infosys, TCS', 2025, 'nit-jalandhar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-jalandhar') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Industrial and Production Engineering','B.Tech Instrumentation and Control Engineering','B.Tech Textile Technology','B.Tech Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 90, null, 'AIR ~9347-14114 (2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', 30, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 90, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', 30, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 90, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', 90, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', 84, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Industrial and Production Engineering', '4 years', '10+2 with PCM, JEE Main', 84, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Instrumentation and Control Engineering', '4 years', '10+2 with PCM, JEE Main', 84, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Textile Technology', '4 years', '10+2 with PCM, JEE Main', 78, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM, JEE Main', 36, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 2024, 58)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 2025, 55)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-jalandhar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'How can I get admission to NIT Jalandhar''s B.Tech program?', 'Admission is entirely through JEE Main scores and the JoSAA centralized counselling process; there is no separate institute-level entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'What is NIT Jalandhar''s latest NIRF Engineering rank?', 'NIT Jalandhar was ranked 55th in the NIRF Engineering category for 2025, improving from 58th in 2024.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'Which branch is toughest to get into at NIT Jalandhar?', 'Computer Science and Engineering typically has the most competitive (lowest) closing ranks among all branches.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jalandhar'), 'Does NIT Jalandhar have 100% placements?', 'Not across all branches; overall B.Tech placement was 91.88% in 2025, with some branches like Mechanical, Textile Technology, and Industrial & Production Engineering reporting full placement.', 3);

-- National Institute of Technology, Jamshedpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Jamshedpur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Jamshedpur (Adityapur)', 'Jharkhand', 'https://www.nitjsr.ac.in', 'National Institute of Technology Jamshedpur, Adityapur, District Saraikela Kharsawan, Jharkhand - 831014, India',
  'dean.ac@nitjsr.ac.in', '0657-2372412', 'Originally established in 1960 and later a Regional Engineering College, it was converted into a National Institute of Technology with Institute of National Importance status in 2002. It is located in the industrial city of Jamshedpur (Adityapur), Jharkhand, with strong industry linkage owing to its proximity to Tata Steel and other manufacturing units.', array['13 hostel halls of residence (boys and girls)','Central Library','Central Computer Centre','Gymnasium and sports facilities','Auditorium','Wi-Fi campus','24/7 medical/health centre','Cafeteria and convenience stores'], 'UG admission to B.Tech is based on JEE Main rank followed by JoSAA centralized counselling.',
  'JEE Main', 82, null, 13.62, 144,
  94.57, 'BNY Mellon, EY, Infosys, Amazon, Accenture, Flipkart, Samsung, Tata Steel', 2025, 'nit-jamshedpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-jamshedpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Industrial and Production Engineering','B.Tech Engineering and Computational Mechanics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 116, null, 'AIR ~9968 (2024, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', 114, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Industrial and Production Engineering', '4 years', '10+2 with PCM, JEE Main', 31, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'B.Tech Engineering and Computational Mechanics', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 2025, 82)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-jamshedpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'How is admission to NIT Jamshedpur''s B.Tech granted?', 'Through JEE Main scores and the JoSAA counselling process; candidates must also meet Class 12 PCM eligibility criteria.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'What was NIT Jamshedpur''s highest package in 2025 placements?', 'The overall highest package offered was ₹144 LPA, with the CSE branch highest reaching ₹82 LPA.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'What is NIT Jamshedpur''s NIRF Engineering rank?', 'It was ranked 82nd in NIRF Engineering 2025, improving from the 101-150 band in 2024.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-jamshedpur'), 'What facilities does the NIT Jamshedpur campus offer?', '13 hostel halls, a large central library, computer centre, gym, 24/7 medical facility, auditorium, and Wi-Fi campus, among others.', 3);

-- National Institute of Technology, Kurukshetra
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Kurukshetra', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Kurukshetra (Thanesar)', 'Haryana', 'https://nitkkr.ac.in', 'National Institute of Technology, Thanesar, Kurukshetra, Haryana - 136119, India',
  'admission@nitkkr.ac.in', '01744-233208', 'Established in 1963 as Regional Engineering College, Kurukshetra, a joint venture of the Government of India and the Government of Haryana, it was converted into a National Institute of Technology with Deemed University status in 2002 and became an Institute of National Importance in 2008. The 300-acre campus is located near the historic city of Kurukshetra.', array['Central Library','Multiple hostels for boys and girls','Central Computer Centre','Sports complex and gymnasium','Wi-Fi campus','Health centre','Auditorium','Central workshop and labs'], 'UG admission to B.Tech is based on JEE Main rank followed by centralized counselling under JoSAA. Applicants register on the JoSAA portal, fill branch/institute preference choices, and are allotted seats across multiple rounds.',
  'JEE Main', 85, 6.87, 12.35, 63.12,
  85.9, 'Microsoft, Amazon, Adobe, Samsung, Qualcomm, TCS, Infosys, Bosch', 2025, 'nit-kurukshetra'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-kurukshetra') and name in ('B.Tech Computer Engineering','B.Tech Artificial Intelligence and Machine Learning','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Production and Industrial Engineering','B.Tech Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM, JEE Main', 105, 6.87, 'AIR ~7595 (2024, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Artificial Intelligence and Machine Learning', '4 years', '10+2 with PCM, JEE Main', 30, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 70, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.87, 'AIR ~46619 (2024, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM, JEE Main', null, 6.87, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 2024, 81)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 2025, 85)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-kurukshetra');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'How can I get admission into NIT Kurukshetra''s B.Tech programs?', 'Admission is via JEE Main rank and JoSAA centralized counselling; there is no separate institute entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'What is NIT Kurukshetra''s total B.Tech fee?', 'The total academic fee across 4 years is approximately ₹6.87 lakh, though it varies slightly by branch.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'What is NIT Kurukshetra''s NIRF Engineering rank?', 'It was ranked 85th in NIRF Engineering 2025, having slipped from 81st in 2024.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-kurukshetra'), 'When was NIT Kurukshetra established?', 'It was founded in 1963 as Regional Engineering College Kurukshetra and converted to an NIT (Institute of National Importance) in 2002/2008.', 3);

-- National Institute of Technology Manipur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Manipur', 'IIT', 'Engineering', 'Government', null, 'Imphal', 'Manipur', 'https://nitmanipur.ac.in', 'National Institute of Technology Manipur, Langol, Imphal, Manipur, India',
  'admin@nitmanipur.ac.in', '0385-2445812', 'NIT Manipur commenced its first academic session on 2 August 2010 with three engineering branches, initially operating out of a temporary campus. It now functions from its permanent 341.5-acre campus at Langol, Imphal, offering B.Tech programs across five engineering branches plus science and humanities departments.', array['Hostels for boys and girls','Central Library','Computer centre','Sports ground','Health centre','Wi-Fi campus'], 'UG admission to B.Tech is based on JEE Main rank followed by JoSAA centralized counselling, same as other NITs.',
  'JEE Main', null, 5.79, 7.3, 14.5,
  null, 'Amazon, Microsoft, Wipro, L&T, Bharat Petroleum, TCS', 2025, 'nit-manipur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-manipur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-manipur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.79, 'AIR ~30611-44556 (2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-manipur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.79, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-manipur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.79, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-manipur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.79, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-manipur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.79, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-manipur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-manipur'), 'When was NIT Manipur established?', 'It started its first academic session on 2 August 2010 as one of the ten new NITs created that year.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-manipur'), 'How can students get admission into NIT Manipur?', 'Through JEE Main rank followed by JoSAA centralized counselling, identical to the process at other NITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-manipur'), 'Does NIT Manipur have multi-year NIRF ranking history?', 'Limited — it has appeared in the NIRF Engineering rank bands only in recent years (101-150 in 2024, 151-200 in 2025), so a precise numeric rank is not published.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-manipur'), 'What is the total B.Tech fee at NIT Manipur?', 'Approximately ₹5.79 lakh for the full 4-year program, inclusive of tuition and various institute fees.', 3);

