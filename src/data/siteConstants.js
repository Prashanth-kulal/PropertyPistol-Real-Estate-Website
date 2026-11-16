// Lightweight site-wide static constants (tools, footer links, developers, shortcuts)
// Prevents bundling 34+ MB of project registries when components only need UI static labels

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
    action: "property-advisory",
    href: "/property-advisory"
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    description: "Estimate stamp duty on your property deals",
    icon: "Calculator",
    action: "stamp-duty",
    href: "/stamp-duty-calculator"
  },
  {
    id: "converter",
    title: "Unit Converter",
    description: "Easily switch between sq. ft., sq. m., acres & more",
    icon: "ArrowLeftRight",
    action: "converter",
    href: "/unit-converter"
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Plan your monthly payments with ease",
    icon: "Banknote",
    action: "emi",
    href: "/emi-calculator"
  },
  {
    id: "investment",
    title: "Investment Calculator",
    description: "Estimate returns on your property",
    icon: "TrendingUp",
    action: "investment",
    href: "/investment-calculator"
  },
  {
    id: "rent-receipts",
    title: "Get Rent Receipts",
    description: "Generate your rent receipts online",
    icon: "FileText",
    action: "rent-receipts",
    href: "/rent-receipt-generator"
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
