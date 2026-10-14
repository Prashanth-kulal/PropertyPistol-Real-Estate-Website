// AuraLiving Centralized Developer & Project Mock Data Store
// Curated mock dataset following PropertyPistol's developer information hierarchy
// Uses AuraLiving's design principles and local sample assets

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
  }
];

// Helper functions for easy querying
export function getDeveloperBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  return (
    DEVELOPERS_DATA.find(
      (d) =>
        d.slug === normalized ||
        d.id === normalized ||
        d.slug.replace(/-/g, "") === normalized.replace(/-/g, "") ||
        d.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized.replace(/[^a-z0-9]/g, "")
    ) || DEVELOPERS_DATA[0]
  );
}

export function getAllDevelopers() {
  return DEVELOPERS_DATA;
}

export function getRelatedDevelopers(currentSlug, limit = 4) {
  return DEVELOPERS_DATA.filter((d) => d.slug !== currentSlug).slice(0, limit);
}
