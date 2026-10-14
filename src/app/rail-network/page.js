"use client";

import React, { Suspense } from "react";
import RailNetworkPage from "@/app/rail-network/[city]/page";

export default function TopLevelRailNetwork() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RailNetworkPage />
    </Suspense>
  );
}
