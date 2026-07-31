
-- Indian Institute of Technology Patna
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Patna', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Bihta (Patna)', 'Bihar', 'https://www.iitp.ac.in', 'IIT Patna, Bihta, Kanpa Road, Bihta, Patna, Bihar - 801106, India',
  null, '0611-5233001', 'IIT Patna was established in 2008 by an Act of Parliament as one of the second-generation IITs and is recognized as an Institute of National Importance. Its permanent 501-acre campus at Bihta was inaugurated in 2015. The institute offers UG, PG and PhD programs across engineering, sciences, and humanities, and has grown a strong regional reputation in Bihar/Eastern India for engineering education.', array['Central Library (50,000+ books, digital databases)','Boys'' and Girls'' Hostels','Sports complex (basketball, volleyball, badminton, tennis, cricket, table tennis)','Centre for Career Development','Campus-wide Wi-Fi','Health centre','Faculty residences','501-acre campus'], 'UG admission to B.Tech programs is entirely through JEE Advanced followed by centralized JoSAA counselling; seats are allocated by rank, category and branch preference. Direct applications are not accepted for B.Tech.',
  'JEE Main, JEE Advanced', 19, 2.2, 25.52, 60,
  null, 'Amazon, Microsoft, Oracle, TCS, Accenture, Wipro, Bosch, Infosys', 2024, 'iit-patna'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-patna') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Mathematics and Computing','B.Tech Data Science and Artificial Intelligence','B.Tech Chemical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~3200 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~5700 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~6870 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~10650 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~4950 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Data Science and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~12500 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-patna'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-patna'), 2023, 41)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-patna'), 2024, 34)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-patna'), 2025, 19)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-patna');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-patna'), 'Which exams does IIT Patna accept for B.Tech admission?', 'Only JEE Advanced rank via JoSAA counselling; JEE Main is required to qualify for JEE Advanced.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-patna'), 'Is tuition fee waived for SC/ST/PwD students?', 'Yes, tuition fee is waived for SC/ST/PwD candidates as per common IIT fee policy.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-patna'), 'Where is the IIT Patna campus located?', 'The permanent campus is in Bihta, about 35 km from Patna city, Bihar.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-patna'), 'Does IIT Patna offer an AI/Data Science branch?', 'Yes, IIT Patna offers a dedicated B.Tech in Data Science and Artificial Intelligence.', 3);

-- Indian Institute of Technology Indore
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Indore', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Indore (Simrol)', 'Madhya Pradesh', 'https://www.iiti.ac.in', 'Indian Institute of Technology Indore, Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India',
  'aoaa@iiti.ac.in', '+91-731-2438700', 'IIT Indore was established in 2009 as one of the newer IITs and has risen quickly in national rankings, entering the NIRF Engineering top 15 in recent years. Its permanent 501-acre campus is at Simrol, about 25 km from Indore city. The institute is known for strong research output relative to its age and offers a broad set of interdisciplinary UG programs, including Engineering Physics and Space Science and Engineering.', array['Central Library (35,000+ books, digital resources)','5 hostels with Wi-Fi','Sports complex (badminton, volleyball, basketball courts)','Research and innovation centres','Health centre','Campus-wide Wi-Fi','Faculty and staff residences'], 'UG admission to B.Tech and B.Des programs is through JEE Advanced followed by JoSAA counselling based on rank, category, and branch/institute preference.',
  'JEE Main, JEE Advanced', 12, null, 27.27, 137,
  null, 'Google, Microsoft, Amazon, Flipkart, Tata Steel', 2024, 'iit-indore'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-indore') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Engineering Physics','B.Tech Space Science and Engineering','B.Tech Mathematics and Computing','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~1628-3789 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~3673-3723 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~6802-6822 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~9821-10641 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~7508-8824 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~7602-7622 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Space Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~6630-6650 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~2008-2099 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-indore'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~10884-10904 (General, 2025)', null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-indore'), 2023, 14)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-indore'), 2024, 16)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-indore'), 2025, 12)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-indore');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-indore'), 'Which exams does IIT Indore accept for B.Tech admission?', 'JEE Advanced rank via JoSAA counselling; JEE Main is required to qualify.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-indore'), 'Does IIT Indore offer Space Science as an undergraduate branch?', 'Yes, B.Tech in Space Science and Engineering is offered, one of the few IITs with this specialization.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-indore'), 'Is fee waived for SC/ST/PwD students?', 'Yes, full tuition fee waiver applies for SC/ST/PwD candidates, per common IIT fee policy.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-indore'), 'Where is the IIT Indore campus located?', 'The permanent campus is at Simrol, about 25 km from Indore city, Madhya Pradesh.', 3);

-- Indian Institute of Technology Mandi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Mandi', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Mandi (Kamand)', 'Himachal Pradesh', 'https://www.iitmandi.ac.in', 'Indian Institute of Technology Mandi, Kamand Campus, VPO Kamand, District Mandi, Himachal Pradesh - 175005, India',
  null, '01905-267015', 'IIT Mandi was established in 2009 and is located in the Kamand Valley of Himachal Pradesh, about 14 km from Mandi town, on a mountainous campus spanning roughly 538 hectares. It is known for its scenic hill-campus setting and strong focus on interdisciplinary research. The institute offers B.Tech programs across core engineering plus emerging fields like Data Science and Engineering.', array['Central Library (41,000+ books, e-journals)','8-9 hostels (Mandi town and Kamand campuses)','Sports grounds and facilities','Innovation and research centres','Health/medical facility','Campus-wide Wi-Fi','Faculty housing'], 'UG admission to B.Tech programs is via JEE Advanced followed by JoSAA counselling; seats allotted by rank, category, and branch preference.',
  'JEE Main, JEE Advanced', 26, 2.06, 21.64, 65,
  95.04, 'Microsoft, Amazon, Qualcomm, Samsung, Adobe, Bosch, Cisco, Accenture', 2024, 'iit-mandi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-mandi') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Engineering Physics','B.Tech Mathematics and Computing','B.Tech Data Science and Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~3123 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-mandi'), 'B.Tech Data Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-mandi'), 2023, 33)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-mandi'), 2024, 31)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-mandi'), 2025, 26)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-mandi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-mandi'), 'Which exams does IIT Mandi accept for B.Tech admission?', 'JEE Advanced rank via JoSAA counselling; JEE Main is required to qualify.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-mandi'), 'Where is the IIT Mandi campus located?', 'The Kamand campus is about 14 km from Mandi town in Himachal Pradesh, spread across a hilly ~538-hectare site.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-mandi'), 'Is fee waived for SC/ST/PwD students?', 'Tuition fees are waived for SC/ST/PwD students, consistent with the common IIT tuition-waiver policy.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-mandi'), 'Does IIT Mandi offer a Data Science branch?', 'Yes, a dedicated B.Tech in Data Science and Engineering is offered alongside core engineering branches.', 3);

-- Indian Institute of Technology (Banaras Hindu University), Varanasi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology (Banaras Hindu University), Varanasi', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Varanasi', 'Uttar Pradesh', 'https://www.iitbhu.ac.in', 'Indian Institute of Technology (BHU), Banaras Hindu University Campus, Varanasi - 221005, Uttar Pradesh, India',
  'help.admission@iitbhu.ac.in', '0542-2368004', 'IIT (BHU) Varanasi traces its roots to Banaras Engineering College founded in 1919, later merged into the Institute of Technology, Banaras Hindu University (IT-BHU) in 1968, and formally converted into an IIT in 2012. It sits within the historic ~1300-acre Banaras Hindu University campus, noted for Indo-Gothic architecture. It has 11 engineering departments and a wide UG branch portfolio including Mining, Metallurgy, and Ceramic Engineering not found at most other IITs.', array['Main Library (collection dating to 1918, e-journals/e-books)','16 hostels with AC rooms, Wi-Fi, gyms','Sports facilities (swimming pool, tennis, basketball, volleyball courts)','Health centre / Sir Sunder Lal Hospital (shared BHU campus)','Research centres and specialized engineering labs','Campus-wide Wi-Fi','Faculty residences','Historic Indo-Gothic campus architecture'], 'UG admission to all B.Tech programs is via JEE Advanced followed by JoSAA counselling; seats allocated by rank, category, gender-neutral/female-supernumerary quotas, and branch preference.',
  'JEE Main, JEE Advanced', 10, 2.15, 23.49, 168,
  92.33, 'Google, Microsoft, Amazon, Goldman Sachs, Tata Steel, Samsung, Qualcomm, Adobe', 2025, 'iit-bhu-varanasi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-bhu-varanasi') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical Engineering','B.Tech Mining Engineering','B.Tech Ceramic Engineering','B.Tech Pharmaceutical Engineering and Technology','B.Tech Biochemical Engineering','B.Tech Biomedical Engineering','B.Tech Materials Science and Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~1489 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Metallurgical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Ceramic Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Pharmaceutical Engineering and Technology', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Biochemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Biomedical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'B.Tech Materials Science and Technology', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 2023, 15)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 2024, 10)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 2025, 10)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-bhu-varanasi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'Which exams does IIT BHU accept for B.Tech admission?', 'JEE Advanced rank via JoSAA counselling; JEE Main qualification is required first.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'Does IIT BHU offer Mining and Ceramic Engineering, unlike most IITs?', 'Yes — as a converted heritage engineering institute, IIT BHU retains legacy branches like Mining Engineering and Ceramic Engineering not found at most newer IITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'Is tuition fee waived for SC/ST/PwD students?', 'Yes, full tuition fee waiver applies for SC/ST/PwD students, with partial remission for lower-income general/OBC families.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhu-varanasi'), 'Where is the IIT BHU campus located?', 'Within the Banaras Hindu University campus in Varanasi, Uttar Pradesh — a historic ~1300-acre shared campus.', 3);

