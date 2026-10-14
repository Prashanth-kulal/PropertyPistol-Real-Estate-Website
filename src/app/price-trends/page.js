"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PriceTrendsPage from "@/app/[city]/price-trends/page";

function PriceTrendsRedirectContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "mumbai";
  // Render PriceTrends page directly with default city
  return <PriceTrendsPage />;
}

export default function TopLevelPriceTrends() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PriceTrendsRedirectContent />
    </Suspense>
  );
}
