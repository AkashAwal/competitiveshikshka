
-- Indian Institute of Engineering Science and Technology, Shibpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Engineering Science and Technology, Shibpur', 'GFTI', 'Engineering', 'Government', 'Tier 2', 'Howrah', 'West Bengal', 'https://www.iiests.ac.in', 'Indian Institute of Engineering Science and Technology, Shibpur, Botanic Garden, Howrah, West Bengal - 711103, India',
  'dean.ac@iiests.ac.in', '033-2668-4561', 'Founded in 1856 as Bengal Engineering College, IIEST Shibpur is widely regarded as the oldest engineering college in Asia. It was granted Institute of National Importance status by an Act of Parliament in 2014, converting the erstwhile Bengal Engineering and Science University into a fully centrally-funded technical institute. It offers B.Tech programs across nine engineering departments plus a well-regarded B.Arch program, and is one of the very few GFTIs to consistently rank inside NIRF''s Engineering top 60.', array['Central Library','Hostels (multiple halls of residence)','Health Centre','Sports complex and gymkhana','Central Workshop','Wi-Fi campus','Auditorium','Multiple department research and testing labs'], 'B.Tech admission is through JEE Main rank followed by JoSAA centralized counselling (with CSAB for leftover-seat rounds); there is no separate institute-level entrance test for B.Tech.',
  'JEE Main', 54, null, 13.5, 52,
  67, 'Microsoft, Google, Goldman Sachs, JP Morgan, BNY Mellon, Accenture, Infosys, TCS', 2025, 'iiest-shibpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiest-shibpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Telecommunication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Aerospace Engineering','B.Tech Mining Engineering','B.Tech Metallurgy and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Electronics and Telecommunication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Aerospace Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'B.Tech Metallurgy and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 2022, 40)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 2023, 35)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 2024, 49)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 2025, 54)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiest-shibpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'How can I get admission into IIEST Shibpur''s B.Tech program?', 'Through JEE Main rank followed by JoSAA centralized counselling — there is no separate institute-level entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'What makes IIEST Shibpur historically significant?', 'It traces its roots to 1856 as Bengal Engineering College, making it the oldest engineering college in Asia, and it was granted Institute of National Importance status by an Act of Parliament in 2014.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'Where is the campus located?', 'Shibpur, Botanic Garden, Howrah, West Bengal - 711103, on the western bank of the Hooghly river opposite Kolkata.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiest-shibpur'), 'What is the official admissions contact?', 'dean.ac@iiests.ac.in, phone 033-2668-4561.', 3);

-- Rajiv Gandhi Institute of Petroleum Technology
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Rajiv Gandhi Institute of Petroleum Technology', 'GFTI', 'Engineering', 'Government', 'Tier 2', 'Jais', 'Uttar Pradesh', 'https://www.rgipt.ac.in', 'Rajiv Gandhi Institute of Petroleum Technology, Mubarakhpur, Mukhetia More, Bahadurpur, Jais, Post Harbanshganj, Amethi - 229304, Uttar Pradesh, India',
  'admission@rgipt.ac.in', '0535-2704568', 'Established in 2007 and declared an Institute of National Importance by an Act of Parliament, RGIPT was set up by the Ministry of Petroleum & Natural Gas in partnership with public-sector oil companies (ONGC, IOCL, OIL, GAIL, BPCL, HPCL) and funded via the Oil Industry Development Board. It specializes in petroleum and chemical engineering alongside computer science, mathematics and computing, mechanical, and electronics engineering, and is one of the very few GFTIs whose seats are filled primarily through JEE Advanced ranks.', array['Central Library','Hostels (separate for men/women)','Health Centre','Sports complex','Wi-Fi campus','Central Workshop and process labs','Auditorium','Institute Computer Centre'], 'B.Tech admission is through JoSAA centralized counselling — Round 1 seats are offered to JEE Advanced rank holders (in the same seat pool as IITs/IIPE), with any seats remaining thereafter filled using JEE Main ranks in subsequent JoSAA/CSAB rounds.',
  'JEE Advanced, JEE Main', 78, null, 10.79, 25,
  74, 'Deloitte, ONGC, PayU, JP Morgan, Tata 1mg, Zepto, Reliance Industries, HPCL', 2025, 'rgipt-jais'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'rgipt-jais') and name in ('B.Tech Petroleum Engineering','B.Tech Chemical Engineering','B.Tech Computer Science and Engineering','B.Tech Mathematics and Computing','B.Tech Mechanical Engineering','B.Tech Electronics Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Petroleum Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', 60, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'rgipt-jais'), 2024, 80)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'rgipt-jais'), 2025, 78)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'rgipt-jais');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'How can I get admission into RGIPT''s B.Tech program?', 'Through JoSAA counselling — Round 1 seats go to JEE Advanced rank holders alongside IITs, with remaining seats filled via JEE Main ranks in later rounds. There is no separate RGIPT entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'What makes RGIPT distinctive among GFTIs?', 'It is India''s dedicated Institute of National Importance for petroleum and energy education, co-promoted by ONGC, IOCL, OIL, GAIL, BPCL and HPCL under the Ministry of Petroleum & Natural Gas.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'Where is the campus located?', 'Jais, Amethi district, Uttar Pradesh - 229304, roughly 50 km from Rae Bareli.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'rgipt-jais'), 'What is the official admissions contact?', 'admission@rgipt.ac.in, phone 0535-2704568.', 3);

-- Indian Institute of Petroleum and Energy, Visakhapatnam
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Petroleum and Energy', 'GFTI', 'Engineering', 'Government', null, 'Visakhapatnam', 'Andhra Pradesh', 'https://www.iipe.ac.in', 'Indian Institute of Petroleum and Energy, Temporary Campus, 2nd Floor, AU Engineering College Main Block, Andhra University, Visakhapatnam, Andhra Pradesh - 530003, India',
  'admissions@iipe.ac.in', '0891-2856019', 'Established in 2016 and declared an Institute of National Importance by an Act of Parliament, IIPE is a specialized public institute focused on petroleum and energy engineering, promoted with support from the petroleum sector. It currently operates from a temporary campus on the Andhra University premises while its permanent campus at Pudimadaka is developed, and offers B.Tech programs in Chemical, Petroleum, Mechanical Engineering, and Mathematics and Computing.', array['Temporary campus within Andhra University','Central Library','Hostels','Health Centre facilities via AU campus','Computer Centre','Process/energy engineering labs','Sports facilities (shared AU campus)','Wi-Fi campus'], 'B.Tech admission is through JoSAA centralized counselling, with seats primarily allotted to JEE Advanced rank holders (in the same seat pool as IITs/RGIPT) and any remaining seats filled via JEE Main ranks in later rounds.',
  'JEE Advanced, JEE Main', null, null, 10, 20.71,
  96.77, 'ONGC, Schlumberger, ExxonMobil, Shell, HPCL, BPCL, GAIL, Reliance Industries, Infosys, TCS', 2024, 'iipe-visakhapatnam'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iipe-visakhapatnam') and name in ('B.Tech Chemical Engineering','B.Tech Petroleum Engineering','B.Tech Mechanical Engineering','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'B.Tech Petroleum Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced/JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iipe-visakhapatnam');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'How can I get admission into IIPE''s B.Tech program?', 'Through JoSAA counselling — seats are primarily allotted to JEE Advanced rank holders, with any remaining seats filled via JEE Main ranks in later rounds. There is no separate IIPE entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'What makes IIPE distinctive?', 'It is one of only two GFTIs (alongside RGIPT) dedicated specifically to petroleum and energy engineering, and is an Institute of National Importance set up with backing from the petroleum sector.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'Where is the campus located?', 'Currently on a temporary campus within Andhra University, Visakhapatnam, Andhra Pradesh - 530003, while a permanent campus is developed at Pudimadaka near Visakhapatnam.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iipe-visakhapatnam'), 'What is the official admissions contact?', 'admissions@iipe.ac.in, phone 0891-2856019.', 3);

-- National Institute of Advanced Manufacturing Technology, Ranchi (formerly NIFFT)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Advanced Manufacturing Technology, Ranchi (formerly National Institute of Foundry and Forge Technology)', 'GFTI', 'Engineering', 'Government', null, 'Ranchi', 'Jharkhand', 'https://www.niamt.ac.in', 'National Institute of Advanced Manufacturing Technology, Hatia, Ranchi - 834003, Jharkhand, India',
  null, '0651-2280859', 'Established in 1966 with UNESCO assistance as the National Institute of Foundry and Forge Technology (NIFFT), the institute was renamed the National Institute of Advanced Manufacturing Technology (NIAMT) to reflect a broader manufacturing-technology mandate, and was granted Deemed-to-be-University status in February 2024. It remains India''s niche GFTI for foundry, forge, metallurgy and manufacturing engineering, offering a compact, industry-focused B.Tech program under the Ministry of Education.', array['Central Library','Hostels','Health Centre','Foundry and Forge shop-floor labs','Central Workshop','Computer Centre','Sports facilities','Wi-Fi campus'], 'B.Tech admission is through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test for B.Tech.',
  'JEE Main', null, null, 7.1, 13.95,
  100, 'Tata Steel, Larsen & Toubro, Bharat Forge, Mahindra, SAIL, Hero MotoCorp', 2025, 'nifft-ranchi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nifft-ranchi') and name in ('B.Tech Mechanical Engineering','B.Tech Metallurgy and Materials Engineering','B.Tech Production and Industrial Engineering','B.Tech Computer Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'B.Tech Metallurgy and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nifft-ranchi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'How can I get admission into NIAMT (NIFFT) Ranchi''s B.Tech program?', 'Through JEE Main rank followed by JoSAA centralized counselling — there is no separate institute-level entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'Is NIFFT the same institute as NIAMT Ranchi?', 'Yes — the National Institute of Foundry and Forge Technology (NIFFT) was renamed the National Institute of Advanced Manufacturing Technology (NIAMT) and granted Deemed-to-be-University status in February 2024.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'What makes this institute distinctive?', 'It is India''s only GFTI specializing in foundry, forge, metallurgy and manufacturing engineering, a niche not covered by IITs/NITs at the same depth.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nifft-ranchi'), 'Where is the campus located?', 'Hatia, Ranchi, Jharkhand - 834003.', 3);

-- Central Institute of Technology, Kokrajhar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Central Institute of Technology, Kokrajhar', 'GFTI', 'Engineering', 'Government', null, 'Kokrajhar', 'Assam', 'https://www.cit.ac.in', 'Central Institute of Technology Kokrajhar, PO: Rangalikhata/Balagaon, Kokrajhar (BTAD), Assam - 783370, India',
  'registrar@cit.ac.in', '03661-277279', 'Set up pursuant to the 2003 Bodoland Territorial Council Accord and established in 2006, CIT Kokrajhar is a centrally-funded technical institute under the Ministry of Education. It was granted Deemed-to-be-University (De-novo category) status in 2018, and offers B.Tech, B.Des and diploma programs, with 40% of B.Tech seats filled via JEE Main/JoSAA and the remainder through the institute''s own CITKEE entrance exam for regional quota candidates.', array['Central Library','Hostels','Health Centre','Computer Centre','Sports facilities','Design and Animation studios','Wi-Fi campus','Workshop and fabrication labs'], 'B.Tech admission uses a dual pathway: roughly 40% of seats are filled via JEE Main rank through JoSAA centralized counselling, while the remaining ~60% (largely for the North-East/Bodoland region) are filled via the institute''s own CITKEE entrance examination.',
  'JEE Main', null, null, null, null,
  null, null, null, 'cit-kokrajhar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'cit-kokrajhar') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Des');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main or CITKEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main or CITKEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main or CITKEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main or CITKEE', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'B.Des', '4 years', '10+2, JEE Main or CITKEE/UCEED as applicable', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'cit-kokrajhar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'How can I get admission into CIT Kokrajhar''s B.Tech program?', 'Through a dual pathway: about 40% of seats are filled via JEE Main rank through JoSAA counselling, while the remaining seats (mainly for North-East/Bodoland-region candidates) are filled via the institute''s own CITKEE entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'Is CIT Kokrajhar a private or government institute?', 'It is a Government of India centrally-funded technical institute under the Ministry of Education, established after the 2003 Bodoland Territorial Council Accord; it holds Deemed-to-be-University (De-novo) status granted in 2018.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'Where is the campus located?', 'Rangalikhata/Balagaon, Kokrajhar, in the Bodoland Territorial Area Districts (BTAD) of Assam - 783370.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'cit-kokrajhar'), 'What is the official admissions contact?', 'registrar@cit.ac.in, phone 03661-277279.', 3);

-- Jamia Millia Islamia, Faculty of Engineering and Technology
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Jamia Millia Islamia, Faculty of Engineering and Technology', 'GFTI', 'Engineering', 'Government', 'Tier 1', 'New Delhi', 'Delhi', 'https://jmi.ac.in/fet', 'Faculty of Engineering and Technology, Jamia Millia Islamia, Jamia Nagar, New Delhi - 110025, India',
  'admission@jmicoe.in', '011-26981717', 'Jamia Millia Islamia is a Central University founded in 1920 and given Central University status in 1988; its Faculty of Engineering and Technology (established 1985) offers B.Tech programs across seven departments — Civil, Mechanical, Electrical, Electronics & Communication, Computer Engineering, plus interdisciplinary Applied Sciences. Unlike most GFTIs, JMI does NOT participate in JoSAA: it uses JEE Main scores/ranks as the qualifying criterion but runs its own separate application and counselling process directly through the university.', array['Central Library','Hostels (separate for men/women)','Health Centre','Central Workshop','Sports complex','Wi-Fi campus','Central Instrumentation Facility','Multiple department research labs'], 'Admission to JMI''s B.Tech programs is based on the candidate''s JEE Main score/rank, but JMI is NOT a JoSAA-participating institute — applicants must separately register and apply through JMI''s own admission portal after JEE Main results are declared, and seats are allotted via the university''s own merit list and counselling rounds.',
  'JEE Main', 24, null, 13.78, 51,
  85, 'Microsoft, Amazon, Deloitte, TCS, Infosys, Accenture, Wipro, Capgemini', 2025, 'jamia-millia-islamia'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'jamia-millia-islamia') and name in ('B.Tech Civil Engineering','B.Tech Mechanical Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Computer Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main (JMI''s own counselling)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main (JMI''s own counselling)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main (JMI''s own counselling)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main (JMI''s own counselling)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM, JEE Main (JMI''s own counselling)', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 2024, 24)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 2025, 24)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'jamia-millia-islamia');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'Does JMI use JoSAA for its B.Tech admissions?', 'No. JMI is NOT a JoSAA-participating institute. It uses JEE Main score/rank as the qualifying criterion but conducts its own separate application, merit list, and counselling process through the university''s admission portal.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'What makes JMI''s Faculty of Engineering and Technology distinctive?', 'It is the engineering faculty of a long-established Central University (founded 1920) rather than a standalone technical institute, and ranked 24th in NIRF Engineering 2025 — among the better GFTIs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'Where is the campus located?', 'Jamia Nagar, New Delhi - 110025.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jamia-millia-islamia'), 'What is the official admissions contact?', 'admission@jmicoe.in, phone 011-26981717.', 3);
