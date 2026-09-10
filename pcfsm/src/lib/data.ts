export const SITE = {
  name: "PCFSM",
  fullName: "Parmanand College of Fire Engineering & Safety Management",
  tagline: "Fire Engineering & Industrial Safety Education",
  established: "1999",
  url: "https://pcfsm.org",
  address:
    "Survey No. 434, 5th Floor, Landge Landmark, Kasarwadi, Nashik Phata, Near Sagar Plaza, Mumbai–Pune Highway, Pune 411034, Maharashtra, India",
  email: "info@pcfsm.org",
  phone: "+91 77220 33983",
  phoneHref: "tel:+917722033983",
  applyUrl: "https://pcfsm.org/contact-us/",
  socials: [
    { label: "Twitter / X", href: "https://twitter.com/PCFSM1" },
    { label: "Facebook", href: "https://www.facebook.com/pcfsmpune" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/71510999" },
    { label: "Instagram", href: "https://www.instagram.com/parmanand_college_/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCUnbv15zuAvIp_N6IG4Qy8g" },
  ],
} as const;

export const NAV = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Campus", href: "#campus" },
  { label: "Facilities", href: "#facilities" },
  { label: "Placements", href: "#careers" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 25, suffix: "+", unit: "YEARS", note: "of safety education" },
  { value: 1999, suffix: "", unit: "ESTABLISHED", note: "a founding legacy" },
  { value: 1000, suffix: "s", unit: "OF STUDENTS", note: "trained for the field" },
  { value: null, suffix: "", unit: "MULTIPLE CENTERS", note: "across India" },
] as const;

export const RECOGNITION = [
  "Recognized by the Government of Maharashtra",
  "Affiliated to MSBTE — Maharashtra State Board of Technical Education, Mumbai",
  "NEBOSH Silver Learning Partner (No. 1653)",
  "AEERO – CTR – MSBE, Government of India (Ministry of MSME)",
  "J.S.S. — earlier sponsored by Ministry of H.R.D., Government of India",
] as const;

export const CHAPTERS = [
  {
    index: "01",
    title: "Fire Fighting",
    body: "Live drills, hose lines and real fire-ground discipline. You don't read about fire — you face it, controlled and trained.",
  },
  {
    index: "02",
    title: "Industrial Safety",
    body: "Hazard identification, risk assessment and plant safety systems for heavy industry and modern factories.",
  },
  {
    index: "03",
    title: "Emergency Response",
    body: "Preparedness, evacuation planning and incident command — decisions made calmly, under pressure.",
  },
  {
    index: "04",
    title: "Disaster Management",
    body: "Understanding catastrophe at scale and coordinating response when everything is on the line.",
  },
  {
    index: "05",
    title: "HSE",
    body: "Health, Safety & Environment — the governing standard of every serious industrial operation worldwide.",
  },
] as const;

export type Program = {
  index: string;
  name: string;
  duration: string;
  level: string;
  eligibility: string;
  description: string;
  href: string;
  image: string;
};

export const PROGRAMS: Program[] = [
  {
    index: "01",
    name: "Fire Technology & Industrial Safety",
    duration: "1 Year",
    level: "Diploma",
    eligibility: "10th / 12th Pass",
    description:
      "The core program — fire dynamics, protection systems, extinguishment, drills and industrial safety management.",
    href: "https://pcfsm.org/courses/fire-technology-and-industrial-safety/",
    image: "/images/training/main.webp",
  },
  {
    index: "02",
    name: "Occupational Safety, Health & Environment Management System",
    duration: "1 Year",
    level: "Diploma",
    eligibility: "10th / 12th Pass",
    description:
      "OSHE systems for the modern workplace — hazard control, environmental management and safety audits.",
    href: "https://pcfsm.org/courses/occupational-safety-health-environment-management-system/",
    image: "/images/campus/facility-1.webp",
  },
  {
    index: "03",
    name: "Industrial Safety",
    duration: "6 Months",
    level: "Certificate",
    eligibility: "10th / 12th Pass",
    description:
      "An intensive, fast-track entry into industrial safety practice — built for early-career readiness.",
    href: "https://pcfsm.org/courses/industrial-safety-officer-course/",
    image: "/images/campus/testimonial.webp",
  },
  {
    index: "04",
    name: "PG in Industrial Safety",
    duration: "1 Year",
    level: "Post Graduate",
    eligibility: "Graduate",
    description:
      "Advanced study of industrial safety engineering, risk control and safety management systems.",
    href: "https://pcfsm.org/courses-fire-and-safety-course/",
    image: "/images/campus/about.webp",
  },
  {
    index: "05",
    name: "PG in Industrial Fire Safety Operation",
    duration: "1 Year",
    level: "Post Graduate",
    eligibility: "Graduate",
    description:
      "Post-graduate fire safety operations — response strategy, fire protection engineering and command.",
    href: "https://pcfsm.org/courses-fire-and-safety-course/",
    image: "/images/campus/facility-2.webp",
  },
  {
    index: "06",
    name: "PG in Occupational Safety, Health & Environment Management System",
    duration: "1 Year",
    level: "Post Graduate",
    eligibility: "Graduate",
    description:
      "Post-graduate OSHE management for leadership roles in safety, health and environmental compliance.",
    href: "https://pcfsm.org/courses/shems-course-pcsfm/",
    image: "/images/campus/computer-lab.png",
  },
];

export const ALSO_OFFERED = [
  "ADIS — Advanced Diploma in Industrial Safety (MSBTE)",
  "FF — Adv. Diploma in Industrial Safety & Security Management (MSBTE)",
  "FR — Diploma in Fire Service Engineering (MSBTE)",
  "IOSH — Institution of Occupational Safety and Health",
  "First Aid",
  "Certificate in Fireman",
  "Certificate in Industrial Safety",
  "NEBOSH programs — Silver Learning Partner",
] as const;

export const TRAINING = [
  {
    title: "Practical Fire Fighting Training",
    caption: "Live drills on the practical ground — hose lines, extinguishers, real heat.",
    image: "/images/training/main.webp",
    large: true,
  },
  {
    title: "Industrial Visits",
    caption: "Inside working plants — safety systems seen where they actually run.",
    image: "/images/campus/facility-1.webp",
  },
  {
    title: "Safety Training",
    caption: "Equipment, protocols and procedures drilled until they're instinct.",
    image: "/images/campus/testimonial.webp",
  },
  {
    title: "Emergency Response",
    caption: "Evacuation and incident drills under timed, realistic pressure.",
    image: "/images/campus/about.webp",
  },
  {
    title: "Computer Labs",
    caption: "LAN-connected lab with the latest hardware and study software.",
    image: "/images/campus/computer-lab.png",
  },
  {
    title: "Practical Demonstrations",
    caption: "Every concept proven physically before it's proven on paper.",
    image: "/images/campus/facility-2.webp",
  },
  {
    title: "Expert Sessions",
    caption: "Sessions led by experienced faculty and industry practitioners.",
    image: "/images/campus/library.png",
  },
] as const;

export const FACILITIES = [
  {
    index: "01",
    title: "Practical Training Ground",
    body: "One of the best practical grounds — regular fire drills, equipment handling and live training.",
  },
  {
    index: "02",
    title: "Laboratories",
    body: "Hands-on laboratories for safety equipment, demonstrations and applied learning.",
  },
  {
    index: "03",
    title: "Computer Facilities",
    body: "Modern computer lab with LAN and internet — hardware, applications and study resources.",
  },
  {
    index: "04",
    title: "Library & Reading Room",
    body: "Well-stocked library and reading room supporting the full curriculum.",
  },
  {
    index: "05",
    title: "Audio–Video Hall",
    body: "A 40 × 100 ft hall connected to the campus hostel — seminars, training and group activity.",
  },
  {
    index: "06",
    title: "Hostel",
    body: "Separate, well-equipped hostels for boys and girls with dedicated rectors and wardens.",
  },
  {
    index: "07",
    title: "Learning Management System",
    body: "An advanced LMS platform for smooth, effective training and education.",
  },
] as const;

export type Center = {
  city: string;
  type: "Head Office" | "Regional Office" | "Learning Center";
  address: string;
  programs: string;
  maps?: string;
  // normalized map coordinates (viewBox 440x380, Maharashtra simplified)
  x: number;
  y: number;
};

export const CENTERS: Center[] = [
  {
    city: "Aurangabad",
    type: "Head Office",
    address: "Parmanand College of Fire Engineering & Safety Management, Chhatrapati Sambhaji Nagar, Maharashtra",
    programs: "Full-time programs & administration",
    x: 161,
    y: 133,
  },
  {
    city: "Pune",
    type: "Regional Office",
    address:
      "Survey No. 434, 5th Floor, Landge Landmark, Kasarwadi, Nashik Phata, Mumbai–Pune Highway, Pune 411034",
    programs: "Fire Engineering & Industrial Safety programs",
    maps: "https://www.google.co.in/maps/place/Parmanand+College+of+Fire+Engineering+And+Safety+Management/@18.6060237,73.8212762,17z",
    x: 78,
    y: 202,
  },
  {
    city: "Navi Mumbai — CBD Belapur",
    type: "Learning Center",
    address: "Parmanand College of Fire Engineering & Safety Management, CBD Belapur, Navi Mumbai",
    programs: "Fire Engineering & Industrial Safety programs",
    x: 36,
    y: 180,
  },
  {
    city: "Thane",
    type: "Learning Center",
    address:
      "R.P Mangala High School, Opp. Bank of Maharashtra, Thane East, Mumbai 400603 — branch of PCFSM",
    programs: "Fire Engineering & Industrial Safety programs",
    x: 33,
    y: 169,
  },
  {
    city: "Borivali",
    type: "Learning Center",
    address:
      "Fifth Floor, Classroom 509, Sailee International School, MHB Colony, Near MHB Ground, Gorai, Borivali West, Mumbai 400066",
    programs: "Fire Engineering & Industrial Safety programs",
    x: 25,
    y: 161,
  },
  {
    city: "Ratnagiri",
    type: "Learning Center",
    address:
      "ND-51, Mirjole MIDC, 2 min from Bafna Motors, TRP Road, Ratnagiri 415639 — branch of PCFSM",
    programs: "Fire Engineering & Industrial Safety programs",
    x: 50,
    y: 292,
  },
];

export const CAREER_ROLES = [
  "Fire Safety Officer",
  "Safety Officer",
  "HSE Engineer",
  "Safety Executive",
  "Fire Marshal",
  "Industrial Safety Professional",
] as const;

export const PLACED = [
  { name: "Hulawale Rutuja Sanjay", role: "Safety Executive", image: "/images/students/rutuja.webp" },
  { name: "Rathod Ravi Reddy", role: "Safety Officer", image: "/images/students/rathod-ravi-reddy.webp" },
  { name: "Patil Bharat Shripati", role: "Safety Officer", image: "/images/students/bharat.webp" },
  { name: "Kate Prerana Shashikant", role: "Fire Marshal", image: "/images/students/prerna-kate.webp" },
  { name: "Sarode Vishal Ashok", role: "Safety Officer", image: "/images/students/vishal.webp" },
  { name: "Gore Harshad Krushna", role: "Safety Officer", image: "/images/students/gore-harshad.webp" },
  { name: "Rushikesh Sudhakar Jagtap", role: "Fireman", image: "/images/students/rushikesh.webp" },
] as const;

export const STORIES = [
  {
    quote:
      "I must say that PCFSM has exceeded my expectations. The instructors are incredibly knowledgeable and dedicated to our success. The hands-on training and real-world simulations have given me confidence in pursuing a career in fire and safety.",
    name: "Prerna Kate",
    role: "Fire Marshal",
    image: "/images/students/prerna-kate.webp",
  },
  {
    quote:
      "I found the NEBOSH class training to be informative and well-structured. The course materials were comprehensive, and the instructor's expertise was evident. I feel better prepared to handle health and safety responsibilities in my workplace.",
    name: "Rathod Ravi Reddy",
    role: "Safety Officer",
    image: "/images/students/rathod-ravi-reddy.webp",
  },
  {
    quote:
      "I am grateful to be a part of Parmanand College. The course curriculum is well-structured, covering all aspects of fire engineering and safety management. The hands-on training and industry exposure have boosted my confidence and skills.",
    name: "Gore Harshad Krushna",
    role: "Safety Officer",
    image: "/images/students/gore-harshad.webp",
  },
] as const;

export const WHY = [
  {
    index: "01",
    title: "Recognized & Affiliated",
    body: "Recognized by the Government of Maharashtra, affiliated to MSBTE Mumbai, with NEBOSH Silver Learning Partnership and MSME (Government of India) association.",
  },
  {
    index: "02",
    title: "Practical-First Training",
    body: "Fire engineering is primarily practical-centric. Regular practical sessions, fire drill attachments, industrial visits and exhibition visits are built into every program.",
  },
  {
    index: "03",
    title: "Experienced Leadership",
    body: "Led by an Ex-Indian Air Force officer — Gold Medalist Fire Safety Officer (Ministry of Home Affairs, Government of India) and Chairman of the Disaster Management Federation, Pune.",
  },
  {
    index: "04",
    title: "Placement Support",
    body: "A track record of more than 80% student placement, with dedicated assistance for the transition from training to professional career.",
  },
  {
    index: "05",
    title: "Multiple Learning Centers",
    body: "Head office, regional office and learning centers across Maharashtra — Pune, Aurangabad, Navi Mumbai, Thane, Borivali and Ratnagiri.",
  },
  {
    index: "06",
    title: "Modern Learning Infrastructure",
    body: "An advanced LMS platform, up-to-date computer lab, library and reading room, audio-video hall and separate hostels for boys and girls.",
  },
] as const;
