"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { CITIES } from "@/data";

// 72 Localities for Mumbai exactly matching the reference screenshot in 6 columns
const MUMBAI_LOCALITIES = [
  // Column 1
  "Airoli",
  "Ambernath East",
  "Ambernath West",
  "Andheri East",
  "Andheri West",
  "Badlapur East",
  "Badlapur West",
  "Bandra East",
  "Bandra West",
  "Bhandup West",
  "Bhiwandi",
  "Boisar",

  // Column 2
  "Borivali East",
  "Borivali West",
  "Chembur",
  "Dadar West",
  "Dahisar East",
  "Diva East",
  "Dombivli East",
  "Dombivli West",
  "Dronagiri",
  "Ghansoli",
  "Ghatkopar East",
  "Ghodbunder Road",

  // Column 3
  "Goregaon East",
  "Goregaon West",
  "Hiranandani Estate",
  "Jogeshwari East",
  "Jogeshwari West",
  "Kalyan East",
  "Kalyan West",
  "Kamothe",
  "Kandivali East",
  "Kandivali West",
  "Karanjade",
  "Karjat",

  // Column 4
  "Kasarvadavali",
  "Kharghar",
  "Kolshet Road",
  "Kurla East",
  "Kurla West",
  "Majiwada",
  "Malad East",
  "Malad West",
  "Manpada",
  "Matunga East",
  "Mira Road East",
  "Mulund East",

  // Column 5
  "Mulund West",
  "Naigaon East",
  "Nala Sopara West",
  "Neral",
  "Nerul",
  "Palghar",
  "Panvel",
  "Powai",
  "Rasayani",
  "Sanpada",
  "Santacruz East",
  "Santacruz West",

  // Column 6
  "Seawoods",
  "Taloja",
  "Thane West",
  "Titwala",
  "Ulwe",
  "Ulwe - Bamandongri",
  "Vasai East",
  "Vikhroli East",
  "Vile Parle East",
  "Virar West",
  "Wadala",
  "Worli"
];

// Curated locality collections for other major metros
const CITY_LOCALITIES_MAP = {
  mumbai: MUMBAI_LOCALITIES,
  pune: [
    "Hinjewadi", "Kharadi", "Baner", "Wakad", "Kothrud", "Bavdhan",
    "Balewadi", "Viman Nagar", "Hadapsar", "Magarpatta", "Aundh", "Kalyani Nagar",
    "Ravet", "Punawale", "Moshi", "Chakan", "Pimple Saudagar", "Dhanori",
    "Undri", "Mohammed Wadi", "Koregaon Park", "Shivaji Nagar", "Senapati Bapat Road", "Boat Club Road",
    "Wagholi", "Tathawade", "Mahalunge", "Sus", "Pashan", "Camp"
  ],
  bangalore: [
    "Whitefield", "Sarjapur Road", "Electronic City", "Indiranagar", "Bellandur", "Hebbal",
    "Kanakapura Road", "HSR Layout", "Koramangala", "Yelahanka", "Thanisandra", "Marathahalli",
    "Devanahalli", "Bannerghatta Road", "JP Nagar", "Jayanagar", "Rajajinagar", "Malleshwaram",
    "Varthur", "Budigere Cross", "Panathur", "Kadugodi", "KR Puram", "Hennur Road"
  ],
  hyderabad: [
    "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Financial District", "Tellapur",
    "Nallagandla", "Kokapet", "Manikonda", "Miyapur", "Kukatpally", "Jubilee Hills",
    "Banjara Hills", "Begumpet", "Secunderabad", "Bachupally", "Kompally", "Ameerpet"
  ],
  thane: [
    "Majiwada", "Ghodbunder Road", "Kolshet Road", "Vartak Nagar", "Pokhran Road 1", "Pokhran Road 2",
    "Kasarvadavali", "Manpada", "Naupada", "Panch Pakhadi", "Wagle Estate", "Hiranandani Estate"
  ],
  "navi-mumbai": [
    "Kharghar", "Panvel", "Ulwe", "Seawoods", "Nerul", "Vashi",
    "Belapur", "Sanpada", "Airoli", "Ghansoli", "Kopar Khairane", "Kamothe"
  ]
};

// Converts Locality Name to Clean URL Slug
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Reusable Pre-Footer Locality Links Section
 * Matches Screenshot 2 visual layout with 6 clean columns of "Property in [Locality]" links.
 * Renders ONLY on appropriate listing, city, and category pages — NEVER directly inside the shared footer.
 */
export default function PropertiesForSalePreFooter({ cityId = "mumbai" }) {
  // Normalize city
  const normalizedCity = (cityId || "mumbai").toLowerCase().trim();
  const matchedCity = useMemo(() => {
    return (
      CITIES.find(
        (c) =>
          c.id.toLowerCase() === normalizedCity ||
          c.name.toLowerCase() === normalizedCity.replace(/-/g, " ")
      ) || { id: "mumbai", name: "Mumbai" }
    );
  }, [normalizedCity]);

  // Retrieve locality list
  const localities = CITY_LOCALITIES_MAP[matchedCity.id] || CITY_LOCALITIES_MAP.mumbai;

  // Split into 6 equal or near-equal columns for desktop matching screenshot 2
  const columns = useMemo(() => {
    const colCount = 6;
    const perCol = Math.ceil(localities.length / colCount);
    const cols = [];
    for (let i = 0; i < colCount; i++) {
      const slice = localities.slice(i * perCol, (i + 1) * perCol);
      if (slice.length > 0) cols.push(slice);
    }
    return cols;
  }, [localities]);

  return (
    <section className="bg-white border-t border-[#E8E3DA] py-10 sm:py-14 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 2: "Properties in Mumbai For Sale" */}
        <h2 className="text-xl sm:text-2xl font-normal text-[#1C1C1C] text-center mb-8 sm:mb-10 tracking-tight">
          Properties in <span className="font-bold text-[#1C1C1C]">{matchedCity.name}</span> For Sale
        </h2>

        {/* 6 Columns Desktop Grid matching Screenshot 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-1">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-1.5 flex flex-col">
              {col.map((loc) => {
                const slug = toSlug(loc);
                const href = `/${matchedCity.id}/buy/projects-in-${slug}`;
                return (
                  <Link
                    key={loc}
                    href={href}
                    className="text-[11px] sm:text-[12px] text-[#4A4A4A] hover:text-[#D29324] hover:underline transition-colors leading-relaxed block py-0.5 truncate"
                    title={`Property in ${loc}, ${matchedCity.name}`}
                  >
                    Property in {loc}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
