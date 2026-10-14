// Category Metadata & Guides for AuraLiving Explore Categories
// Faithfully matching the 5 actual PropertyPistol destinations

export const CATEGORIES_CONFIG = {
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
