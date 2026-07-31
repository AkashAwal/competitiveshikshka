
-- Indian Institute of Technology Bhubaneswar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Bhubaneswar', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Bhubaneswar (Khordha district)', 'Odisha', 'https://www.iitbbs.ac.in', 'Indian Institute of Technology Bhubaneswar, Argul, Jatni, Khordha, Odisha - 752050, India',
  'academic.btech@iitbbs.ac.in', '+91-674-713-4560', 'IIT Bhubaneswar was established by the Government of India on 22 July 2008 as one of the eight new IITs, and is an Institute of National Importance. It moved to its permanent 936-acre campus at Argul, Khordha, inaugurated in December 2018. The institute is known for its focus on interdisciplinary research and has climbed steadily in national rankings, reaching 39th in NIRF Engineering 2025.', array['Central Library','4 Halls of Residence','WiFi-enabled campus','24x7 Health Centre with ambulance','Sports complex (cricket, football, basketball, badminton, volleyball, table tennis)','Gymnasium in each hostel','Career Development Cell','Research labs and workshops'], 'UG admission to B.Tech programs is exclusively through JEE Advanced followed by JoSAA centralized counselling, open to candidates who qualify JEE Main.',
  'JEE Main, JEE Advanced', 39, 9.07, 14.98, 67.6,
  90.07, 'Google, Microsoft, Oracle, Reliance Industries, DE Shaw, Accenture, HCL Technologies, L&T', 2025, 'iit-bhubaneswar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-bhubaneswar') and name in ('B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Engineering Physics','B.Tech Mathematics and Computing','B.Tech Mechanical Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', 32, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 27, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 23, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', 17, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', 6, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 6, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 32, 9.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', 10, 9.07, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 2023, 47)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 2024, 54)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 2025, 39)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-bhubaneswar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'How can I get admission to IIT Bhubaneswar''s B.Tech program?', 'Admission is entirely through JEE Advanced followed by JoSAA counselling; there is no separate application process for the institute.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'What is the total B.Tech fee at IIT Bhubaneswar?', 'Total 4-year B.Tech fee is approximately ₹9.07 lakh, with tuition around ₹8 lakh; fee concessions apply for SC/ST/lower-income categories per government norms.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'What is IIT Bhubaneswar''s current NIRF Engineering rank?', 'IIT Bhubaneswar ranked 39th in the NIRF Engineering category for 2025, up from 54th in 2024.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhubaneswar'), 'How many B.Tech branches does IIT Bhubaneswar offer?', 'Eight B.Tech branches: Civil, CSE, Electrical, ECE, Engineering Physics, Mathematics and Computing, Mechanical, and Metallurgical & Materials Engineering.', 3);

-- Indian Institute of Technology Hyderabad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Hyderabad', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Kandi, Sangareddy', 'Telangana', 'https://www.iith.ac.in', 'Indian Institute of Technology Hyderabad, Kandi, Sangareddy, Telangana - 502284, India',
  'ar.acadug@iith.ac.in', '040-2359-6064', 'IIT Hyderabad was established in 2008 as one of the eight new IITs and moved to its permanent ~576-acre campus at Kandi, Sangareddy in July 2015. It has rapidly built a research-focused reputation and broke into the NIRF Engineering top 10, ranking 7th in 2025. It offers B.Tech, B.Des, M.Tech, M.Des, MS, and Ph.D. programs across 17 academic departments.', array['Central Library (20,000+ books)','100+ research labs','Separate boys'' and girls'' hostels','Modern sports complex (cricket, football, hockey, tennis)','Indoor sports facilities (gym, badminton, squash, table tennis)','Seminar halls and auditorium','Campus health centre/pharmacy','Innovation and incubation centre'], 'UG admission (B.Tech and B.Des) is through JEE Advanced followed by JoSAA centralized counselling; candidates must first qualify JEE Main to be eligible for JEE Advanced.',
  'JEE Main, JEE Advanced', 7, 11.94, 20.26, 66.13,
  65.5, 'Google, Microsoft, Oracle, Deloitte, Paytm, Qualcomm, Samsung, Texas Instruments', 2025, 'iit-hyderabad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-hyderabad') and name in ('B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computational Engineering','B.Tech Industrial Chemistry','B.Tech Electrical Engineering (IC Design and Technology)','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Engineering Physics','B.Tech Engineering Science','B.Tech Mathematics and Computing','B.Tech Mechanical Engineering','B.Tech Materials Science and Metallurgical Engineering','B.Tech Artificial Intelligence','B.Tech Biomedical Engineering','B.Tech Biotechnology and Bioinformatics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 16, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', 20, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Computational Engineering', '4 years', '10+2 with PCM, JEE Advanced', 10, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Industrial Chemistry', '4 years', '10+2 with PCM, JEE Advanced', 11, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Electrical Engineering (IC Design and Technology)', '4 years', '10+2 with PCM, JEE Advanced', 10, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 23, 11.94, 'AIR ~652 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 22, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', 12, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Engineering Science', '4 years', '10+2 with PCM, JEE Advanced', 12, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 10, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 21, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Materials Science and Metallurgical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 12, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Artificial Intelligence', '4 years', '10+2 with PCM, JEE Advanced', 15, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Biomedical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 10, 11.94, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'B.Tech Biotechnology and Bioinformatics', '4 years', '10+2 with PCM, JEE Advanced', 11, 11.94, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 2023, 9)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 2024, 8)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 2025, 7)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-hyderabad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'What is IIT Hyderabad''s current NIRF Engineering rank?', 'IIT Hyderabad ranked 7th in NIRF Engineering 2025, its best-ever position, improving from 8th in 2024 and 9th in 2023.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'How do I apply for a B.Tech at IIT Hyderabad?', 'Admission is only via JEE Advanced and subsequent JoSAA counselling; there is no direct application to the institute for B.Tech.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'Does IIT Hyderabad offer an Artificial Intelligence B.Tech program?', 'Yes, IIT Hyderabad offers a dedicated 4-year B.Tech in Artificial Intelligence with 15 general-category JoSAA seats.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-hyderabad'), 'What is the total B.Tech fee at IIT Hyderabad?', 'Total 4-year fee is approximately ₹11.94 lakh; IIT Hyderabad also offers merit-cum-means scholarships that can fully waive tuition for students with family income below ₹4.5 lakh.', 3);

-- Indian Institute of Technology Jodhpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Jodhpur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Jodhpur', 'Rajasthan', 'https://www.iitj.ac.in', 'Indian Institute of Technology Jodhpur, N.H. 62, Nagaur Road, Karwar, Jodhpur - 342030, Rajasthan, India',
  'office_academics_ug@iitj.ac.in', '0291-280-1079', 'IIT Jodhpur was established in 2008 and was formally renamed from IIT Rajasthan in November 2009. It is an Institute of National Importance operating from an 852-acre permanent campus on NH 62 towards Nagaur, north-northwest of Jodhpur. The institute has shown consistent NIRF Engineering rank improvement, reaching 27th in 2025.', array['24/7 Central Library with digital resources','Air-conditioned single-occupancy hostel rooms with WiFi/LAN','Two-storey mess (1000-person capacity)','Sports grounds (football, cricket, basketball, volleyball, lawn tennis, badminton)','Health centre with OPD and ambulance service','Gymnasiums','School of Management and Entrepreneurship'], 'UG admission to B.Tech programs is exclusively through JEE Advanced followed by JoSAA centralized counselling; JEE Main qualification is a prerequisite for JEE Advanced eligibility.',
  'JEE Main, JEE Advanced', 27, 9.75, 16.73, 61,
  92, 'Microsoft, Google, Amazon, Samsung, Adobe, Reliance Industries, Tata Steel, Deloitte', 2025, 'iit-jodhpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-jodhpur') and name in ('B.Tech Aerospace Engineering','B.Tech Chemical Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil and Infrastructure Engineering','B.Tech Bioengineering','B.Tech Artificial Intelligence and Data Science','B.Tech Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Advanced', 19, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 15, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 28, 9.75, 'AIR ~3061 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 19, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM, JEE Advanced', 18, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 29, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Civil and Infrastructure Engineering', '4 years', '10+2 with PCM, JEE Advanced', 18, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Bioengineering', '4 years', '10+2 with PCM, JEE Advanced', 16, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Advanced', 27, 9.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'B.Tech Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', 15, 9.75, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 2023, 30)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 2024, 28)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 2025, 27)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-jodhpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'What is IIT Jodhpur''s current NIRF Engineering rank?', 'IIT Jodhpur ranked 27th in NIRF Engineering 2025, up from 28th in 2024 and 30th in 2023 — its second consecutive year of improvement.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'Does IIT Jodhpur offer an Artificial Intelligence and Data Science branch?', 'Yes, it is one of IIT Jodhpur''s most sought-after branches with 27 general-category JoSAA seats.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'How large is the IIT Jodhpur campus?', 'The permanent residential campus spans 852 acres on NH 62 towards Nagaur, northwest of Jodhpur city.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jodhpur'), 'What is the fee concession policy at IIT Jodhpur?', 'Students with family income below ₹1 lakh pay no tuition fee; those with income below ₹5 lakh pay a reduced tuition fee, while others pay the standard ₹1 lakh/semester tuition.', 3);

