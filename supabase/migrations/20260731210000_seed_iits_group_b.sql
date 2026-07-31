
-- Indian Institute of Technology Delhi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Delhi', 'IIT', 'Engineering', 'Government', 'Tier 1', 'New Delhi', 'Delhi', 'https://home.iitd.ac.in', 'Indian Institute of Technology Delhi, Hauz Khas, New Delhi - 110016, India',
  'regoffice@iitd.ac.in', '011-2659-1999', 'IIT Delhi was established in 1961 as one of India''s first Institutes of Technology and was declared an Institute of National Importance in 1963. It is consistently ranked among the top 2-3 engineering institutes in India by NIRF. The main campus spans roughly 320 acres in Hauz Khas, South Delhi, and the institute also runs a newer Sonipat (Haryana) campus.', array['24/7 Central Library','Institute Hospital (in-patient/OPD)','Olympic-size swimming pool','Multi-sport complex (squash, badminton, basketball, cricket/football/hockey grounds)','13 hostels (11 boys, 2 girls)','Gymnasium','Wi-Fi campus-wide network'], 'Undergraduate admission is through JEE Main followed by JEE Advanced; qualifying candidates are ranked and allotted seats via the centralized JoSAA counseling process based on category, rank, and branch/institute preference.',
  'JEE Main, JEE Advanced', 2, 8.6, null, null,
  82.96, 'Google, Microsoft, American Express, Barclays, BCG, Oracle, Meesho, Texas Instruments', 2024, 'iit-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-delhi') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mathematics and Computing','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Biochemical Engineering and Biotechnology','B.Tech Materials Engineering','B.Tech Production and Industrial Engineering','B.Tech Engineering Physics','B.Tech Textile Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 99, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 110, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 89, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Biochemical Engineering and Biotechnology', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-delhi'), 'B.Tech Textile Technology', '4 years', '10+2 with PCM, JEE Advanced', null, 8.6, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-delhi'), 2023, 2)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-delhi'), 2024, 2)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-delhi'), 2025, 2)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-delhi'), 'How can I get admission into IIT Delhi''s B.Tech program?', 'Admission is exclusively through JEE Advanced, following JEE Main, with seats allotted via the centralized JoSAA counseling process.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-delhi'), 'What is IIT Delhi''s current NIRF Engineering rank?', 'IIT Delhi is ranked 2nd in the NIRF Engineering Ranking 2025, a position it has held consistently in 2023 and 2024 as well.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-delhi'), 'Does IIT Delhi offer fee waivers?', 'Yes — SC/ST/PwD students receive a full tuition fee waiver, and there are income-based waivers for other categories.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-delhi'), 'Where is the IIT Delhi campus located?', 'The main campus is in Hauz Khas, South Delhi; IIT Delhi also operates a newer campus in Sonipat, Haryana.', 3);

-- Indian Institute of Technology Guwahati
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Guwahati', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Guwahati', 'Assam', 'https://www.iitg.ac.in', 'Indian Institute of Technology Guwahati, Guwahati - 781039, Assam, India',
  'registrar@iitg.ac.in', '+91-361-2583000', 'IIT Guwahati was established in 1994 as the sixth IIT and was the first major technical institute set up in India''s North-East region. Its campus spans about 700 acres on the north bank of the Brahmaputra River. IIT Guwahati is recognized for its scenic riverside campus and strong research programs.', array['Central Library (117,000+ items, 2,600+ online journals)','30-bed institute hospital','8-lane 50m swimming pool','Indoor sports stadium (badminton, table tennis, squash)','10 boys'' hostels and 2 girls'' hostels','Fitness center / Gymkhana','Riverside (Brahmaputra) campus setting'], 'UG admission is through JEE Advanced (after qualifying JEE Main), with seat allocation via the centralized JoSAA counseling process based on category-wise rank and preference.',
  'JEE Main, JEE Advanced', 8, 8, 25.21, 125,
  62, 'Amazon, Google, Microsoft, Goldman Sachs, Samsung, Qualcomm, Sprinklr, American Express', 2024, 'iit-guwahati'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-guwahati') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Chemical Science and Technology','B.Tech Biosciences and Bioengineering','B.Tech Mathematics and Computing','B.Tech Engineering Physics','B.Tech Energy Engineering','B.Tech Artificial Intelligence and Data Science');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 91, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 95, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', 93, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Chemical Science and Technology', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Biosciences and Bioengineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Energy Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Advanced', null, 8, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-guwahati'), 2023, 7)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-guwahati'), 2024, 7)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-guwahati'), 2025, 8)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-guwahati');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'How is admission to IIT Guwahati''s B.Tech program decided?', 'Through JEE Advanced rank and centralized JoSAA counseling, same as all IITs.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'What is IIT Guwahati''s most recent NIRF Engineering rank?', 'IIT Guwahati is ranked 8th in NIRF Engineering 2025, down one place from 7th in 2024 and 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'Where is IIT Guwahati located?', 'On a roughly 700-acre campus on the north bank of the Brahmaputra River in Guwahati, Assam.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-guwahati'), 'Does IIT Guwahati have reserved seats for women?', 'Yes — like other IITs, IIT Guwahati has supernumerary female-only seats in each branch to improve gender diversity in engineering.', 3);

-- Indian Institute of Technology Roorkee
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Roorkee', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Roorkee', 'Uttarakhand', 'https://www.iitr.ac.in', 'Indian Institute of Technology Roorkee, Roorkee - 247667, Uttarakhand, India',
  'academics@iitr.ac.in', '01332-285311', 'Originally founded in 1847 as Roorkee College — making it one of the oldest engineering institutions in Asia — it was converted into an Indian Institute of Technology in 2001. IIT Roorkee is known for strong civil, mechanical, and earth-sciences programs and a heritage campus with colonial-era buildings alongside modern academic blocks.', array['Central Library (320,000+ documents)','Institute Hospital','Olympic-size swimming pool','Professional gymnasium','Badminton, tennis, squash and basketball courts','10 boys'' hostels, 3 girls'' hostels, 1 coed hostel','Full-size cricket, football, and hockey grounds'], 'UG admission is via JEE Advanced (after qualifying JEE Main), with the centralized JoSAA process allocating seats based on category rank and branch preference.',
  'JEE Main, JEE Advanced', 6, 11.33, 20, 205,
  null, 'Microsoft, Google, Goldman Sachs, Qualcomm, Adobe, Samsung, Texas Instruments, ICICI Bank', 2024, 'iit-roorkee'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-roorkee') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Production and Industrial Engineering','B.Tech Pulp and Paper Technology','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Pulp and Paper Technology', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, 11.33, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-roorkee'), 2023, 5)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-roorkee'), 2024, 6)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-roorkee'), 2025, 6)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-roorkee');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'Is IIT Roorkee the same as the old Roorkee College?', 'Yes — the institution traces its history to Roorkee College, founded in 1847, and was converted into an Indian Institute of Technology in 2001.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'What is IIT Roorkee''s latest NIRF Engineering rank?', 'IIT Roorkee is ranked 6th in NIRF Engineering 2025, the same as 2024, after being ranked 5th in 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'How do I apply for a B.Tech at IIT Roorkee?', 'Through JEE Advanced (after JEE Main) and the centralized JoSAA counseling and seat allocation process.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-roorkee'), 'Does IIT Roorkee offer an Architecture program?', 'Yes, and it is separately and highly ranked by NIRF''s Architecture ranking category, distinct from the Engineering ranking.', 3);

-- Indian Institute of Technology Ropar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Ropar', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Rupnagar (Ropar)', 'Punjab', 'https://www.iitrpr.ac.in', 'Indian Institute of Technology Ropar, Bara Phool, Rupnagar (Ropar) - 140001, Punjab, India',
  'registrar@iitrpr.ac.in', '01881-231101', 'IIT Ropar is one of the newer, second-generation IITs, established in 2008 as part of the Government of India''s expansion of the IIT system. It began operations from a temporary campus before moving to its permanent campus at Bara Phool, near Rupnagar, Punjab. It is known for a compact, modern campus and growing programs in AI, data engineering, and metallurgy.', array['24/7 air-conditioned central library (22,000+ books)','Dedicated medical/health centre','Cricket, football, tennis, badminton, basketball and volleyball facilities','8 hostels (6 boys, 2 girls) housing ~3,000 students','Student activity centre / Gymkhana','In-hostel gymnasiums'], 'UG admission is via JEE Advanced (after qualifying JEE Main) with seats allocated through the centralized JoSAA counseling process based on category-wise rank.',
  'JEE Main, JEE Advanced', 32, 9.48, 23.07, 66.75,
  null, 'Amazon, DE Shaw, TCS, PhysicsWallah, BookMyShow, Samsung', 2024, 'iit-ropar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-ropar') and name in ('B.Tech Computer Science and Engineering','B.Tech Artificial Intelligence and Data Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering','B.Tech Engineering Physics','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 67, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Artificial Intelligence and Data Engineering', '4 years', '10+2 with PCM, JEE Advanced', 16, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-ropar'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', null, 9.48, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-ropar'), 2023, 22)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-ropar'), 2024, 22)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-ropar'), 2025, 32)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-ropar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-ropar'), 'When was IIT Ropar established?', 'IIT Ropar was established in 2008 as one of the second-generation IITs set up by the Government of India.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-ropar'), 'What is IIT Ropar''s most recent NIRF Engineering rank?', 'IIT Ropar is ranked 32nd in NIRF Engineering 2025, a drop from 22nd in both 2024 and 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-ropar'), 'Where is the IIT Ropar campus located?', 'At Bara Phool, near Rupnagar (Ropar), Punjab - 140001.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-ropar'), 'How is admission to IIT Ropar''s B.Tech granted?', 'Through JEE Advanced rank and the centralized JoSAA counseling process, the same as all other IITs.', 3);

