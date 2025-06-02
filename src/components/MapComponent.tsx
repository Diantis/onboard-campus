"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const fixLeafletIcons = () => {
  if (typeof window !== "undefined") {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }
};

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    fixLeafletIcons();
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [45.650002, 0.16],
        zoom: 13,
        zoomControl: false,
        layers: [
          L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
            {
              maxZoom: 20,
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
          ),
        ],
      });

      L.control.zoom({ position: "topright" }).addTo(map);
      L.control.scale({ position: "bottomright", imperial: false }).addTo(map);

      L.marker([45.650002, 0.18])
        .addTo(map)
        .bindPopup("<b>Hello from your map!</b><br>This is a custom popup.")
        .openPopup();

      L.marker([45.645, 0.15])
        .addTo(map)
        .bindPopup("<b>Second Location</b><br>Another interesting place.");

      L.circle([45.655, 0.17], {
        color: "#3388ff",
        fillColor: "#3388ff",
        fillOpacity: 0.2,
        radius: 500,
      })
        .addTo(map)
        .bindPopup("A circular area");

      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
        setIsMapReady(true);
      }, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div ref={mapRef} className="h-full w-full z-10"></div>
      {!isMapReady && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-l-blue-500 rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700">Loading map...</p>
        </div>
      )}
    </>
  );
}
