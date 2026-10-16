// AuraLiving Centralized Project Mock Data Store & Slug Resolver
// Built to match PropertyPistol's project detail hierarchy:
// Hero Gallery, Quick Specs, Layouts/Floor Plans, Overview, Amenities, Landmarks, Developer Profile, Similar Projects

import { DEVELOPERS_DATA } from "./developersData";
import { PROJECTS as GLOBAL_PROJECTS, EXCLUSIVE_PROJECTS } from "./index";

// Standard Floor Plan Generator Helper
function generateFloorPlans(typologies = "2, 3 BHK", basePriceStr = "2.5 Cr", carpetAreaStr = "800 - 1,400 sq.ft") {
  const plans = [];
  const types = typologies.toLowerCase();

  if (types.includes("1 bhk") || types.includes("1bhk") || types.includes("1,")) {
    plans.push({
      type: "1 BHK",
      bhk: "1 BHK",
      carpetArea: "420 - 485 sq.ft",
      superArea: "610 - 700 sq.ft",
      price: "₹85.0 Lacs*",
      specs: { bedrooms: 1, bathrooms: 1, balconies: 1, parking: "1 Covered" },
      facing: "East / Garden Facing",
      description: "Smart layout designed for urban professionals with open-plan living, modular kitchen, and private sit-out balcony.",
      layoutImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    });
  }

  if (types.includes("2 bhk") || types.includes("2bhk") || types.includes("2,")) {
    plans.push({
      type: "2 BHK Premium",
      bhk: "2 BHK",
      carpetArea: "720 - 845 sq.ft",
      superArea: "1,050 - 1,220 sq.ft",
      price: basePriceStr.includes("Cr") ? `₹${basePriceStr}*` : "₹1.45 Cr*",
      specs: { bedrooms: 2, bathrooms: 2, balconies: 2, parking: "1 Covered" },
      facing: "North-East / Vastu Compliant",
      description: "Well-ventilated master bedroom with en-suite bath, spacious dining alcove, utility balcony, and panoramic glass facade.",
      layoutImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    });
  }

  if (types.includes("3 bhk") || types.includes("3bhk") || types.includes("3,")) {
    plans.push({
      type: "3 BHK Grande",
      bhk: "3 BHK",
      carpetArea: "1,120 - 1,350 sq.ft",
      superArea: "1,620 - 1,950 sq.ft",
      price: "₹3.20 Cr*",
      specs: { bedrooms: 3, bathrooms: 3, balconies: 2, parking: "2 Covered" },
      facing: "Sea / Skyline Facing",
      description: "Lavish living space with separate family lounge, walk-in wardrobe in master suite, imported marble foyer, and servant quarter.",
      layoutImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    });
  }

  if (types.includes("4 bhk") || types.includes("4bhk") || types.includes("4,")) {
    plans.push({
      type: "4 BHK Royal Penthouse",
      bhk: "4 BHK",
      carpetArea: "1,850 - 2,450 sq.ft",
      superArea: "2,650 - 3,500 sq.ft",
      price: "₹5.85 Cr*",
      specs: { bedrooms: 4, bathrooms: 4, balconies: 3, parking: "3 Covered" },
      facing: "Panoramic 270° Views",
      description: "Double-height living pavilion, private plunge pool deck, master penthouse suite with Jacuzzi, and dedicated butler elevator entry.",
      layoutImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    });
  }

  // Fallback if no match
  if (plans.length === 0) {
    plans.push(
      {
        type: "2 BHK Luxury",
        bhk: "2 BHK",
        carpetArea: "750 sq.ft",
        superArea: "1,080 sq.ft",
        price: "₹1.50 Cr*",
        specs: { bedrooms: 2, bathrooms: 2, balconies: 1, parking: "1 Covered" },
        facing: "Garden Facing",
        description: "Optimal carpet-to-super-area efficiency with premium Italian fittings and acoustic double-glazed windows.",
        layoutImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      },
      {
        type: "3 BHK Luxury",
        bhk: "3 BHK",
        carpetArea: "1,200 sq.ft",
        superArea: "1,750 sq.ft",
        price: "₹2.65 Cr*",
        specs: { bedrooms: 3, bathrooms: 3, balconies: 2, parking: "2 Covered" },
        facing: "Skyline Facing",
        description: "Executive layout featuring expansive living room, en-suite bathrooms, and master bedroom with panoramic balcony.",
        layoutImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
      }
    );
  }

  return plans;
}

// Canonical Projects Registry with Deep Rich Content
export const CANONICAL_PROJECTS = [
  {
    id: "godrej-eternal-palms",
    slug: "godrej-eternal-palms",
    title: "Godrej Eternal Palms",
    name: "Godrej Eternal Palms",
    builder: "Godrej Properties",
    developerSlug: "godrej-properties",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Sanpada, Navi Mumbai",
    price: "2.68 Cr",
    priceNumeric: 26800000,
    avgPrice: "₹33.48 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK",
    carpetArea: "800 - 1,408 sq.ft",
    possession: "December 2026",
    rera: "P51700049211",
    status: "Under Construction",
    tag: "Exclusive",
    rating: 4.8,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Godrej Eternal Palms is an iconic residential enclave situated in the premier green enclave of Sanpada, Navi Mumbai. Thoughtfully planned across sprawling manicured landscaped gardens, the development offers uninterrupted panoramic vistas of the Palm Beach creek and surrounding mangroves.\n\nDesigned with sustainable green architecture certified by IGBC, the towers feature high-performance double-glazed facades, intelligent climate management, and grand double-height entrance lobbies curated by international interior designers. Residents enjoy seamless transit to South Mumbai via the Mumbai Trans Harbour Link (Atal Setu) and rapid access to the upcoming Navi Mumbai International Airport.`,
    highlights: [
      "Panoramic Arabian Sea & Palm Beach Creek Views",
      "Direct 15-minute connection to MTHL (Atal Setu)",
      "40,000 sq.ft Grand Clubhouse with Olympic Infinity Pool",
      "IGBC Gold Pre-Certified Sustainable Construction",
      "Triple-tier Biometric Security & Smart Home Automation",
      "Dedicated EV Charging Infrastructure at each bay"
    ],
    amenities: [
      { name: "Infinity Lap Pool", category: "Wellness", icon: "Waves" },
      { name: "Grand 40k Clubhouse", category: "Lifestyle", icon: "Building2" },
      { name: "Sky Observation Deck", category: "Luxury", icon: "Sparkles" },
      { name: "Gymnasium & Yoga Deck", category: "Fitness", icon: "Activity" },
      { name: "EV Charging Station", category: "Eco", icon: "Zap" },
      { name: "Tennis & Squash Courts", category: "Sports", icon: "Trophy" },
      { name: "Kids Adventure Park", category: "Kids", icon: "Smile" },
      { name: "24/7 Security & Concierge", category: "Security", icon: "ShieldCheck" }
    ],
    floorPlans: generateFloorPlans("2 BHK, 3 BHK", "2.68 Cr", "800 - 1,408 sq.ft"),
    landmarks: [
      { name: "Palm Beach Road", distance: "0.8 km", time: "3 mins", type: "Transit" },
      { name: "Sanpada Railway Station", distance: "1.2 km", time: "5 mins", type: "Railway" },
      { name: "Atal Setu (MTHL Ramp)", distance: "6.5 km", time: "12 mins", type: "Expressway" },
      { name: "Apollo Hospital Belapur", distance: "4.2 km", time: "10 mins", type: "Healthcare" },
      { name: "Ryan International School", distance: "2.1 km", time: "7 mins", type: "Education" },
      { name: "Navi Mumbai International Airport", distance: "14.0 km", time: "22 mins", type: "Airport" }
    ],
    developerInfo: {
      name: "Godrej Properties",
      slug: "godrej-properties",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/007/medium/godrej.jpg?1578047383",
      experience: "34 Years",
      projectsCount: "140+ Projects",
      established: "1990",
      description: "Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to real estate development with over 250 prestigious awards."
    },
    relatedProjectSlugs: ["godrej-ascend", "lt-island-cove", "godrej-bayview", "tata-orbis"]
  },

  {
    id: "godrej-ascend",
    slug: "godrej-ascend",
    title: "Godrej Ascend",
    name: "Godrej Ascend",
    builder: "Godrej Properties",
    developerSlug: "godrej-properties",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Dhokali, Thane West, Mumbai",
    fullAddress: "Godrej Ascend, Kolshet Road, Thane, Kolshet Road, Dhokali, Thane West, Mumbai, Maharashtra, India",
    price: "1.07 Cr onwards",
    priceNumeric: 10700000,
    avgPrice: "INR 28.08 K / sq.ft",
    minPricePerSqft: "INR 28.08 K per Sqft.",
    flatTypes: "1, 2 & 3 BHK Apartment",
    configuration: "1 BHK, 2 BHK, 3 BHK",
    builtUpArea: "On request",
    carpetArea: "381 - 1,058 Sq.ft.",
    possession: "Apr 2028",
    possessionStatus: "Under Construction",
    possessionDate: "Apr 2028",
    projectArea: "283974 Sq.ft.",
    rera: "P51700034608, P51700046541, P51700049514, P51700053668",
    status: "New Launch",
    tag: "Trending",
    offersBadge: "Offers Available",
    rating: 4.8,
    reviewsCount: 198,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Godrej Ascend on Kolshet Road, Thane, is an iconic 6-acre development featuring five elegant high-rise towers integrated with over 40 lifestyle amenities across a central grand podium and sky decks.\n\nNestled against the verdant backdrop of the Yeoor Hills and Ulhas River, residents experience tranquil nature without compromising on urban convenience. Seamless connectivity to Eastern Express Highway, Ghodbunder Road, and the upcoming Metro Line 4 makes Godrej Ascend an ideal residence for progressive families.`,
    highlights: [
      "6+ Acres Gated Community on Kolshet-Dhokali Corridor",
      "Over 40 Curated Lifestyle & Sports Amenities",
      "Panoramic views of Yeoor Hills and lush greenery",
      "Minutes from upcoming Metro Line 4 Station",
      "Direct builder inventory with zero brokerage support"
    ],
    amenities: [
      { name: "Infinity Swimming Pool", category: "Wellness", icon: "Waves" },
      { name: "Multi-level Clubhouse", category: "Lifestyle", icon: "Building2" },
      { name: "Landscaped Sky Deck", category: "Outdoors", icon: "Sparkles" },
      { name: "EV Charging Bay", category: "Eco", icon: "Zap" },
      { name: "Jogging & Cycling Track", category: "Fitness", icon: "Activity" },
      { name: "Cricket Turf & Badminton", category: "Sports", icon: "Trophy" }
    ],
    floorPlans: generateFloorPlans("1, 2 & 3 BHK", "1.07 Cr", "381 - 1,058 sq.ft"),
    landmarks: [
      { name: "Eastern Express Highway", distance: "2.5 km", time: "6 mins", type: "Transit" },
      { name: "Viviana Mall Thane", distance: "3.8 km", time: "10 mins", type: "Retail" },
      { name: "Jupiter Hospital", distance: "3.5 km", time: "9 mins", type: "Healthcare" },
      { name: "Singhania International School", distance: "4.0 km", time: "12 mins", type: "Education" },
      { name: "Thane Railway Station", distance: "5.8 km", time: "18 mins", type: "Railway" }
    ],
    developerInfo: {
      name: "Godrej Properties",
      slug: "godrej-properties",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/007/medium/godrej.jpg?1578047383",
      experience: "34 Years",
      projectsCount: "140+ Projects",
      established: "1990",
      description: "Godrej Properties is celebrated across India for contemporary design, green architecture, and reliable delivery."
    },
    relatedProjectSlugs: ["godrej-eternal-palms", "godrej-sky-terraces", "lt-vayam", "lodha-crown-kolshet"]
  },

  {
    id: "lodha-corinthia",
    slug: "lodha-corinthia",
    title: "Lodha Corinthia",
    name: "Lodha Corinthia",
    builder: "Lodha Group",
    developerSlug: "lodha-group",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Bhandup West, Mumbai",
    fullAddress: "Lodha Corinthia Sales Gallery, LBS Marg, Lal Bahadur Shastri Marg, Ganesh Nagar, Bhandup West, Mumbai, Maharashtra, India",
    price: "1.9 Cr onwards",
    priceNumeric: 19000000,
    avgPrice: "INR 25.3 K / sq.ft",
    minPricePerSqft: "INR 25.3 K per Sqft.",
    flatTypes: "2 & 3 BHK Apartment",
    configuration: "2 BHK, 3 BHK",
    builtUpArea: "On request",
    carpetArea: "750 - 1,100 Sq.ft.",
    possession: "Jun 2029",
    possessionStatus: "Launch",
    possessionDate: "Jun 2029",
    projectArea: "304920 Sq.ft.",
    rera: "PR1180002400022, PR1180002400043, PR1180002400044",
    status: "New Launch",
    tag: "RERA Verified",
    offersBadge: "Offers Available",
    rating: 4.9,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Introducing Lodha Corinthia, a magnificent 7-acre estate on LBS Marg that offers an international lifestyle crafted for generous luxury, green landscaped gardens, and grand sports amenities.\n\nCrafted with classical European architectural cues and modern glass facades, Lodha Corinthia redefines urban luxury in Central Mumbai with over 35 curated amenities and bespoke Saint Amand hospitality.`,
    highlights: [
      "7-Acre Master Planned Estate on LBS Marg",
      "Bespoke Saint Amand Five-Star Hospitality Services",
      "Over 35 Curated Luxury & Sports Amenities",
      "Direct connectivity to Bhandup & Kanjurmarg Railway Stations",
      "Direct builder inventory with zero brokerage"
    ],
    amenities: [
      { name: "Olympic Lap Pool", category: "Wellness", icon: "Waves" },
      { name: "Saint Amand Concierge", category: "Service", icon: "ShieldCheck" },
      { name: "Grand Clubhouse", category: "Lifestyle", icon: "Building2" },
      { name: "Indoor Badminton Court", category: "Sports", icon: "Trophy" },
      { name: "Private Movie Screening Theatre", category: "Entertainment", icon: "Sparkles" }
    ],
    floorPlans: generateFloorPlans("2 & 3 BHK", "1.9 Cr", "750 - 1,100 sq.ft"),
    landmarks: [
      { name: "LBS Marg", distance: "0.1 km", time: "Direct Access", type: "Road" },
      { name: "Bhandup Railway Station", distance: "1.2 km", time: "4 mins", type: "Railway" },
      { name: "Eastern Express Highway", distance: "2.8 km", time: "7 mins", type: "Transit" },
      { name: "Fortis Hospital Mulund", distance: "3.2 km", time: "8 mins", type: "Healthcare" }
    ],
    developerInfo: {
      name: "Lodha Group",
      slug: "lodha-group",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      experience: "44 Years",
      projectsCount: "200+ Projects",
      established: "1980",
      description: "Lodha Group is one of India's premier real estate developers, renowned for luxury landmarks and world-class communities."
    },
    relatedProjectSlugs: ["godrej-ascend", "lodha-divino", "lodha-crown-kolshet"]
  },

  {
    id: "mahindra-marina-64",
    slug: "mahindra-marina-64",
    title: "Mahindra Marina 64",
    name: "Mahindra Marina 64",
    shortTitle: "Mahindra Marina ...",
    builder: "Mahindra Lifespaces",
    developerSlug: "mahindra-lifespaces",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Malad West, Mumbai",
    fullAddress: "Mahindra Marina64, Navy Nagar Road, Malad, Navy Colony, Liberty Garden, Malad West, Mumbai, Maharashtra, India",
    price: "1.8 Cr onwards",
    priceNumeric: 18000000,
    avgPrice: "INR 30.0 K / sq.ft",
    minPricePerSqft: "INR 30.0 K per Sqft.",
    flatTypes: "2 & 4 BHK Flat",
    configuration: "2 BHK, 4 BHK",
    builtUpArea: "On request",
    carpetArea: "600 - 1,474 Sq.ft.",
    possession: "Dec 2028",
    possessionStatus: "Launch",
    possessionDate: "Dec 2028",
    projectArea: "198020 Sq.ft.",
    rera: "PR1181012500087, PR1181012500523, PR1182022502285",
    status: "New Launch",
    tag: "Trending",
    rating: 4.8,
    reviewsCount: 110,
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Mahindra Marina 64 in Malad West is a premium residential offering by Mahindra Lifespaces that blends luxury, sustainability, and seamless connectivity to the Link Road and Western Express Highway.\n\nDesigned with IGBC Gold green building pre-certification, the high-rise towers offer panoramic views of the city skyline and coastal mangroves, complemented by resort-style podium amenities and biometric home automation.`,
    highlights: [
      "Premium High-Rise Development in Prime Malad West",
      "Crafted by Mahindra Lifespaces with IGBC Gold Standards",
      "Comprehensive Rooftop & Podium Lifestyle Amenities",
      "Proximity to Inorbit Mall & Mindspace Commercial IT Hub",
      "Direct builder allocation with zero brokerage"
    ],
    amenities: [
      { name: "Infinity Edge Swimming Pool", category: "Wellness", icon: "Waves" },
      { name: "Sky Gymnasium & Yoga Lawn", category: "Fitness", icon: "Activity" },
      { name: "Children's Adventure Play Zone", category: "Family", icon: "Smile" },
      { name: "EV Charging Infrastructure", category: "Eco", icon: "Zap" }
    ],
    floorPlans: generateFloorPlans("2 & 4 BHK", "1.8 Cr", "600 - 1,474 sq.ft"),
    landmarks: [
      { name: "Link Road Malad", distance: "0.5 km", time: "2 mins", type: "Road" },
      { name: "Inorbit Mall Malad", distance: "1.8 km", time: "6 mins", type: "Retail" },
      { name: "Malad Railway Station", distance: "1.5 km", time: "5 mins", type: "Railway" },
      { name: "Mindspace IT Park", distance: "2.2 km", time: "7 mins", type: "IT Park" }
    ],
    developerInfo: {
      name: "Mahindra Lifespaces",
      slug: "mahindra-lifespaces",
      logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&h=120&q=80",
      experience: "30 Years",
      projectsCount: "60+ Projects",
      established: "1994",
      description: "Mahindra Lifespaces brings trust and sustainable design to urban residential living across India."
    },
    relatedProjectSlugs: ["godrej-ascend", "lodha-corinthia", "lt-island-cove"]
  },

  {
    id: "lt-island-cove",
    slug: "lt-island-cove",
    title: "L&T Island Cove",
    name: "L&T Island Cove",
    builder: "L&T Realty",
    developerSlug: "lt-realty",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Mahim West, Mumbai",
    price: "3.15 Cr",
    priceNumeric: 31500000,
    avgPrice: "₹46.38 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK",
    carpetArea: "680 - 1,394 sq.ft",
    possession: "June 2027",
    rera: "P51900052341",
    status: "New Launch",
    tag: "Featured",
    rating: 4.9,
    reviewsCount: 88,
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `L&T Island Cove represents the epitome of high-end South Central Mumbai living at Mahim West. Positioned strategically where South Mumbai meets Bandra, this signature development by L&T Realty overlooks the glistening Arabian Sea and the Bandra-Worli Sea Link.\n\nEvery residence is crafted with precision engineering, double-glazed soundproof glass, and expansive sundecks that invite natural sea breezes. With Bandra Kurla Complex (BKC) just 15 minutes away, this is the prime address for business leaders and top executives.`,
    highlights: [
      "Direct views of Bandra-Worli Sea Link and Arabian Sea",
      "Strategic central corridor between South Mumbai & BKC",
      "World-class L&T engineering and earthquake-resistant structure",
      "Sky Lounge & Sunset Observatory on 40th Floor",
      "Private keycard elevators and multi-tier biometric access"
    ],
    amenities: [
      { name: "Infinity Edge Sky Pool", category: "Wellness", icon: "Waves" },
      { name: "Sunset Sky Lounge", category: "Luxury", icon: "Sparkles" },
      { name: "Modern Fitness Studio", category: "Fitness", icon: "Activity" },
      { name: "EV Charging Infrastructure", category: "Eco", icon: "Zap" },
      { name: "Banquet & Private Dining", category: "Lifestyle", icon: "Building2" },
      { name: "Concierge & Valet Service", category: "Service", icon: "ShieldCheck" }
    ],
    floorPlans: generateFloorPlans("2 BHK, 3 BHK", "3.15 Cr", "680 - 1,394 sq.ft"),
    landmarks: [
      { name: "Bandra-Worli Sea Link", distance: "1.5 km", time: "4 mins", type: "Transit" },
      { name: "Bandra Kurla Complex (BKC)", distance: "5.2 km", time: "14 mins", type: "Commercial" },
      { name: "Mahim Railway Station", distance: "0.9 km", time: "3 mins", type: "Railway" },
      { name: "Hinduja Hospital Mahim", distance: "1.8 km", time: "5 mins", type: "Healthcare" },
      { name: "Bombay Scottish School", distance: "2.0 km", time: "6 mins", type: "Education" }
    ],
    developerInfo: {
      name: "L&T Realty",
      slug: "lt-realty",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/014/medium/lnt.jpg?1578047360",
      experience: "22 Years",
      projectsCount: "85+ Projects",
      established: "2011",
      description: "L&T Realty is the real estate arm of Larsen & Toubro, delivering landmark engineering excellence across India."
    },
    relatedProjectSlugs: ["godrej-eternal-palms", "lt-elixir-reserve", "lodha-divino", "oberoi-sky-city"]
  },

  {
    id: "lt-elixir-reserve",
    slug: "lt-elixir-reserve",
    title: "L&T Elixir Reserve",
    name: "L&T Elixir Reserve",
    builder: "L&T Realty",
    developerSlug: "lt-realty",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Powai, Mumbai",
    price: "2.61 Cr",
    priceNumeric: 26100000,
    avgPrice: "₹36.60 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK, 4 BHK",
    carpetArea: "713 - 2,200 sq.ft",
    possession: "September 2026",
    rera: "P51800034102",
    status: "Under Construction",
    tag: "Luxury",
    rating: 4.7,
    reviewsCount: 112,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Nestled in the lush hills overlooking Powai Lake, L&T Elixir Reserve offers an oasis of serene greenery amidst Mumbai's tech and financial nerve center. Spread over 25 pristine acres, the community features a natural forest trail, a scenic lakefront boardwalk, and private elevated sky bridges.\n\nWith world-class amenities including an Olympic-sized swimming pool, expansive squash and badminton courts, and an exclusive residents-only wellness spa, Elixir Reserve sets the new gold standard for residential luxury in Powai.`,
    highlights: [
      "25-Acre Gated Sanctuary Overlooking Powai Lake",
      "Private Forest Trail & Elevated Canopy Skywalk",
      "Olympic-length Lap Pool & Heated Children's Pool",
      "Direct transit to JVLR, Western Express & Eastern Express",
      "Proximity to Hiranandani Gardens, IIT Bombay & SEEPZ"
    ],
    amenities: [
      { name: "Powai Lakefront Trail", category: "Nature", icon: "Sparkles" },
      { name: "Olympic Swimming Pool", category: "Wellness", icon: "Waves" },
      { name: "Club Royale Clubhouse", category: "Lifestyle", icon: "Building2" },
      { name: "Tennis & Squash Courts", category: "Sports", icon: "Trophy" },
      { name: "Holistic Wellness Spa", category: "Health", icon: "Activity" }
    ],
    floorPlans: generateFloorPlans("2 BHK, 3 BHK, 4 BHK", "2.61 Cr", "713 - 2,200 sq.ft"),
    landmarks: [
      { name: "Powai Lake Promenade", distance: "0.5 km", time: "2 mins", type: "Nature" },
      { name: "Hiranandani High Street", distance: "2.1 km", time: "6 mins", type: "Retail" },
      { name: "IIT Bombay Campus", distance: "3.2 km", time: "8 mins", type: "Education" },
      { name: "JVLR Metro Station", distance: "1.8 km", time: "5 mins", type: "Transit" },
      { name: "Chhatrapati Shivaji Maharaj Airport", distance: "7.5 km", time: "18 mins", type: "Airport" }
    ],
    developerInfo: {
      name: "L&T Realty",
      slug: "lt-realty",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/014/medium/lnt.jpg?1578047360",
      experience: "22 Years",
      projectsCount: "85+ Projects",
      established: "2011",
      description: "L&T Realty combines cutting-edge engineering and sustainable design to craft premier residences across India."
    },
    relatedProjectSlugs: ["lt-island-cove", "godrej-eternal-palms", "shapoorji-vicinia", "hiranandani-castalia"]
  },

  {
    id: "dlf-the-arbour",
    slug: "dlf-the-arbour",
    title: "DLF The Arbour",
    name: "DLF The Arbour",
    builder: "DLF Limited",
    developerSlug: "dlf-limited",
    city: "gurugram",
    cityName: "Gurugram",
    location: "Sector 63, Golf Course Ext Road, Gurugram",
    price: "7.50 Cr",
    priceNumeric: 75000000,
    avgPrice: "₹18.90 K / sq.ft",
    flatTypes: "4 BHK Luxury Suites",
    carpetArea: "3,950 sq.ft",
    possession: "December 2027",
    rera: "RC/REP/HARERA/GGM/686/418/2023/30",
    status: "Under Construction",
    tag: "Ultra Luxury",
    rating: 5.0,
    reviewsCount: 76,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `DLF The Arbour is the newest jewel in DLF's luxury residential crown, located on the prestigious Golf Course Extension Road in Sector 63, Gurugram. Designed as low-density, high-rise luxury towers across 25 landscaped acres, each floor accommodates only two residences with private elevator vestibules.\n\nEvery 4 BHK residence features double-height wrapping balconies, column-free panoramic living rooms, VRV climate control, and smart automation throughout. With 85% open botanical green spaces, The Arbour establishes a new benchmark for North Indian luxury real estate.`,
    highlights: [
      "Low-density living: Only 2 ultra-luxury apartments per floor",
      "Massive 1.25 Lakh sq.ft Grand Clubhouse with Indoor Heated Pool",
      "Direct frontage on Golf Course Extension Road",
      "Private elevator lobbies with biometric security access",
      "LEED Platinum pre-certified sustainable construction"
    ],
    amenities: [
      { name: "Grand 1.25L sq.ft Clubhouse", category: "Luxury", icon: "Building2" },
      { name: "Heated Indoor & Outdoor Pools", category: "Wellness", icon: "Waves" },
      { name: "Private Movie Screening Theatre", category: "Entertainment", icon: "Sparkles" },
      { name: "Championship Squash Courts", category: "Sports", icon: "Trophy" },
      { name: "Concierge & Valet Butler Service", category: "Service", icon: "ShieldCheck" }
    ],
    floorPlans: generateFloorPlans("4 BHK", "7.50 Cr", "3,950 sq.ft"),
    landmarks: [
      { name: "Golf Course Road", distance: "3.5 km", time: "6 mins", type: "Transit" },
      { name: "Cyber City Gurugram", distance: "12.0 km", time: "18 mins", type: "Commercial" },
      { name: "Medanta - The Medicity", distance: "8.5 km", time: "15 mins", type: "Healthcare" },
      { name: "Heritage Xperiential School", distance: "2.8 km", time: "5 mins", type: "Education" },
      { name: "Indira Gandhi International Airport (IGI)", distance: "22.0 km", time: "30 mins", type: "Airport" }
    ],
    developerInfo: {
      name: "DLF Limited",
      slug: "dlf-limited",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80",
      experience: "75 Years",
      projectsCount: "300+ Projects",
      established: "1946",
      description: "DLF has shaped modern Gurugram and North India's luxury landscape with visionary master plans and architectural landmarks."
    },
    relatedProjectSlugs: ["dlf-the-camellias", "dlf-midtown", "godrej-aristocrat", "aura-signature-waterfront"]
  },

  {
    id: "prestige-falcon-city",
    slug: "prestige-falcon-city",
    title: "Prestige Falcon City",
    name: "Prestige Falcon City",
    builder: "Prestige Group",
    developerSlug: "prestige-group",
    city: "bangalore",
    cityName: "Bangalore",
    location: "Kanakapura Road, Bangalore",
    price: "1.85 Cr",
    priceNumeric: 18500000,
    avgPrice: "₹11.80 K / sq.ft",
    flatTypes: "2 BHK, 3 BHK, 4 BHK",
    carpetArea: "1,204 - 2,726 sq.ft",
    possession: "Ready to Move",
    rera: "PRM/KA/RERA/1251/310/PR/170915/000216",
    status: "Ready to Move",
    tag: "Featured",
    rating: 4.9,
    reviewsCount: 230,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Prestige Falcon City is a sprawling 41-acre ready-to-move residential township situated on Kanakapura Road, South Bangalore. With its own state-of-the-art Forum Mall on campus and direct connectivity to the Konanakunte Cross Metro Station, this landmark development redefines integrated urban convenience.\n\nFeaturing expansive 2, 3, and 4 BHK homes with panoramic balconies, an expansive 60,000 sq.ft clubhouse, aerobics hall, and world-class sports academies, Prestige Falcon City is South Bangalore's most vibrant residential community.`,
    highlights: [
      "41-Acre Mega Integrated Township with Onsite Forum Mall",
      "Direct Metro connection at Konanakunte Cross Station",
      "Ready to Move with Full Occupancy Certificate (OC)",
      "60,000 sq.ft Clubhouse with Indoor Heated Pool",
      "Over 70% open landscaped parks and recreational zones"
    ],
    amenities: [
      { name: "Integrated Forum Mall", category: "Retail", icon: "Building2" },
      { name: "Metro Station Connection", category: "Transit", icon: "Sparkles" },
      { name: "Grand 60k Clubhouse", category: "Lifestyle", icon: "Building2" },
      { name: "Olympic Swimming Pool", category: "Wellness", icon: "Waves" },
      { name: "Tennis, Squash & Badminton", category: "Sports", icon: "Trophy" }
    ],
    floorPlans: generateFloorPlans("2 BHK, 3 BHK, 4 BHK", "1.85 Cr", "1,204 - 2,726 sq.ft"),
    landmarks: [
      { name: "Konanakunte Cross Metro Station", distance: "0.2 km", time: "1 min", type: "Transit" },
      { name: "Forum South Bangalore Mall", distance: "0.1 km", time: "Onsite", type: "Retail" },
      { name: "Kumaran's Children Home", distance: "1.5 km", time: "4 mins", type: "Education" },
      { name: "Fortis Hospital Bannerghatta", distance: "6.5 km", time: "15 mins", type: "Healthcare" },
      { name: "Electronic City Flyover", distance: "11.0 km", time: "20 mins", type: "IT Park" }
    ],
    developerInfo: {
      name: "Prestige Group",
      slug: "prestige-group",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/001/443/original/prestige.jpg?1578047506",
      experience: "36 Years",
      projectsCount: "250+ Projects",
      established: "1986",
      description: "Prestige Group has transformed Bangalore and South India's skyline with high-quality residential and retail developments."
    },
    relatedProjectSlugs: ["prestige-kingfisher-towers", "sobha-dream-acres", "brigade-utopia", "aura-palms-golf-estate"]
  },

  {
    id: "godrej-woodsville",
    slug: "godrej-woodsville",
    title: "Godrej Woodsville",
    name: "Godrej Woodsville",
    builder: "Godrej Properties",
    developerSlug: "godrej-properties",
    city: "pune",
    cityName: "Pune",
    location: "Hinjewadi Phase 1, Pune",
    price: "85.0 Lacs onwards",
    priceNumeric: 8500000,
    avgPrice: "₹12.20 K / sq.ft",
    flatTypes: "1, 2 & 3 BHK",
    carpetArea: "512 - 1,020 sq.ft",
    possession: "June 2026",
    rera: "P52100046729",
    status: "Under Construction",
    tag: "Popular",
    rating: 4.7,
    reviewsCount: 165,
    images: [
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Godrej Woodsville is a vibrant contemporary community located directly in Hinjewadi Phase 1, the heart of Pune's thriving IT corridor. Designed for modern work-life balance, it features dedicated co-working pods, sky walks, and an organic community farming garden.\n\nLocated within 5 minutes of major IT campuses including Infosys, Wipro, and Cognizant, Godrej Woodsville provides tech professionals with unmatched convenience and strong capital appreciation potential.`,
    highlights: [
      "Prime location in Hinjewadi Phase 1 IT SEZ",
      "Work-from-Home friendly co-working lounges & high-speed Wi-Fi",
      "Sky Walk observatory connecting rooftop recreational zones",
      "Direct access to upcoming Pune Metro Line 3",
      "Zero brokerage advisory with flexible payment schedules"
    ],
    amenities: [
      { name: "Co-Working Tech Hub", category: "Work", icon: "Building2" },
      { name: "Rooftop Skywalk Loop", category: "Lifestyle", icon: "Sparkles" },
      { name: "Resort Swimming Pool", category: "Wellness", icon: "Waves" },
      { name: "Organic Community Garden", category: "Eco", icon: "Smile" },
      { name: "Cricket Bowling Turf", category: "Sports", icon: "Trophy" }
    ],
    floorPlans: generateFloorPlans("1, 2 & 3 BHK", "85.0 Lacs", "512 - 1,020 sq.ft"),
    landmarks: [
      { name: "Infosys Campus Hinjewadi", distance: "0.8 km", time: "2 mins", type: "IT Park" },
      { name: "Pune Metro Line 3 Station", distance: "0.5 km", time: "2 mins", type: "Transit" },
      { name: "Mumbai-Pune Expressway Ramp", distance: "3.2 km", time: "7 mins", type: "Expressway" },
      { name: "Ruby Hall Clinic Hinjawadi", distance: "2.1 km", time: "5 mins", type: "Healthcare" },
      { name: "Blue Ridge Public School", distance: "1.5 km", time: "4 mins", type: "Education" }
    ],
    developerInfo: {
      name: "Godrej Properties",
      slug: "godrej-properties",
      logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/007/medium/godrej.jpg?1578047383",
      experience: "34 Years",
      projectsCount: "140+ Projects",
      established: "1990",
      description: "Godrej Properties brings a 127-year legacy of trust and cutting-edge design to modern Pune living."
    },
    relatedProjectSlugs: ["godrej-ascend", "lodha-belmondo", "godrej-eternal-palms", "prestige-falcon-city"]
  },

  {
    id: "aura-signature-waterfront",
    slug: "aura-signature-waterfront",
    title: "Aura Living Signature Waterfront",
    name: "Aura Living Signature Waterfront",
    builder: "AuraLiving Signature",
    developerSlug: "godrej-properties",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Worli Sea Face, Mumbai",
    price: "8.50 Cr - 22.0 Cr",
    priceNumeric: 85000000,
    avgPrice: "₹68.50 K / sq.ft",
    flatTypes: "3, 4 & 5 BHK Sky Mansions",
    carpetArea: "2,400 - 5,600 sq.ft",
    possession: "Ready to Move",
    rera: "P51900018892",
    status: "Ready to Move",
    tag: "Exclusive Launch",
    rating: 5.0,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: `Aura Living Signature Waterfront is Mumbai's ultimate trophy address on Worli Sea Face. Built directly overlooking the Arabian Sea, this rare limited-edition collection offers ultra-luxury sky mansions with uninterrupted horizon views.\n\nFinished with customized Italian marble, private infinity plunge pools on each sky terrace, and private biometric elevators opening directly into personalized foyer galleries, this development is curated exclusively for discerning families and international investors.`,
    highlights: [
      "Uninterrupted 180° Arabian Sea panoramic views",
      "Private Butler & White-Glove 24/7 Concierge Service",
      "Private plunge pool and expansive sea deck in every suite",
      "Direct access to Mumbai Coastal Road and Bandra-Worli Sea Link",
      "Full Occupancy Certificate (OC) with zero GST on purchase"
    ],
    amenities: [
      { name: "Private Sky Plunge Pools", category: "Luxury", icon: "Waves" },
      { name: "Helipad Access", category: "Exclusive", icon: "Sparkles" },
      { name: "Temperature Controlled Cellar", category: "Dining", icon: "Building2" },
      { name: "Cigar Lounge & Private Club", category: "Lifestyle", icon: "Building2" },
      { name: "24/7 Diplomatic Security Guard", category: "Security", icon: "ShieldCheck" }
    ],
    floorPlans: generateFloorPlans("3 BHK, 4 BHK", "8.50 Cr", "2,400 - 5,600 sq.ft"),
    landmarks: [
      { name: "Worli Sea Face Promenade", distance: "0.1 km", time: "Direct Access", type: "Nature" },
      { name: "Coastal Road Interchange", distance: "0.8 km", time: "2 mins", type: "Transit" },
      { name: "Bandra-Worli Sea Link", distance: "1.2 km", time: "3 mins", type: "Transit" },
      { name: "Four Seasons Hotel Mumbai", distance: "2.4 km", time: "6 mins", type: "Dining" },
      { name: "Palladium & High Street Phoenix", distance: "3.5 km", time: "8 mins", type: "Retail" }
    ],
    developerInfo: {
      name: "AuraLiving Signature",
      slug: "godrej-properties",
      logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
      experience: "Flagship Luxury",
      projectsCount: "10+ Signature Estates",
      established: "2018",
      description: "AuraLiving Signature curates ultra-prime residences, private penthouses, and waterfront trophies."
    },
    relatedProjectSlugs: ["godrej-sky-terraces", "lt-island-cove", "dlf-the-arbour", "lodha-altamount"]
  }
];

// Master Slug Mapping for known IDs
const ID_TO_SLUG_MAP = {
  "godrej-ascend": "godrej-ascend",
  "lodha-corinthia": "lodha-corinthia",
  "mahindra-marina-64": "mahindra-marina-64",
  "proj-1": "godrej-eternal-palms",
  "proj-2": "lt-island-cove",
  "proj-3": "lt-elixir-reserve",
  "proj-4": "tata-orbis",
  "proj-5": "kanakia-valley",
  "proj-6": "lt-vayam",
  "proj-7": "prestige-falcon-city",
  "proj-8": "godrej-woodsville",
  "proj-9": "dlf-the-arbour",
  "mum-1": "godrej-eternal-palms",
  "mum-2": "lt-island-cove",
  "mum-3": "lt-elixir-reserve",
  "pune-1": "godrej-woodsville",
  "blr-1": "prestige-falcon-city",
  "ex-1": "aura-signature-waterfront",
  "ex-2": "aura-palms-golf-estate",
  "ex-3": "aura-grand-downtown-dubai"
};

// Generates a canonical, URL-safe slug from any project object
export function getProjectSlug(project) {
  if (!project) return "godrej-eternal-palms";

  if (project.slug && project.slug.trim()) {
    return project.slug.trim().toLowerCase();
  }

  if (project.id && ID_TO_SLUG_MAP[project.id]) {
    return ID_TO_SLUG_MAP[project.id];
  }

  const name = project.title || project.name || "";
  if (!name) return project.id ? String(project.id).toLowerCase() : "godrej-eternal-palms";

  const generatedSlug = name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return generatedSlug || "godrej-eternal-palms";
}

// Deep lookup to find any project by slug across all datasets
export function getProjectBySlug(rawSlug) {
  if (!rawSlug) return null;
  const cleanSlug = String(rawSlug).toLowerCase().trim();

  // 1. Direct match in CANONICAL_PROJECTS
  const canonicalMatch = CANONICAL_PROJECTS.find(
    (p) => p.slug === cleanSlug || p.id === cleanSlug
  );
  if (canonicalMatch) {
    return canonicalMatch;
  }

  // 2. Search in DEVELOPERS_DATA
  for (const dev of DEVELOPERS_DATA) {
    for (const city of dev.cities || []) {
      for (const p of city.projects || []) {
        const itemSlug = p.slug || getProjectSlug(p);
        if (
          itemSlug === cleanSlug ||
          p.id === cleanSlug ||
          (p.title && p.title.toLowerCase().replace(/[^a-z0-9]/g, "-") === cleanSlug)
        ) {
          return {
            id: p.id || itemSlug,
            slug: itemSlug,
            title: p.title,
            name: p.title,
            builder: p.builder || dev.name,
            developerSlug: dev.slug,
            city: p.city || city.citySlug || "mumbai",
            cityName: city.name || "Mumbai",
            location: p.location,
            price: p.price,
            priceNumeric: p.priceNumeric || 15000000,
            avgPrice: p.avgPrice,
            flatTypes: p.flatTypes,
            carpetArea: p.carpetArea,
            possession: p.possession || "Under Construction",
            rera: p.rera,
            status: p.status,
            tag: p.tag || "Verified",
            rating: p.rating || 4.8,
            reviewsCount: 120,
            images: p.images || [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ],
            overview: `${p.title} is an exceptional residential development crafted by ${p.builder || dev.name} in ${p.location}. Designed to offer an elevated lifestyle, this project features contemporary architecture, premium fittings, and comprehensive security infrastructure. Residents enjoy seamless connectivity to key commercial hubs, renowned educational institutes, and healthcare facilities.`,
            highlights: [
              `Prime address in ${p.location}`,
              `Developed by ${p.builder || dev.name}`,
              "Verified RERA documentation and direct builder pricing",
              "Comprehensive lifestyle amenities and 24/7 security",
              "Zero brokerage advisory from AuraLiving specialists"
            ],
            amenities: (p.features || ["Clubhouse", "Swimming Pool", "Landscaped Gardens", "EV Charging", "Gymnasium"]).map((f, i) => ({
              name: f,
              category: "Lifestyle",
              icon: i % 2 === 0 ? "Building2" : "Sparkles"
            })),
            floorPlans: generateFloorPlans(p.flatTypes || "2 & 3 BHK", p.price || "1.5 Cr", p.carpetArea || "750 - 1,200 sq.ft"),
            landmarks: [
              { name: "Transit Hub", distance: "1.2 km", time: "5 mins", type: "Transit" },
              { name: "Major Expressway / Arterial Road", distance: "2.0 km", time: "6 mins", type: "Road" },
              { name: "Leading Super-Speciality Hospital", distance: "3.5 km", time: "10 mins", type: "Healthcare" },
              { name: "Reputed International School", distance: "2.5 km", time: "8 mins", type: "Education" },
              { name: "Prominent Commercial Business District", distance: "6.0 km", time: "15 mins", type: "Work" }
            ],
            developerInfo: {
              name: dev.name,
              slug: dev.slug,
              logo: dev.logo,
              experience: dev.experience,
              projectsCount: dev.projectCount,
              established: dev.established,
              description: dev.aboutUs
            },
            relatedProjectSlugs: ["godrej-eternal-palms", "godrej-ascend", "lt-island-cove"]
          };
        }
      }
    }
  }

  // 3. Search in GLOBAL_PROJECTS
  const foundInGlobal = GLOBAL_PROJECTS.find((p) => {
    const slugGen = getProjectSlug(p);
    return slugGen === cleanSlug || p.id === cleanSlug || (p.name && p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === cleanSlug);
  });

  if (foundInGlobal) {
    const pSlug = getProjectSlug(foundInGlobal);
    const builderDev = DEVELOPERS_DATA.find((d) => d.name.toLowerCase() === foundInGlobal.builder.toLowerCase());

    return {
      id: foundInGlobal.id,
      slug: pSlug,
      title: foundInGlobal.name,
      name: foundInGlobal.name,
      builder: foundInGlobal.builder,
      developerSlug: builderDev ? builderDev.slug : "godrej-properties",
      city: foundInGlobal.city,
      cityName: foundInGlobal.city.charAt(0).toUpperCase() + foundInGlobal.city.slice(1),
      location: foundInGlobal.location,
      price: foundInGlobal.price,
      priceNumeric: foundInGlobal.priceNumeric,
      avgPrice: foundInGlobal.avgPrice,
      flatTypes: foundInGlobal.flatTypes,
      carpetArea: foundInGlobal.carpetArea,
      possession: foundInGlobal.status === "Ready to Move" ? "Ready to Move" : "December 2026",
      rera: foundInGlobal.rera,
      status: foundInGlobal.status,
      tag: foundInGlobal.tag,
      rating: foundInGlobal.rating,
      reviewsCount: 105,
      images: foundInGlobal.images,
      overview: `${foundInGlobal.name} is a premier residential enclave located in ${foundInGlobal.location}. Offering spacious ${foundInGlobal.flatTypes} apartments, it is crafted with contemporary architectural aesthetics and sustainable living features. Enjoy direct builder allocation with zero brokerage through AuraLiving.`,
      highlights: [
        `Prime locality: ${foundInGlobal.location}`,
        `Crafted by Grade-A builder ${foundInGlobal.builder}`,
        `Direct inventory with RERA ID: ${foundInGlobal.rera}`,
        "High rental yield and capital appreciation corridor",
        "Over 30 lifestyle amenities and integrated clubhouse"
      ],
      amenities: (foundInGlobal.features || ["Clubhouse", "Swimming Pool", "Green Walkway", "EV Charging"]).map((f) => ({
        name: f,
        category: "Lifestyle",
        icon: "Sparkles"
      })),
      floorPlans: generateFloorPlans(foundInGlobal.flatTypes, foundInGlobal.price, foundInGlobal.carpetArea),
      landmarks: [
        { name: "Metro / Railway Hub", distance: "1.0 km", time: "4 mins", type: "Transit" },
        { name: "Expressway Connector", distance: "2.4 km", time: "7 mins", type: "Transit" },
        { name: "Super-Speciality Hospital", distance: "3.0 km", time: "8 mins", type: "Healthcare" },
        { name: "International School", distance: "1.8 km", time: "5 mins", type: "Education" }
      ],
      developerInfo: builderDev ? {
        name: builderDev.name,
        slug: builderDev.slug,
        logo: builderDev.logo,
        experience: builderDev.experience,
        projectsCount: builderDev.projectCount,
        established: builderDev.established,
        description: builderDev.aboutUs
      } : {
        name: foundInGlobal.builder,
        slug: "godrej-properties",
        logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
        experience: "30+ Years",
        projectsCount: "100+ Projects",
        established: "1990",
        description: `${foundInGlobal.builder} is known for landmark residential developments across major Indian metros.`
      },
      relatedProjectSlugs: ["godrej-eternal-palms", "lt-island-cove", "dlf-the-arbour"]
    };
  }

  // 4. Search in EXCLUSIVE_PROJECTS
  const foundInEx = EXCLUSIVE_PROJECTS.find((p) => {
    const slugGen = getProjectSlug(p);
    return slugGen === cleanSlug || p.id === cleanSlug;
  });

  if (foundInEx) {
    const pSlug = getProjectSlug(foundInEx);
    return {
      id: foundInEx.id,
      slug: pSlug,
      title: foundInEx.name,
      name: foundInEx.name,
      builder: foundInEx.builder,
      developerSlug: "godrej-properties",
      city: foundInEx.city.toLowerCase(),
      cityName: foundInEx.city,
      location: foundInEx.location,
      price: foundInEx.priceRange,
      priceNumeric: 50000000,
      avgPrice: "₹45.00 K / sq.ft",
      flatTypes: foundInEx.configuration,
      carpetArea: "2,000 - 4,500 sq.ft",
      possession: "Ready to Move",
      rera: "P51900098765",
      status: "Ready to Move",
      tag: foundInEx.badge,
      rating: 5.0,
      reviewsCount: 50,
      images: [foundInEx.image, "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
      overview: foundInEx.description,
      highlights: [
        "Exclusive Ultra-Luxury Edition",
        "Panoramic Vistas and Private Butler Service",
        "Direct Builder Allotment with Zero Brokerage"
      ],
      amenities: [
        { name: "Private Plunge Pool", category: "Wellness", icon: "Waves" },
        { name: "Concierge & Valet", category: "Service", icon: "ShieldCheck" },
        { name: "Skyline Lounge", category: "Luxury", icon: "Sparkles" }
      ],
      floorPlans: generateFloorPlans(foundInEx.configuration, "5.0 Cr", "2,000 - 4,500 sq.ft"),
      landmarks: [
        { name: "City CBD", distance: "2.0 km", time: "6 mins", type: "Commercial" },
        { name: "Airport Corridor", distance: "8.0 km", time: "18 mins", type: "Airport" }
      ],
      developerInfo: {
        name: foundInEx.builder,
        slug: "godrej-properties",
        logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
        experience: "35 Years",
        projectsCount: "100+ Projects",
        established: "1988",
        description: "Curators of premier luxury real estate and iconic residential towers."
      },
      relatedProjectSlugs: ["aura-signature-waterfront", "dlf-the-arbour", "godrej-eternal-palms"]
    };
  }

  // Not found in any registered catalog -> return null for clean 404 state
  return null;
}

// Get all project slugs for static paths or sitemaps
export function getAllProjectSlugs() {
  const slugs = new Set();
  CANONICAL_PROJECTS.forEach((p) => slugs.add(p.slug));
  GLOBAL_PROJECTS.forEach((p) => slugs.add(getProjectSlug(p)));
  DEVELOPERS_DATA.forEach((d) => {
    (d.cities || []).forEach((c) => {
      (c.projects || []).forEach((p) => slugs.add(p.slug || getProjectSlug(p)));
    });
  });
  return Array.from(slugs);
}
