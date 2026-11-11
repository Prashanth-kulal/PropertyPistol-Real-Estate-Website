// Category Metadata & Guides for AuraLiving Explore Categories
// Faithfully matching the 5 actual PropertyPistol destinations

export const CATEGORIES_CONFIG = {
  "projects": {
    id: "projects",
    slugKey: "projects",
    getCitySlug: (city) => `projects`,
    label: "All Projects",
    titleTemplate: (city) => `Real Estate ${city} – Property to buy in ${city}`,
    h1Template: (city) => `Real Estate ${city} – Property to buy in ${city}`,
    metaDesc: (city) => `Choose from our comprehensive list of luxury residential properties available for sale in ${city}. Have an enriching home buying experience with PropertyPistol!`,
    breadcrumbLabel: (city) => `Real Estate ${city}`,
    statusFilterDefault: "all",
    pills: [
      { id: "all", label: "All Projects" },
      { id: "new-projects", label: "New Projects" },
      { id: "ready-to-move", label: "Ready to Move" },
      { id: "under-construction", label: "Under Construction" },
      { id: "rera-compliant", label: "RERA Compliant" }
    ],
    overviewTitle: (city) => `Overview of Real Estate in ${city}`,
    overviewContent: (city) => [
      `Discover verified luxury residential properties, apartments, and builder projects in ${city} with zero brokerage and direct developer pricing.`,
      `Every project featured on our platform undergoes strict RERA verification, legal scrutiny, and on-ground progress tracking to ensure complete peace of mind for buyers.`
    ],
    faqs: (city) => [
      {
        q: `What is the property price range in ${city}?`,
        a: `Properties in ${city} range from affordable residential apartments to ultra-luxury penthouses and sea-facing/expressway residences. Browse our live verified inventory for active prices.`
      },
      {
        q: `Are all projects in ${city} verified by RERA?`,
        a: `Yes, every project listed in our catalog features authentic RERA registration documentation and direct developer allocations.`
      }
    ]
  },
  "new-projects": {
    id: "new-projects",
    slugKey: "new-projects",
    getCitySlug: (city) => `new-projects-in-${city}`,
    label: "New Projects",
    titleTemplate: (city) => `New Residential Projects for Sale in ${city} - AuraLiving`,
    h1Template: (city) => `Real Estate ${city} – New Residential Projects in ${city}`,
    metaDesc: (city) => `Explore upcoming, newly-launched residential projects and luxury apartment towers in ${city} with direct developer allotments and zero brokerage.`,
    breadcrumbLabel: (city) => `New Projects in ${city}`,
    statusFilterDefault: "New Launch",
    pills: [
      { id: "all", label: "All New Projects" },
      { id: "new-launch", label: "New Launch" },
      { id: "pre-launch", label: "Pre-Launch Offers" },
      { id: "under-construction", label: "Under Construction" },
      { id: "rera-registered", label: "RERA Registered" }
    ],
    overviewTitle: (city) => `Overview of New Projects in ${city}`,
    overviewContent: (city) => [
      `Investing in newly launched residential projects in ${city} provides homebuyers with competitive pre-launch pricing, flexible staggered construction-linked payment plans (CLP), and maximum choice of floor levels and unit orientations.`,
      `Every new project listed on AuraLiving is verified under state RERA guidelines, ensuring that developer escrow accounts, construction progress milestones, and possession commitments comply strictly with regulatory standards.`
    ],
    faqs: (city) => [
      {
        q: `What are the advantages of buying a newly launched project in ${city}?`,
        a: `New projects offer early-bird pre-launch pricing (often 10-15% lower than ready properties), flexible construction-linked payment schedules, modern architectural floor plans, and state-of-the-art club amenities.`
      },
      {
        q: `How does AuraLiving verify newly launched projects in ${city}?`,
        a: `Our legal team verifies the RERA registration certificate, sanctioned building floor plans, land title deed ownership, and financial backing from leading commercial banks before listing any new development.`
      },
      {
        q: `What payment plans are available for new projects in ${city}?`,
        a: `Most developers offer Construction Linked Plans (CLP), 20:80 or 10:90 subvention schemes, and customized milestone plans. Contact our VIP advisory team for project-specific launch offers.`
      }
    ]
  },

  "ready-to-move": {
    id: "ready-to-move",
    slugKey: "ready-to-move",
    getCitySlug: (city) => `ready-to-move-properties-in-${city}`,
    label: "Ready to Move",
    titleTemplate: (city) => `Ready to Move Flats, Apartments, House & Villas for sale in ${city} – AuraLiving`,
    h1Template: (city) => `Ready to move flats, apartments, villas for sale in ${city}`,
    metaDesc: (city) => `Find 100% completed, ready to move flats, apartments, and luxury villas in ${city} with Occupancy Certificate (OC) and zero GST liability.`,
    breadcrumbLabel: (city) => `Ready to Move Properties in ${city}`,
    statusFilterDefault: "Ready to Move",
    pills: [
      { id: "all", label: "All Ready Homes" },
      { id: "immediate", label: "Immediate Possession" },
      { id: "oc-received", label: "OC Received" },
      { id: "gated-community", label: "Gated Communities" },
      { id: "luxury-ready", label: "Luxury Ready" }
    ],
    overviewTitle: (city) => `Why Choose Ready to Move Homes in ${city}?`,
    overviewContent: (city) => [
      `Ready-to-move properties in ${city} eliminate construction delay risks, allow immediate physical inspection of the actual apartment views and carpet area, and provide instant rental income or immediate savings on existing rental outflow.`,
      `Crucially, completed properties with a valid Occupancy Certificate (OC) attract ZERO Goods & Services Tax (GST), saving buyers 5% of the total property value compared to under-construction projects.`
    ],
    faqs: (city) => [
      {
        q: `Do I have to pay GST on ready-to-move flats in ${city}?`,
        a: `No. Properties that have received their Occupancy Certificate (OC) from the local municipal corporation are completely exempt from GST, saving you 5% compared to under-construction units.`
      },
      {
        q: `What documents should I verify before purchasing a ready property in ${city}?`,
        a: `Key documents include the Occupancy Certificate (OC), Completion Certificate (CC), sanctioned architectural plans, Encumbrance Certificate (EC), and society handover NOC.`
      },
      {
        q: `Can I get a higher home loan percentage on ready-to-move properties?`,
        a: `Yes. Banks generally process home loans faster for ready-to-move homes because the asset is physically complete, with disbursement up to 80-85% of property value.`
      }
    ]
  },

  "under-construction": {
    id: "under-construction",
    slugKey: "under-construction",
    getCitySlug: (city) => `under-construction-properties-in-${city}`,
    label: "Under Construction",
    titleTemplate: (city) => `Under Construction Properties & Ongoing Projects in ${city} – AuraLiving`,
    h1Template: (city) => `Under Construction Properties & Ongoing Projects in ${city}`,
    metaDesc: (city) => `Explore high-appreciation under-construction properties and upcoming residential towers in ${city} with flexible payment milestones.`,
    breadcrumbLabel: (city) => `Under Construction Properties in ${city}`,
    statusFilterDefault: "Under Construction",
    pills: [
      { id: "all", label: "All Ongoing Projects" },
      { id: "possession-2025", label: "Possession 2025" },
      { id: "possession-2026", label: "Possession 2026" },
      { id: "possession-2027", label: "Possession 2027+" },
      { id: "mid-stage", label: "Mid-Stage Construction" }
    ],
    overviewTitle: (city) => `Investing in Under Construction Real Estate in ${city}`,
    overviewContent: (city) => [
      `Under-construction developments in ${city} offer the greatest potential for capital appreciation as the project moves from excavation to structural handover and final finishing.`,
      `Under strict RERA provisions, developers must maintain 70% of buyer collections in a dedicated escrow account used exclusively for construction expenses, shielding buyers from project diversion risks.`
    ],
    faqs: (city) => [
      {
        q: `How safe is buying an under-construction project in ${city}?`,
        a: `With mandatory RERA registration, developer funds are ring-fenced in escrow accounts. AuraLiving only lists builders with proven track records of timely execution.`
      },
      {
        q: `What is the typical price difference between under-construction and ready homes?`,
        a: `Under-construction properties are typically 15% to 25% cheaper than ready counterparts in the same micro-market, delivering substantial capital gains upon completion.`
      },
      {
        q: `How does the construction-linked payment plan work?`,
        a: `You only pay installments as construction stages (plinth, podium, specific slab levels, brickwork, finishing) are completed and certified by registered architects.`
      }
    ]
  },

  "rera-compliant": {
    id: "rera-compliant",
    slugKey: "rera-compliant",
    getCitySlug: (city) => `rera-compliant-properties-in-${city}`,
    label: "RERA Compliant",
    titleTemplate: (city) => `Buy RERA Compliant Real Estate Projects in ${city} - AuraLiving`,
    h1Template: (city) => `Real Estate ${city} – RERA Compliant Projects in ${city}`,
    metaDesc: (city) => `Browse 100% verified RERA compliant real estate developments in ${city} with legally validated title deeds, carpet area guarantees, and escrow security.`,
    breadcrumbLabel: (city) => `Rera Compliant Projects in ${city}`,
    statusFilterDefault: "all",
    pills: [
      { id: "all", label: "All RERA Verified" },
      { id: "title-clear", label: "Clear Title Deeds" },
      { id: "escrow-backed", label: "Escrow Backed" },
      { id: "bank-approved", label: "All Major Banks Approved" },
      { id: "rera-carpet", label: "Carpet Area Certified" }
    ],
    overviewTitle: (city) => `RERA Consumer Safeguards for ${city} Property Buyers`,
    overviewContent: (city) => [
      `The Real Estate (Regulation and Development) Act ensures that property buyers in ${city} are protected against misleading advertisements, unilateral layout modifications, and execution delays.`,
      `Every listing in this section displays its authentic registration certificate from the appropriate state regulatory authority, ensuring transparent disclosure of carpet area, encumbrances, and structural warranty for 5 years post-possession.`
    ],
    faqs: (city) => [
      {
        q: `What does RERA compliance mean for me as a buyer in ${city}?`,
        a: `RERA compliance ensures that pricing is strictly based on net usable carpet area (not inflated super-built-up area), builder funds are secured in escrow, and developers are legally liable for any structural defects for 5 years.`
      },
      {
        q: `Where can I verify the RERA number of a project in ${city}?`,
        a: `You can verify each project's official filings, approved layout plans, and quarterly progress updates on the state regulatory portal using the RERA ID provided on each AuraLiving property card.`
      },
      {
        q: `Can a builder change the project layout after RERA registration?`,
        a: `No. Under Section 14 of the RERA Act, developers cannot make major alterations to approved plans without the prior written consent of at least two-thirds of all allottees.`
      }
    ]
  },

  "developer-listings": {
    id: "developer-listings",
    slugKey: "developer-listings",
    getCitySlug: (city) => `developer-listings-in-${city}`,
    label: "Developer Listings",
    titleTemplate: (city) => `Buy Developer Listed Residential Properties in ${city} – AuraLiving`,
    h1Template: (city) => `Real Estate Developers Listed Residential Properties in ${city}`,
    metaDesc: (city) => `Buy directly from India's most reputed Grade-A developers in ${city}. Enjoy direct builder pricing, exclusive pre-launch inventory, and zero brokerage.`,
    breadcrumbLabel: (city) => `Developer Listed Properties in ${city}`,
    statusFilterDefault: "all",
    pills: [
      { id: "all", label: "All Developer Listings" },
      { id: "grade-a", label: "Grade-A Developers" },
      { id: "direct-pricing", label: "Direct Builder Pricing" },
      { id: "exclusive-allotment", label: "Exclusive Allotments" },
      { id: "zero-brokerage", label: "Zero Brokerage" }
    ],
    overviewTitle: (city) => `Direct Developer Partnerships in ${city}`,
    overviewContent: (city) => [
      `AuraLiving partners directly with India's premier Tier-1 developers—including Godrej Properties, L&T Realty, Tata Housing, Prestige Group, DLF, and Lodha Group—to provide buyers with institutional transparency.`,
      `When purchasing through developer listings, buyers bypass multiple middleman markups, receive direct launch incentives, and benefit from prioritized allotment in prime tower wings and higher floors.`
    ],
    faqs: (city) => [
      {
        q: `Are there any hidden brokerage fees for developer listed properties in ${city}?`,
        a: `Zero brokerage. AuraLiving operates as an authorized institutional channel partner, meaning our VIP property advisory, site tours, and loan coordination are 100% free for buyers.`
      },
      {
        q: `Do I get direct builder warranties and official payment receipts?`,
        a: `Yes. All payments, agreements for sale, and allotment letters are executed directly between you and the developer company with complete legal transparency.`
      },
      {
        q: `Can AuraLiving help negotiate better rates on developer listings?`,
        a: `Because of our large transaction volume across key metros, our advisory desk often secures exclusive launch discounts, waiver of club charges, or customized payment milestones for our clients.`
      }
    ]
  }
};

// Helper to resolve category config from URL slug or category ID
export function resolveCategory(rawSlug) {
  if (!rawSlug) return CATEGORIES_CONFIG["new-projects"];
  const s = rawSlug.toLowerCase();

  // 1. Check for specific developer slug (e.g. projects-by-godrej-properties)
  if (s.includes("projects-by-")) {
    const devSlug = s.replace(/^.*projects-by-/, "");
    const devName = devSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: `developer-${devSlug}`,
      slugKey: rawSlug,
      developerFilter: devName,
      getCitySlug: (city) => `projects-by-${devSlug}`,
      label: `${devName} Projects`,
      titleTemplate: (city) => `Projects by ${devName} in ${city} – AuraLiving`,
      h1Template: (city) => `Residential Projects by ${devName} in ${city}`,
      metaDesc: (city) => `Explore premium residential developments, apartments and luxury homes built by ${devName} in ${city} with direct builder allotments.`,
      breadcrumbLabel: (city) => `${devName} in ${city}`,
      statusFilterDefault: "all",
      pills: [
        { id: "all", label: `All ${devName}` },
        { id: "new-launch", label: "New Launches" },
        { id: "under-construction", label: "Under Construction" },
        { id: "ready-to-move", label: "Ready to Move" },
        { id: "rera-registered", label: "RERA Registered" },
      ],
      overviewTitle: (city) => `About ${devName} Projects in ${city}`,
      overviewContent: (city) => [
        `${devName} is one of India's leading and most respected real estate developers, renowned for architectural excellence, timely delivery, and sustainable design.`,
        `Explore all ongoing, pre-launch, and completed developments by ${devName} across prime micro-markets in ${city} with verified RERA documentation and zero brokerage.`
      ],
      faqs: (city) => [
        {
          q: `Are properties by ${devName} RERA compliant?`,
          a: `Yes, all developments by ${devName} listed on AuraLiving have verified state RERA registration numbers and approved sanctioned building plans.`
        },
        {
          q: `Can I get direct developer pricing and zero brokerage for ${devName} projects?`,
          a: `Yes, AuraLiving is an authorized institutional partner for ${devName}, providing buyers with direct developer allotments and zero brokerage.`
        }
      ]
    };
  }

  // 2. Check for region slug (e.g. flats-in-region-western-suburbs)
  if (s.includes("region-") || s.includes("flats-in-region-")) {
    const regSlug = s.replace(/^.*region-/, "").trim();
    const REGION_MAP = {
      "western-suburbs": "Western Suburbs",
      "central-mumbai": "Central Mumbai",
      "south-mumbai": "South Mumbai",
      "navi-mumbai": "Navi Mumbai",
      "thane": "Thane",
      "beyond-thane": "Beyond Thane",
      "mira-road-and-beyond": "Mira Road and Beyond",
      "raigad": "Raigad"
    };
    const regName = REGION_MAP[regSlug] || regSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return {
      id: `region-${regSlug}`,
      slugKey: rawSlug,
      regionFilter: regName,
      getCitySlug: (city) => `flats-in-region-${regSlug}`,
      label: `Flats in ${regName}`,
      titleTemplate: (city) => `Flats for Sale in ${regName}, ${city} – PropertyPistol`,
      h1Template: (city) => `Real Estate & Residential Projects in ${regName}, ${city}`,
      metaDesc: (city) => `Explore verified apartments, new launches, and ready to move flats for sale in ${regName}, ${city} with zero brokerage.`,
      breadcrumbLabel: (city) => `${regName} Flats`,
      statusFilterDefault: "all",
      pills: [
        { id: "all", label: `All in ${regName}` },
        { id: "new-launch", label: "New Launch" },
        { id: "under-construction", label: "Under Construction" },
        { id: "ready-to-move", label: "Ready to Move" },
        { id: "rera-registered", label: "RERA Registered" }
      ],
      overviewTitle: (city) => `Overview of Real Estate in ${regName}`,
      overviewContent: (city) => [
        `${regName} represents a premier residential and investment corridor in ${city}, offering high-rise apartments, integrated communities, and superior connectivity.`,
        `All listed projects in ${regName} comply strictly with MahaRERA guidelines, providing buyers with verified pricing and authentic developer documentation.`
      ],
      faqs: (city) => [
        {
          q: `What are the advantages of buying property in ${regName}?`,
          a: `${regName} offers competitive real estate capital appreciation, expanding transit hubs, and a rich selection of lifestyle communities.`
        },
        {
          q: `Are all listed projects in ${regName} RERA compliant?`,
          a: `Yes, all properties listed in ${regName} feature valid MahaRERA registration certificates and sanctioned plans.`
        }
      ]
    };
  }

  // 3. Check for locality slug (e.g. real-estate-projects-in-sanpada)
  if (
    s.includes("real-estate-projects-in-") ||
    (s.includes("-in-") &&
      !s.includes("new-projects-in-") &&
      !s.includes("ready-to-move-properties-in-") &&
      !s.includes("under-construction-properties-in-") &&
      !s.includes("rera-compliant-projects-in-") &&
      !s.includes("developer-listings-in-"))
  ) {
    const locSlug = s.replace(/^.*projects-in-/, "").replace(/^.*-in-/, "");
    const locName = locSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: `locality-${locSlug}`,
      slugKey: rawSlug,
      localityFilter: locName,
      getCitySlug: (city) => `real-estate-projects-in-${locSlug}`,
      label: `${locName} Projects`,
      titleTemplate: (city) => `Real Estate Projects in ${locName}, ${city} – AuraLiving`,
      h1Template: (city) => `Real Estate & New Projects in ${locName}, ${city}`,
      metaDesc: (city) => `Find verified residential properties, flats and newly launched projects in ${locName}, ${city} with complete price insights and zero brokerage.`,
      breadcrumbLabel: (city) => `Projects in ${locName}`,
      statusFilterDefault: "all",
      pills: [
        { id: "all", label: `All in ${locName}` },
        { id: "new-launch", label: "New Launch" },
        { id: "under-construction", label: "Under Construction" },
        { id: "ready-to-move", label: "Ready to Move" },
        { id: "rera-registered", label: "RERA Registered" },
      ],
      overviewTitle: (city) => `Real Estate Overview of ${locName}`,
      overviewContent: (city) => [
        `${locName} is one of the most sought-after residential micro-markets, offering seamless transit connectivity, excellent civic infrastructure, and robust historical capital appreciation.`,
        `Explore verified residential towers, luxury apartments, and upcoming gated communities in ${locName} with zero brokerage and full advisory support.`
      ],
      faqs: (city) => [
        {
          q: `Why invest in real estate in ${locName}?`,
          a: `${locName} provides high capital appreciation, steady rental yields, and proximity to major commercial corridors and transport hubs.`
        },
        {
          q: `What is the average property rate in ${locName}?`,
          a: `Property rates in ${locName} vary based on luxury specifications, tower height, and amenities. Contact our advisory team for current registry rates and historical trends.`
        }
      ]
    };
  }

  // 3. Standard category slugs
  if (s === "projects" || s === "all" || s === "all-projects" || s === "real-estate" || s.startsWith("projects?")) {
    return CATEGORIES_CONFIG["projects"];
  }
  if (s.includes("new-project") || s.includes("new-listing")) {
    return CATEGORIES_CONFIG["new-projects"];
  }
  if (s.includes("ready-to-move") || s.includes("ready")) {
    return CATEGORIES_CONFIG["ready-to-move"];
  }
  if (s.includes("under-construction") || s.includes("ongoing")) {
    return CATEGORIES_CONFIG["under-construction"];
  }
  if (s.includes("rera-compliant") || s.includes("rera")) {
    return CATEGORIES_CONFIG["rera-compliant"];
  }
  if (s.includes("developer-listing") || s.includes("developer")) {
    return CATEGORIES_CONFIG["developer-listings"];
  }

  return CATEGORIES_CONFIG["new-projects"];
}
