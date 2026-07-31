
-- Indian Institute of Technology Bombay
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Bombay', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Mumbai', 'Maharashtra', 'https://www.iitb.ac.in', 'IIT Bombay, Powai, Mumbai – 400076, Maharashtra, India',
  'jeeadv@iitb.ac.in', '+91-22-2572-2545', 'Established in 1958 as the second IIT (with UNESCO/Soviet assistance), IIT Bombay is located on a 550-acre campus in Powai, Mumbai. It is consistently ranked among the top engineering institutes in India (NIRF 2025 rank 3) and is known for strength in computer science, engineering physics, and entrepreneurship (E-Cell). The institute has a residential campus with 17+ hostels and a strong industry/research ecosystem.', array['Hostels (17 for undergraduates/postgraduates)','Central Library','Institute Hospital','Sports Complex (swimming pool, gymkhana, stadium)','Wi-Fi campus network','Research parks and technology incubators (SINE)','Convocation Hall/auditoriums','Student Activity Centre (SAC)'], 'UG admission to the 4-year B.Tech program is entirely through JEE Advanced, for which a candidate must first qualify JEE Main and rank within the top ~2.5 lakh. Seats are allocated via the centralized JoSAA counselling process based on JEE Advanced All India Rank, category, and choice filling.',
  'JEE Main, JEE Advanced', 3, 8.5, 23.5, null,
  null, 'Google, Microsoft, Goldman Sachs, JPMorgan Chase, Amazon, DE Shaw, Sprinklr, Qualcomm', 2024, 'iit-bombay'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-bombay') and name in ('B.Tech Civil Engineering','B.Tech Energy Science and Engineering','B.Tech Engineering Physics','B.Tech Environmental Science and Engineering','B.Tech Metallurgical Engineering and Materials Science');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bombay'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bombay'), 'B.Tech Energy Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bombay'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 8.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bombay'), 'B.Tech Environmental Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.75, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bombay'), 'B.Tech Metallurgical Engineering and Materials Science', '4 years', '10+2 with PCM, JEE Advanced', null, 8.75, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bombay'), 2023, 3)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bombay'), 2024, 3)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bombay'), 2025, 3)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-bombay');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bombay'), 'Which exam is required for B.Tech admission at IIT Bombay?', 'Candidates must qualify JEE Main, then JEE Advanced, and secure a seat via JoSAA counselling.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bombay'), 'Is hostel accommodation guaranteed?', 'IIT Bombay provides hostel accommodation to all undergraduate students for the duration of their program; it operates 17 hostels on campus.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bombay'), 'Are fee waivers available?', 'SC/ST/PwD students get a full tuition fee waiver; students with family income below ₹5 LPA can apply for fee remission, and those below ₹1 LPA (EWS) can get full remission.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bombay'), 'What is the annual tuition fee for Indian students?', 'The tuition fee is approximately ₹2,00,000 per year (₹1,00,000/semester) for general category Indian nationals, per the official fee notification.', 3);

-- Indian Institute of Technology Madras
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Madras', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Chennai', 'Tamil Nadu', 'https://www.iitm.ac.in', 'Indian Institute of Technology Madras, IIT P.O., Chennai – 600036, Tamil Nadu, India',
  'ugadmissions@iitm.ac.in', '+91-44-2257-8220', 'Founded in 1959 with German technical collaboration, IIT Madras is set on a 617-acre wooded campus (a designated wildlife sanctuary co-habitat) in Chennai. It has been ranked India''s #1 institute overall and #1 in Engineering by NIRF for multiple consecutive years, including NIRF 2025. It is known for strong research output, its Research Park, and India''s first fully online BS in Data Science and Programming.', array['Hostels (including gender-inclusive housing)','Central Library','Institute Hospital','Gymkhana/Sports complex','Wi-Fi campus network','IIT Madras Research Park','Deer Park/wildlife-sanctuary campus','Open Air Theatre and student activity centres'], 'UG admission to the 4-year B.Tech program requires qualifying JEE Main followed by JEE Advanced. Seats are allocated through JoSAA based on JEE Advanced All India Rank, category, and preference of branch/institute.',
  'JEE Main, JEE Advanced', 1, 8.64, 21.48, null,
  80.79, 'Google, Microsoft, Goldman Sachs, Texas Instruments, Qualcomm, DE Shaw, Samsung, Intel', 2024, 'iit-madras'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-madras') and name in ('B.Tech Aerospace Engineering','B.Tech Biological Engineering','B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Engineering Physics','B.Tech Mechanical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Naval Architecture and Ocean Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Biological Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-madras'), 'B.Tech Naval Architecture and Ocean Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.64, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-madras'), 2023, 1)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-madras'), 2024, 1)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-madras'), 2025, 1)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-madras');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-madras'), 'Which exam is required for B.Tech admission at IIT Madras?', 'JEE Main followed by JEE Advanced, with seat allocation through JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-madras'), 'Does IIT Madras have a special campus feature?', 'Its 617-acre campus is officially recognized as a wildlife/deer sanctuary co-inhabited with the institute.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-madras'), 'Are fee waivers available for low-income students?', 'SC/ST/PwD students receive a full tuition fee waiver; students with family income under ₹5 LPA can apply for partial/full fee remission.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-madras'), 'Is hostel accommodation guaranteed for undergraduates?', 'Yes, IIT Madras guarantees hostel accommodation to all B.Tech students throughout their course duration.', 3);

-- Indian Institute of Technology Kanpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Kanpur', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Kanpur', 'Uttar Pradesh', 'https://www.iitk.ac.in', 'Indian Institute of Technology Kanpur, Kalyanpur, Kanpur – 208016, Uttar Pradesh, India',
  'jee@iitk.ac.in', '0512-259-7335', 'Established in 1959 with assistance from a consortium of US universities (the Kanpur Indo-American Programme), IIT Kanpur is known for pioneering computer science education in India and strong research in aerospace and core engineering. Its 1,055-acre campus in Kalyanpur houses one of India''s earliest computer centers. It ranks NIRF 2025 Engineering rank 4.', array['Hostels (Halls of Residence)','P.K. Kelkar Library','Health Centre/Hospital','Sports complex and stadium','Wi-Fi campus network','Aerospace and other research laboratories','Students'' Gymkhana','Innovation and Incubation Centre'], 'UG admission to the 4-year B.Tech program requires qualifying JEE Main and then JEE Advanced. Seats are allocated centrally via JoSAA based on JEE Advanced rank, category, and branch/institute preferences.',
  'JEE Main, JEE Advanced', 4, 3.22, 26.27, null,
  93.32, 'Google, Microsoft, Goldman Sachs, DE Shaw, Samsung, Qualcomm, Sprinklr, American Express', 2024, 'iit-kanpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-kanpur') and name in ('B.Tech Aerospace Engineering','B.Tech Biological Sciences and Bioengineering','B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Materials Science and Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Biological Sciences and Bioengineering', '4 years', '10+2 with PCM, JEE Advanced', 16, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 154, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 193, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Materials Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 12.87, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 12.87, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kanpur'), 2023, 4)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kanpur'), 2024, 4)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kanpur'), 2025, 4)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-kanpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'Which exam is required for B.Tech admission at IIT Kanpur?', 'JEE Main followed by JEE Advanced, with seat allocation via JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'What is the approximate total 4-year B.Tech cost?', 'Approximately ₹12.86 lakh for the full 4-year duration including tuition, semester, and hostel-cum-mess fees for general/EWS/OBC students with family income above ₹5 LPA, per the official fee notice.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'Are fee waivers available?', 'SC/ST students get a 100% tuition fee waiver; those with family income below ₹6 LPA also get free hostel and mess; students with income below ₹1 LPA get a full fee waiver.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kanpur'), 'Is IIT Kanpur known for a specific academic strength?', 'It was one of the first Indian institutes to introduce a computer science curriculum (1963) and remains strong in aerospace and computer science engineering.', 3);

-- Indian Institute of Technology Kharagpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Kharagpur', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Kharagpur', 'West Bengal', 'https://www.iitkgp.ac.in', 'Indian Institute of Technology Kharagpur, Kharagpur, West Bengal – 721302, India',
  null, '+91-3222-255221', 'Established in 1951, IIT Kharagpur is the first of the IITs, founded on the site of the former Hijli Detention Camp. It has the largest campus among the IITs (over 2,100 acres) and offers the widest range of undergraduate branches of any IIT, including agricultural, mining, and ocean engineering. It ranks NIRF 2025 Engineering rank 5.', array['Hostels (18+ halls of residence)','Central Library','B.C. Roy Technology Hospital','Sports complex and stadium','Wi-Fi campus network','Technology incubation centres (STEP)','Nehru Museum of Science and Technology','Large green campus'], 'UG admission to the 4-year B.Tech program requires qualifying JEE Main and then JEE Advanced. Seats are allocated centrally via JoSAA based on JEE Advanced rank, category, and branch/institute preferences.',
  'JEE Main, JEE Advanced', 5, 2.55, 24, null,
  null, 'Google, Microsoft, Apple, DE Shaw, Jane Street, Goldman Sachs, Qualcomm, Samsung', 2024, 'iit-kharagpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-kharagpur') and name in ('B.Tech Aerospace Engineering','B.Tech Agricultural and Food Engineering','B.Tech Biotechnology and Biochemical Engineering','B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Electrical Communication Engineering','B.Tech Industrial and Systems Engineering','B.Tech Instrumentation Engineering','B.Tech Manufacturing Science and Engineering','B.Tech Mechanical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Mining Engineering','B.Tech Ocean Engineering and Naval Architecture');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Agricultural and Food Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Biotechnology and Biochemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 92, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 92, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Electronics and Electrical Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Industrial and Systems Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Instrumentation Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Manufacturing Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 117, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'B.Tech Ocean Engineering and Naval Architecture', '4 years', '10+2 with PCM, JEE Advanced', null, 10.2, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 2023, 6)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 2024, 5)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 2025, 5)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-kharagpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'Which exam is required for B.Tech admission at IIT Kharagpur?', 'JEE Main followed by JEE Advanced, with seat allocation via JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'Is the tuition fee the same across all B.Tech branches?', 'Yes — IIT Kharagpur charges a uniform tuition fee of ₹1,00,000/semester regardless of branch.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'Are fee waivers available?', 'Tuition fees are fully waived for SC/ST/PwD students, and category/income-based waivers apply per Government of India norms for other students.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-kharagpur'), 'What makes IIT Kharagpur''s academic offering distinctive?', 'It is the oldest IIT (est. 1951) and offers the widest range of B.Tech branches of any IIT, including Agricultural & Food Engineering, Mining Engineering, and Ocean Engineering & Naval Architecture — disciplines not offered at most newer IITs.', 3);

