
-- Indian Institute of Information Technology, Surat
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Surat', 'IIIT', 'Engineering', 'Government', null, 'Surat', 'Gujarat', 'https://www.iiitsurat.ac.in', 'Indian Institute of Information Technology Surat, Mora Bhatha, Sarsana, Surat - 395007, Gujarat, India',
  'office@iiitsurat.ac.in', '0261-2201506', 'Established in 2017 under the Ministry of Education''s PPP model and mentored by SVNIT Surat, IIIT Surat is an Institute of National Importance focused on Computer Science and Electronics engineering. It runs from a transit campus in Surat while its permanent campus is developed, and has built a reputation for strong CSE/ECE placements within a short span of operation.', array['Central Library','Hostels for boys and girls','Computer Centre with high-end labs','Wi-Fi campus','Health Centre','Sports facilities','Seminar halls','Training and Placement Cell'], 'B.Tech admission is entirely through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 1.73, 15.59, 120,
  70.25, 'Microsoft, Amazon, Oracle, PayPal, Google, Deloitte, Morgan Stanley, Meesho', 2025, 'iiit-surat'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-surat') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-surat'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.9, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-surat'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.9, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-surat');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-surat'), 'How can I get admission into IIIT Surat''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-surat'), 'What makes IIIT Surat distinctive?', 'Established in 2017 and mentored by SVNIT Surat, it is one of the newer PPP-model IIITs but has quickly built strong CSE/ECE placement outcomes, with 2025 packages reaching up to Rs 120 LPA.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-surat'), 'Where is the campus located?', 'Mora Bhatha, Sarsana, Surat, Gujarat, on a transit campus while the permanent campus is developed.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-surat'), 'What is the official admissions contact?', 'office@iiitsurat.ac.in, phone 0261-2201506.', 3);

-- Indian Institute of Information Technology, Bhopal
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Bhopal', 'IIIT', 'Engineering', 'Government', null, 'Bhopal', 'Madhya Pradesh', 'https://www.iiitbhopal.ac.in', 'IIIT Bhopal, C/O Maulana Azad National Institute of Technology (MANIT), Link Road Number 3, Near Kali Mata Mandir, Bhopal - 462003, Madhya Pradesh, India',
  null, '0755-4051455', 'Established in 2017 under the Ministry of Education''s PPP model and mentored by MANIT Bhopal, IIIT Bhopal is an Institute of National Importance offering B.Tech programs spanning Computer Science, Information Technology, and Electronics & Communication Engineering, with newer specializations in Cyber Security, Data Science, and Cyber-Physical Systems. It currently operates from a makeshift campus inside MANIT Bhopal while its own 60-acre permanent campus is developed.', array['Shared library and computing facilities (MANIT campus)','Hostels','Health Centre','Wi-Fi campus','Sports facilities','Seminar halls','Training and Placement Cell','Specialized CSE/IT/ECE labs'], 'B.Tech admission is entirely through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 2.27, 16.77, 58,
  85.7, 'Microsoft, Amazon, Samsung, Deloitte, TCS, Infosys, Wipro, Cognizant', 2025, 'iiit-bhopal'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-bhopal') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Computer Science and Engineering (Cyber Security)','B.Tech Computer Science and Engineering (Data Science)','B.Tech Electronics and Communication Engineering (Cyber Physical Systems)');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 110, 2.27, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', 81, 2.27, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 64, 2.27, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Computer Science and Engineering (Cyber Security)', '4 years', '10+2 with PCM, JEE Main', 30, 2.27, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Computer Science and Engineering (Data Science)', '4 years', '10+2 with PCM, JEE Main', 28, 2.27, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'B.Tech Electronics and Communication Engineering (Cyber Physical Systems)', '4 years', '10+2 with PCM, JEE Main', 29, 2.27, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-bhopal');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'How can I get admission into IIIT Bhopal''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam or application form.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'Does IIIT Bhopal have its own campus?', 'Not yet — it currently operates from a dedicated section within MANIT Bhopal''s campus while its own 60-acre permanent campus is under development.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'What branches does IIIT Bhopal offer?', 'CSE, IT, and ECE, along with newer specializations in Cyber Security, Data Science, and Cyber-Physical Systems.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhopal'), 'What is the official admissions contact?', 'Phone 0755-4051455; admissions are coordinated through JoSAA rather than a separate institute email.', 3);

-- Indian Institute of Information Technology, Bhagalpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Bhagalpur', 'IIIT', 'Engineering', 'Government', null, 'Bhagalpur', 'Bihar', 'https://www.iiitbh.ac.in', 'Indian Institute of Information Technology Bhagalpur, Bhagalpur College of Engineering Campus, Sabour, Bhagalpur - 813210, Bihar, India',
  'admission@iiitbh.ac.in', '07632-995210', 'Established in 2017 under the Ministry of Education''s Not-for-Profit PPP model, IIIT Bhagalpur is an Institute of National Importance situated on a green residential campus on the banks of the Ganga at Sabour. It offers B.Tech programs in Computer Science, Electronics & Communication, Mechatronics & Automation, and Mathematics & Computing, and has posted strong recent placement outcomes for a relatively young IIIT.', array['Central Library','Hostels (boys and girls)','Health Centre','Riverside green residential campus','Wi-Fi campus','Sports facilities','Computer Centre','Training and Placement Cell'], 'B.Tech admission is entirely through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 3.7, 10.35, 83,
  95.4, 'Atlassian, Amazon, Microsoft, Cadence, Meesho, Razorpay, GE Digital, Nagarro', 2025, 'iiit-bhagalpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-bhagalpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechatronics and Automation Engineering','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 165, 3.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 83, 3.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'B.Tech Mechatronics and Automation Engineering', '4 years', '10+2 with PCM, JEE Main', 66, 3.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Main', null, 3.7, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-bhagalpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'How can I get admission into IIIT Bhagalpur''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'What makes IIIT Bhagalpur distinctive?', 'It sits on a dedicated green residential campus on the banks of the Ganga at Sabour, and posted a strong 95.4% placement rate in 2025 with offers as high as Rs 83 LPA from Atlassian.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'Where is the campus located?', 'Bhagalpur College of Engineering Campus, Sabour, Bhagalpur, Bihar - 813210.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-bhagalpur'), 'What is the official admissions contact?', 'admission@iiitbh.ac.in, phone 07632-995210.', 3);

-- Indian Institute of Information Technology, Kalyani
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Kalyani', 'IIIT', 'Engineering', 'Government', null, 'Kalyani', 'West Bengal', 'https://www.iiitkalyani.ac.in', 'Indian Institute of Information Technology Kalyani, Webel IT Park, Near Buddha Park, Kalyani - 741235, Nadia, West Bengal, India',
  'office@iiitkalyani.ac.in', null, 'Established in 2014 under a Not-for-Profit PPP model (Government of India, Government of West Bengal, and industry partners), IIIT Kalyani is an Institute of National Importance situated on a 50-acre campus about an hour from Kolkata. It offers a focused B.Tech portfolio in Computer Science and Electronics & Communication Engineering, aiming to be a centre of excellence in IT education and research.', array['Central Library','Hostels (boys and girls)','Health Centre','Wi-Fi campus','Sports facilities','Computer Centre','Seminar halls','Training and Placement Cell'], 'B.Tech admission is entirely through JEE Main rank followed by JoSAA centralized counselling; there is no separate institute-level entrance test.',
  'JEE Main', null, 1.98, 9.27, 44,
  91.66, 'Virtusa, Wipro, SAP, TCS, Ericsson India, Reliance Jio, Deloitte', 2025, 'iiit-kalyani'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-kalyani') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.91, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.91, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-kalyani');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'How can I get admission into IIIT Kalyani''s B.Tech program?', 'Only through JEE Main followed by JoSAA counselling — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'What makes IIIT Kalyani distinctive?', 'It is a Not-for-Profit PPP institute jointly backed by the Government of India, the Government of West Bengal, and industry partners, with a focused two-branch (CSE, ECE) B.Tech portfolio.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'Where is the campus located?', 'Webel IT Park, near Buddha Park, Kalyani, Nadia district, West Bengal — about an hour from Kolkata.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kalyani'), 'What is the official admissions contact?', 'office@iiitkalyani.ac.in.', 3);

-- Indian Institute of Information Technology, Ranchi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Ranchi', 'IIIT', 'Engineering', 'Government', null, 'Ranchi', 'Jharkhand', 'https://www.iiitranchi.ac.in', 'IIIT Ranchi, ARTTC BSNL Campus, Getlatu, Near Jumar River Bridge, Hazaribagh Road, Ranchi - 835217, Jharkhand, India',
  'admission@iiitranchi.ac.in', null, 'Established in 2016 by an Act of Parliament under the PPP model, IIIT Ranchi is an Institute of National Importance offering B.Tech programs in Computer Science and Engineering (including a Data Science and AI track) and Electronics & Communication Engineering (including an Embedded Systems and IoT track). It currently operates from the ARTTC BSNL campus near the Jumar river, Ranchi.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Sports facilities','Computer Centre','Seminar halls','Training and Placement Cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA counselling, with CSAB handling leftover seats; there is no separate institute-level entrance test.',
  'JEE Main', null, 3.03, 12.36, 54,
  84.72, 'Google, Microsoft, Amazon, Adobe, Infosys, TCS, Cognizant, Nvidia', 2025, 'iiit-ranchi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-ranchi') and name in ('B.Tech Computer Science and Engineering','B.Tech Computer Science and Engineering (Data Science and AI)','B.Tech Electronics and Communication Engineering','B.Tech Electronics and Communication Engineering (Embedded Systems and IoT)');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 75, 3.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'B.Tech Computer Science and Engineering (Data Science and AI)', '4 years', '10+2 with PCM, JEE Main', 75, 3.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 50, 3.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'B.Tech Electronics and Communication Engineering (Embedded Systems and IoT)', '4 years', '10+2 with PCM, JEE Main', null, 3.03, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-ranchi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'How can I get admission into IIIT Ranchi''s B.Tech program?', 'Through JEE Main followed by JoSAA counselling, with CSAB handling any leftover seats — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'What makes IIIT Ranchi distinctive?', 'It offers dedicated Data Science & AI and Embedded Systems & IoT tracks within its CSE and ECE programs, and has attracted recruiters like Google, Microsoft, and Amazon despite being a young institute (est. 2016).', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'Where is the campus located?', 'ARTTC BSNL Campus, Getlatu, near the Jumar river bridge, Hazaribagh Road, Ranchi, Jharkhand - 835217.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-ranchi'), 'What is the official admissions contact?', 'admission@iiitranchi.ac.in.', 3);

-- Indian Institute of Information Technology, Kota
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Information Technology, Kota', 'IIIT', 'Engineering', 'Government', null, 'Kota', 'Rajasthan', 'https://www.iiitkota.ac.in', 'IIIT Kota, SPL-269, RIICO Industrial Area, Kuber Extension, Ranpur, Kota - 325003, Rajasthan, India',
  'office@iiitkota.ac.in', '0141-2715071', 'Established in 2013 under the PPP model and mentored by MNIT Jaipur, IIIT Kota ran its academic programs from MNIT Jaipur''s campus for a decade. It shifted to its own 100-acre permanent campus at Ranpur, Kota in August 2023, and all classes have been held there since August 2024. It offers B.Tech programs in Computer Science and Engineering, Electronics & Communication Engineering, and Artificial Intelligence & Data Engineering.', array['Central Library','Hostels','Health Centre','Wi-Fi campus','Sports facilities','Computer Centre','Seminar halls','Training and Placement Cell'], 'B.Tech admission is via JEE Main rank followed by JoSAA counselling, with CSAB handling leftover seats; there is no separate institute-level entrance test.',
  'JEE Main', null, 2.4, 11.13, 54,
  71.34, 'Adobe, Autodesk, Samsung SDS, Jio, Amazon, Goldman Sachs, Flipkart, Microsoft', 2025, 'iiit-kota'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iiit-kota') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Artificial Intelligence and Data Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-kota'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 180, 2.4, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-kota'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 90, 2.4, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iiit-kota'), 'B.Tech Artificial Intelligence and Data Engineering', '4 years', '10+2 with PCM, JEE Main', 60, 2.4, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iiit-kota');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kota'), 'How can I get admission into IIIT Kota''s B.Tech program?', 'Through JEE Main followed by JoSAA counselling, with CSAB handling any leftover seats — there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kota'), 'Does IIIT Kota still operate from MNIT Jaipur''s campus?', 'No — while it was mentored by and ran from MNIT Jaipur''s campus from 2013, it moved to its own permanent 100-acre campus at Ranpur, Kota in August 2023, and all classes have been held there since August 2024.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kota'), 'Where is the campus located?', 'SPL-269, RIICO Industrial Area, Kuber Extension, Ranpur, Kota, Rajasthan - 325003.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iiit-kota'), 'What is the official admissions contact?', 'office@iiitkota.ac.in, phone 0141-2715071.', 3);
