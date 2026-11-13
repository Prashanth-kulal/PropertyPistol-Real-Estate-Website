// AuraLiving Mock Data Store
// Structured for seamless future integration with GET /api/listings and Node/Express/MongoDB backend

import { MUMBAI_REGISTRY_PROJECTS } from "./mumbaiProjectsRegistry.js";
import { DELHI_REGISTRY_PROJECTS } from "./delhiProjectsRegistry.js";
import { GOA_REGISTRY_PROJECTS } from "./goaProjectsRegistry.js";
import { COIMBATORE_REGISTRY_PROJECTS } from "./coimbatoreProjectsRegistry.js";
import { NAGPUR_REGISTRY_PROJECTS } from "./nagpurProjectsRegistry.js";
import { THRISSUR_REGISTRY_PROJECTS } from "./thrissurProjectsRegistry.js";
import { TRIVANDRUM_REGISTRY_PROJECTS } from "./trivandrumProjectsRegistry.js";
import { CALICUT_REGISTRY_PROJECTS } from "./calicutProjectsRegistry.js";
import { BANGALORE_REGISTRY_PROJECTS } from "./bangaloreProjectsRegistry.js";
import { NOIDA_REGISTRY_PROJECTS } from "./noidaProjectsRegistry.js";
import { PUNE_REGISTRY_PROJECTS } from "./puneProjectsRegistry.js";

export { MUMBAI_REGISTRY_PROJECTS, DELHI_REGISTRY_PROJECTS, GOA_REGISTRY_PROJECTS, COIMBATORE_REGISTRY_PROJECTS, NAGPUR_REGISTRY_PROJECTS, THRISSUR_REGISTRY_PROJECTS, TRIVANDRUM_REGISTRY_PROJECTS, CALICUT_REGISTRY_PROJECTS, BANGALORE_REGISTRY_PROJECTS, NOIDA_REGISTRY_PROJECTS, PUNE_REGISTRY_PROJECTS };

export const CITIES = [
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", projectsCount: 2771, popular: true, image: "/projects/20550/cover.jpg" },
  { id: "pune", name: "Pune", state: "Maharashtra", projectsCount: 1027, popular: true, image: "/projects/21271/cover.jpg" },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", projectsCount: 16, popular: true, image: "/projects/4709/cover.jpg" },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", projectsCount: 799, popular: true, image: "/projects/19794/cover.jpg" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", projectsCount: 890, popular: true, image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", projectsCount: 760, popular: true, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80" },
  { id: "gurugram", name: "Gurugram", state: "Haryana", projectsCount: 650, popular: true, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", projectsCount: 100, popular: true, image: "/projects/15680/cover.jpg" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", projectsCount: 540, popular: true, image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", projectsCount: 490, popular: true, image: "https://images.unsplash.com/photo-1609137144822-26d24fc6170c?auto=format&fit=crop&w=800&q=80" },
  { id: "dubai", name: "Dubai", state: "UAE", projectsCount: 320, popular: true, image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80" },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", projectsCount: 290, popular: false, image: "https://images.unsplash.com/photo-1629853692882-990a424ca6b8?auto=format&fit=crop&w=800&q=80" },
  { id: "kochi", name: "Kochi", state: "Kerala", projectsCount: 210, popular: false, image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80" },
  { id: "goa", name: "Goa", state: "Goa", projectsCount: 48, popular: false, image: "/projects/17853/cover.jpg" },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", projectsCount: 79, popular: false, image: "/projects/17588/cover.jpg" },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", projectsCount: 128, popular: false, image: "/projects/17226/cover.jpg" },
  { id: "thrissur", name: "Thrissur", state: "Kerala", projectsCount: 8, popular: false, image: "/projects/11931/cover.jpg" },
  { id: "trivandrum", name: "Trivandrum", state: "Kerala", projectsCount: 33, popular: false, image: "/projects/17776/cover.jpg" },
  { id: "calicut", name: "Calicut", state: "Kerala", projectsCount: 13, popular: false, image: "/projects/17236/cover.jpg" }
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

export const NON_MUMBAI_PROJECTS = [
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

export const PROJECTS = [
  ...MUMBAI_REGISTRY_PROJECTS,
  ...DELHI_REGISTRY_PROJECTS,
  ...GOA_REGISTRY_PROJECTS,
  ...COIMBATORE_REGISTRY_PROJECTS,
  ...NAGPUR_REGISTRY_PROJECTS,
  ...THRISSUR_REGISTRY_PROJECTS,
  ...TRIVANDRUM_REGISTRY_PROJECTS,
  ...CALICUT_REGISTRY_PROJECTS,
  ...BANGALORE_REGISTRY_PROJECTS,
  ...NOIDA_REGISTRY_PROJECTS,
  ...PUNE_REGISTRY_PROJECTS,
  ...NON_MUMBAI_PROJECTS
];
export const EXCLUSIVE_PROJECTS = [
  {
    id: "godrej-south-estate-prima",
    slug: "godrej-south-estate-prima-4709",
    name: "Godrej South Estate - Prima",
    builder: "Godrej Properties",
    city: "Delhi",
    location: "Okhla, South Delhi",
    priceRange: "₹5.51 Cr onwards",
    configuration: "2, 3 & 4 BHK Luxury Apartments",
    image: "/projects/4709/cover.jpg",
    badge: "Ultra Luxury",
    description: "First luxury development by Godrej in South Delhi featuring air purification technology, lavish clubhouse, and panoramic views of lush green surroundings."
  },
  {
    id: "the-leela-sky-villas",
    slug: "the-leela-sky-villas-8382",
    name: "The Leela Sky Villas",
    builder: "Raheja Developers",
    city: "Delhi",
    location: "Kirti Nagar, West Delhi",
    priceRange: "₹6.35 Cr onwards",
    configuration: "3, 4 & 5 BHK Sky Villas",
    image: "/projects/8382/cover.jpg",
    badge: "Exclusive Launch",
    description: "Tallest planned residential development in Delhi offering private lap pools in each apartment and hospitality curated by The Leela."
  },
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
,
  {
    id: "prestige-nautilus",
    slug: "prestige-nautilus",
    name: "Prestige Nautilus",
    builder: "Prestige Group",
    city: "Mumbai",
    location: "Worli, South Mumbai",
    priceRange: "₹42.0 Cr onwards",
    configuration: "4 & 5 BHK Ultra Luxury Sea Mansions",
    image: "/projects/4407/cover.jpg",
    badge: "Ultra Luxury",
    description: "Iconic Worli seafront landmark featuring uninterrupted Arabian Sea panoramas, private elevator foyers, and world-class concierge services."
  },
  {
    id: "lt-the-gateway",
    slug: "lt-the-gateway",
    name: "L&T The Gateway",
    builder: "L&T Realty",
    city: "Mumbai",
    location: "Sewri, South Mumbai",
    priceRange: "₹11.73 Cr onwards",
    configuration: "3 & 4 BHK Luxury Residences",
    image: "/projects/16032/cover.jpg",
    badge: "Exclusive Launch",
    description: "Panoramic harbour views overlooking the Mumbai Trans Harbour Link (Atal Setu), crafted with expansive double-height sundecks."
  },
  {
    id: "godrej-eternal-palms",
    slug: "godrej-eternal-palms",
    name: "Godrej Eternal Palms",
    builder: "Godrej Properties",
    city: "Mumbai",
    location: "Sanpada, Navi Mumbai",
    priceRange: "₹4.89 Cr onwards",
    configuration: "3 BHK Apartment",
    image: "/projects/20550/cover.jpg",
    badge: "RERA Verified",
    description: "Ultra-premium green living in the heart of Sanpada with 70% open landscaped spaces, modern smart homes, and high-speed Atal Setu transit."
  }
];

export { DEVELOPERS_DATA, getDeveloperBySlug, getAllDevelopers, getRelatedDevelopers } from "./developersData.js";

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
    { label: "Builder Services", href: "/builder-service" },
    { label: "Broker Services", href: "/services/syndicate" },
    { label: "Radiate", href: "/services/radiate" },
    { label: "Loan Services", href: "/loan-service" },
    { label: "NRI Desk", href: "/services/nri-desk" }
  ],
  knowUs: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Sitemap", href: "/sitemap" }
  ],
  reachUs: [
    { label: "Offices", href: "/offices" },
    { label: "Toll Free +91 8080 190190", href: "tel:+918080190190" },
    { label: "support@propertypistol.com", href: "mailto:support@propertypistol.com" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "User Agreement", href: "/user-agreement" },
    { label: "Disclaimer", href: "/disclaimer" }
  ]
};

export {
  CANONICAL_PROJECTS,
  getProjectSlug,
  getProjectBySlug,
  getAllProjectSlugs
} from "./projectsData.js";
