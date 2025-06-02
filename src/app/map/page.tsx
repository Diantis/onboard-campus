"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-20">
      <div className="w-10 h-10 border-4 border-gray-200 border-l-blue-500 rounded-full animate-spin mb-3"></div>
      <p className="text-gray-700">Loading map...</p>
    </div>
  ),
});

const FloorPlanComponent = dynamic(
  () => import("../../components/FloorPlanComponent"),
  { ssr: false },
);

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<"map" | "floorplan">("map");

  return (
    <main className="relative min-h-screen bg-white pb-28 flex flex-col">
      <div className="max-w-7xl mx-auto p-5 flex-grow w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200">
          Campus Navigation
        </h1>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "map"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("map")}
          >
            Carte Proximité Campus
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "floorplan"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("floorplan")}
          >
            Plan du Campus
          </button>
        </div>

        <div className="relative h-[400px] md:h-[600px] lg:h-[800px] w-full rounded-lg overflow-hidden shadow-lg mb-6">
          {activeTab === "map" ? <MapComponent /> : <FloorPlanComponent />}
        </div>
      </div>
    </main>
  );
}
