"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-white dark:bg-zinc-900 bg-opacity-80 dark:bg-opacity-80 flex flex-col items-center justify-center z-20">
      <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-600 border-l-blue-500 dark:border-l-blue-400 rounded-full animate-spin mb-3"></div>
      <p className="text-gray-700 dark:text-gray-300">Loading map...</p>
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
    <main className="bg-background flex flex-col overflow-hidden">
      <section className="px-8 pt-8 flex flex-col gap-5">
        {/* Header Card */}
        <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 p-6 shadow">
          <h1 className="mb-2 text-2xl font-bold">Campus Navigation</h1>
          <p className="text-muted-foreground mb-4">
            Explorez le campus et ses environs avec nos cartes interactives
          </p>

          {/* Tab navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "map"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("map")}
            >
              Carte Proximité Campus
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "floorplan"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("floorplan")}
            >
              Plan du Campus
            </button>
          </div>
        </div>

        {/* Map Container Card */}
        <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 shadow flex flex-col h-[60vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">
              {activeTab === "map" ? "Carte Interactive" : "Plan du Campus"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {activeTab === "map"
                ? "Naviguez dans les environs du campus"
                : "Découvrez l'organisation interne du campus"}
            </p>
          </div>

          <div className="relative flex-1 overflow-hidden">
            {activeTab === "map" ? <MapComponent /> : <FloorPlanComponent />}
          </div>
        </div>
      </section>
    </main>
  );
}
