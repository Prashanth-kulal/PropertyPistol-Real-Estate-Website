// City-Specific Mock Data Store for AuraLiving
// Maps every supported metro to verified property listings, top localities, market trends, and FAQs

export const CITY_DETAILS = {
  mumbai: {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tagline: "The Financial Capital of India & Premier Luxury Real Estate Hub",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 1420,
    avgPriceSqFt: "₹28,500",
    appreciationRate: "+11.4% YoY",
    rentalYield: "3.8% p.a.",
    reraAuthority: "MahaRERA",
    stampDuty: "5% + 1% Metro Cess",
    description: "Mumbai remains India's most coveted property market, driven by landmark connectivity upgrades like the Mumbai Trans Harbour Link (Atal Setu), Coastal Road, and expanding Metro lines.",
    localities: [
      { name: "Bandra West", avgPrice: "₹58,000 / sq.ft", projects: 48, tag: "Ultra Luxury" },
      { name: "Powai", avgPrice: "₹26,500 / sq.ft", projects: 62, tag: "Tech & Lakeside" },
      { name: "Thane West", avgPrice: "₹14,200 / sq.ft", projects: 120, tag: "Green Metros" },
      { name: "Andheri West", avgPrice: "₹31,000 / sq.ft", projects: 85, tag: "Central Hub" },
      { name: "Kharghar", avgPrice: "₹10,500 / sq.ft", projects: 94, tag: "Navi Mumbai" },
      { name: "Panvel", avgPrice: "₹8,400 / sq.ft", projects: 110, tag: "Airport Corridor" },
      { name: "Worli", avgPrice: "₹64,000 / sq.ft", projects: 32, tag: "Seafront Towers" },
      { name: "Malad West", avgPrice: "₹18,900 / sq.ft", projects: 76, tag: "Suburban Core" }
    ],
    faqs: [
      {
        q: "What is the stamp duty and registration charge in Mumbai?",
        a: "Currently, stamp duty in Mumbai is 5% plus a 1% Metro Cess, totaling 6% for male buyers and 5% for female buyers, with a standard registration fee of ₹30,000 for properties above ₹30 Lacs."
      },
      {
        q: "Which are the best emerging micro-markets for investment in Mumbai?",
        a: "Panvel, Ulwe, and Dronagiri in Navi Mumbai are benefiting immensely from the upcoming Navi Mumbai International Airport and MTHL. In the western suburbs, Goregaon and Kandivali offer strong rental yields."
      },
      {
        q: "Are all AuraLiving listed properties in Mumbai MahaRERA registered?",
        a: "Yes, every single development listed on AuraLiving is 100% verified with its valid MahaRERA registration number and RERA documentation."
      }
    ]
  },

  pune: {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    tagline: "India's Cultural & IT Powerhouse with Unrivaled Livability",
    heroImage: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 980,
    avgPriceSqFt: "₹8,900",
    appreciationRate: "+13.2% YoY",
    rentalYield: "4.4% p.a.",
    reraAuthority: "MahaRERA",
    stampDuty: "6% (incl. 1% Metro Cess)",
    description: "Pune offers exceptional lifestyle quality backed by robust IT clusters in Hinjawadi and Kharadi, top educational institutions, and serene green surroundings.",
    localities: [
      { name: "Hinjewadi", avgPrice: "₹7,800 / sq.ft", projects: 95, tag: "IT Park Corridor" },
      { name: "Kharadi", avgPrice: "₹9,600 / sq.ft", projects: 88, tag: "World Trade Center" },
      { name: "Baner", avgPrice: "₹10,800 / sq.ft", projects: 72, tag: "High Street & Dining" },
      { name: "Wakad", avgPrice: "₹8,200 / sq.ft", projects: 84, tag: "Fast Transit" },
      { name: "Kothrud", avgPrice: "₹14,500 / sq.ft", projects: 40, tag: "Heritage & Metro" },
      { name: "Bavdhan", avgPrice: "₹8,900 / sq.ft", projects: 52, tag: "Green Foothills" },
      { name: "Balewadi", avgPrice: "₹10,200 / sq.ft", projects: 60, tag: "Sports City" }
    ],
    faqs: [
      {
        q: "Why is Pune considered one of India's best rental yield markets?",
        a: "Due to the massive influx of IT and automotive professionals in Hinjawadi, Magarpatta, and Kharadi, Pune delivers consistent rental yields between 4% and 5%."
      },
      {
        q: "What is the Pune Metro impact on real estate prices?",
        a: "Properties along the Pune Metro Line 1 and Line 2 corridors (Vanaz to Ramwadi, PCMC to Swargate) have witnessed appreciation of 15-20% over the last 24 months."
      }
    ]
  },

  bangalore: {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    tagline: "The Silicon Valley of India & Global Tech Innovation Hub",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 1320,
    avgPriceSqFt: "₹10,500",
    appreciationRate: "+14.8% YoY",
    rentalYield: "4.8% p.a.",
    reraAuthority: "K-RERA",
    stampDuty: "5% + Surcharge",
    description: "Bangalore leads India in tech-driven wealth creation, multinational corporate campuses, and world-class gated communities.",
    localities: [
      { name: "Whitefield", avgPrice: "₹9,800 / sq.ft", projects: 130, tag: "Tech Corridors & Metro" },
      { name: "Sarjapur Road", avgPrice: "₹9,200 / sq.ft", projects: 115, tag: "Premier Schools" },
      { name: "Electronic City", avgPrice: "₹6,800 / sq.ft", projects: 88, tag: "Elevated Expressway" },
      { name: "Indiranagar", avgPrice: "₹22,000 / sq.ft", projects: 28, tag: "Prime Cosmopolitan" },
      { name: "Bellandur", avgPrice: "₹11,400 / sq.ft", projects: 64, tag: "ORR Tech Corridor" },
      { name: "Hebbal", avgPrice: "₹12,800 / sq.ft", projects: 70, tag: "Airport Express" },
      { name: "Kanakapura Road", avgPrice: "₹8,500 / sq.ft", projects: 58, tag: "Green Living" }
    ],
    faqs: [
      {
        q: "Which areas in Bangalore have the highest capital appreciation?",
        a: "North Bangalore around Hebbal, Bagalur, and airport corridors, along with East Bangalore around Whitefield and Varthur, continue to see double-digit capital gains."
      },
      {
        q: "What is the K-RERA verification procedure?",
        a: "All projects in Karnataka must be registered with K-RERA. AuraLiving verifies the RERA registration number and RERA approved building sanction plans before listing."
      }
    ]
  },

  delhi: {
    id: "delhi",
    name: "Delhi NCR",
    state: "Delhi",
    tagline: "India's Capital Region & Power Center of North India",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 1150,
    avgPriceSqFt: "₹16,200",
    appreciationRate: "+12.1% YoY",
    rentalYield: "3.5% p.a.",
    reraAuthority: "D-RERA / HRERA / UP-RERA",
    stampDuty: "6% (Male) / 4% (Female)",
    description: "Delhi NCR brings together premier luxury enclaves in South Delhi with massive futuristic infrastructure across Dwarka Expressway and Noida corridors.",
    localities: [
      { name: "Dwarka", avgPrice: "₹14,500 / sq.ft", projects: 65, tag: "Airport & Diplomatic" },
      { name: "South Delhi", avgPrice: "₹38,000 / sq.ft", projects: 35, tag: "Legacy Luxury" },
      { name: "Golf Course Ext", avgPrice: "₹16,500 / sq.ft", projects: 80, tag: "Gurugram Prime" },
      { name: "Sector 150", avgPrice: "₹9,200 / sq.ft", projects: 74, tag: "Sports City Noida" },
      { name: "Okhla", avgPrice: "₹18,000 / sq.ft", projects: 25, tag: "Central Hub" },
      { name: "Rohini", avgPrice: "₹11,000 / sq.ft", projects: 45, tag: "Suburban Core" }
    ],
    faqs: [
      {
        q: "How does property taxation work across Delhi NCR?",
        a: "Taxation varies by state: Delhi has 6% (men) / 4% (women); Haryana (Gurugram) has 7% (men) / 5% (women); UP (Noida) has 7% stamp duty."
      }
    ]
  },

  hyderabad: {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tagline: "The City of Pearls & Top Performing Real Estate Market",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 890,
    avgPriceSqFt: "₹8,400",
    appreciationRate: "+15.6% YoY",
    rentalYield: "4.2% p.a.",
    reraAuthority: "TS-RERA",
    stampDuty: "7.5%",
    description: "Hyderabad boasts unparalleled infrastructure with its 158 km Outer Ring Road, zero water shortages, and booming IT/pharma corridors in Gachibowli and Financial District.",
    localities: [
      { name: "Gachibowli", avgPrice: "₹9,800 / sq.ft", projects: 92, tag: "Financial District" },
      { name: "Hitec City", avgPrice: "₹11,200 / sq.ft", projects: 78, tag: "Tech Mega Hub" },
      { name: "Tellapur", avgPrice: "₹7,600 / sq.ft", projects: 85, tag: "ORR Gateway" },
      { name: "Kondapur", avgPrice: "₹8,900 / sq.ft", projects: 65, tag: "Lifestyle Center" },
      { name: "Jubilee Hills", avgPrice: "₹24,000 / sq.ft", projects: 24, tag: "Elite Enclave" },
      { name: "Kokapet", avgPrice: "₹11,500 / sq.ft", projects: 70, tag: "Neopolis Towers" }
    ],
    faqs: [
      {
        q: "What makes Hyderabad's Kokapet Neopolis so attractive?",
        a: "Kokapet Neopolis is designated as a high-density, skyscraper commercial and luxury residential zone with state-of-the-art underground utilities."
      }
    ]
  },

  chennai: {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Gateway of South India & Automotive / IT Capital",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 760,
    avgPriceSqFt: "₹7,800",
    appreciationRate: "+9.8% YoY",
    rentalYield: "3.9% p.a.",
    reraAuthority: "TNRERA",
    stampDuty: "7% + 4% Registration",
    description: "Chennai features stable end-user driven growth, coastal lifestyle along ECR, and high-density tech development across Old Mahabalipuram Road (OMR).",
    localities: [
      { name: "OMR", avgPrice: "₹6,800 / sq.ft", projects: 110, tag: "IT Expressway" },
      { name: "ECR", avgPrice: "₹12,400 / sq.ft", projects: 45, tag: "Coastal Villas" },
      { name: "Anna Nagar", avgPrice: "₹16,500 / sq.ft", projects: 38, tag: "Prime Residential" },
      { name: "Velachery", avgPrice: "₹8,900 / sq.ft", projects: 54, tag: "Metro Connected" },
      { name: "Porur", avgPrice: "₹7,200 / sq.ft", projects: 62, tag: "Industrial Hub" }
    ],
    faqs: [
      {
        q: "What are the latest changes in Chennai property registration charges?",
        a: "Tamil Nadu recently rationalized composite registration fees, significantly easing the total transaction costs for apartment buyers."
      }
    ]
  },

  gurugram: {
    id: "gurugram",
    name: "Gurugram",
    state: "Haryana",
    tagline: "Millennium City of Luxury Living & Global Multinational Headquarters",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 650,
    avgPriceSqFt: "₹15,400",
    appreciationRate: "+16.2% YoY",
    rentalYield: "4.5% p.a.",
    reraAuthority: "HARERA",
    stampDuty: "7% (Male) / 5% (Female)",
    description: "Gurugram is the luxury capital of North India, home to Fortune 500 offices, world-class golf courses, and iconic skyline towers on Golf Course Road.",
    localities: [
      { name: "Golf Course Road", avgPrice: "₹32,000 / sq.ft", projects: 40, tag: "Billionaire Row" },
      { name: "Golf Course Ext", avgPrice: "₹17,200 / sq.ft", projects: 75, tag: "Ultra Luxury" },
      { name: "Dwarka Expressway", avgPrice: "₹12,800 / sq.ft", projects: 120, tag: "Super Expressway" },
      { name: "Cyber City", avgPrice: "₹24,000 / sq.ft", projects: 30, tag: "Fortune 500 Hub" },
      { name: "Sohna Road", avgPrice: "₹8,400 / sq.ft", projects: 60, tag: "Elevated Corridor" }
    ],
    faqs: [
      {
        q: "Why is Dwarka Expressway in Gurugram witnessing a property boom?",
        a: "With the full 16-lane expressway open and direct seamless connection to IGI Airport's Terminal 3 in 15 minutes, Dwarka Expressway is experiencing historic capital appreciation."
      }
    ]
  },

  noida: {
    id: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    tagline: "Planned Infrastructure Haven with World-Class Jewar Airport Proximity",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 580,
    avgPriceSqFt: "₹8,200",
    appreciationRate: "+13.8% YoY",
    rentalYield: "4.1% p.a.",
    reraAuthority: "UP RERA",
    stampDuty: "7%",
    description: "Noida offers wide multi-lane boulevards, extensive green cover, and proximity to the upcoming Noida International Airport at Jewar.",
    localities: [
      { name: "Sector 150", avgPrice: "₹9,800 / sq.ft", projects: 65, tag: "Sports City" },
      { name: "Noida Expressway", avgPrice: "₹8,900 / sq.ft", projects: 80, tag: "Corporate Axis" },
      { name: "Sector 128", avgPrice: "₹12,400 / sq.ft", projects: 40, tag: "Golf Enclave" },
      { name: "Greater Noida West", avgPrice: "₹5,800 / sq.ft", projects: 95, tag: "High Affordability" }
    ],
    faqs: [
      {
        q: "What is the impact of Jewar Airport on Noida property?",
        a: "Property along Noida-Greater Noida Expressway and Yamuna Expressway has grown over 40% in demand as trial flights near completion."
      }
    ]
  },

  kolkata: {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    tagline: "City of Joy with Vibrant Architectural Heritage and Modern IT Metros",
    heroImage: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 540,
    avgPriceSqFt: "₹6,400",
    appreciationRate: "+8.9% YoY",
    rentalYield: "3.6% p.a.",
    reraAuthority: "WBHIRA / RERA",
    stampDuty: "6%",
    description: "Kolkata offers attractive property affordability, new metro expansions under the Hooghly river, and expanding IT hubs in New Town and Rajarhat.",
    localities: [
      { name: "New Town", avgPrice: "₹7,200 / sq.ft", projects: 85, tag: "Smart City Hub" },
      { name: "Rajarhat", avgPrice: "₹5,800 / sq.ft", projects: 70, tag: "Airport Link" },
      { name: "EM Bypass", avgPrice: "₹11,400 / sq.ft", projects: 52, tag: "Arterial Expressway" },
      { name: "Ballygunge", avgPrice: "₹18,500 / sq.ft", projects: 22, tag: "Legacy Luxury" }
    ],
    faqs: [
      {
        q: "Is New Town Action Area 1 and 2 ideal for real estate investment?",
        a: "Yes, New Town is a planned green smart city with international schools, Eco Park, and direct metro connectivity."
      }
    ]
  },

  ahmedabad: {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    tagline: "India's First UNESCO Heritage City & Industrial Economic Marvel",
    heroImage: "https://images.unsplash.com/photo-1609137144822-26d24fc6170c?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 490,
    avgPriceSqFt: "₹6,100",
    appreciationRate: "+10.5% YoY",
    rentalYield: "3.8% p.a.",
    reraAuthority: "GujRERA",
    stampDuty: "4.9% + 1% Reg",
    description: "Ahmedabad features rapid economic expansion powered by GIFT City, the Sabarmati Riverfront, and booming industrial corridors.",
    localities: [
      { name: "SG Highway", avgPrice: "₹7,800 / sq.ft", projects: 80, tag: "Commercial Corridor" },
      { name: "Bopal / South Bopal", avgPrice: "₹5,400 / sq.ft", projects: 65, tag: "Fast Transit" },
      { name: "GIFT City", avgPrice: "₹9,200 / sq.ft", projects: 45, tag: "Global Financial Center" },
      { name: "Prahlad Nagar", avgPrice: "₹8,900 / sq.ft", projects: 38, tag: "Premium Cosmopolitan" }
    ],
    faqs: [
      {
        q: "Can non-residents buy residential property in GIFT City?",
        a: "Yes, GIFT City has relaxed regulations allowing domestic and NRI buyers to purchase high-grade residential apartments with special tax exemptions."
      }
    ]
  },

  dubai: {
    id: "dubai",
    name: "Dubai",
    state: "UAE",
    tagline: "The World's Luxury Real Estate & Zero-Tax Capital",
    heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 320,
    avgPriceSqFt: "AED 1,650",
    appreciationRate: "+18.4% YoY",
    rentalYield: "7.2% p.a.",
    reraAuthority: "Dubai RERA (DLD)",
    stampDuty: "4% DLD Fee",
    description: "Dubai offers zero income tax, high rental yields (6-8%), 10-year Golden Visa eligibility, and unrivaled cosmopolitan security.",
    localities: [
      { name: "Downtown Dubai", avgPrice: "AED 2,800 / sq.ft", projects: 45, tag: "Burj Khalifa" },
      { name: "Dubai Marina", avgPrice: "AED 1,950 / sq.ft", projects: 52, tag: "Waterfront Living" },
      { name: "Business Bay", avgPrice: "AED 1,800 / sq.ft", projects: 60, tag: "Canal Views" },
      { name: "Palm Jumeirah", avgPrice: "AED 3,900 / sq.ft", projects: 30, tag: "Ultra Luxury Island" }
    ],
    faqs: [
      {
        q: "How does the UAE Golden Visa work with property purchase?",
        a: "Purchasing property worth AED 2 Million (approx. ₹4.5 Crore) qualifies investors and their families for a renewable 10-year UAE Golden Visa."
      }
    ]
  },

  goa: {
    id: "goa",
    name: "Goa",
    state: "Goa",
    tagline: "India's Premier Coastal Holiday Home & Luxury Villa Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 180,
    avgPriceSqFt: "₹14,200",
    appreciationRate: "+16.8% YoY",
    rentalYield: "6.5% p.a.",
    reraAuthority: "Goa RERA",
    stampDuty: "3% to 4%",
    description: "Goa has transformed from a vacation spot to India's most sought-after holiday and second-home destination with exceptional short-term rental yields.",
    localities: [
      { name: "Assagao", avgPrice: "₹24,000 / sq.ft", projects: 32, tag: "Designer Villas" },
      { name: "Candolim", avgPrice: "₹18,000 / sq.ft", projects: 28, tag: "Beachfront Living" },
      { name: "Anjuna", avgPrice: "₹19,500 / sq.ft", projects: 25, tag: "Boho Luxury" },
      { name: "Dona Paula", avgPrice: "₹16,000 / sq.ft", projects: 20, tag: "South Goa Sea Views" }
    ],
    faqs: [
      {
        q: "What is the holiday rental yield potential in North Goa?",
        a: "Luxury gated villas in Assagao, Siolim, and Anjuna generate 6% to 9% net annual rental yields through managed vacation rental operators."
      }
    ]
  }
};

// Generates fallback metadata for any city without a dedicated profile
export function getCityDetails(cityId) {
  const normalizedId = (cityId || "").toLowerCase().trim();
  if (CITY_DETAILS[normalizedId]) {
    return CITY_DETAILS[normalizedId];
  }

  // Graceful fallback for secondary metros (Lucknow, Kochi, Coimbatore, Nagpur, Thrissur, Trivandrum, etc.)
  const formattedName = normalizedId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    id: normalizedId,
    name: formattedName || "Metropolitan City",
    state: "India",
    tagline: `Verified Residential & Commercial Properties in ${formattedName}`,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    projectsCount: 240,
    avgPriceSqFt: "₹7,200",
    appreciationRate: "+10.2% YoY",
    rentalYield: "4.0% p.a.",
    reraAuthority: "State RERA",
    stampDuty: "5% - 7%",
    description: `Discover top handpicked, zero-brokerage homes and builder developments in ${formattedName} with legally verified title deeds and direct developer pricing.`,
    localities: [
      { name: `${formattedName} Central`, avgPrice: "₹8,500 / sq.ft", projects: 42, tag: "Downtown Hub" },
      { name: `${formattedName} Expressway`, avgPrice: "₹6,800 / sq.ft", projects: 58, tag: "Transit Corridor" },
      { name: `Green Enclave ${formattedName}`, avgPrice: "₹7,200 / sq.ft", projects: 36, tag: "Gated Communities" },
      { name: `${formattedName} IT / Aero Hub`, avgPrice: "₹6,200 / sq.ft", projects: 48, tag: "Growth Corridor" }
    ],
    faqs: [
      {
        q: `Are all properties in ${formattedName} verified by AuraLiving?`,
        a: `Yes, our local real estate advisors inspect title deeds, RERA sanctions, and builder past delivery records for 100% legal compliance.`
      },
      {
        q: `Do you charge any brokerage for new projects in ${formattedName}?`,
        a: `Zero brokerage is charged from property buyers. You receive direct developer pricing and exclusive launch incentives.`
      }
    ]
  };
}

// City-specific sample properties
export const CITY_PROPERTIES = {
  mumbai: [
    {
      id: "mum-1",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Infinity Pool", "Clubhouse", "Panoramic Sea View", "EV Charging"]
    },
    {
      id: "mum-2",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Sealink View", "Sky Lounge", "Smart Automation"]
    },
    {
      id: "mum-3",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Lake Facing", "Olympic Pool", "Spa & Wellness"]
    },
    {
      id: "mum-4",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Metro Connected", "Rooftop Garden", "Sports Complex"]
    },
    {
      id: "mum-5",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Airport Proximity", "Clubhouse", "Lush Greens"]
    },
    {
      id: "mum-6",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Yeoor Hills View", "Grand Podium", "Jogging Track"]
    }
  ],

  pune: [
    {
      id: "pun-1",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["IT Park Adjacent", "Sky Walk", "Organic Garden"]
    },
    {
      id: "pun-2",
      name: "VTP Sierra",
      builder: "VTP Realty",
      builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      city: "pune",
      location: "Baner - Sus, Pune",
      price: "1.12 Cr",
      priceNumeric: 11200000,
      avgPrice: "₹10.5 K / sq.ft",
      flatTypes: "2 BHK, 3 BHK",
      carpetArea: "780 - 1,250 sq.ft",
      status: "Ready to Move",
      rera: "P52100026781",
      tag: "Ready",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Mountain Vistas", "Podium Sports", "Co-working Lounge"]
    },
    {
      id: "pun-3",
      name: "Panchshil Towers",
      builder: "Panchshil Realty",
      builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
      city: "pune",
      location: "Kharadi, Pune",
      price: "3.4 Cr",
      priceNumeric: 34000000,
      avgPrice: "₹14.8 K / sq.ft",
      flatTypes: "3 BHK, 4 BHK, Villa",
      carpetArea: "1,800 - 3,500 sq.ft",
      status: "Ready to Move",
      rera: "P52100002528",
      tag: "Ultra Luxury",
      rating: 5.0,
      type: "Villa",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["WTC Proximity", "Private Concierge", "Olympic Pool"]
    },
    {
      id: "pun-4",
      name: "Kolte-Patil Life Republic",
      builder: "Kolte-Patil Developers",
      builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
      city: "pune",
      location: "Marunji - Hinjawadi, Pune",
      price: "48.5 Lacs",
      priceNumeric: 4850000,
      avgPrice: "₹7.4 K / sq.ft",
      flatTypes: "1 BHK, 2 BHK",
      carpetArea: "450 - 720 sq.ft",
      status: "New Launch",
      rera: "P52100034871",
      tag: "High Value",
      rating: 4.6,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["400-Acre Township", "Botanical Lake", "School Onsite"]
    }
  ],

  bangalore: [
    {
      id: "blr-1",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Metro Attached", "Forum Mall Onsite", "World-class Sports"]
    },
    {
      id: "blr-2",
      name: "Sobha Dream Acres",
      builder: "Sobha Limited",
      builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
      city: "bangalore",
      location: "Panathur, Outer Ring Road",
      price: "95 Lacs",
      priceNumeric: 9500000,
      avgPrice: "₹9.8 K / sq.ft",
      flatTypes: "1 BHK, 2 BHK",
      carpetArea: "650 - 1,020 sq.ft",
      status: "Ready to Move",
      rera: "PRM/KA/RERA/1251/308/PR/170918/000451",
      tag: "High Yield",
      rating: 4.7,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["German Precast Tech", "5 Clubhouses", "ORR Proximity"]
    },
    {
      id: "blr-3",
      name: "Brigade Cornerstone Utopia",
      builder: "Brigade Group",
      builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      city: "bangalore",
      location: "Varthur, Whitefield",
      price: "1.42 Cr",
      priceNumeric: 14200000,
      avgPrice: "₹10.9 K / sq.ft",
      flatTypes: "2 BHK, 3 BHK",
      carpetArea: "850 - 1,480 sq.ft",
      status: "Under Construction",
      rera: "PRM/KA/RERA/1251/446/PR/181122/002176",
      tag: "Smart Township",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Integrated Commercial", "High Street Retail", "Biodiverse Park"]
    }
  ],

  delhi: [
    {
      id: "del-1",
      name: "DLF One Midtown",
      builder: "DLF Limited",
      builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      city: "delhi",
      location: "Moti Nagar, West Delhi",
      price: "3.85 Cr",
      priceNumeric: 38500000,
      avgPrice: "₹21.4 K / sq.ft",
      flatTypes: "2 BHK, 3 BHK, 4 BHK",
      carpetArea: "1,750 - 3,050 sq.ft",
      status: "Under Construction",
      rera: "DLRERA2021P0007",
      tag: "Iconic",
      rating: 4.9,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["128-Acre Greens", "Clubhouse", "Concierge Service"]
    },
    {
      id: "del-2",
      name: "Godrej South Estate",
      builder: "Godrej Properties",
      builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
      city: "delhi",
      location: "Okhla Phase 1, South Delhi",
      price: "4.9 Cr",
      priceNumeric: 49000000,
      avgPrice: "₹26.5 K / sq.ft",
      flatTypes: "3 BHK, 4 BHK",
      carpetArea: "1,850 - 3,200 sq.ft",
      status: "Under Construction",
      rera: "DLRERA2019P0003",
      tag: "Ultra Luxury",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Copper Clad Facade", "Air Purification", "South Delhi Address"]
    }
  ],

  gurugram: [
    {
      id: "ggn-1",
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
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Private Lift Lobby", "Double Height Balcony", "Central Park"]
    },
    {
      id: "ggn-2",
      name: "Smartworld The Edition",
      builder: "Smartworld Developers",
      builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
      city: "gurugram",
      location: "Sector 66, Golf Course Ext Road",
      price: "3.2 Cr",
      priceNumeric: 32000000,
      avgPrice: "₹16.4 K / sq.ft",
      flatTypes: "3 BHK, 4 BHK",
      carpetArea: "1,950 - 2,800 sq.ft",
      status: "New Launch",
      rera: "RC/REP/HARERA/GGM/758/490/2023/102",
      tag: "New Launch",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Private Lounge", "Dual Balconies", "Heated Pool"]
    }
  ],

  hyderabad: [
    {
      id: "hyd-1",
      name: "My Home Sayuk",
      builder: "My Home Group",
      builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
      city: "hyderabad",
      location: "Tellapur, Gachibowli Extension",
      price: "1.45 Cr",
      priceNumeric: 14500000,
      avgPrice: "₹8.8 K / sq.ft",
      flatTypes: "2 BHK, 3 BHK",
      carpetArea: "1,350 - 2,250 sq.ft",
      status: "Under Construction",
      rera: "P02400004523",
      tag: "Best Seller",
      rating: 4.9,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["40-Acre Gated Hub", "1 Lakh sqft Clubhouse", "ORR Direct Entry"]
    },
    {
      id: "hyd-2",
      name: "Aparna Zenon",
      builder: "Aparna Constructions",
      builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      city: "hyderabad",
      location: "Nanakramguda, Financial District",
      price: "2.1 Cr",
      priceNumeric: 21000000,
      avgPrice: "₹10.5 K / sq.ft",
      flatTypes: "2 BHK, 3 BHK, 4 BHK",
      carpetArea: "1,450 - 2,800 sq.ft",
      status: "Ready to Move",
      rera: "P02400003482",
      tag: "Ready to Move",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Walk to Tech Offices", "Helipad Access", "Squash Courts"]
    }
  ]
};

// Returns city projects or smartly generates rich verified mock projects for secondary cities
export function getPropertiesForCity(cityId) {
  const normalizedId = (cityId || "").toLowerCase().trim();
  if (CITY_PROPERTIES[normalizedId] && CITY_PROPERTIES[normalizedId].length > 0) {
    return CITY_PROPERTIES[normalizedId];
  }

  const city = getCityDetails(normalizedId);
  const cityName = city.name;

  // Generate realistic verified projects dynamically
  return [
    {
      id: `${normalizedId}-1`,
      name: `Prestige Parkside ${cityName}`,
      builder: "Prestige Group",
      builderLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
      city: normalizedId,
      location: `${city.localities[0]?.name || "Downtown"}, ${cityName}`,
      price: "1.15 Cr",
      priceNumeric: 11500000,
      avgPrice: `${city.avgPriceSqFt}`,
      flatTypes: "2 BHK, 3 BHK",
      carpetArea: "1,120 - 1,780 sq.ft",
      status: "Under Construction",
      rera: `RERA/${normalizedId.toUpperCase()}/2024/091`,
      tag: "Featured",
      rating: 4.8,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Clubhouse", "Landscaped Gardens", "Solar Power", "24/7 Security"]
    },
    {
      id: `${normalizedId}-2`,
      name: `Godrej Green Vistas`,
      builder: "Godrej Properties",
      builderLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
      city: normalizedId,
      location: `${city.localities[1]?.name || "Expressway"}, ${cityName}`,
      price: "85 Lacs",
      priceNumeric: 8500000,
      avgPrice: `${city.avgPriceSqFt}`,
      flatTypes: "2 BHK, 3 BHK",
      carpetArea: "950 - 1,420 sq.ft",
      status: "Ready to Move",
      rera: `RERA/${normalizedId.toUpperCase()}/2023/142`,
      tag: "Ready to Move",
      rating: 4.7,
      type: "Apartment",
      images: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Swimming Pool", "Kids Play Area", "Gymnasium", "Multipurpose Hall"]
    },
    {
      id: `${normalizedId}-3`,
      name: `Sobha Signature Estates`,
      builder: "Sobha Limited",
      builderLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      city: normalizedId,
      location: `${city.localities[2]?.name || "Airport Corridor"}, ${cityName}`,
      price: "1.85 Cr",
      priceNumeric: 18500000,
      avgPrice: `${city.avgPriceSqFt}`,
      flatTypes: "3 BHK, 4 BHK Luxury Villa",
      carpetArea: "2,200 - 3,450 sq.ft",
      status: "New Launch",
      rera: `RERA/${normalizedId.toUpperCase()}/2024/204`,
      tag: "Exclusive",
      rating: 4.9,
      type: "Villa",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
      ],
      features: ["Private Garden", "Gated Security", "Imported Fittings", "EV Charging"]
    }
  ];
}

// -------------------------------------------------------------
// PRICE TRENDS DATA HELPER
// -------------------------------------------------------------
export function getPriceTrendsForCity(cityId = "mumbai") {
  const normId = (cityId || "mumbai").toLowerCase().trim();
  const city = CITY_DETAILS[normId] || CITY_DETAILS.mumbai;

  const sampleHistorical = [
    { period: "Q1 2023", avgRate: 23200, label: "Q1 '23" },
    { period: "Q2 2023", avgRate: 24100, label: "Q2 '23" },
    { period: "Q3 2023", avgRate: 24950, label: "Q3 '23" },
    { period: "Q4 2023", avgRate: 25800, label: "Q4 '23" },
    { period: "Q1 2024", avgRate: 26400, label: "Q1 '24" },
    { period: "Q2 2024", avgRate: 27150, label: "Q2 '24" },
    { period: "Q3 2024", avgRate: 27900, label: "Q3 '24" },
    { period: "Q4 2024", avgRate: 28400, label: "Q4 '24" },
    { period: "Q1 2025", avgRate: 29300, label: "Q1 '25" },
    { period: "Q2 2025", avgRate: 30100, label: "Q2 '25" },
    { period: "Q3 2025", avgRate: 30850, label: "Q3 '25" },
    { period: "Q4 2025", avgRate: 31600, label: "Q4 '25" },
    { period: "Q1 2026", avgRate: 32400, label: "Q1 '26 (Current)" }
  ];

  const localitiesTrend = (city.localities || []).map((loc, idx) => {
    const baseRate = parseInt(loc.avgPrice.replace(/[^0-9]/g, "")) || 18500;
    const minRate = Math.round(baseRate * 0.78);
    const maxRate = Math.round(baseRate * 1.35);
    const growth = (7.5 + (idx % 5) * 1.4).toFixed(1);
    const rental = (3.2 + (idx % 3) * 0.5).toFixed(1);

    return {
      name: loc.name,
      avgRate: `₹${baseRate.toLocaleString("en-IN")} / sq.ft`,
      priceRange: `₹${minRate.toLocaleString("en-IN")} - ₹${maxRate.toLocaleString("en-IN")} / sq.ft`,
      yoyGrowth: `+${growth}%`,
      rentalYield: `${rental}%`,
      projectsCount: loc.projects || 45,
      rating: 4.5 + (idx % 4) * 0.1,
      tag: loc.tag || "High Demand"
    };
  });

  return {
    cityId: city.id,
    cityName: city.name,
    tagline: city.tagline,
    avgPrice: city.avgPriceSqFt,
    yoyAppreciation: city.appreciationRate,
    threeYearGrowth: "+34.2%",
    rentalYield: city.rentalYield,
    priceRange: "₹4,200 - ₹72,000 / sq.ft",
    totalProperties: city.projectsCount,
    historicalTrend: sampleHistorical,
    localitiesTrend,
    faqs: [
      {
        q: `How much have property rates in ${city.name} increased year-over-year?`,
        a: `Property rates in ${city.name} have appreciated by ${city.appreciationRate} over the past 12 months, driven by infrastructure delivery, metro connectivity, and strong end-user homebuyer demand.`
      },
      {
        q: `What is the range of property rates in ${city.name}?`,
        a: `${city.name} features real estate opportunities ranging from affordable housing around ₹4,200/sq.ft in peripheral transit corridors to ultra-luxury penthouses exceeding ₹65,000+/sq.ft in prime heritage belts.`
      },
      {
        q: `What is the current state of the ${city.name} real estate market?`,
        a: `The real estate market in ${city.name} is demonstrating strong capital resilience, record registration numbers, sustained foreign & NRI investment, and decreasing unsold inventory across prime Grade-A developments.`
      },
      {
        q: `Which areas in ${city.name} are considered good for property investment?`,
        a: `Top performing localities include ${localitiesTrend.slice(0, 3).map((l) => l.name).join(", ")}, which offer high rental liquidity and substantial appreciation prospects.`
      },
      {
        q: `What is the average flat price in ${city.name}?`,
        a: `The average residential unit price in ${city.name} ranges between ₹1.2 Cr to ₹2.8 Cr for standard 2 & 3 BHK configurations in gated communities.`
      }
    ]
  };
}

// -------------------------------------------------------------
// RAIL NETWORK & TRANSIT DATA HELPER
// -------------------------------------------------------------
export function getRailTransitForCity(cityId = "mumbai") {
  const normId = (cityId || "mumbai").toLowerCase().trim();
  const city = CITY_DETAILS[normId] || CITY_DETAILS.mumbai;

  if (normId === "mumbai") {
    return {
      cityId: "mumbai",
      cityName: "Mumbai",
      networkTitle: "Mumbai Suburban Railway & Metro Network",
      lines: [
        { id: "all", label: "All Transit Lines" },
        { id: "western", label: "Western Line" },
        { id: "central", label: "Central Line" },
        { id: "harbour", label: "Harbour Line" },
        { id: "metro", label: "Mumbai Metro" }
      ],
      stations: [
        {
          id: "panvel",
          name: "Panvel",
          line: "Central & Harbour Line",
          avgPrice: "₹11.09 K",
          newProjectsCount: 208,
          slug: "real-estate-projects-near-panvel-railway-station",
          tag: "Airport Hub"
        },
        {
          id: "thane",
          name: "Thane",
          line: "Central & Trans-Harbour Line",
          avgPrice: "₹15.72 K",
          newProjectsCount: 203,
          slug: "real-estate-projects-near-thane-railway-station",
          tag: "Mega Interchange"
        },
        {
          id: "ulwe",
          name: "Ulwe - Baman Dongri",
          line: "Seawoods - Uran Line",
          avgPrice: "₹9.80 K",
          newProjectsCount: 176,
          slug: "real-estate-projects-near-ulwe---baman-dongri-railway-station",
          tag: "MTHL Corridor"
        },
        {
          id: "kalyan",
          name: "Kalyan",
          line: "Central Railway",
          avgPrice: "₹7.74 K",
          newProjectsCount: 164,
          slug: "real-estate-projects-near-kalyan-railway-station",
          tag: "Express Junction"
        },
        {
          id: "borivali",
          name: "Borivali",
          line: "Western Line & Metro 2A",
          avgPrice: "₹21.65 K",
          newProjectsCount: 144,
          slug: "real-estate-projects-near-borivali-railway-station",
          tag: "Suburban Anchor"
        },
        {
          id: "andheri",
          name: "Andheri",
          line: "Western Line & Metro 1",
          avgPrice: "₹31.20 K",
          newProjectsCount: 128,
          slug: "real-estate-projects-near-andheri-railway-station",
          tag: "Commercial Core"
        },
        {
          id: "dadar",
          name: "Dadar",
          line: "Western & Central Junction",
          avgPrice: "₹38.50 K",
          newProjectsCount: 96,
          slug: "real-estate-projects-near-dadar-railway-station",
          tag: "Central Heart"
        },
        {
          id: "ghatkopar",
          name: "Ghatkopar",
          line: "Central Line & Metro 1",
          avgPrice: "₹22.40 K",
          newProjectsCount: 112,
          slug: "real-estate-projects-near-ghatkopar-railway-station",
          tag: "Metro Interchange"
        }
      ]
    };
  }

  // Fallback / Other Metros
  return {
    cityId: city.id,
    cityName: city.name,
    networkTitle: `${city.name} Metro & Transit Rail Corridor`,
    lines: [
      { id: "all", label: "All Stations" },
      { id: "metro-1", label: "Line 1" },
      { id: "metro-2", label: "Line 2" }
    ],
    stations: (city.localities || []).slice(0, 6).map((loc, idx) => ({
      id: loc.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: `${loc.name} Station`,
      line: "Metro Transit Corridor",
      avgPrice: loc.avgPrice.split(" ")[0] || "₹9.5 K",
      newProjectsCount: loc.projects * 2 || 80,
      slug: `real-estate-projects-near-${loc.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-railway-station`,
      tag: loc.tag || "Fast Transit"
    }))
  };
}

// -------------------------------------------------------------
// COMMUTE TIME HUBS HELPER
// -------------------------------------------------------------
export function getCommuteHubsForCity(cityId = "mumbai") {
  const normId = (cityId || "mumbai").toLowerCase().trim();

  if (normId === "mumbai") {
    return [
      {
        id: "bkc",
        name: "BKC (Bandra Kurla Complex)",
        zone: "Financial District",
        popularDestinations: [
          { locality: "Bandra East", timeMins: 10, mode: "Car / Bus", distance: "3.2 km", avgPrice: "₹42,000 / sq.ft" },
          { locality: "Kurla West", timeMins: 15, mode: "Local Train / Car", distance: "4.5 km", avgPrice: "₹21,000 / sq.ft" },
          { locality: "Ghatkopar", timeMins: 25, mode: "Metro 1", distance: "8.5 km", avgPrice: "₹22,400 / sq.ft" },
          { locality: "Chembur", timeMins: 30, mode: "Eastern Freeway", distance: "9.8 km", avgPrice: "₹24,500 / sq.ft" },
          { locality: "Thane West", timeMins: 50, mode: "Central Train / Highway", distance: "24 km", avgPrice: "₹15,700 / sq.ft" }
        ]
      },
      {
        id: "lower-parel",
        name: "Lower Parel / Worli",
        zone: "Corporate Towers & Media Hub",
        popularDestinations: [
          { locality: "Parel", timeMins: 8, mode: "Walk / Taxi", distance: "1.5 km", avgPrice: "₹38,000 / sq.ft" },
          { locality: "Dadar West", timeMins: 15, mode: "Western Train", distance: "3.8 km", avgPrice: "₹39,500 / sq.ft" },
          { locality: "Byculla", timeMins: 20, mode: "Central Train", distance: "4.6 km", avgPrice: "₹31,000 / sq.ft" },
          { locality: "Bandra West", timeMins: 30, mode: "Sea Link", distance: "9.2 km", avgPrice: "₹58,000 / sq.ft" },
          { locality: "Andheri West", timeMins: 45, mode: "Western Fast Train", distance: "18 km", avgPrice: "₹31,000 / sq.ft" }
        ]
      },
      {
        id: "andheri-midc",
        name: "Andheri MIDC / SEEPZ",
        zone: "IT & Commercial SEZ",
        popularDestinations: [
          { locality: "Andheri East", timeMins: 10, mode: "Metro 1 / Auto", distance: "2.1 km", avgPrice: "₹23,000 / sq.ft" },
          { locality: "Powai", timeMins: 20, mode: "JVLR / Car", distance: "5.4 km", avgPrice: "₹26,500 / sq.ft" },
          { locality: "Goregaon East", timeMins: 25, mode: "Western Express Highway", distance: "7.8 km", avgPrice: "₹22,000 / sq.ft" },
          { locality: "Malad West", timeMins: 35, mode: "Metro 2A & 7", distance: "11 km", avgPrice: "₹18,900 / sq.ft" },
          { locality: "Borivali West", timeMins: 45, mode: "Metro 7 / Train", distance: "16 km", avgPrice: "₹21,650 / sq.ft" }
        ]
      },
      {
        id: "navi-mumbai-it",
        name: "Airoli / Mahape Knowledge Park",
        zone: "Navi Mumbai IT Corridor",
        popularDestinations: [
          { locality: "Airoli", timeMins: 10, mode: "Walk / Auto", distance: "2 km", avgPrice: "₹13,500 / sq.ft" },
          { locality: "Ghansoli", timeMins: 15, mode: "Trans-Harbour Train", distance: "4.2 km", avgPrice: "₹14,000 / sq.ft" },
          { locality: "Vashi", timeMins: 25, mode: "Harbour Train / Palm Beach", distance: "9.5 km", avgPrice: "₹19,000 / sq.ft" },
          { locality: "Kharghar", timeMins: 40, mode: "Sion-Panvel Highway", distance: "18 km", avgPrice: "₹10,500 / sq.ft" },
          { locality: "Panvel", timeMins: 55, mode: "Harbour Train", distance: "28 km", avgPrice: "₹8,400 / sq.ft" }
        ]
      }
    ];
  }

  // Generic fallback for other cities
  return [
    {
      id: "central-cbd",
      name: "Central Business District",
      zone: "Commercial Hub",
      popularDestinations: [
        { locality: "Central City", timeMins: 15, mode: "Metro", distance: "4 km", avgPrice: "₹12,000 / sq.ft" },
        { locality: "Green Belt", timeMins: 30, mode: "Car / Bus", distance: "12 km", avgPrice: "₹8,500 / sq.ft" },
        { locality: "Suburban Hills", timeMins: 45, mode: "Transit Train", distance: "22 km", avgPrice: "₹6,800 / sq.ft" }
      ]
    }
  ];
}
