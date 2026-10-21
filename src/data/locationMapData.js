// Location & Map Discovery Data Service
// OpenStreetMap & Leaflet property discovery integration for AuraLiving / PropertyPistol
// Provides verified coordinates, nearby landmarks with category filtering,
// and property & land/plot locator data.

// ─────────────────────────────────────────────
// 1. Verified Coordinates Registry by Project Slug/ID
// ─────────────────────────────────────────────
export const PROJECT_COORDINATES = {
  // Reference Project: Sanpada, Navi Mumbai
  "godrej-eternal-palms": {
    lat: 19.0624,
    lng: 73.0108,
    locality: "Sanpada, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-1": {
    lat: 19.0624,
    lng: 73.0108,
    locality: "Sanpada, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "aura-signature-waterfront": {
    lat: 19.0580,
    lng: 73.0090,
    locality: "Palm Beach Road, Sanpada, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "godrej-ascend": {
    lat: 19.2312,
    lng: 72.9866,
    locality: "Dhokali, Thane West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "lodha-corinthia": {
    lat: 19.1455,
    lng: 72.9320,
    locality: "Bhandup West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "mahindra-marina-64": {
    lat: 19.1860,
    lng: 72.8360,
    locality: "Malad West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "lt-island-cove": {
    lat: 19.0350,
    lng: 72.8420,
    locality: "Mahim West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-2": {
    lat: 19.0350,
    lng: 72.8420,
    locality: "Mahim West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "lt-elixir-reserve": {
    lat: 19.1240,
    lng: 72.9050,
    locality: "Powai, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-3": {
    lat: 19.1240,
    lng: 72.9050,
    locality: "Powai, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "tata-orbis": {
    lat: 19.1245,
    lng: 72.9995,
    locality: "Ghansoli, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-4": {
    lat: 19.1245,
    lng: 72.9995,
    locality: "Ghansoli, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "kanakia-valley": {
    lat: 18.9900,
    lng: 73.1170,
    locality: "Panvel, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-5": {
    lat: 18.9900,
    lng: 73.1170,
    locality: "Panvel, Navi Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "lt-vayam": {
    lat: 19.2180,
    lng: 72.9710,
    locality: "Thane West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-6": {
    lat: 19.2180,
    lng: 72.9710,
    locality: "Thane West, Mumbai",
    city: "mumbai",
    cityName: "Mumbai",
    propertyType: "Apartment",
    verified: true,
  },
  "dlf-the-arbour": {
    lat: 28.3980,
    lng: 77.0670,
    locality: "Sector 63, Golf Course Ext Road, Gurugram",
    city: "gurugram",
    cityName: "Gurugram",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-9": {
    lat: 28.3980,
    lng: 77.0670,
    locality: "Sector 63, Golf Course Ext Road, Gurugram",
    city: "gurugram",
    cityName: "Gurugram",
    propertyType: "Apartment",
    verified: true,
  },
  "prestige-falcon-city": {
    lat: 12.8890,
    lng: 77.5480,
    locality: "Kanakapura Road, Bangalore",
    city: "bangalore",
    cityName: "Bangalore",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-7": {
    lat: 12.8890,
    lng: 77.5480,
    locality: "Kanakapura Road, Bangalore",
    city: "bangalore",
    cityName: "Bangalore",
    propertyType: "Apartment",
    verified: true,
  },
  "godrej-woodsville": {
    lat: 18.5910,
    lng: 73.7380,
    locality: "Hinjewadi Phase 1, Pune",
    city: "pune",
    cityName: "Pune",
    propertyType: "Apartment",
    verified: true,
  },
  "proj-8": {
    lat: 18.5910,
    lng: 73.7380,
    locality: "Hinjewadi Phase 1, Pune",
    city: "pune",
    cityName: "Pune",
    propertyType: "Apartment",
    verified: true,
  },
};

// ─────────────────────────────────────────────
// 2. Verified Nearby Landmarks by Project
// Strictly preserved reference landmarks for Sanpada/Godrej Eternal Palms,
// plus project-tailored verified landmarks for others.
// ─────────────────────────────────────────────
export const PROJECT_LANDMARKS_MAP = {
  // Reference Project: Godrej Eternal Palms (Sanpada, Navi Mumbai)
  "godrej-eternal-palms": [
    {
      id: "lm-palm-beach",
      name: "Palm Beach Road",
      category: "Transport",
      type: "Transit Corridor",
      distance: "0.8 km",
      time: "3 mins",
      lat: 19.0658,
      lng: 73.0076,
    },
    {
      id: "lm-sanpada-stn",
      name: "Sanpada Railway Station",
      category: "Transport",
      type: "Harbour / Trans-Harbour Line",
      distance: "1.2 km",
      time: "5 mins",
      lat: 19.0688,
      lng: 73.0175,
    },
    {
      id: "lm-atal-setu",
      name: "Atal Setu (MTHL Ramp)",
      category: "Transport",
      type: "Sea Link Expressway",
      distance: "6.5 km",
      time: "12 mins",
      lat: 19.0025,
      lng: 72.9985,
    },
    {
      id: "lm-apollo-hosp",
      name: "Apollo Hospital Belapur",
      category: "Hospitals",
      type: "Multi-Speciality Healthcare",
      distance: "4.2 km",
      time: "10 mins",
      lat: 19.0222,
      lng: 73.0375,
    },
    {
      id: "lm-ryan-school",
      name: "Ryan International School",
      category: "Schools",
      type: "ICSE / CBSE Board",
      distance: "2.1 km",
      time: "7 mins",
      lat: 19.0610,
      lng: 73.0280,
    },
    {
      id: "lm-nm-airport",
      name: "Navi Mumbai International Airport",
      category: "Transport",
      type: "International Aviation Hub",
      distance: "14.0 km",
      time: "22 mins",
      lat: 18.9902,
      lng: 73.0725,
    },
    {
      id: "lm-millat-hosp",
      name: "Millat Hospital Sector 18",
      category: "Hospitals",
      type: "Community Healthcare Centre",
      distance: "0.8 km",
      time: "3 mins",
      lat: 19.0640,
      lng: 73.0180,
    },
    {
      id: "lm-sanpada-college",
      name: "Sanpada College of Commerce & Tech",
      category: "Schools",
      type: "Degree & Junior College",
      distance: "1.0 km",
      time: "4 mins",
      lat: 19.0670,
      lng: 73.0150,
    },
    {
      id: "lm-central-park-sanpada",
      name: "Central Park Sanpada (Sector 14)",
      category: "Parks",
      type: "Jogging & Botanical Promenade",
      distance: "0.6 km",
      time: "2 mins",
      lat: 19.0635,
      lng: 73.0145,
    },
    {
      id: "lm-mangrove-promenade",
      name: "Palm Beach Waterfront Garden",
      category: "Parks",
      type: "Mangrove Boardwalk & Sunset Deck",
      distance: "0.5 km",
      time: "2 mins",
      lat: 19.0600,
      lng: 73.0065,
    },
    {
      id: "lm-inorbit-vashi",
      name: "Inorbit Mall Vashi",
      category: "Shopping Centers",
      type: "Regional Shopping Mall & Multiplex",
      distance: "2.2 km",
      time: "7 mins",
      lat: 19.0652,
      lng: 72.9982,
    },
    {
      id: "lm-centurion-mall",
      name: "Haware Centurion Mall Sanpada",
      category: "Shopping Centers",
      type: "Retail Arcade & Hypermarket",
      distance: "1.1 km",
      time: "4 mins",
      lat: 19.0630,
      lng: 73.0170,
    },
  ],

  // Godrej Ascend (Thane West)
  "godrej-ascend": [
    {
      id: "lm-eeh",
      name: "Eastern Express Highway",
      category: "Transport",
      type: "Express Corridor",
      distance: "2.5 km",
      time: "6 mins",
      lat: 19.2150,
      lng: 72.9780,
    },
    {
      id: "lm-viviana",
      name: "Viviana Mall Thane",
      category: "Shopping Centers",
      type: "Luxury Retail & Entertainment",
      distance: "3.8 km",
      time: "10 mins",
      lat: 19.2085,
      lng: 72.9720,
    },
    {
      id: "lm-jupiter",
      name: "Jupiter Hospital Thane",
      category: "Hospitals",
      type: "Quaternary Care Hospital",
      distance: "3.5 km",
      time: "9 mins",
      lat: 19.2065,
      lng: 72.9740,
    },
    {
      id: "lm-singhania",
      name: "Singhania International School",
      category: "Schools",
      type: "Premier K-12 Academy",
      distance: "4.0 km",
      time: "12 mins",
      lat: 19.2100,
      lng: 72.9700,
    },
    {
      id: "lm-yeoor",
      name: "Yeoor Hills Nature Reserve",
      category: "Parks",
      type: "National Park Foothills & Forest Trail",
      distance: "2.8 km",
      time: "8 mins",
      lat: 19.2390,
      lng: 72.9620,
    },
    {
      id: "lm-thane-stn",
      name: "Thane Railway Station",
      category: "Transport",
      type: "Central Railway Junction",
      distance: "5.8 km",
      time: "18 mins",
      lat: 19.1865,
      lng: 72.9755,
    },
  ],

  // Lodha Corinthia (Bhandup West)
  "lodha-corinthia": [
    {
      id: "lm-lbs-marg",
      name: "Lal Bahadur Shastri (LBS) Marg",
      category: "Transport",
      type: "Arterial Highway",
      distance: "0.1 km",
      time: "1 min",
      lat: 19.1460,
      lng: 72.9325,
    },
    {
      id: "lm-bhandup-stn",
      name: "Bhandup Railway Station",
      category: "Transport",
      type: "Suburban Railway",
      distance: "1.2 km",
      time: "4 mins",
      lat: 19.1440,
      lng: 72.9380,
    },
    {
      id: "lm-fortis-mulund",
      name: "Fortis Hospital Mulund",
      category: "Hospitals",
      type: "Super-Speciality Hospital",
      distance: "3.2 km",
      time: "8 mins",
      lat: 19.1650,
      lng: 72.9420,
    },
    {
      id: "lm-pawar-school",
      name: "Pawar Public School Bhandup",
      category: "Schools",
      type: "ICSE Curriculum School",
      distance: "1.5 km",
      time: "5 mins",
      lat: 19.1480,
      lng: 72.9290,
    },
    {
      id: "lm-rcity-mall",
      name: "R City Mall Ghatkopar",
      category: "Shopping Centers",
      type: "Megamall & Multiplex",
      distance: "4.8 km",
      time: "12 mins",
      lat: 19.0990,
      lng: 72.9160,
    },
    {
      id: "lm-bhandup-park",
      name: "Dreams Garden & Joggers Track",
      category: "Parks",
      type: "Community Park",
      distance: "0.9 km",
      time: "3 mins",
      lat: 19.1430,
      lng: 72.9300,
    },
  ],

  // Mahindra Marina 64 (Malad West)
  "mahindra-marina-64": [
    {
      id: "lm-link-rd",
      name: "New Link Road Malad",
      category: "Transport",
      type: "Transit Corridor",
      distance: "0.5 km",
      time: "2 mins",
      lat: 19.1840,
      lng: 72.8340,
    },
    {
      id: "lm-inorbit-malad",
      name: "Inorbit Mall Malad",
      category: "Shopping Centers",
      type: "Retail Mall & Dining",
      distance: "1.8 km",
      time: "6 mins",
      lat: 19.1730,
      lng: 72.8350,
    },
    {
      id: "lm-malad-stn",
      name: "Malad Western Railway Station",
      category: "Transport",
      type: "Western Railway",
      distance: "1.5 km",
      time: "5 mins",
      lat: 19.1870,
      lng: 72.8480,
    },
    {
      id: "lm-zenith-hosp",
      name: "Zenith Multi-Speciality Hospital",
      category: "Hospitals",
      type: "Healthcare Hospital",
      distance: "1.2 km",
      time: "4 mins",
      lat: 19.1890,
      lng: 72.8370,
    },
    {
      id: "lm-ryan-malad",
      name: "Ryan Global School Malad",
      category: "Schools",
      type: "IB World School",
      distance: "2.0 km",
      time: "7 mins",
      lat: 19.1820,
      lng: 72.8390,
    },
    {
      id: "lm-mindspace-park",
      name: "Mindspace Landscape Garden",
      category: "Parks",
      type: "Urban Green Promenade",
      distance: "1.4 km",
      time: "5 mins",
      lat: 19.1760,
      lng: 72.8360,
    },
  ],

  // L&T Island Cove (Mahim West)
  "lt-island-cove": [
    {
      id: "lm-sealink",
      name: "Bandra-Worli Sea Link Ramp",
      category: "Transport",
      type: "Signature Sea Link",
      distance: "1.5 km",
      time: "4 mins",
      lat: 19.0390,
      lng: 72.8380,
    },
    {
      id: "lm-hinduja",
      name: "P.D. Hinduja National Hospital",
      category: "Hospitals",
      type: "Quaternary Healthcare",
      distance: "1.8 km",
      time: "5 mins",
      lat: 19.0330,
      lng: 72.8390,
    },
    {
      id: "lm-scottish",
      name: "Bombay Scottish School Mahim",
      category: "Schools",
      type: "Heritage ICSE School",
      distance: "2.0 km",
      time: "6 mins",
      lat: 19.0320,
      lng: 72.8410,
    },
    {
      id: "lm-shivaji-park",
      name: "Historic Shivaji Park",
      category: "Parks",
      type: "Recreational Grounds & Beach Promenade",
      distance: "2.2 km",
      time: "7 mins",
      lat: 19.0270,
      lng: 72.8380,
    },
    {
      id: "lm-mahim-stn",
      name: "Mahim Railway Station",
      category: "Transport",
      type: "Western & Harbour Junction",
      distance: "0.9 km",
      time: "3 mins",
      lat: 19.0410,
      lng: 72.8440,
    },
    {
      id: "lm-phoenix-mall",
      name: "Palladium & High Street Phoenix",
      category: "Shopping Centers",
      type: "Luxury Shopping & Dining",
      distance: "5.5 km",
      time: "15 mins",
      lat: 18.9950,
      lng: 72.8250,
    },
  ],

  // L&T Elixir Reserve (Powai)
  "lt-elixir-reserve": [
    {
      id: "lm-powai-lake",
      name: "Powai Lake Nature Promenade",
      category: "Parks",
      type: "Scenic Lakefront & Bird Sanctuary",
      distance: "0.5 km",
      time: "2 mins",
      lat: 19.1280,
      lng: 72.9060,
    },
    {
      id: "lm-galleria",
      name: "Galleria Shopping Arcade",
      category: "Shopping Centers",
      type: "Open-Air High Street Shopping",
      distance: "1.2 km",
      time: "4 mins",
      lat: 19.1180,
      lng: 72.9120,
    },
    {
      id: "lm-hiranandani-hosp",
      name: "Dr. L.H. Hiranandani Hospital",
      category: "Hospitals",
      type: "NABH Multi-Speciality Hospital",
      distance: "1.4 km",
      time: "5 mins",
      lat: 19.1190,
      lng: 72.9110,
    },
    {
      id: "lm-iit-powai",
      name: "IIT Bombay & Campus School",
      category: "Schools",
      type: "Premier Institution & Campus",
      distance: "1.8 km",
      time: "6 mins",
      lat: 19.1330,
      lng: 72.9150,
    },
    {
      id: "lm-jvlr",
      name: "JVLR Arterial Expressway",
      category: "Transport",
      type: "East-West Arterial Corridor",
      distance: "0.8 km",
      time: "3 mins",
      lat: 19.1290,
      lng: 72.9080,
    },
    {
      id: "lm-kanjur-stn",
      name: "Kanjurmarg Railway Station",
      category: "Transport",
      type: "Central Railway",
      distance: "2.4 km",
      time: "7 mins",
      lat: 19.1300,
      lng: 72.9300,
    },
  ],

  // DLF The Arbour (Gurugram)
  "dlf-the-arbour": [
    {
      id: "lm-gcre",
      name: "Golf Course Extension Road",
      category: "Transport",
      type: "16-Lane Expressway Corridor",
      distance: "0.3 km",
      time: "1 min",
      lat: 28.3990,
      lng: 77.0650,
    },
    {
      id: "lm-medanta",
      name: "Medanta - The Medicity",
      category: "Hospitals",
      type: "Premier Multi-Super Speciality",
      distance: "7.8 km",
      time: "15 mins",
      lat: 28.4410,
      lng: 77.0420,
    },
    {
      id: "lm-heritage-school",
      name: "The Heritage School Gurugram",
      category: "Schools",
      type: "Top Ranked Experiential School",
      distance: "2.5 km",
      time: "6 mins",
      lat: 28.4110,
      lng: 77.0850,
    },
    {
      id: "lm-worldmark",
      name: "WorldMark Gurugram Sector 65",
      category: "Shopping Centers",
      type: "Grade-A Retail & Dining Boulevard",
      distance: "2.2 km",
      time: "5 mins",
      lat: 28.4110,
      lng: 77.0720,
    },
    {
      id: "lm-tau-devi-lal",
      name: "Tau Devi Lal Biodiversity Botanical Park",
      category: "Parks",
      type: "Sprawling City Biodiversity Park",
      distance: "3.5 km",
      time: "8 mins",
      lat: 28.4280,
      lng: 77.0690,
    },
    {
      id: "lm-rapid-metro",
      name: "Rapid Metro Station Sector 55-56",
      category: "Transport",
      type: "Rapid Metro Rail",
      distance: "4.5 km",
      time: "10 mins",
      lat: 28.4230,
      lng: 77.1060,
    },
  ],

  // Prestige Falcon City (Bangalore)
  "prestige-falcon-city": [
    {
      id: "lm-metro-konanakunte",
      name: "Konanakunte Cross Metro Station",
      category: "Transport",
      type: "Namma Metro Green Line",
      distance: "0.2 km",
      time: "1 min",
      lat: 12.8870,
      lng: 77.5500,
    },
    {
      id: "lm-forum-south",
      name: "Forum Mall South Bengaluru",
      category: "Shopping Centers",
      type: "Integrated Onsite Mega Mall",
      distance: "0.1 km",
      time: "Direct Access",
      lat: 12.8890,
      lng: 77.5485,
    },
    {
      id: "lm-apollo-banner",
      name: "Apollo Hospital Bannerghatta",
      category: "Hospitals",
      type: "Speciality Hospital",
      distance: "5.5 km",
      time: "14 mins",
      lat: 12.8940,
      lng: 77.5990,
    },
    {
      id: "lm-dps-south",
      name: "Delhi Public School (DPS) South",
      category: "Schools",
      type: "CBSE Affiliated Campus",
      distance: "1.8 km",
      time: "5 mins",
      lat: 12.8820,
      lng: 77.5450,
    },
    {
      id: "lm-turahalli",
      name: "Turahalli Forest Park & Viewpoint",
      category: "Parks",
      type: "Protected Reserve & Cycling Park",
      distance: "3.2 km",
      time: "8 mins",
      lat: 12.8850,
      lng: 77.5180,
    },
    {
      id: "lm-nice-road",
      name: "NICE Peripheral Ring Road",
      category: "Transport",
      type: "Access Controlled Expressway",
      distance: "2.4 km",
      time: "6 mins",
      lat: 12.8710,
      lng: 77.5410,
    },
  ],

  // Godrej Woodsville (Pune)
  "godrej-woodsville": [
    {
      id: "lm-it-corridor",
      name: "Hinjewadi IT Corridor Phase 1",
      category: "Transport",
      type: "Tech Hub Transit Spine",
      distance: "0.5 km",
      time: "2 mins",
      lat: 18.5920,
      lng: 73.7360,
    },
    {
      id: "lm-ruby-hall",
      name: "Ruby Hall Clinic Hinjewadi",
      category: "Hospitals",
      type: "Super-Speciality Healthcare",
      distance: "1.2 km",
      time: "4 mins",
      lat: 18.5950,
      lng: 73.7320,
    },
    {
      id: "lm-mercedes-school",
      name: "Mercedes-Benz International School",
      category: "Schools",
      type: "IB World School",
      distance: "2.4 km",
      time: "6 mins",
      lat: 18.5940,
      lng: 73.7220,
    },
    {
      id: "lm-xion-mall",
      name: "Xion Mall & E-Square Multiplex",
      category: "Shopping Centers",
      type: "Retail Arcade & Dining",
      distance: "1.8 km",
      time: "5 mins",
      lat: 18.5980,
      lng: 73.7420,
    },
    {
      id: "lm-rg-park",
      name: "Rajiv Gandhi IT Botanical Garden",
      category: "Parks",
      type: "Green Leisure Garden",
      distance: "1.0 km",
      time: "3 mins",
      lat: 18.5900,
      lng: 73.7310,
    },
    {
      id: "lm-expressway-pune",
      name: "Mumbai-Pune Expressway Bypass",
      category: "Transport",
      type: "National Expressway",
      distance: "3.2 km",
      time: "7 mins",
      lat: 18.6010,
      lng: 73.7580,
    },
  ],
};

// ─────────────────────────────────────────────
// 3. Properties and Land/Plot Listings for "Locate Properties on Map"
// Distinguishes Apartments, Houses/Villas, Commercial, and Land/Plots
// Links directly to canonical project detail pages where available.
// ─────────────────────────────────────────────
export const AREA_PROPERTIES_REGISTRY = {
  // Mumbai & Navi Mumbai Region (including Sanpada, Vashi, Ghansoli, Thane, Powai, Mahim)
  mumbai: [
    {
      id: "godrej-eternal-palms",
      slug: "godrej-eternal-palms",
      title: "Godrej Eternal Palms",
      builder: "Godrej Properties",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹2.68 Cr*",
      priceNumeric: 26800000,
      locality: "Sanpada, Navi Mumbai",
      cityName: "Mumbai",
      lat: 19.0624,
      lng: 73.0108,
      specs: "2 BHK, 3 BHK",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: true,
      isVerified: true,
    },
    {
      id: "aura-signature-waterfront",
      slug: "aura-signature-waterfront",
      title: "Aura Signature Waterfront",
      builder: "AuraLiving Signature",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹8.50 Cr*",
      priceNumeric: 85000000,
      locality: "Palm Beach Road, Sanpada",
      cityName: "Mumbai",
      lat: 19.0580,
      lng: 73.0090,
      specs: "3, 4 & 5 BHK Sky Mansions",
      status: "New Launch",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isVerified: true,
    },
    {
      id: "tata-orbis",
      slug: "tata-orbis",
      title: "Tata Orbis",
      builder: "Tata Housing",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹1.99 Cr*",
      priceNumeric: 19900000,
      locality: "Ghansoli, Navi Mumbai",
      cityName: "Mumbai",
      lat: 19.1245,
      lng: 72.9995,
      specs: "2 BHK, 3 BHK",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isVerified: true,
    },
    {
      id: "kanakia-valley",
      slug: "kanakia-valley",
      title: "Kanakia Valley",
      builder: "Kanakia Spaces",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹56.9 Lacs*",
      priceNumeric: 5690000,
      locality: "Panvel, Navi Mumbai",
      cityName: "Mumbai",
      lat: 18.9900,
      lng: 73.1170,
      specs: "1 BHK, 2 BHK",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isVerified: true,
    },
    // Distinct Land / Plot Listings
    {
      id: "cidco-plot-sanpada-sec19",
      slug: "godrej-eternal-palms", // fallback link to regional project
      title: "CIDCO Freehold Residential Plot",
      builder: "CIDCO Allotment / Clear Title",
      propertyType: "Land / Plot",
      propertyTypeKey: "land",
      price: "₹3.85 Cr*",
      priceNumeric: 38500000,
      locality: "Sector 19, Sanpada, Navi Mumbai",
      cityName: "Mumbai",
      lat: 19.0660,
      lng: 73.0135,
      specs: "2,400 sq.ft G+2 Approved Plot",
      status: "Ready for Registration",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isLand: true,
      isMock: true,
      note: "Clear Title CIDCO Transfer Plot",
    },
    {
      id: "moraj-palm-plot-sec16",
      slug: "godrej-eternal-palms",
      title: "Palm Beach View Corner Plot",
      builder: "Private Owner Allotment",
      propertyType: "Land / Plot",
      propertyTypeKey: "land",
      price: "₹5.20 Cr*",
      priceNumeric: 52000000,
      locality: "Sector 16, Palm Beach Road, Sanpada",
      cityName: "Mumbai",
      lat: 19.0615,
      lng: 73.0160,
      specs: "3,250 sq.ft Independent Plot",
      status: "Immediate Handover",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isLand: true,
      isMock: true,
      note: "East-Facing Corner Plot with 12m Wide Road",
    },
    // Distinct House / Villa Listings
    {
      id: "palm-beach-luxury-villas",
      slug: "godrej-eternal-palms",
      title: "Palm Beach Crest Luxury Villas",
      builder: "Signature Estates",
      propertyType: "House / Villa",
      propertyTypeKey: "houses",
      price: "₹6.50 Cr*",
      priceNumeric: 65000000,
      locality: "Palm Beach Road, Sanpada",
      cityName: "Mumbai",
      lat: 19.0545,
      lng: 73.0060,
      specs: "4 BHK Independent Villa (3,600 sq.ft)",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
      note: "Gated Enclave with Private Lawn & Plunge Pool",
    },
    // Distinct Commercial Properties
    {
      id: "sector-17-corporate-plaza",
      slug: "godrej-eternal-palms",
      title: "Sector 17 Business Corporate Suites",
      builder: "Apex Commercial Towers",
      propertyType: "Commercial",
      propertyTypeKey: "commercial",
      price: "₹4.20 Cr*",
      priceNumeric: 42000000,
      locality: "Sector 17, Vashi / Sanpada Corridor",
      cityName: "Mumbai",
      lat: 19.0715,
      lng: 73.0035,
      specs: "1,450 sq.ft Grade-A Fitted Office",
      status: "Ready to Occupy",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
      note: "Pre-Leased Grade-A Office with 7.2% Rental Yield",
    },
    {
      id: "sanpada-retail-highstreet",
      slug: "godrej-eternal-palms",
      title: "Sanpada Station High Street Retail",
      builder: "Sanpada Metro Commercials",
      propertyType: "Commercial",
      propertyTypeKey: "commercial",
      price: "₹2.90 Cr*",
      priceNumeric: 29000000,
      locality: "Station Road, Sanpada",
      cityName: "Mumbai",
      lat: 19.0675,
      lng: 73.0165,
      specs: "820 sq.ft Road-Facing Showroom",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
      note: "High Footfall Station Frontage",
    },
  ],

  // Gurugram Region
  gurugram: [
    {
      id: "dlf-the-arbour",
      slug: "dlf-the-arbour",
      title: "DLF The Arbour",
      builder: "DLF Limited",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹7.50 Cr*",
      priceNumeric: 75000000,
      locality: "Sector 63, Golf Course Ext Road",
      cityName: "Gurugram",
      lat: 28.3980,
      lng: 77.0670,
      specs: "4 BHK Ultra Luxury Suites",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: true,
      isVerified: true,
    },
    {
      id: "sec63-plot-estate",
      slug: "dlf-the-arbour",
      title: "Sector 63 Freehold Villa Plot",
      builder: "Licensed Township Allotment",
      propertyType: "Land / Plot",
      propertyTypeKey: "land",
      price: "₹6.80 Cr*",
      priceNumeric: 68000000,
      locality: "Sector 63, Gurugram",
      cityName: "Gurugram",
      lat: 28.4020,
      lng: 77.0620,
      specs: "300 sq.yards G+4 Stilt Approved",
      status: "Immediate Registry",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isLand: true,
      isMock: true,
    },
    {
      id: "golf-course-mansions",
      slug: "dlf-the-arbour",
      title: "The Arbour Signature Mansions",
      builder: "DLF Luxury Residences",
      propertyType: "House / Villa",
      propertyTypeKey: "houses",
      price: "₹14.5 Cr*",
      priceNumeric: 145000000,
      locality: "Sector 63, Golf Course Ext",
      cityName: "Gurugram",
      lat: 28.3940,
      lng: 77.0710,
      specs: "5 BHK Independent Triplex",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
    {
      id: "worldmark-commercial-tower",
      slug: "dlf-the-arbour",
      title: "WorldMark Corporate Suites",
      builder: "Bharti WorldMark",
      propertyType: "Commercial",
      propertyTypeKey: "commercial",
      price: "₹5.60 Cr*",
      priceNumeric: 56000000,
      locality: "Sector 65, Golf Course Ext",
      cityName: "Gurugram",
      lat: 28.4110,
      lng: 77.0720,
      specs: "2,200 sq.ft Leased Office",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
  ],

  // Bangalore Region
  bangalore: [
    {
      id: "prestige-falcon-city",
      slug: "prestige-falcon-city",
      title: "Prestige Falcon City",
      builder: "Prestige Group",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹1.85 Cr*",
      priceNumeric: 18500000,
      locality: "Kanakapura Road, Bangalore",
      cityName: "Bangalore",
      lat: 12.8890,
      lng: 77.5480,
      specs: "2 BHK, 3 BHK, 4 BHK",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: true,
      isVerified: true,
    },
    {
      id: "kanakapura-villa-plots",
      slug: "prestige-falcon-city",
      title: "Falcon Greens Villa Enclave Plot",
      builder: "BMRDA Approved Layout",
      propertyType: "Land / Plot",
      propertyTypeKey: "land",
      price: "₹1.45 Cr*",
      priceNumeric: 14500000,
      locality: "Off Kanakapura Road, Bangalore",
      cityName: "Bangalore",
      lat: 12.8790,
      lng: 77.5390,
      specs: "1,500 sq.ft BMRDA Approved Plot",
      status: "Clear Title / Bank Approved",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isLand: true,
      isMock: true,
    },
    {
      id: "prestige-serenity-villas",
      slug: "prestige-falcon-city",
      title: "Prestige Valley View Villas",
      builder: "Prestige Group",
      propertyType: "House / Villa",
      propertyTypeKey: "houses",
      price: "₹4.80 Cr*",
      priceNumeric: 48000000,
      locality: "Kanakapura Road, Bangalore",
      cityName: "Bangalore",
      lat: 12.8950,
      lng: 77.5420,
      specs: "4 BHK Gated Community Villa",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
    {
      id: "forum-south-commercial-studios",
      slug: "prestige-falcon-city",
      title: "Forum South Corporate Tower",
      builder: "Prestige Tech Park Ltd",
      propertyType: "Commercial",
      propertyTypeKey: "commercial",
      price: "₹3.10 Cr*",
      priceNumeric: 31000000,
      locality: "Konanakunte Cross, Bangalore",
      cityName: "Bangalore",
      lat: 12.8875,
      lng: 77.5490,
      specs: "1,150 sq.ft Grade-A Office Space",
      status: "Ready to Occupy",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
  ],

  // Pune Region
  pune: [
    {
      id: "godrej-woodsville",
      slug: "godrej-woodsville",
      title: "Godrej Woodsville",
      builder: "Godrej Properties",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: "₹82.5 Lacs*",
      priceNumeric: 8250000,
      locality: "Hinjewadi Phase 1, Pune",
      cityName: "Pune",
      lat: 18.5910,
      lng: 73.7380,
      specs: "1, 2 & 3 BHK",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: true,
      isVerified: true,
    },
    {
      id: "hinjewadi-valley-plots",
      slug: "godrej-woodsville",
      title: "PMRDA IT Corridor Villa Plot",
      builder: "PMRDA Sanctioned Layout",
      propertyType: "Land / Plot",
      propertyTypeKey: "land",
      price: "₹1.15 Cr*",
      priceNumeric: 11500000,
      locality: "Hinjewadi Phase 1, Pune",
      cityName: "Pune",
      lat: 18.5980,
      lng: 73.7290,
      specs: "1,800 sq.ft PMRDA Sanctioned Plot",
      status: "Clear Title / Immediate Register",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isLand: true,
      isMock: true,
    },
    {
      id: "woodsville-signature-rowhouses",
      slug: "godrej-woodsville",
      title: "Woodsville Green Rowhouses",
      builder: "Godrej Properties",
      propertyType: "House / Villa",
      propertyTypeKey: "houses",
      price: "₹2.95 Cr*",
      priceNumeric: 2950000,
      locality: "Hinjewadi Phase 1, Pune",
      cityName: "Pune",
      lat: 18.5880,
      lng: 73.7420,
      specs: "3 BHK Luxury Rowhouse",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
    {
      id: "tech-park-commercial-suites",
      slug: "godrej-woodsville",
      title: "Hinjewadi IT Business Tower",
      builder: "Cyber City Realty",
      propertyType: "Commercial",
      propertyTypeKey: "commercial",
      price: "₹2.20 Cr*",
      priceNumeric: 22000000,
      locality: "Phase 1 Infotech Spine, Hinjewadi",
      cityName: "Pune",
      lat: 18.5930,
      lng: 73.7340,
      specs: "1,200 sq.ft IT/ITES Grade-A Space",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: false,
      isMock: true,
    },
  ],
};

// ─────────────────────────────────────────────
// 4. Helper Functions for Project Coordinates, Landmarks & Nearby Listings
// ─────────────────────────────────────────────

/**
 * Returns verified coordinates for a project by slug or id.
 * Returns null if not verified.
 */
export function getProjectCoordinates(project) {
  if (!project) return null;
  const slug = project.slug || project.id || "";
  if (PROJECT_COORDINATES[slug]) {
    return PROJECT_COORDINATES[slug];
  }
  if (project.id && PROJECT_COORDINATES[project.id]) {
    return PROJECT_COORDINATES[project.id];
  }
  // Check if project object itself already has verified lat/lng
  if (project.lat && project.lng) {
    return {
      lat: project.lat,
      lng: project.lng,
      locality: project.location || "",
      city: project.city || "mumbai",
      cityName: project.cityName || "Mumbai",
      propertyType: "Apartment",
      verified: true,
    };
  }
  return null;
}

/**
 * Returns verified landmarks for a given project.
 * Falls back to project's own landmarks if present, with estimated positions.
 */
export function getProjectLandmarks(project) {
  if (!project) return [];
  const slug = project.slug || project.id || "";

  // 1. Direct registry match
  if (PROJECT_LANDMARKS_MAP[slug]) {
    return PROJECT_LANDMARKS_MAP[slug];
  }

  // 2. If project has its own landmarks array in data
  const baseCoords = getProjectCoordinates(project);
  if (project.landmarks && Array.isArray(project.landmarks) && project.landmarks.length > 0) {
    return project.landmarks.map((lm, idx) => {
      let category = "Transport";
      const type = (lm.type || "").toLowerCase();
      const name = (lm.name || "").toLowerCase();
      if (type.includes("health") || type.includes("hospital") || name.includes("hospital")) {
        category = "Hospitals";
      } else if (
        type.includes("school") ||
        type.includes("education") ||
        name.includes("school") ||
        name.includes("college")
      ) {
        category = "Schools";
      } else if (
        type.includes("park") ||
        type.includes("garden") ||
        type.includes("reserve") ||
        name.includes("park") ||
        name.includes("lake")
      ) {
        category = "Parks";
      } else if (
        type.includes("mall") ||
        type.includes("retail") ||
        type.includes("market") ||
        name.includes("mall")
      ) {
        category = "Shopping Centers";
      } else {
        category = "Transport";
      }

      // If we have base coordinates, position landmarks in a small radial offset
      let lat = lm.lat;
      let lng = lm.lng;
      if (!lat && baseCoords) {
        const angle = (idx * (2 * Math.PI)) / project.landmarks.length;
        const distKm = parseFloat((lm.distance || "1.0").replace(/[^\d.]/g, "")) || 1.2;
        // ~111 km per degree lat, ~100 km per degree lng in India
        lat = baseCoords.lat + (Math.sin(angle) * distKm) / 111;
        lng = baseCoords.lng + (Math.cos(angle) * distKm) / 100;
      }

      return {
        id: `lm-${idx}-${slug}`,
        name: lm.name,
        category,
        type: lm.type || "Nearby Facility",
        distance: lm.distance || "1.0 km",
        time: lm.time || "5 mins",
        lat: lat || (baseCoords ? baseCoords.lat + 0.005 : 19.0624),
        lng: lng || (baseCoords ? baseCoords.lng + 0.005 : 73.0108),
      };
    });
  }

  // Fallback to reference landmarks if Sanpada
  if ((project.location || "").toLowerCase().includes("sanpada")) {
    return PROJECT_LANDMARKS_MAP["godrej-eternal-palms"];
  }

  return [];
}

/**
 * Returns available properties and land/plot listings in the surrounding region.
 * Distinguishes Apartments, Houses/Villas, Commercial, and Land/Plots.
 */
export function getNearbyPropertiesForProject(project) {
  if (!project) return [];
  const cityKey = (project.city || "mumbai").toLowerCase();
  const pool = AREA_PROPERTIES_REGISTRY[cityKey] || AREA_PROPERTIES_REGISTRY.mumbai;

  // Clone and ensure the current project is clearly flagged and listed first
  const currentSlug = project.slug || project.id;
  const currentCoords = getProjectCoordinates(project);

  const list = pool.map((item) => {
    const isCurrent =
      item.slug === currentSlug ||
      item.id === currentSlug ||
      item.title.toLowerCase() === (project.title || "").toLowerCase();

    return {
      ...item,
      isCurrentProject: isCurrent,
      // If it's the current project, make sure it inherits the project's actual price/title
      title: isCurrent ? project.title : item.title,
      price: isCurrent ? `₹${project.price}*` : item.price,
      locality: isCurrent ? project.location : item.locality,
      image: isCurrent && project.images?.[0] ? project.images[0] : item.image,
      lat: isCurrent && currentCoords ? currentCoords.lat : item.lat,
      lng: isCurrent && currentCoords ? currentCoords.lng : item.lng,
    };
  });

  // If current project not in list, add it at the top
  const hasCurrent = list.some((p) => p.isCurrentProject);
  if (!hasCurrent && currentCoords) {
    list.unshift({
      id: project.id || project.slug,
      slug: project.slug,
      title: project.title,
      builder: project.builder || "Grade-A Developer",
      propertyType: "Apartment",
      propertyTypeKey: "apartments",
      price: `₹${project.price}*`,
      locality: project.location,
      cityName: project.cityName || "Mumbai",
      lat: currentCoords.lat,
      lng: currentCoords.lng,
      specs: project.flatTypes || "2 & 3 BHK",
      status: project.status || "Under Construction",
      image:
        project.images?.[0] ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      isCurrentProject: true,
      isVerified: true,
    });
  }

  return list;
}
