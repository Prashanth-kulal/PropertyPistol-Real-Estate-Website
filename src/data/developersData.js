// AuraLiving Centralized Developer & Project Mock Data Store
// Curated mock dataset following PropertyPistol's developer information hierarchy
// Uses AuraLiving's design principles and local sample assets

import { MUMBAI_REGISTRY_PROJECTS } from "./mumbaiProjectsRegistry.js";
import { DELHI_REGISTRY_PROJECTS } from "./delhiProjectsRegistry.js";
import { GOA_REGISTRY_PROJECTS } from "./goaProjectsRegistry.js";
import { COIMBATORE_REGISTRY_PROJECTS } from "./coimbatoreProjectsRegistry.js";
import { NAGPUR_REGISTRY_PROJECTS } from "./nagpurProjectsRegistry.js";
import { THRISSUR_REGISTRY_PROJECTS } from "./thrissurProjectsRegistry.js";
import { TRIVANDRUM_REGISTRY_PROJECTS } from "./trivandrumProjectsRegistry.js";
import { CALICUT_REGISTRY_PROJECTS } from "./calicutProjectsRegistry.js";
import { BANGALORE_REGISTRY_PROJECTS } from "./bangaloreProjectsRegistry.js";

export const DEVELOPERS_DATA = [
  {
    id: "godrej",
    slug: "godrej-properties",
    name: "Godrej Properties",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/007/medium/godrej.jpg?1578047383",
    tagline: "Sustainable Luxury, Innovation & Contemporary Living",
    experience: "34 Years",
    projectCount: "140+ Projects",
    established: "1990",
    aboutUs: "Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry. Each development combines a 127-year legacy of excellence and trust with cutting-edge design and technology.",
    description: "Godrej Group ventured into real estate development in 1990 as Godrej Properties Ltd. Since then, they have become renowned for their craftsmanship in developing contemporary housing projects covering commercial, infrastructural, and residential spaces. With over 250 awards and recognitions, the company continues to deliver world-class spaces to customers nationwide.\n\nThey have collaborated with world-renowned architects, structural engineers, and landscape designers to construct residential complexes and mixed-use developments of international standards. Landmark initiatives include the CII-Godrej Green Building Center in Hyderabad (first LEED Platinum building in India) and The Trees in Vikhroli, Mumbai, which stands as a benchmark for sustainable urban regeneration across India.",
    stats: [
      { label: "Experience", value: "34+ Years" },
      { label: "Total Projects", value: "140+" },
      { label: "Presence", value: "12 Cities" },
      { label: "Area Delivered", value: "38M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Godrej Ascend",
        location: "Dhokali, Thane",
        price: "₹1.07 Cr*",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        slug: "godrej-ascend"
      },
      {
        title: "Godrej Sky Terraces",
        location: "Chembur, Central Mumbai",
        price: "₹6.68 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "godrej-sky-terraces"
      },
      {
        title: "Godrej Bayview",
        location: "Vashi, Navi Mumbai",
        price: "₹3.08 Cr*",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        slug: "godrej-bayview"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 3,
        upcomingCount: 2,
        projects: [
          {
            id: "godrej-ascend",
            slug: "godrej-ascend",
            title: "Godrej Ascend",
            builder: "Godrej Properties",
            city: "mumbai",
            location: "Dhokali, Thane, Mumbai",
            status: "Ongoing",
            price: "1.07 Cr onwards",
            priceNumeric: 10700000,
            avgPrice: "₹28.08 K / sq.ft",
            flatTypes: "1, 2 & 3 BHK",
            carpetArea: "381 - 1,058 sq.ft",
            rera: "P51700034608",
            rating: 4.8,
            tag: "Trending",
            images: [
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Clubhouse", "Infinity Swimming Pool", "Landscaped Sky Deck", "EV Charging Station", "Jogging Track"]
          },
          {
            id: "godrej-sky-terraces",
            slug: "godrej-sky-terraces",
            title: "Godrej Sky Terraces",
            builder: "Godrej Properties",
            city: "mumbai",
            location: "Chembur, Central Mumbai",
            status: "Ongoing",
            price: "6.68 Cr onwards",
            priceNumeric: 66800000,
            avgPrice: "₹42.50 K / sq.ft",
            flatTypes: "3 & 4 BHK",
            carpetArea: "1,335 - 1,928 sq.ft",
            rera: "P51800053882",
            rating: 4.9,
            tag: "Ultra Luxury",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Private Elevator Access", "Panoramic Skyline Views", "Temperature-Controlled Pool", "Private Wine Cellar"]
          },
          {
            id: "godrej-bayview",
            slug: "godrej-bayview",
            title: "Godrej Bayview",
            builder: "Godrej Properties",
            city: "mumbai",
            location: "Vashi, Navi Mumbai",
            status: "Ongoing",
            price: "3.08 Cr onwards",
            priceNumeric: 30800000,
            avgPrice: "₹34.20 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "750 - 1,100 sq.ft",
            rera: "P51700031726",
            rating: 4.7,
            tag: "Sea View",
            images: [
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Unobstructed Creek Views", "Rooftop Observatory", "Children's Creche", "Multipurpose Banquet Hall"]
          },
          {
            id: "godrej-bliss",
            slug: "godrej-bliss",
            title: "Godrej Bliss",
            builder: "Godrej Properties",
            city: "mumbai",
            location: "Kandivali East, Mumbai",
            status: "Upcoming",
            price: "1.85 Cr onwards",
            priceNumeric: 18500000,
            avgPrice: "₹26.40 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "680 - 990 sq.ft",
            rera: "P51800051234",
            rating: 4.8,
            tag: "New Launch",
            images: [
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Over 40 Lifestyle Amenities", "Bio-Diversity Park", "Tennis Court", "Senior Citizen Corner"]
          },
          {
            id: "godrej-horizon",
            slug: "godrej-horizon",
            title: "Godrej Horizon",
            builder: "Godrej Properties",
            city: "mumbai",
            location: "Wadala, South Central Mumbai",
            status: "Upcoming",
            price: "2.95 Cr onwards",
            priceNumeric: 29500000,
            avgPrice: "₹38.10 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "720 - 1,220 sq.ft",
            rera: "P51900034857",
            rating: 4.9,
            tag: "Pre-Launch",
            images: [
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Eastern Freeway Connectivity", "Sky Walk & Jogging Loop", "Olympic Sized Lap Pool"]
          }
        ]
      },
      {
        name: "Pune",
        citySlug: "pune",
        ongoingCount: 2,
        upcomingCount: 1,
        projects: [
          {
            id: "godrej-woodsville",
            slug: "godrej-woodsville",
            title: "Godrej Woodsville",
            builder: "Godrej Properties",
            city: "pune",
            location: "Hinjewadi Phase 1, Pune",
            status: "Ongoing",
            price: "85.0 Lacs onwards",
            priceNumeric: 8500000,
            avgPrice: "₹12.20 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "690 - 1,020 sq.ft",
            rera: "P52100046729",
            rating: 4.7,
            tag: "IT Hub",
            images: [
              "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Close to IT Parks", "Grand Clubhouse", "Kids Play Area", "Cricket Pitch"]
          },
          {
            id: "godrej-reverside",
            slug: "godrej-reverside",
            title: "Godrej Rivergreens",
            builder: "Godrej Properties",
            city: "pune",
            location: "Manjari Khurd, Pune",
            status: "Ongoing",
            price: "68.0 Lacs onwards",
            priceNumeric: 6800000,
            avgPrice: "₹9.80 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "580 - 950 sq.ft",
            rera: "P52100022478",
            rating: 4.6,
            tag: "Township",
            images: [
              "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Riverside Promenade", "Botanical Garden", "Amphitheatre"]
          }
        ]
      }
    ]
  },
  {
    id: "lodha",
    slug: "lodha-group",
    name: "Lodha Group",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/006/medium/lodha_group_1.png?1707830644",
    tagline: "Building a Better Life Through World-Class Architecture",
    experience: "44 Years",
    projectCount: "210+ Projects",
    established: "1980",
    aboutUs: "Established in 1980, Lodha Group (Macrotech Developers) is among India's foremost real estate developers. Renowned for constructing some of the country's most iconic residences, towers, and planned townships.",
    description: "Lodha Group is one of the prominent names in luxury and residential real estate development across Mumbai, Pune, Hyderabad, and London. The group made national headlines by acquiring land for India's prestigious World Towers and Palava City—India's first smart city developed privately.\n\nOver the past 44 years, the group has developed more than 85 million square feet of prime real estate and has over 40 ongoing projects. From luxury residences like Lodha Altamount on Billionaires' Row to integrated suburban townships, Lodha delivers world-class design, rigorous construction standards, and unmatched hospitality services.",
    stats: [
      { label: "Experience", value: "44+ Years" },
      { label: "Total Projects", value: "210+" },
      { label: "Families Housed", value: "65,000+" },
      { label: "Area Delivered", value: "85M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Lodha Divino",
        location: "Matunga East, Mumbai",
        price: "₹3.83 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "lodha-divino"
      },
      {
        title: "Lodha Crown Kolshet",
        location: "Kolshet Road, Thane",
        price: "₹65 Lacs*",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        slug: "lodha-crown-kolshet"
      },
      {
        title: "Lodha Corinthia",
        location: "LBS Marg, Powai",
        price: "₹2.90 Cr*",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        slug: "lodha-corinthia"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 3,
        upcomingCount: 2,
        projects: [
          {
            id: "lodha-divino",
            slug: "lodha-divino",
            title: "Lodha Divino",
            builder: "Lodha Group",
            city: "mumbai",
            location: "Matunga East, Central Mumbai",
            status: "Ongoing",
            price: "3.83 Cr onwards",
            priceNumeric: 38300000,
            avgPrice: "₹44.20 K / sq.ft",
            flatTypes: "2, 3 & 4 BHK",
            carpetArea: "820 - 1,650 sq.ft",
            rera: "P51900049582",
            rating: 4.9,
            tag: "Luxury",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Saint Amand Concierge", "Grand Clubhouse", "Rooftop Lounge", "Private Dining Room"]
          },
          {
            id: "lodha-crown-kolshet",
            slug: "lodha-crown-kolshet",
            title: "Lodha Crown Kolshet",
            builder: "Lodha Group",
            city: "mumbai",
            location: "Kolshet Road, Thane West",
            status: "Ongoing",
            price: "65.04 Lacs onwards",
            priceNumeric: 6504000,
            avgPrice: "₹18.50 K / sq.ft",
            flatTypes: "1 & 2 BHK",
            carpetArea: "320 - 540 sq.ft",
            rera: "P51700024783",
            rating: 4.7,
            tag: "Value Luxury",
            images: [
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Ganesh Temple", "Retail Boulevard", "Gymnasium", "Kids Play Area"]
          },
          {
            id: "lodha-corinthia",
            slug: "lodha-corinthia",
            title: "Lodha Corinthia",
            builder: "Lodha Group",
            city: "mumbai",
            location: "LBS Marg, Powai, Mumbai",
            status: "Ongoing",
            price: "2.90 Cr onwards",
            priceNumeric: 29000000,
            avgPrice: "₹32.80 K / sq.ft",
            flatTypes: "3 BHK Luxury",
            carpetArea: "980 - 1,420 sq.ft",
            rera: "P51800052981",
            rating: 4.9,
            tag: "Art Deco",
            images: [
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Art Deco Architecture", "Vihar Lake Views", "Forest Trail", "Heated Swimming Pool"]
          },
          {
            id: "lodha-codename-premier",
            slug: "lodha-codename-premier",
            title: "Lodha Codename Premier",
            builder: "Lodha Group",
            city: "mumbai",
            location: "Dombivali East, Beyond Thane",
            status: "Upcoming",
            price: "57.0 Lacs onwards",
            priceNumeric: 5700000,
            avgPrice: "₹11.20 K / sq.ft",
            flatTypes: "1 & 2 BHK",
            carpetArea: "350 - 580 sq.ft",
            rera: "P51700032145",
            rating: 4.6,
            tag: "Smart Home",
            images: [
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["High-Street Retail", "Central Park", "Clubhouse with Cafe"]
          }
        ]
      }
    ]
  },
  {
    id: "lnt",
    slug: "lt-realty",
    name: "L&T Realty",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/014/medium/lnt.jpg?1578047360",
    tagline: "Engineering Precision Meets Contemporary Living",
    experience: "22 Years",
    projectCount: "85+ Projects",
    established: "2011",
    aboutUs: "L&T Realty is the residential and commercial real estate development arm of Larsen & Toubro, India's multi-billion engineering and infrastructure conglomerate.",
    description: "Backed by over 75 years of Larsen & Toubro's engineering pedigree, L&T Realty has set new benchmarks in residential and commercial developments. Operating in major metropolitan hubs like Mumbai, Bangalore, and Chennai, the company has delivered landmark Transit Oriented Developments (such as Seawoods Grand Central) and iconic gated residential communities.\n\nEvery project is characterized by uncompromised structural integrity, sustainable architecture, smart home provisions, and transparent customer-centric practices.",
    stats: [
      { label: "Experience", value: "22+ Years" },
      { label: "Total Projects", value: "85+" },
      { label: "Under Development", value: "35M+ sq.ft" },
      { label: "Customer Trust", value: "99.4%" }
    ],
    featuredProjects: [
      {
        title: "L&T Island Cove",
        location: "Mahim West, Mumbai",
        price: "₹3.15 Cr*",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        slug: "lt-island-cove"
      },
      {
        title: "L&T Elixir Reserve",
        location: "Powai, Mumbai",
        price: "₹2.61 Cr*",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
        slug: "lt-elixir-reserve"
      },
      {
        title: "L&T The Gateway",
        location: "Sewri, South Mumbai",
        price: "₹4.50 Cr*",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
        slug: "lt-the-gateway"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 3,
        upcomingCount: 1,
        projects: [
          {
            id: "lt-island-cove",
            slug: "lt-island-cove",
            title: "L&T Island Cove",
            builder: "L&T Realty",
            city: "mumbai",
            location: "Mahim West, Mumbai",
            status: "Ongoing",
            price: "3.15 Cr onwards",
            priceNumeric: 31500000,
            avgPrice: "₹46.38 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "680 - 1,394 sq.ft",
            rera: "P51900052341",
            rating: 4.9,
            tag: "Sealink Views",
            images: [
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Bandra-Worli Sealink View", "Sky Lounge", "Smart Home Automation", "Infinity Pool"]
          },
          {
            id: "lt-elixir-reserve",
            slug: "lt-elixir-reserve",
            title: "L&T Elixir Reserve",
            builder: "L&T Realty",
            city: "mumbai",
            location: "Powai, Central Mumbai",
            status: "Ongoing",
            price: "2.61 Cr onwards",
            priceNumeric: 26100000,
            avgPrice: "₹36.60 K / sq.ft",
            flatTypes: "2, 3 & 4 BHK",
            carpetArea: "713 - 2,200 sq.ft",
            rera: "P51800034102",
            rating: 4.8,
            tag: "Lake Views",
            images: [
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Forest Reserve Border", "Powai Lake View", "Squash Courts", "Meditation Pavilions"]
          },
          {
            id: "lt-the-gateway",
            slug: "lt-the-gateway",
            title: "L&T The Gateway",
            builder: "L&T Realty",
            city: "mumbai",
            location: "Sewri, South Mumbai",
            status: "Ongoing",
            price: "4.50 Cr onwards",
            priceNumeric: 45000000,
            avgPrice: "₹48.90 K / sq.ft",
            flatTypes: "3 & 4 BHK",
            carpetArea: "1,100 - 1,850 sq.ft",
            rera: "P51900054992",
            rating: 4.9,
            tag: "MTHL Connect",
            images: [
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Arabian Sea Panorama", "Sewri Mudflats View", "MTHL Atal Setu Linkage"]
          }
        ]
      }
    ]
  },
  {
    id: "prestige",
    slug: "prestige-group",
    name: "Prestige Group",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/001/443/original/prestige.jpg?1578047506",
    tagline: "Add Prestige to Your Life",
    experience: "36 Years",
    projectCount: "250+ Projects",
    established: "1986",
    aboutUs: "Prestige Group is one of India's leading and most successful real estate developers with a solid track record across residential, commercial, retail, leisure, and hospitality sectors.",
    description: "Since 1986, Prestige Group has shaped the skylines of major Indian metropolises including Bangalore, Mumbai, Hyderabad, Chennai, and Kochi. Having developed over 250 projects spanning more than 150 million square feet, Prestige is synonymous with visionary master plans, lavish landscaping, and timely delivery.",
    stats: [
      { label: "Experience", value: "36+ Years" },
      { label: "Total Projects", value: "250+" },
      { label: "Delivered Space", value: "150M+ sq.ft" },
      { label: "Satisfied Owners", value: "50,000+" }
    ],
    featuredProjects: [
      {
        title: "The Prestige City",
        location: "Mulund West, Mumbai",
        price: "₹1.91 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "the-prestige-city"
      },
      {
        title: "Prestige Jasdan Classic",
        location: "Byculla, South Mumbai",
        price: "₹4.20 Cr*",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        slug: "prestige-jasdan-classic"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 2,
        upcomingCount: 1,
        projects: [
          {
            id: "the-prestige-city",
            slug: "the-prestige-city",
            title: "The Prestige City",
            builder: "Prestige Group",
            city: "mumbai",
            location: "Mulund West, Central Suburbs, Mumbai",
            status: "Ongoing",
            price: "1.91 Cr onwards",
            priceNumeric: 19100000,
            avgPrice: "₹28.01 K / sq.ft",
            flatTypes: "2, 3 & 4 BHK",
            carpetArea: "682 - 1,083 sq.ft",
            rera: "P51800030145",
            rating: 4.8,
            tag: "Hillside View",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Yogi Hills Backdrop", "Integrated Township", "Olympic Swimming Pool", "Clubhouse"]
          },
          {
            id: "prestige-jasdan-classic",
            slug: "prestige-jasdan-classic",
            title: "Prestige Jasdan Classic",
            builder: "Prestige Group",
            city: "mumbai",
            location: "Byculla West, South Mumbai",
            status: "Ongoing",
            price: "4.20 Cr onwards",
            priceNumeric: 42000000,
            avgPrice: "₹45.60 K / sq.ft",
            flatTypes: "3 & 4 BHK",
            carpetArea: "1,240 - 2,300 sq.ft",
            rera: "P51900031288",
            rating: 4.9,
            tag: "Ultra Luxury",
            images: [
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Mahalaxmi Racecourse Views", "Private Sky Lounge", "Automated Parking"]
          }
        ]
      }
    ]
  },
  {
    id: "hiranandani",
    slug: "hiranandani-group",
    name: "House of Hiranandani",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/013/medium/Hiranandani1.jpg?1707727954",
    tagline: "Transforming Skylines Through Neo-Classical Mastery",
    experience: "40 Years",
    projectCount: "90+ Projects",
    established: "1978",
    aboutUs: "Hiranandani has become a household name synonymous with neo-classical architectural grandeur, integrated master-planned communities, and lush green urban environments.",
    description: "For over 4 decades, House of Hiranandani has pioneered self-sustaining holistic townships in Powai and Thane. Integrating classical Greek and Roman aesthetics with contemporary civic amenities, educational institutions, retail centers, and IT parks, the group has set an enduring benchmark for luxury community living in India.",
    stats: [
      { label: "Experience", value: "40+ Years" },
      { label: "Total Projects", value: "90+" },
      { label: "Townships", value: "5 Mega Townships" },
      { label: "Delivered", value: "42M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Hiranandani Empress Hill",
        location: "Powai, Mumbai",
        price: "₹3.40 Cr*",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
        slug: "hiranandani-empress-hill"
      },
      {
        title: "Hiranandani Castle Rock",
        location: "Hiranandani Gardens, Powai",
        price: "₹2.75 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "hiranandani-castle-rock"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 2,
        upcomingCount: 1,
        projects: [
          {
            id: "hiranandani-empress-hill",
            slug: "hiranandani-empress-hill",
            title: "Hiranandani Empress Hill",
            builder: "House of Hiranandani",
            city: "mumbai",
            location: "Powai, Central Mumbai",
            status: "Ongoing",
            price: "3.40 Cr onwards",
            priceNumeric: 34000000,
            avgPrice: "₹39.20 K / sq.ft",
            flatTypes: "3 & 4 BHK",
            carpetArea: "1,050 - 1,750 sq.ft",
            rera: "P51800047219",
            rating: 4.8,
            tag: "Neo-Classical",
            images: [
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Neo-Classical Facade", "Powai Lake Vista", "Clubhouse with Spa", "Tennis Court"]
          },
          {
            id: "hiranandani-castle-rock",
            slug: "hiranandani-castle-rock",
            title: "Hiranandani Castle Rock",
            builder: "House of Hiranandani",
            city: "mumbai",
            location: "Hiranandani Gardens, Powai, Mumbai",
            status: "Ongoing",
            price: "2.75 Cr onwards",
            priceNumeric: 27500000,
            avgPrice: "₹36.50 K / sq.ft",
            flatTypes: "2 BHK",
            carpetArea: "629 - 750 sq.ft",
            rera: "P51800001414",
            rating: 4.8,
            tag: "Ready To Fitout",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Walking Distance to Galleria", "International School Nearby", "Gymnasium"]
          }
        ]
      }
    ]
  },
  {
    id: "shapoorji",
    slug: "shapoorji-pallonji",
    name: "Shapoorji Pallonji",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/008/medium/Shapoorji-Pallonji-Logo.jpg?1707728753",
    tagline: "A 158-Year Legacy of Architectural Landmarks",
    experience: "158 Years",
    projectCount: "120+ Projects",
    established: "1865",
    aboutUs: "Shapoorji Pallonji Real Estate is the property development arm of the historic Shapoorji Pallonji Group, builders of national monuments, iconic skyscrapers, and modern residential hubs.",
    description: "Bridging the earliest celebrated structures of India with contemporary architecture, Shapoorji Pallonji has engineered iconic monuments including Mumbai's RBI Building, the Palace of the Sultan of Oman, and The Imperial twin towers. In residential real estate, the company creates sustainable, thoughtfully designed communities emphasizing long-term structural resilience and customer well-being.",
    stats: [
      { label: "Legacy", value: "158+ Years" },
      { label: "Total Projects", value: "120+" },
      { label: "Global Reach", value: "40+ Countries" },
      { label: "Happy Families", value: "35,000+" }
    ],
    featuredProjects: [
      {
        title: "Shapoorji BKC 28",
        location: "Bandra East, Mumbai",
        price: "₹2.25 Cr*",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        slug: "shapoorji-bkc-28"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 1,
        upcomingCount: 1,
        projects: [
          {
            id: "shapoorji-bkc-28",
            slug: "shapoorji-bkc-28",
            title: "Shapoorji BKC 28",
            builder: "Shapoorji Pallonji",
            city: "mumbai",
            location: "Bandra East, Mumbai",
            status: "Ongoing",
            price: "2.25 Cr onwards",
            priceNumeric: 22500000,
            avgPrice: "₹41.00 K / sq.ft",
            flatTypes: "2 BHK",
            carpetArea: "550 - 720 sq.ft",
            rera: "P51800031852",
            rating: 4.8,
            tag: "BKC Adjacent",
            images: [
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Minutes from BKC Financial Hub", "Rooftop Sky Garden", "Automated Tower Parking"]
          }
        ]
      }
    ]
  },
  {
    id: "sobha",
    slug: "sobha-limited",
    name: "Sobha Limited",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/002/242/medium/logo.jpg?1635151726",
    tagline: "Passion at Work • Backward Integrated Quality",
    experience: "29 Years",
    projectCount: "160+ Projects",
    established: "1995",
    aboutUs: "Sobha Limited epitomizes 'Passion at Work'. Known as India's only backward-integrated real estate company with in-house architectural, engineering, and manufacturing mastery.",
    description: "Founded by PNC Menon in 1995, Sobha has delivered over 120 million sq.ft. of residential and contractual projects. With internal German-standard manufacturing units for woodwork, glazing, metal works, and precast concrete, Sobha guarantees immaculate precision and timely delivery across India and the Middle East.",
    stats: [
      { label: "Experience", value: "29+ Years" },
      { label: "Total Projects", value: "160+" },
      { label: "Quality Rating", value: "ISO 9001" },
      { label: "Delivered", value: "120M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Sobha Insignia",
        location: "Bellandur, Bangalore",
        price: "₹2.45 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "sobha-insignia"
      }
    ],
    cities: [
      {
        name: "Bangalore",
        citySlug: "bangalore",
        ongoingCount: 1,
        upcomingCount: 1,
        projects: [
          {
            id: "sobha-insignia",
            slug: "sobha-insignia",
            title: "Sobha Insignia",
            builder: "Sobha Limited",
            city: "bangalore",
            location: "Bellandur, Outer Ring Road, Bangalore",
            status: "Ongoing",
            price: "2.45 Cr onwards",
            priceNumeric: 24500000,
            avgPrice: "₹16.80 K / sq.ft",
            flatTypes: "3 & 4 BHK",
            carpetArea: "1,450 - 2,200 sq.ft",
            rera: "PRM/KA/RERA/1251/310/PR/210319/004021",
            rating: 4.9,
            tag: "Ultra Luxury",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["German Hardware Fixtures", "Bespoke Clubhouse", "Temperature Regulated Pool"]
          }
        ]
      }
    ]
  },
  {
    id: "brigade",
    slug: "brigade-group",
    name: "Brigade Group",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/002/302/medium/bg-logo-hz.png?1636353513",
    tagline: "Creating Positive Experiences Across South India",
    experience: "37 Years",
    projectCount: "180+ Projects",
    established: "1986",
    aboutUs: "Headquartered in Bangalore, Brigade Group is one of South India's premier property developers with a multi-domain presence spanning residential, commercial, retail, and hospitality.",
    description: "Since 1986, Brigade Group has transformed South Indian urban landscapes with integrated enclaves, Grade-A IT parks (including the World Trade Center Bangalore and Kochi), and luxurious residential towers. The company is renowned for customer trust, structural resilience, and community-focused developments.",
    stats: [
      { label: "Experience", value: "37+ Years" },
      { label: "Total Projects", value: "180+" },
      { label: "Delivered", value: "80M+ sq.ft" },
      { label: "WTC Licenses", value: "5 Cities" }
    ],
    featuredProjects: [
      {
        title: "Brigade Valencia",
        location: "Hosur Road, Bangalore",
        price: "₹72 Lacs*",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        slug: "brigade-valencia"
      }
    ],
    cities: [
      {
        name: "Bangalore",
        citySlug: "bangalore",
        ongoingCount: 1,
        upcomingCount: 0,
        projects: [
          {
            id: "brigade-valencia",
            slug: "brigade-valencia",
            title: "Brigade Valencia",
            builder: "Brigade Group",
            city: "bangalore",
            location: "Electronic City, Hosur Road, Bangalore",
            status: "Ongoing",
            price: "72.0 Lacs onwards",
            priceNumeric: 7200000,
            avgPrice: "₹8.20 K / sq.ft",
            flatTypes: "2 & 2.5 BHK",
            carpetArea: "680 - 980 sq.ft",
            rera: "PRM/KA/RERA/1251/308/PR/120123/005614",
            rating: 4.7,
            tag: "Spanish Theme",
            images: [
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Spanish Courtyards", "Boulevard Walkways", "Clubhouse with Cafe"]
          }
        ]
      }
    ]
  },
  {
    id: "runwal",
    slug: "runwal-group",
    name: "Runwal Group",
    logo: "https://s3.ap-south-1.amazonaws.com/website-prod-public/builders/logos/000/000/024/medium/runwal.jpg?1543387303",
    tagline: "Quality Real Estate Across Mumbai Since 1978",
    experience: "46 Years",
    projectCount: "65+ Projects",
    established: "1978",
    aboutUs: "Runwal Group is a pioneering developer in the Mumbai Metropolitan Region, creating residential landmarks, Grade-A IT parks, and major shopping destinations.",
    description: "Since 1978, Runwal Developers has steadfastly focused on quality and customer satisfaction, delivering over 35 million sq.ft. of real estate. Runwal also manages premier retail destinations including R City Mall in Ghatkopar—Mumbai's biggest retail destination.",
    stats: [
      { label: "Experience", value: "46+ Years" },
      { label: "Total Projects", value: "65+" },
      { label: "Retail Portfolio", value: "2M+ sq.ft" },
      { label: "Happy Families", value: "30,000+" }
    ],
    featuredProjects: [
      {
        title: "Runwal Eirene",
        location: "Balkum, Thane West",
        price: "₹92 Lacs*",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
        slug: "runwal-eirene"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 1,
        upcomingCount: 0,
        projects: [
          {
            id: "runwal-eirene",
            slug: "runwal-eirene",
            title: "Runwal Eirene",
            builder: "Runwal Group",
            city: "mumbai",
            location: "Balkum, Thane West",
            status: "Ongoing",
            price: "92.0 Lacs onwards",
            priceNumeric: 9200000,
            avgPrice: "₹15.80 K / sq.ft",
            flatTypes: "1, 2 & 3 BHK",
            carpetArea: "420 - 950 sq.ft",
            rera: "P51700004519",
            rating: 4.7,
            tag: "River View",
            images: [
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Ulhas River Views", "5-Acre Open Greens", "2 Grand Clubhouses"]
          }
        ]
      }
    ]
  },
  {
    id: "tata",
    slug: "tata-housing",
    name: "Tata Housing",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    tagline: "Leadership with Trust • Premium Green Living",
    experience: "38 Years",
    projectCount: "95+ Projects",
    established: "1984",
    aboutUs: "Tata Housing Development Company is a closely-held public limited company and a subsidiary of Tata Sons Private Limited, trusted worldwide for ethical governance and sustainability.",
    description: "Since its revival in 2006, Tata Housing has pioneered consumer-centric green living across India, offering high-end luxury residences under the Tata Housing banner and value homes through Tata Value Homes. Every home carries the uncompromising quality, transparent documentation, and ethical ethos of the Tata group.",
    stats: [
      { label: "Experience", value: "38+ Years" },
      { label: "Total Projects", value: "95+" },
      { label: "Trust Index", value: "#1 in India" },
      { label: "Delivered Space", value: "30M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Tata Serein",
        location: "Pokhran Road No. 2, Thane",
        price: "₹1.75 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "tata-serein"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        ongoingCount: 1,
        upcomingCount: 0,
        projects: [
          {
            id: "tata-serein",
            slug: "tata-serein",
            title: "Tata Serein",
            builder: "Tata Housing",
            city: "mumbai",
            location: "Pokhran Road No. 2, Thane West",
            status: "Ongoing",
            price: "1.75 Cr onwards",
            priceNumeric: 17500000,
            avgPrice: "₹24.50 K / sq.ft",
            flatTypes: "2 & 3 BHK",
            carpetArea: "710 - 1,120 sq.ft",
            rera: "P51700000897",
            rating: 4.8,
            tag: "Wellness Homes",
            images: [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            ],
            features: ["Upvan Lake & Yeoor Hills View", "Hydrotherapy Pool", "Indoor Badminton Court"]
          }
        ]
      }
    ]
  },
  {
    id: "kalpataru",
    slug: "kalpataru-limited",
    name: "Kalpataru Limited",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    tagline: "Building Landmark Addresses Across Mumbai Since 1969",
    experience: "55+ Years",
    projectCount: "110+ Projects",
    established: "1969",
    aboutUs: "Kalpataru Limited is one of India's leading real estate developers with a distinguished track record of building premium residential towers and commercial parks across Mumbai and MMR.",
    description: "Founded in 1969, Kalpataru has redefined modern living in Mumbai with iconic skyscrapers, integrated townships, and award-winning architectural designs. Known for timely project completion and cutting-edge construction engineering.",
    stats: [
      { label: "Experience", value: "55+ Years" },
      { label: "Total Projects", value: "110+" },
      { label: "Happy Families", value: "22,000+" },
      { label: "Delivered Space", value: "24M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Kalpataru Vienta",
        location: "Kandivali East, Mumbai",
        price: "₹2.30 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "kalpataru-vienta"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        projects: []
      }
    ]
  },
  {
    id: "sugee",
    slug: "sugee-group",
    name: "Sugee Group",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    tagline: "Pioneers of Premium Redevelopment in South & Central Mumbai",
    experience: "35+ Years",
    projectCount: "30+ Projects",
    established: "1988",
    aboutUs: "Sugee Group is renowned for landmark redevelopment residences in prestigious South Mumbai and Dadar micro-markets.",
    description: "With over three decades of mastery, Sugee Group has transformed iconic neighborhoods in Dadar, Worli, and Prabhadevi into luxury residential landmarks with panoramic sea vistas.",
    stats: [
      { label: "Experience", value: "35+ Years" },
      { label: "Total Projects", value: "30+" },
      { label: "Delivered Units", value: "5,000+" },
      { label: "Specialty", value: "Luxury Redevelopment" }
    ],
    featuredProjects: [
      {
        title: "Sugee Marina Bay",
        location: "Worli, Mumbai",
        price: "₹7.20 Cr*",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
        slug: "sugee-marina-bay"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        projects: []
      }
    ]
  },
  {
    id: "rustomjee",
    slug: "rustomjee-builders",
    name: "Rustomjee Builders",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    tagline: "It's Thoughtful. It's Rustomjee.",
    experience: "28+ Years",
    projectCount: "45+ Projects",
    established: "1996",
    aboutUs: "Rustomjee is celebrated for human-centric gated communities, grand podium townships, and premier Western Suburbs residences.",
    description: "Established in 1996, Rustomjee has earned widespread acclaim for integrating thoughtful social spaces, children's creative parks, and sustainable living across Mumbai.",
    stats: [
      { label: "Experience", value: "28+ Years" },
      { label: "Total Projects", value: "45+" },
      { label: "Townships", value: "Multiple Across MMR" },
      { label: "Delivered Space", value: "20M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Rustomjee Seasons",
        location: "Bandra East, Mumbai",
        price: "₹4.50 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "rustomjee-seasons"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        projects: []
      }
    ]
  },
  {
    id: "raunak",
    slug: "raunak-group",
    name: "Raunak Group",
    logo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80",
    tagline: "Passion for Quality Real Estate Since 1980",
    experience: "44+ Years",
    projectCount: "50+ Projects",
    established: "1980",
    aboutUs: "Raunak Group is a leading property developer in Mumbai, Thane, and Kalyan, delivering quality homes with transparent customer service.",
    description: "Since 1980, Raunak Group has housed over 14,000 families across vibrant townships and high-rise residences in Chembur, Thane, and Beyond Thane.",
    stats: [
      { label: "Experience", value: "44+ Years" },
      { label: "Total Projects", value: "50+" },
      { label: "Happy Customers", value: "14,000+" },
      { label: "Delivered Area", value: "10M+ sq.ft" }
    ],
    featuredProjects: [
      {
        title: "Raunak Centrum",
        location: "Chembur, Mumbai",
        price: "₹1.42 Cr*",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        slug: "raunak-centrum"
      }
    ],
    cities: [
      {
        name: "Mumbai",
        citySlug: "mumbai",
        projects: []
      }
    ]
  }
];

// Helper function to dynamically enrich developers with all matching projects from the Mumbai catalog
export function enrichDeveloperWithProjects(dev) {
  if (!dev) return null;
  const normDevName = dev.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normSlug = dev.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  const matches = MUMBAI_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const delhiMatches = DELHI_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const goaMatches = GOA_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const coimbatoreMatches = COIMBATORE_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const nagpurMatches = NAGPUR_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const thrissurMatches = THRISSUR_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const trivandrumMatches = TRIVANDRUM_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const calicutMatches = CALICUT_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const bangaloreMatches = BANGALORE_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === dev.slug) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      bNorm === normSlug ||
      bNorm.includes(normSlug) ||
      normSlug.includes(bNorm) ||
      bNorm === normDevName ||
      bNorm.includes(normDevName) ||
      normDevName.includes(bNorm)
    );
  });

  const existingCities = dev.cities || [];
  const existingMumbaiCity = existingCities.find((c) => c.citySlug === "mumbai") || {
    name: "Mumbai",
    citySlug: "mumbai"
  };

  const finalProjects = matches.length > 0 ? matches : (existingMumbaiCity.projects || []);
  const ongoingCount = finalProjects.filter(
    (p) => p.status === "Under Construction" || p.status === "New Launch"
  ).length;
  const upcomingCount = finalProjects.filter(
    (p) => p.status === "Upcoming" || p.status === "New Launch"
  ).length;

  const updatedCities = existingCities.map((c) => {
    if (c.citySlug === "mumbai") {
      return {
        ...c,
        ongoingCount: ongoingCount || c.ongoingCount || 1,
        upcomingCount: upcomingCount || c.upcomingCount || 1,
        projects: finalProjects
      };
    }
    return c;
  });

  if (!updatedCities.some((c) => c.citySlug === "mumbai")) {
    updatedCities.unshift({
      name: "Mumbai",
      citySlug: "mumbai",
      ongoingCount,
      upcomingCount,
      projects: finalProjects
    });
  }

  if (delhiMatches.length > 0) {
    const delhiOngoing = delhiMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const delhiUpcoming = delhiMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;
    const existingDelhiIndex = updatedCities.findIndex((c) => c.citySlug === "delhi");
    if (existingDelhiIndex >= 0) {
      updatedCities[existingDelhiIndex] = {
        ...updatedCities[existingDelhiIndex],
        name: "Delhi NCR",
        ongoingCount: delhiOngoing || updatedCities[existingDelhiIndex].ongoingCount || 1,
        upcomingCount: delhiUpcoming || updatedCities[existingDelhiIndex].upcomingCount || 1,
        projects: delhiMatches
      };
    } else {
      updatedCities.push({
        name: "Delhi NCR",
        citySlug: "delhi",
        ongoingCount: delhiOngoing,
        upcomingCount: delhiUpcoming,
        projects: delhiMatches
      });
    }
  }

  if (goaMatches.length > 0) {
    const goaOngoing = goaMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const goaUpcoming = goaMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;
    const existingGoaIndex = updatedCities.findIndex((c) => c.citySlug === "goa");
    if (existingGoaIndex >= 0) {
      updatedCities[existingGoaIndex] = {
        ...updatedCities[existingGoaIndex],
        name: "Goa",
        ongoingCount: goaOngoing || updatedCities[existingGoaIndex].ongoingCount || 1,
        upcomingCount: goaUpcoming || updatedCities[existingGoaIndex].upcomingCount || 1,
        projects: goaMatches
      };
    } else {
      updatedCities.push({
        name: "Goa",
        citySlug: "goa",
        ongoingCount: goaOngoing,
        upcomingCount: goaUpcoming,
        projects: goaMatches
      });
    }
  }

  if (coimbatoreMatches.length > 0) {
    const cbeOngoing = coimbatoreMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const cbeUpcoming = coimbatoreMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;
    const existingCbeIndex = updatedCities.findIndex((c) => c.citySlug === "coimbatore");
    if (existingCbeIndex >= 0) {
      updatedCities[existingCbeIndex] = {
        ...updatedCities[existingCbeIndex],
        name: "Coimbatore",
        ongoingCount: cbeOngoing || updatedCities[existingCbeIndex].ongoingCount || 1,
        upcomingCount: cbeUpcoming || updatedCities[existingCbeIndex].upcomingCount || 1,
        projects: coimbatoreMatches
      };
    } else {
      updatedCities.push({
        name: "Coimbatore",
        citySlug: "coimbatore",
        ongoingCount: cbeOngoing,
        upcomingCount: cbeUpcoming,
        projects: coimbatoreMatches
      });
    }
  }

  if (nagpurMatches.length > 0) {
    const ngpOngoing = nagpurMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const ngpUpcoming = nagpurMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;
    const existingNgpIndex = updatedCities.findIndex((c) => c.citySlug === "nagpur");
    if (existingNgpIndex >= 0) {
      updatedCities[existingNgpIndex] = {
        ...updatedCities[existingNgpIndex],
        name: "Nagpur",
        ongoingCount: ngpOngoing || updatedCities[existingNgpIndex].ongoingCount || 1,
        upcomingCount: ngpUpcoming || updatedCities[existingNgpIndex].upcomingCount || 1,
        projects: nagpurMatches
      };
    } else {
      updatedCities.push({
        name: "Nagpur",
        citySlug: "nagpur",
        ongoingCount: ngpOngoing,
        upcomingCount: ngpUpcoming,
        projects: nagpurMatches
      });
    }
  }

  if (thrissurMatches.length > 0) {
    const tsrOngoing = thrissurMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const tsrUpcoming = thrissurMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;
    const existingTsrIndex = updatedCities.findIndex((c) => c.citySlug === "thrissur");
    if (existingTsrIndex >= 0) {
      updatedCities[existingTsrIndex] = {
        ...updatedCities[existingTsrIndex],
        name: "Thrissur",
        ongoingCount: tsrOngoing || updatedCities[existingTsrIndex].ongoingCount || 1,
        upcomingCount: tsrUpcoming || updatedCities[existingTsrIndex].upcomingCount || 1,
        projects: thrissurMatches
      };
    } else {
      updatedCities.push({
        name: "Thrissur",
        citySlug: "thrissur",
        ongoingCount: tsrOngoing,
        upcomingCount: tsrUpcoming,
        projects: thrissurMatches
      });
    }
  }

  if (trivandrumMatches.length > 0) {
    const tvmOngoing = trivandrumMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const tvmUpcoming = trivandrumMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const existingTvmIndex = updatedCities.findIndex((c) => c.citySlug === "trivandrum");
    if (existingTvmIndex >= 0) {
      updatedCities[existingTvmIndex] = {
        ...updatedCities[existingTvmIndex],
        name: "Trivandrum",
        ongoingCount: tvmOngoing || updatedCities[existingTvmIndex].ongoingCount || 1,
        upcomingCount: tvmUpcoming || updatedCities[existingTvmIndex].upcomingCount || 1,
        projects: trivandrumMatches
      };
    } else {
      updatedCities.push({
        name: "Trivandrum",
        citySlug: "trivandrum",
        ongoingCount: tvmOngoing,
        upcomingCount: tvmUpcoming,
        projects: trivandrumMatches
      });
    }
  }

  if (calicutMatches.length > 0) {
    const cltOngoing = calicutMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const cltUpcoming = calicutMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const existingCltIndex = updatedCities.findIndex((c) => c.citySlug === "calicut");
    if (existingCltIndex >= 0) {
      updatedCities[existingCltIndex] = {
        ...updatedCities[existingCltIndex],
        name: "Calicut",
        ongoingCount: cltOngoing || updatedCities[existingCltIndex].ongoingCount || 1,
        upcomingCount: cltUpcoming || updatedCities[existingCltIndex].upcomingCount || 1,
        projects: calicutMatches
      };
    } else {
      updatedCities.push({
        name: "Calicut",
        citySlug: "calicut",
        ongoingCount: cltOngoing,
        upcomingCount: cltUpcoming,
        projects: calicutMatches
      });
    }
  }

  if (bangaloreMatches.length > 0) {
    const blrOngoing = bangaloreMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const blrUpcoming = bangaloreMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const existingBlrIndex = updatedCities.findIndex((c) => c.citySlug === "bangalore");
    if (existingBlrIndex >= 0) {
      updatedCities[existingBlrIndex] = {
        ...updatedCities[existingBlrIndex],
        name: "Bangalore",
        ongoingCount: blrOngoing || updatedCities[existingBlrIndex].ongoingCount || 1,
        upcomingCount: blrUpcoming || updatedCities[existingBlrIndex].upcomingCount || 1,
        projects: bangaloreMatches
      };
    } else {
      updatedCities.push({
        name: "Bangalore",
        citySlug: "bangalore",
        ongoingCount: blrOngoing,
        upcomingCount: blrUpcoming,
        projects: bangaloreMatches
      });
    }
  }

  // Use top matching projects for featured showcase
  const featured = matches.length > 0
    ? matches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      }))
    : dev.featuredProjects;

  const totalCount = finalProjects.length + delhiMatches.length + goaMatches.length + coimbatoreMatches.length + nagpurMatches.length + thrissurMatches.length + trivandrumMatches.length + calicutMatches.length + bangaloreMatches.length;
  return {
    ...dev,
    projectCount: `${totalCount}+ Projects`,
    featuredProjects: featured,
    cities: updatedCities
  };
}

// Helper functions for easy querying
export function getDeveloperBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  const normSlug = normalized.replace(/[^a-z0-9]/g, "");

  // 1. Direct search in DEVELOPERS_DATA
  const found = DEVELOPERS_DATA.find(
    (d) =>
      d.slug === normalized ||
      d.id === normalized ||
      d.slug.replace(/-/g, "") === normalized.replace(/-/g, "") ||
      d.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized.replace(/[^a-z0-9]/g, "")
  );

  if (found) {
    return enrichDeveloperWithProjects(found);
  }

  // 2. Synthesize developer profile dynamically from DELHI_REGISTRY_PROJECTS
  const delhiDevMatches = DELHI_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (delhiDevMatches.length > 0) {
    const builderName = delhiDevMatches[0].builder;
    const logo =
      delhiDevMatches[0].builderLogo ||
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80";
    const ongoing = delhiDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = delhiDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: delhiDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premium Residential Developments Across Delhi NCR`,
      experience: "20+ Years",
      projectCount: `${delhiDevMatches.length}+ Projects`,
      established: "2000",
      aboutUs: `${builderName} is a premier real estate developer with verified developments across key micro-markets in Delhi NCR.`,
      description: `${builderName} has delivered iconic residential landmarks in Delhi NCR, known for quality construction, transparent RERA compliance, and contemporary lifestyle amenities.`,
      stats: [
        { label: "Active Projects", value: `${delhiDevMatches.length}+` },
        { label: "Location", value: "Delhi NCR" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: delhiDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: `${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Delhi NCR",
          citySlug: "delhi",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: delhiDevMatches
        }
      ]
    };
  }

  // 2b. Synthesize developer profile dynamically from GOA_REGISTRY_PROJECTS
  const goaDevMatches = GOA_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (goaDevMatches.length > 0) {
    const builderName = goaDevMatches[0].builder;
    const logo =
      goaDevMatches[0].builderLogo ||
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80";
    const ongoing = goaDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = goaDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: goaDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential & Coastal Developments in Goa`,
      experience: "15+ Years",
      projectCount: `${goaDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: `${builderName} is a real estate developer with verified residential developments across North and South Goa.`,
      description: `${builderName} delivers residences and holiday homes in Goa with verified Goa RERA registration and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${goaDevMatches.length}+` },
        { label: "Location", value: "Goa" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: goaDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: `${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Goa",
          citySlug: "goa",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: goaDevMatches
        }
      ]
    };
  }

  // 2c. Synthesize developer profile dynamically from COIMBATORE_REGISTRY_PROJECTS
  const coimbatoreDevMatches = COIMBATORE_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (coimbatoreDevMatches.length > 0) {
    const builderName = coimbatoreDevMatches[0].builder;
    const logo = coimbatoreDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = coimbatoreDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = coimbatoreDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: coimbatoreDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Coimbatore`,
      experience: "15+ Years",
      projectCount: `${coimbatoreDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: coimbatoreDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Coimbatore.`,
      description: coimbatoreDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Coimbatore with TNRERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${coimbatoreDevMatches.length}+` },
        { label: "Location", value: "Coimbatore" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: coimbatoreDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Coimbatore",
          citySlug: "coimbatore",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: coimbatoreDevMatches
        }
      ]
    };
  }

  // 2d. Synthesize developer profile dynamically from NAGPUR_REGISTRY_PROJECTS
  const nagpurDevMatches = NAGPUR_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (nagpurDevMatches.length > 0) {
    const builderName = nagpurDevMatches[0].builder;
    const logo = nagpurDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = nagpurDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = nagpurDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: nagpurDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Nagpur`,
      experience: "15+ Years",
      projectCount: `${nagpurDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: nagpurDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Nagpur.`,
      description: nagpurDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Nagpur with MahaRERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${nagpurDevMatches.length}+` },
        { label: "Location", value: "Nagpur" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: nagpurDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Nagpur",
          citySlug: "nagpur",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: nagpurDevMatches
        }
      ]
    };
  }

  // 2e. Synthesize developer profile dynamically from THRISSUR_REGISTRY_PROJECTS
  const thrissurDevMatches = THRISSUR_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (thrissurDevMatches.length > 0) {
    const builderName = thrissurDevMatches[0].builder;
    const logo = thrissurDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = thrissurDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = thrissurDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: thrissurDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Thrissur`,
      experience: "15+ Years",
      projectCount: `${thrissurDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: thrissurDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Thrissur.`,
      description: thrissurDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Thrissur with K-RERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${thrissurDevMatches.length}+` },
        { label: "Location", value: "Thrissur" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: thrissurDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Thrissur",
          citySlug: "thrissur",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: thrissurDevMatches
        }
      ]
    };
  }

  // 2f. Synthesize developer profile dynamically from TRIVANDRUM_REGISTRY_PROJECTS
  const trivandrumDevMatches = TRIVANDRUM_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (trivandrumDevMatches.length > 0) {
    const builderName = trivandrumDevMatches[0].builder;
    const logo = trivandrumDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = trivandrumDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const upcoming = trivandrumDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;

    return {
      id: normalized,
      slug: trivandrumDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Trivandrum`,
      experience: "15+ Years",
      projectCount: `${trivandrumDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: trivandrumDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Trivandrum.`,
      description: trivandrumDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Trivandrum with K-RERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${trivandrumDevMatches.length}+` },
        { label: "Location", value: "Trivandrum" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: trivandrumDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Trivandrum",
          citySlug: "trivandrum",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: trivandrumDevMatches
        }
      ]
    };
  }

  // 2g. Synthesize developer profile dynamically from CALICUT_REGISTRY_PROJECTS
  const calicutDevMatches = CALICUT_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (calicutDevMatches.length > 0) {
    const builderName = calicutDevMatches[0].builder;
    const logo = calicutDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = calicutDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const upcoming = calicutDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;

    return {
      id: normalized,
      slug: calicutDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Calicut`,
      experience: "15+ Years",
      projectCount: `${calicutDevMatches.length}+ Projects`,
      established: "2008",
      aboutUs: calicutDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Calicut.`,
      description: calicutDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Calicut with K-RERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${calicutDevMatches.length}+` },
        { label: "Location", value: "Calicut" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: calicutDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Calicut",
          citySlug: "calicut",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: calicutDevMatches
        }
      ]
    };
  }

  // 2h. Synthesize developer profile dynamically from BANGALORE_REGISTRY_PROJECTS
  const bangaloreDevMatches = BANGALORE_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (bangaloreDevMatches.length > 0) {
    const builderName = bangaloreDevMatches[0].builder;
    const logo = bangaloreDevMatches[0].builderLogo || "/images/logo/logo-emblem.png";
    const ongoing = bangaloreDevMatches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;
    const upcoming = bangaloreDevMatches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch" || p.status === "Pre-Launch"
    ).length;

    return {
      id: normalized,
      slug: bangaloreDevMatches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premier Residential Developments Across Bangalore`,
      experience: "15+ Years",
      projectCount: `${bangaloreDevMatches.length}+ Projects`,
      established: "2005",
      aboutUs: bangaloreDevMatches[0].builderDescription || `${builderName} is a trusted real estate developer with verified residential developments across Bangalore.`,
      description: bangaloreDevMatches[0].builderDescription || `${builderName} delivers verified residential communities across Bangalore with K-RERA compliance and transparent specifications.`,
      stats: [
        { label: "Active Projects", value: `${bangaloreDevMatches.length}+` },
        { label: "Location", value: "Bangalore" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: bangaloreDevMatches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: p.price === "On Request" ? "On Request" : `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Bangalore",
          citySlug: "bangalore",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: bangaloreDevMatches
        }
      ]
    };
  }

  // 3. Synthesize developer profile dynamically from MUMBAI_REGISTRY_PROJECTS
  const matches = MUMBAI_REGISTRY_PROJECTS.filter((p) => {
    if (p.developerSlug === normalized) return true;
    if (!p.builder) return false;
    const bNorm = p.builder.toLowerCase().replace(/[^a-z0-9]/g, "");
    return bNorm === normSlug || bNorm.includes(normSlug) || normSlug.includes(bNorm);
  });

  if (matches.length > 0) {
    const builderName = matches[0].builder;
    const logo =
      matches[0].builderLogo ||
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=120&h=120&q=80";
    const ongoing = matches.filter(
      (p) => p.status === "Under Construction" || p.status === "New Launch"
    ).length;
    const upcoming = matches.filter(
      (p) => p.status === "Upcoming" || p.status === "New Launch"
    ).length;

    return {
      id: normalized,
      slug: matches[0].developerSlug || normalized,
      name: builderName,
      logo: logo,
      tagline: `Premium Residential Developments Across Mumbai & MMR`,
      experience: "20+ Years",
      projectCount: `${matches.length}+ Projects`,
      established: "2000",
      aboutUs: `${builderName} is a premier real estate developer with verified developments across key micro-markets in the Mumbai Metropolitan Region.`,
      description: `${builderName} has delivered iconic residential landmarks in Mumbai and MMR, known for quality construction, transparent MahaRERA compliance, and contemporary lifestyle amenities.`,
      stats: [
        { label: "Active Projects", value: `${matches.length}+` },
        { label: "Location", value: "Mumbai & MMR" },
        { label: "RERA Compliant", value: "100%" },
        { label: "Brokerage", value: "0%" }
      ],
      featuredProjects: matches.slice(0, 3).map((p) => ({
        title: p.name,
        location: p.location,
        price: `₹${p.price}*`,
        image: p.images?.[0] || "/images/placeholder-property.jpg",
        slug: p.slug
      })),
      cities: [
        {
          name: "Mumbai",
          citySlug: "mumbai",
          ongoingCount: ongoing,
          upcomingCount: upcoming,
          projects: matches
        }
      ]
    };
  }

  return enrichDeveloperWithProjects(DEVELOPERS_DATA[0]);
}

export function getAllDevelopers() {
  return DEVELOPERS_DATA.map(enrichDeveloperWithProjects);
}

export function getRelatedDevelopers(currentSlug, limit = 4) {
  return DEVELOPERS_DATA
    .filter((d) => d.slug !== currentSlug)
    .slice(0, limit)
    .map(enrichDeveloperWithProjects);
}
