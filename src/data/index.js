// AuraLiving Mock Data Store
// Structured for seamless future integration with GET /api/listings and Node/Express/MongoDB backend

export const CITIES = [
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", projectsCount: 1420, popular: true, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80" },
  { id: "pune", name: "Pune", state: "Maharashtra", projectsCount: 980, popular: true, image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80" },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", projectsCount: 1150, popular: true, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80" },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", projectsCount: 1320, popular: true, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", projectsCount: 890, popular: true, image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", projectsCount: 760, popular: true, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80" },
  { id: "gurugram", name: "Gurugram", state: "Haryana", projectsCount: 650, popular: true, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", projectsCount: 580, popular: true, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", projectsCount: 540, popular: true, image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", projectsCount: 490, popular: true, image: "https://images.unsplash.com/photo-1609137144822-26d24fc6170c?auto=format&fit=crop&w=800&q=80" },
  { id: "dubai", name: "Dubai", state: "UAE", projectsCount: 320, popular: true, image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80" },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", projectsCount: 290, popular: false, image: "https://images.unsplash.com/photo-1629853692882-990a424ca6b8?auto=format&fit=crop&w=800&q=80" },
  { id: "kochi", name: "Kochi", state: "Kerala", projectsCount: 210, popular: false, image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80" },
  { id: "goa", name: "Goa", state: "Goa", projectsCount: 180, popular: false, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", projectsCount: 160, popular: false, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", projectsCount: 150, popular: false, image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80" },
  { id: "thrissur", name: "Thrissur", state: "Kerala", projectsCount: 120, popular: false, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: "trivandrum", name: "Trivandrum", state: "Kerala", projectsCount: 130, popular: false, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
  { id: "calicut", name: "Calicut", state: "Kerala", projectsCount: 110, popular: false, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80" }
];

export const SEARCH_SHORTCUTS = [
  "Bandra West",
  "Powai",
  "Andheri East",
  "Worli",
  "Hinjewadi Pune",
  "Whitefield Bangalore",
  "Golf Course Road",
  "Thane West",
  "Ghansoli",
  "Cyber City Gurugram"
];

export const PROJECTS = [
  {
    id: "proj-1",
    name: "Godrej Eternal Palms",
    builder: "Godrej Properties",
    builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Sanpada, Navi Mumbai",
    price: "2.68 Cr",
    priceNumeric: 26800000,
    avgPrice: "₹33.48 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK",
    carpetArea: "800 - 1,408 sq.ft",
    status: "Under Construction",
    rera: "P51700049211",
    tag: "Exclusive",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Infinity Pool", "Clubhouse", "Panoramic Sea View", "EV Charging"]
  },
  {
    id: "proj-2",
    name: "L&T Island Cove",
    builder: "L&T Realty",
    builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Mahim West, Mumbai",
    price: "3.15 Cr",
    priceNumeric: 31500000,
    avgPrice: "₹46.38 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK",
    carpetArea: "680 - 1,394 sq.ft",
    status: "New Launch",
    rera: "P51900052341",
    tag: "Featured",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Bandra-Worli Sealink View", "Sky Lounge", "Smart Home Automation"]
  },
  {
    id: "proj-3",
    name: "L&T Elixir Reserve",
    builder: "L&T Realty",
    builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Powai, Mumbai",
    price: "2.61 Cr",
    priceNumeric: 26100000,
    avgPrice: "₹36.6 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK, 4 BHK",
    carpetArea: "713 - 2,200 sq.ft",
    status: "Under Construction",
    rera: "P51800034102",
    tag: "Luxury",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Lake Facing", "Forest Trail", "Olympic Pool", "Spa & Wellness"]
  },
  {
    id: "proj-4",
    name: "Tata Orbis",
    builder: "Tata Housing",
    builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Ghansoli, Navi Mumbai",
    price: "1.99 Cr",
    priceNumeric: 19900000,
    avgPrice: "₹26.53 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK",
    carpetArea: "750 - 1,155 sq.ft",
    status: "Under Construction",
    rera: "P51700048129",
    tag: "Trending",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Metro Connectivity", "Rooftop Garden", "Sports Complex"]
  },
  {
    id: "proj-5",
    name: "Kanakia Valley",
    builder: "Kanakia Spaces",
    builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Panvel, Navi Mumbai",
    price: "56.9 Lacs",
    priceNumeric: 5690000,
    avgPrice: "₹14.23 K / sq.ft",
    flatTypes: "1 BHK, 2 BHK",
    carpetArea: "400 - 600 sq.ft",
    status: "Ready to Move",
    rera: "P52000021980",
    tag: "Affordable",
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Airport Proximity", "Clubhouse", "Lush Greens"]
  },
  {
    id: "proj-6",
    name: "L&T Vayam",
    builder: "L&T Realty",
    builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
    city: "mumbai",
    location: "Thane West",
    price: "1.4 Cr",
    priceNumeric: 14000000,
    avgPrice: "₹12.56 K / sq.ft",
    flatTypes: "2 BHK, 4 BHK",
    carpetArea: "1,113 - 2,413 sq.ft",
    status: "Under Construction",
    rera: "P51700054321",
    tag: "New Launch",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Yeoor Hills View", "Grand Podium", "Jogging Track"]
  },
  {
    id: "proj-7",
    name: "Prestige Falcon City",
    builder: "Prestige Group",
    builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    city: "bangalore",
    location: "Kanakapura Road, Bangalore",
    price: "1.85 Cr",
    priceNumeric: 18500000,
    avgPrice: "₹11.8 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK, 4 BHK",
    carpetArea: "1,204 - 2,726 sq.ft",
    status: "Ready to Move",
    rera: "PRM/KA/RERA/1251/310/PR/170915/000216",
    tag: "Featured",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Metro Attached", "Huge Mall Onsite", "World-class Sports"]
  },
  {
    id: "proj-8",
    name: "Godrej Woodsville",
    builder: "Godrej Properties",
    builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    city: "pune",
    location: "Hinjewadi Phase 1, Pune",
    price: "82.5 Lacs",
    priceNumeric: 8250000,
    avgPrice: "₹9.2 K / sq.ft",
    flatTypes: "1 BHK, 2 BHK, 3 BHK",
    carpetArea: "512 - 980 sq.ft",
    status: "Under Construction",
    rera: "P52100046729",
    tag: "Popular",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["IT Park Adjacent", "Sky Walk", "Organic Garden"]
  },
  {
    id: "proj-9",
    name: "DLF The Arbour",
    builder: "DLF Limited",
    builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
    city: "gurugram",
    location: "Sector 63, Golf Course Ext Road",
    price: "7.5 Cr",
    priceNumeric: 75000000,
    avgPrice: "₹18.9 K / sq.ft",
    flatTypes: "4 BHK Luxury Suites",
    carpetArea: "3,950 sq.ft",
    status: "Under Construction",
    rera: "RC/REP/HARERA/GGM/686/418/2023/30",
    tag: "Ultra Luxury",
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
    ],
    features: ["Private Lift Lobby", "Double Height Balcony", "Central Park"]
  }
];

export const EXCLUSIVE_PROJECTS = [
  {
    id: "ex-1",
    name: "Aura Living Signature Waterfront",
    builder: "AuraLiving Signature",
    city: "Mumbai",
    location: "Worli Sea Face, Mumbai",
    priceRange: "₹8.5 Cr - ₹22 Cr",
    configuration: "3, 4 & 5 BHK Sky Mansions",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Exclusive Launch",
    description: "Uninterrupted Arabian Sea panoramic vistas with customized Italian marble flooring and private butler elevators."
  },
  {
    id: "ex-2",
    name: "Aura Palms The Golf Estate",
    builder: "Prestige & Aura Living",
    city: "Bangalore",
    location: "Indiranagar / Old Airport Rd",
    priceRange: "₹5.2 Cr - ₹14 Cr",
    configuration: "4 BHK Villa Residences",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Limited Edition",
    description: "Championship golf course facing residences surrounded by 40 acres of private botanical parklands."
  },
  {
    id: "ex-3",
    name: "Aura Grand Downtown Dubai",
    builder: "Emaar & Aura Living",
    city: "Dubai",
    location: "Downtown Dubai, UAE",
    priceRange: "AED 2.4M - AED 8.5M",
    configuration: "1, 2 & 3 BHK Suites",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "Golden Visa Eligible",
    description: "Direct Burj Khalifa and Dubai Fountain views with zero tax investment and guaranteed 8% rental yield."
  }
];

export { DEVELOPERS_DATA, getDeveloperBySlug, getAllDevelopers, getRelatedDevelopers } from "./developersData";

export const DEVELOPERS = [
  { id: "godrej", slug: "godrej-properties", name: "Godrej Properties", experience: "34 Years", projects: "140+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/007/medium/godrej.jpg?1578047383" },
  { id: "lnt", slug: "lt-realty", name: "L&T Realty", experience: "22 Years", projects: "85+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/014/medium/lnt.jpg?1578047360" },
  { id: "lodha", slug: "lodha-group", name: "Lodha Group", experience: "44 Years", projects: "210+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/006/medium/lodha_group_1.png?1707830644" },
  { id: "prestige", slug: "prestige-group", name: "Prestige Group", experience: "36 Years", projects: "250+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/001/443/original/prestige.jpg?1578047506" },
  { id: "tata", slug: "tata-housing", name: "Tata Housing", experience: "38 Years", projects: "95+ Projects", logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80" },
  { id: "hiranandani", slug: "hiranandani-group", name: "House of Hiranandani", experience: "40 Years", projects: "90+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/013/medium/Hiranandani1.jpg?1707727954" },
  { id: "shapoorji", slug: "shapoorji-pallonji", name: "Shapoorji Pallonji", experience: "158 Years", projects: "120+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/008/medium/Shapoorji-Pallonji-Logo.jpg?1707728753" },
  { id: "sobha", slug: "sobha-limited", name: "Sobha Limited", experience: "29 Years", projects: "160+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/002/242/medium/logo.jpg?1635151726" },
  { id: "brigade", slug: "brigade-group", name: "Brigade Group", experience: "37 Years", projects: "180+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/002/302/medium/bg-logo-hz.png?1636353513" },
  { id: "runwal", slug: "runwal-group", name: "Runwal Group", experience: "46 Years", projects: "65+ Projects", logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/024/medium/runwal.jpg?1543387303" },
  { id: "dlf", slug: "dlf-limited", name: "DLF Limited", experience: "75 Years", projects: "300+ Projects", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80" },
  { id: "oberoi", slug: "oberoi-realty", name: "Oberoi Realty", experience: "31 Years", projects: "70+ Projects", logo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=120&h=120&q=80" }
];

export const SHOTS_TOOLS = [
  {
  id: "advisory",
  title: "Property Advisory",
  description: "Expert guidance for smarter decisions",
  icon: "ShieldCheck",
  action: "property-advisory"
},
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    description: "Estimate stamp duty on your property deals",
    icon: "Calculator",
    action: "stamp-duty"
  },
  {
    id: "converter",
    title: "Unit Converter",
    description: "Easily switch between sq. ft., sq. m., acres & more",
    icon: "ArrowLeftRight",
    action: "converter"
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Plan your monthly payments with ease",
    icon: "Banknote",
    action: "emi"
  },
  {
    id: "investment",
    title: "Investment Calculator",
    description: "Estimate returns on your property",
    icon: "TrendingUp",
    action: "investment"
  },
  {
    id: "rent-receipts",
    title: "Get Rent Receipts",
    description: "Generate your rent receipts online",
    icon: "FileText",
    action: "rent-receipts"
  }
];

export const ACHIEVEMENTS = [
  { label: "Total Properties", value: "30,000+", icon: "Building2" },
  { label: "Property Experts", value: "800+", icon: "Users" },
  { label: "Happy Customers", value: "5,50,000+", icon: "Smile" },
  { label: "Developers", value: "2,000+", icon: "Briefcase" }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rohan & Sneha Kulkarni",
    city: "Mumbai",
    property: "Purchased in Godrej Eternal Palms, Sanpada",
    rating: 5,
    review: "AuraLiving provided completely zero brokerage transparent advisory. From visiting the site to getting the home loan approved at the lowest rate, their property specialist handled every detail flawlessly.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Vikram Singhania",
    city: "Bangalore",
    property: "Purchased in Prestige Falcon City, Kanakapura Road",
    rating: 5,
    review: "Being an NRI buyer based in Singapore, having reliable on-ground representatives was essential. AuraLiving made document verification, RERA checks, and digital booking effortless.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Ananya Deshmukh",
    city: "Pune",
    property: "Purchased in Godrej Woodsville, Hinjewadi",
    rating: 5,
    review: "The Aura AI search matched my budget and commute preferences within minutes. Their dedicated relationship manager arranged three developer walkthroughs on the same weekend. Outstanding service!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "What is the current market price per square foot for different localities in Mumbai?",
    answer: "The market price per square foot in Mumbai varies greatly depending on the locality. For upscale areas like South Mumbai, Cuffe Parade, prices can range from ₹30,000 to ₹50,000 per square foot. In areas like Bandra, Andheri, and Powai, prices are typically between ₹15,000 to ₹25,000 per square foot. More affordable localities like Mira Road and Bhayander offer properties in the range of ₹7,000 to ₹10,000 per square foot. Please consult an AuraLiving real estate advisor or check our latest property listings for live rates."
  },
  {
    id: "faq-2",
    question: "What are the essential documents required to buy a property in India?",
    answer: "Essential documents for buying property include the Sale Deed, Mother Deed/Title Deed, Encumbrance Certificate (EC), latest property tax receipts, Khata Certificate, and Occupation Certificate (OC) for ready-to-move-in properties. Additionally, the Sale Agreement must be registered under RERA guidelines with stamp duty paid."
  },
  {
    id: "faq-3",
    question: "Which are the popular localities to buy a residential plot or new project in Mumbai?",
    answer: "Popular localities to buy residential projects include Navi Mumbai (Vashi, Panvel, and Kharghar), Thane (Ghodbunder Road, Majiwada, and Kalyan), and western suburbs like Malad, Goregaon, and Borivali. These areas offer strong infrastructure, metro connectivity, and strong capital appreciation."
  },
  {
    id: "faq-4",
    question: "Which is the best residential area for families in Mumbai?",
    answer: "The ideal area depends on lifestyle and budget: South Mumbai (Tardeo, Parel, Worli) for elite sea-facing infrastructure; Bandra West for vibrant cosmopolitan culture and top international schools; Powai for tranquil lake views and modern gated townships; and Juhu for peaceful beachside living."
  },
  {
    id: "faq-5",
    question: "How much does it cost to buy a house in Mumbai and tier-1 cities?",
    answer: "Costs vary across segments. Ultra-luxury properties in prime South Mumbai or Golf Course Road Gurugram can exceed ₹10 Crores. Premium mid-range apartments in Andheri, Powai, or Bangalore Whitefield typically range between ₹1 Crore to ₹3 Crores. Emerging suburbs offer 1 BHK and 2 BHK apartments starting from ₹45 Lakhs to ₹75 Lakhs."
  },
  {
    id: "faq-6",
    question: "Does AuraLiving charge any brokerage from buyers on new projects?",
    answer: "No! AuraLiving operates on a 100% Zero Brokerage model for all new developer projects and builder listings. Our advisory, property tours, paperwork assistance, and home loan facilitation are completely free for buyers."
  },
  {
    id: "faq-7",
    question: "How does AuraLiving ensure RERA compliance?",
    answer: "Every single project featured on AuraLiving is audited by our legal research desk to verify valid RERA registration numbers, approved building plans, title clarity, and escrow compliance before being published on our platform."
  }
];

export const FOOTER_LINKS = {
  services: [
    { label: "Builder Service", href: "/services/builder-service" },
    { label: "Syndicate Broker Network", href: "/services/syndicate" },
    { label: "Home Loan & EMI Calculator", href: "/emi-calculator" },
    { label: "Investment Calculator", href: "/investment-calculator" },
    { label: "Rent Receipt Generator", href: "/rent-receipt-generator" },
    { label: "PropCheck Quality Inspection", href: "/propcheck" },
    { label: "Rent Agreement E-Registration", href: "/rent-agreement" },
    { label: "Dubai Desk (NRI & Golden Visa)", href: "#exclusive" }
  ],
  knowUs: [
    { label: "About AuraLiving", href: "#achievements" },
    { label: "Leadership & Vision", href: "#achievements" },
    { label: "Careers & Culture", href: "#" },
    { label: "Customer Stories", href: "#testimonials" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy & RERA", href: "#" }
  ],
  reachUs: [
    { label: "Toll Free: 1800-209-4040", href: "tel:18002094040" },
    { label: "Email: support@auraliving.com", href: "mailto:support@auraliving.com" },
    { label: "HQ: Tower B, World Trade Center, Mumbai 400005", href: "#" },
    { label: "Mon - Sat: 9:00 AM to 8:00 PM IST", href: "#" }
  ],
  brokerApp: [
    { label: "Aura Syndicate Partner Program", href: "#" },
    { label: "Developer Listing Portal", href: "#" },
    { label: "Channel Partner Network", href: "#" },
    { label: "Aura Mobile App for Agents", href: "#" }
  ]
};

export {
  CANONICAL_PROJECTS,
  getProjectSlug,
  getProjectBySlug,
  getAllProjectSlugs
} from "./projectsData";
