
-- Indian Institute of Information Technology, Design and Manufacturing, Kurnool
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Design and Manufacturing, Kurnool', 'IIIT', 'Engineering', 'Government', null, 'Kurnool', 'Andhra Pradesh', 'https://www.iiitk.ac.in', 'Indian Institute of Information Technology, Design and Manufacturing, Jagannathagattu Hill, Kurnool - 518008, Andhra Pradesh, India',
  'ugadmissions@iiitk.ac.in', '08518-289114', 'Established in 2015 with IIITDM Kancheepuram as its mentor institute, IIITDM Kurnool was set up to fulfil a commitment under the Andhra Pradesh Reorganisation Act, 2014, and was granted Institute of National Importance status in 2017. It specializes in IT-enabled Design and Manufacturing engineering education from its permanent campus at Jagannathagattu Hill.', array['Central Library','Hostels','Health Centre','Computer Centre','Sports facilities','Wi-Fi campus','Design and Manufacturing labs','Auditorium'], 'B.Tech admission is through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance exam.',
  'JEE Main', null, null, 7.64, 22,
  59, 'Infosys, TCS, Atlas', 2025, 'iiitdm-kurnool'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiitdm-kurnool') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiitdm-kurnool');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'How can I get admission into IIITDM Kurnool''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'What makes IIITDM Kurnool distinctive among IIITs?', 'It was set up under the Andhra Pradesh Reorganisation Act, 2014, with IIITDM Kancheepuram as its mentor institute, and focuses on IT-enabled Design and Manufacturing engineering across CSE, ECE, and Mechanical Engineering.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'Where is the campus located?', 'Jagannathagattu Hill, Kurnool - 518008, Andhra Pradesh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiitdm-kurnool'), 'What is the official admissions contact?', 'ugadmissions@iiitk.ac.in, phone 08518-289114.', 3);

-- Indian Institute of Information Technology Guwahati
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology Guwahati', 'IIIT', 'Engineering', 'Government', null, 'Guwahati', 'Assam', 'https://www.iiitg.ac.in', 'Indian Institute of Information Technology Guwahati, Bongora, Guwahati - 781015, Assam, India',
  'registrar@iiitg.ac.in', null, 'Established in 2013 under India''s IIIT Public-Private Partnership model and declared an Institute of National Importance in 2017, IIIT Guwahati operates from a permanent 67-acre campus at Bongora. It focuses on Computer Science and Electronics & Communication Engineering, including a dedicated Electronics, Communication and Artificial Intelligence branch.', array['Central Library','Hostels','Health Centre','Wi-Fi campus with NKN connectivity','Advanced computational laboratories','Sports facilities','Auditorium','Training and placement cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA/CSAB centralized counselling.',
  'JEE Main', null, null, 16.75, 71,
  66.99, 'Microsoft, Amazon, Google, Atlassian, Samsung', 2025, 'iiit-guwahati'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-guwahati') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electronics, Communication and Artificial Intelligence');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 165, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 89, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'B.Tech Electronics, Communication and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-guwahati');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'How can I get admission into IIIT Guwahati''s B.Tech program?', 'Only through JEE Main followed by JoSAA/CSAB counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'What is distinctive about IIIT Guwahati?', 'It is a PPP-model Institute of National Importance operating from a permanent 67-acre campus, and offers a dedicated Electronics, Communication and Artificial Intelligence branch alongside CSE and ECE.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'Where is the campus located?', 'Bongora, Guwahati - 781015, Assam.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-guwahati'), 'What is the official admissions contact?', 'registrar@iiitg.ac.in.', 3);

-- Indian Institute of Information Technology, Pune
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Pune', 'IIIT', 'Engineering', 'Government', null, 'Pune', 'Maharashtra', 'https://www.iiitp.ac.in', 'Indian Institute of Information Technology Pune, Gat No. 5 & 6, Vill. Nanoli-Tarf Chakan, PO Talegaon, Tal. Maval, Dist. Pune - 410507, Maharashtra, India',
  'enquiry@iiitp.ac.in', '02114-224510', 'Established in 2016 under India''s IIIT Public-Private Partnership model, IIIT Pune is an Institute of National Importance offering B.Tech in Computer Science and Electronics & Communication Engineering, with honours tracks in Artificial Intelligence, Data Science, Cyber Security, IoT, Robotics and VLSI Design. It operates from a dedicated campus near Talegaon in Pune district.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Computer and research labs','Sports facilities','Auditorium','Innovation and incubation cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA centralized counselling.',
  'JEE Main', null, null, 17.12, 45,
  51.35, 'Amazon, NVIDIA, Walmart, Deloitte, Accenture, Siemens, Dell, Intel', 2025, 'iiit-pune'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-pune') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-pune'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-pune'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-pune');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-pune'), 'How can I get admission into IIIT Pune''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-pune'), 'What is distinctive about IIIT Pune''s curriculum?', 'Alongside core CSE and ECE B.Tech programs, it awards an ''Honours'' degree with a major in tracks such as Artificial Intelligence, Data Science, Cyber Security, IoT, Robotics, or VLSI Design.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-pune'), 'Where is the campus located?', 'Near Talegaon, Chakan-Talegaon Road, Pune district, Maharashtra - 410507.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-pune'), 'What is the official admissions contact?', 'enquiry@iiitp.ac.in, phone 02114-224510.', 3);

-- Indian Institute of Information Technology, Lucknow
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Lucknow', 'IIIT', 'Engineering', 'Government', null, 'Lucknow', 'Uttar Pradesh', 'https://iiitl.ac.in', 'Indian Institute of Information Technology Lucknow, Chak Ganjaria, C.G. City, Ahmamau, Lucknow - 226002, Uttar Pradesh, India',
  'admissions@iiitl.ac.in', '0522-2338100', 'Established in 2015 as a Public-Private Partnership model IIIT and later declared an Institute of National Importance, IIIT Lucknow focuses on Computer Science and Information Technology, with specialized B.Tech tracks in Artificial Intelligence and Business alongside its core CS/IT programs. It has built one of the stronger placement records among the newer-generation IIITs.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Computer Centre','Sports facilities','Auditorium','Training and placement cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA centralized counselling.',
  'JEE Main', null, null, 33.71, 145,
  96.17, 'Amazon, Google, Microsoft, Flipkart, Uber, Adobe, Oracle, Goldman Sachs', 2025, 'iiit-lucknow'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-lucknow') and name in ('B.Tech Information Technology','B.Tech Computer Science and Engineering','B.Tech Computer Science and Engineering (Artificial Intelligence)','B.Tech Computer Science and Business');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'B.Tech Computer Science and Engineering (Artificial Intelligence)', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'B.Tech Computer Science and Business', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-lucknow');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'How can I get admission into IIIT Lucknow''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'What is distinctive about IIIT Lucknow?', 'Despite being a younger PPP-model IIIT (established 2015), it has posted strong B.Tech placement numbers, with specialized programs in Computer Science & AI and Computer Science & Business alongside core CS/IT.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'Where is the campus located?', 'Chak Ganjaria, C.G. City, Ahmamau, Lucknow - 226002, Uttar Pradesh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-lucknow'), 'What is the official admissions contact?', 'admissions@iiitl.ac.in, phone 0522-2338100.', 3);

-- Indian Institute of Information Technology, Nagpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Nagpur', 'IIIT', 'Engineering', 'Government', null, 'Nagpur', 'Maharashtra', 'https://iiitn.ac.in', 'Indian Institute of Information Technology Nagpur, Survey No. 140, 141/1, Waranga, Butibori, Nagpur - 441108, Maharashtra, India',
  'aosd@iiitn.ac.in', '07122-985010', 'Established in 2016 under India''s IIIT Public-Private Partnership model, IIIT Nagpur is an Institute of National Importance focused on Computer Science and Electronics & Communication Engineering, with specialized CSE tracks in Data Science & Analytics, Artificial Intelligence & Machine Learning, and Human-Computer Interaction & Gaming Technology. It operates from its campus in Butibori, near Nagpur.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Computer and research labs','Sports facilities','Auditorium','Training and placement cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA centralized counselling.',
  'JEE Main', null, null, 14.96, 60,
  97.1, 'Amazon, Google, Microsoft, Adobe, Accenture, Intel, NVIDIA, Deloitte', 2025, 'iiit-nagpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-nagpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Computer Science and Engineering (Data Science and Analytics)','B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)','B.Tech Computer Science and Engineering (Human-Computer Interaction and Gaming Technology)','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'B.Tech Computer Science and Engineering (Data Science and Analytics)', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~27752 (2025, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'B.Tech Computer Science and Engineering (Human-Computer Interaction and Gaming Technology)', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~40844 (2025, approx.)', null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-nagpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'How can I get admission into IIIT Nagpur''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'What is distinctive about IIIT Nagpur''s CSE program?', 'It is split into focused tracks — core CSE, Data Science & Analytics, AI & Machine Learning, and Human-Computer Interaction & Gaming Technology — alongside a standalone ECE branch.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'Where is the campus located?', 'Butibori, Nagpur - 441108, Maharashtra.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-nagpur'), 'What is the official admissions contact?', 'aosd@iiitn.ac.in, phone 07122-985010.', 3);

-- Indian Institute of Information Technology Vadodara - International Campus Diu
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology Vadodara - International Campus Diu', 'IIIT', 'Engineering', 'Government', null, 'Vadodara', 'Gujarat', 'https://iiitvadodara.ac.in', 'Indian Institute of Information Technology Vadodara, C/o Government Engineering College, Sector-28, Gandhinagar - 382028, Gujarat, India (temporary campus; permanent campus under development at Dumad, Vadodara)',
  'administration@iiitvadodara.ac.in', '079-29750281', 'Established in 2013 under India''s IIIT Public-Private Partnership model, IIIT Vadodara (IIITV-ICD) is an Institute of National Importance currently operating from a temporary campus in Gandhinagar while its permanent campus is developed on allotted land at Dumad, Vadodara. It also runs a satellite International Campus Diu (ICD), giving it a distinctive dual-campus structure, with B.Tech programs in Computer Science, Electronics & Communication, and Mathematics & Computing.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Computer Centre','Sports facilities','Satellite International Campus Diu','Training and placement cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA centralized counselling.',
  'JEE Main', null, null, 12, 56.3,
  90, 'Microsoft, Amazon, Adobe, Jio, Siemens, MathWorks, Goldman Sachs', 2025, 'iiit-vadodara'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-vadodara') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-vadodara');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'How can I get admission into IIIT Vadodara''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'Is IIIT Vadodara actually located in Vadodara?', 'Not yet — it currently operates from a temporary campus in Gandhinagar while its permanent campus is being built on allotted land at Dumad, Vadodara. It also runs a satellite International Campus Diu (ICD).', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'What B.Tech branches does it offer?', 'Computer Science and Engineering, Electronics and Communication Engineering, and Mathematics and Computing.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-vadodara'), 'What is the official admissions contact?', 'administration@iiitvadodara.ac.in, phone 079-29750281.', 3);
