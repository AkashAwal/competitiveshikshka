
-- National Institute of Technology, Tiruchirappalli
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Tiruchirappalli', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Tiruchirappalli', 'Tamil Nadu', 'https://www.nitt.edu', 'National Institute of Technology, Tiruchirappalli - 620015, Tamil Nadu, India',
  'ug@nitt.edu', '0431-2504931', 'NIT Tiruchirappalli, established in 1964 (originally as Regional Engineering College, Tiruchirappalli), is consistently ranked among the top NITs in India and holds Institute of National Importance status. The campus spans a large area near the Kaveri river and is known for its strong research output and consistent top-10 NIRF Engineering ranking.', array['Central Library (2.5+ lakh volumes)','22 boys'' hostels and 6 girls'' hostels','400m athletic track, football/hockey fields, basketball & tennis courts','25-meter swimming pool','1,500+ seat auditorium','Octagon Computer Centre with campus-wide Wi-Fi','On-campus medical facility'], 'Admission to B.Tech/B.Arch programs is based on JEE Main rank, followed by centralized seat allocation through JoSAA across participating NITs/IIITs/GFTIs. Candidates not allocated seats via JoSAA may apply through CSAB special rounds.',
  'JEE Main', 9, 5, 17.5, 64,
  85, 'Google, Microsoft, Amazon, Deloitte, Samsung, Qualcomm, Goldman Sachs, TCS', 2025, 'nit-trichy'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-trichy') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Production Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Instrumentation and Control Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Production Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-trichy'), 'B.Tech Instrumentation and Control Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-trichy'), 2022, 8)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-trichy'), 2023, 9)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-trichy'), 2025, 9)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-trichy');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-trichy'), 'How can I apply for B.Tech at NIT Trichy?', 'Admission is through JEE Main followed by JoSAA centralized counselling; there is no separate application to NIT Trichy for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-trichy'), 'What is the total B.Tech tuition fee at NIT Trichy?', 'Total tuition for the 4-year B.Tech program is approximately ₹5 lakh, with hostel and mess charged separately; SC/ST/EWS students below the income threshold get fee waivers.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-trichy'), 'What was the average placement package in 2025?', 'The average package for the 2025 placement season was around ₹17.5 LPA, with the CSE branch averaging around ₹27.17 LPA.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-trichy'), 'Does NIT Trichy offer B.Arch as well?', 'Yes, alongside nine B.Tech branches, NIT Trichy offers a 5-year B.Arch program, also admitted through JEE Main Paper 2/JoSAA.', 3);

-- National Institute of Technology, Uttarakhand
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Uttarakhand', 'IIT', 'Engineering', 'Government', null, 'Srinagar (Garhwal)', 'Uttarakhand', 'https://nituk.ac.in', 'National Institute of Technology Uttarakhand, Srinagar (Garhwal), Uttarakhand - 246174, India',
  'nituttarakhand@nituk.ac.in', '01346-257400', 'NIT Uttarakhand was established in 2009 under an Act of Parliament as one of the newer NITs granted Institute of National Importance status. It currently operates from a temporary/transit campus in Srinagar (Garhwal); a permanent 125-hectare campus at Sumari is under construction. Being a newer and smaller institute, it has a limited number of core B.Tech branches.', array['Transit campus at Government ITI, Srinagar Garhwal','Hostel accommodation for boys and girls','Computer/engineering laboratories','Library','Wi-Fi campus network'], 'Admission to B.Tech programs is based on JEE Main rank followed by centralized seat allocation through JoSAA, with 50% of seats reserved for Uttarakhand state-domicile candidates.',
  'JEE Main', null, 8.67, 8.7, 17,
  null, null, 2025, 'nit-uttarakhand'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-uttarakhand') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.67, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.67, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.67, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.67, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 8.67, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-uttarakhand');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'Does NIT Uttarakhand have a permanent campus?', 'Not yet — it currently operates from a transit campus at Government ITI, Srinagar Garhwal, while its permanent 125-hectare campus at Sumari is under construction, expected around late 2027.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'How many B.Tech branches does NIT Uttarakhand offer?', 'Five core B.Tech branches: Computer Science and Engineering, Electronics and Communication Engineering, Electrical and Electronics Engineering, Mechanical Engineering, and Civil Engineering.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'What is the admission process?', 'Admission is through JEE Main and centralized JoSAA counselling, with 50% of seats reserved for Uttarakhand-domicile candidates.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-uttarakhand'), 'How is NIT Uttarakhand''s NIRF rank trending?', 'It was in the 101-150 band for Engineering in NIRF 2024 and moved to the 151-200 band in NIRF 2025 — precise numeric ranks within these bands are not publicly disclosed.', 3);

-- National Institute of Technology, Warangal
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology, Warangal', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Hanamkonda (Warangal)', 'Telangana', 'https://www.nitw.ac.in', 'National Institute of Technology Warangal, Warangal - 506004, Telangana, India',
  null, '0870-2459191', 'NIT Warangal, established in 1959 as the first of the Regional Engineering Colleges in India, was granted Institute of National Importance status in 2007. It sits on a 250-acre campus in Hanamkonda near Warangal and is one of the most reputed NITs, especially for Civil, Mechanical, Electrical, and Computer Science Engineering.', array['Centre for Innovation and Incubation','Innovation Garage (24x7 student workspace)','Central Library','On-campus State Bank of India branch','Medical dispensary','Hostels for men and women','Sports complex and playgrounds'], 'Admission to B.Tech programs is based on JEE Main rank followed by centralized seat allocation through JoSAA. Candidates unallotted through JoSAA can participate in CSAB special rounds.',
  'JEE Main', 28, 5.45, 14.35, 64.3,
  79.3, 'Microsoft, Amazon, Qualcomm, Oracle, Coca-Cola, ICICI Bank, Mastercard, Deloitte', 2025, 'nit-warangal'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-warangal') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Biotechnology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-warangal'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM, JEE Main', null, 5.45, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-warangal'), 2023, 21)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-warangal'), 2024, 21)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-warangal'), 2025, 28)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-warangal');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-warangal'), 'Is NIT Warangal the oldest NIT?', 'Yes, it was the first among the 15 original Regional Engineering Colleges to be established, in 1959, before being renamed and granted Institute of National Importance status in 2007.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-warangal'), 'How can I get admission into NIT Warangal for B.Tech?', 'Through JEE Main followed by JoSAA centralized counselling; there is no separate application process.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-warangal'), 'What was the highest package in the 2025 placement season?', 'The highest reported domestic package was ₹64.3 LPA, with an average package of about ₹14.35 LPA.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-warangal'), 'What B.Tech branches does NIT Warangal offer?', 'Eight branches: Computer Science and Engineering, Electronics and Communication Engineering, Electrical Engineering, Mechanical Engineering, Civil Engineering, Chemical Engineering, Metallurgical and Materials Engineering, and Biotechnology.', 3);

-- Maulana Azad National Institute of Technology, Bhopal
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Maulana Azad National Institute of Technology, Bhopal', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Bhopal', 'Madhya Pradesh', 'https://www.manit.ac.in', 'Maulana Azad National Institute of Technology, Link Road Number 3, Bhopal, Madhya Pradesh - 462003, India',
  'pro@manit.ac.in', '0755-4051000', 'MANIT Bhopal, established in 1960 as an engineering college, became a National Institute of Technology in 2002 and received Institute of National Importance status in 2007. Set on a roughly 650-acre campus in central Bhopal, it is regarded as a leading technical institute in central India, with strong architecture and planning programs alongside its core engineering departments.', array['Central Library','Hostels for men and women','Training and Placement Cell','Sports complex','Computer centre and campus Wi-Fi','Medical/health centre','On-campus banking (SBI branch)'], 'Admission to B.Tech, B.Arch and B.Plan programs is based on JEE Main rank followed by centralized seat allocation through JoSAA, with CSAB special rounds for unfilled seats.',
  'JEE Main', 81, 7.07, 15.6, 82,
  90, 'Microsoft, Oracle, Flipkart, Google, Accenture, JPMorgan Chase, Cisco, Amazon', 2025, 'manit-bhopal'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'manit-bhopal') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Materials and Metallurgical Engineering','B.Tech Energy Science and Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Materials and Metallurgical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'B.Tech Energy Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.07, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'manit-bhopal'), 2023, 80)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'manit-bhopal'), 2024, 72)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'manit-bhopal'), 2025, 81)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'manit-bhopal');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'Is MANIT Bhopal the same as NIT Bhopal?', 'Yes, MANIT Bhopal (Maulana Azad National Institute of Technology) is commonly referred to as NIT Bhopal; it became a full NIT in 2002 and gained Institute of National Importance status in 2007.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'How is admission to MANIT Bhopal B.Tech done?', 'Through JEE Main followed by JoSAA centralized counselling, the same as other NITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'Does MANIT Bhopal offer architecture programs?', 'Yes, it offers B.Arch and B.Plan alongside its B.Tech programs, and its architecture and planning program is separately ranked by NIRF (ranked 17th in 2025).', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'manit-bhopal'), 'What is the total B.Tech fee at MANIT Bhopal?', 'The total 4-year B.Tech fee is approximately ₹7.07 lakh, though it can range up to about ₹8.7 lakh depending on the branch.', 3);

