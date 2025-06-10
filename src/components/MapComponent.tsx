"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const createCustomIcon = (color: string, icon: string) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
      ">
        ${icon}
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

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
        zoom: 15,
        zoomControl: false,
        layers: [
          L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
            {
              maxZoom: 20,
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
          ),
        ],
      });

      // Custom controls
      L.control.zoom({ position: "topright" }).addTo(map);
      L.control.scale({ position: "bottomright", imperial: false }).addTo(map);

      // Campus main building
      const campusIcon = createCustomIcon("#1e40af", "🏫");
      L.marker([45.650002, 0.16], { icon: campusIcon })
        .addTo(map)
        .bindPopup(
          `
          <div style="font-family: system-ui; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1e40af; font-size: 16px;">🏫 Campus Principal</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;">
              Bâtiment principal de l'université
            </p>
            <div style="background: #f3f4f6; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong>Adresse:</strong> 123 Avenue de l'Université<br>
              <strong>Horaires:</strong> 7h00 - 22h00
            </div>
          </div>
        `,
        )
        .openPopup();

      // Bus stops with realistic walking/driving times
      const busStops = [
        {
          name: "Arrêt Université Nord",
          coords: [45.652, 0.158] as [number, number],
          lines: ["Ligne 1", "Ligne 3"],
          walkTime: "2 min",
          driveTime: "1 min",
          description: "Arrêt principal devant l'entrée nord du campus",
        },
        {
          name: "Arrêt Centre-Ville",
          coords: [45.648, 0.155] as [number, number],
          lines: ["Ligne 1", "Ligne 2", "Ligne 4"],
          walkTime: "8 min",
          driveTime: "3 min",
          description: "Connexion vers le centre-ville et la gare",
        },
        {
          name: "Arrêt Résidence Étudiante",
          coords: [45.653, 0.163] as [number, number],
          lines: ["Ligne 3", "Ligne 5"],
          walkTime: "5 min",
          driveTime: "2 min",
          description: "Dessert les résidences universitaires",
        },
        {
          name: "Arrêt Commerces",
          coords: [45.647, 0.162] as [number, number],
          lines: ["Ligne 2", "Ligne 4"],
          walkTime: "12 min",
          driveTime: "4 min",
          description: "Zone commerciale et restaurants",
        },
      ];

      const busIcon = createCustomIcon("#dc2626", "🚌");
      busStops.forEach((stop) => {
        L.marker(stop.coords, { icon: busIcon }).addTo(map).bindPopup(`
            <div style="font-family: system-ui; max-width: 280px;">
              <h3 style="margin: 0 0 8px 0; color: #dc2626; font-size: 16px;">🚌 ${stop.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;">
                ${stop.description}
              </p>
              <div style="background: #fef2f2; padding: 8px; border-radius: 6px; margin-bottom: 8px;">
                <strong style="color: #dc2626;">Lignes:</strong> ${stop.lines.join(", ")}
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div style="background: #f0f9ff; padding: 6px; border-radius: 4px; text-align: center;">
                  <div style="color: #0369a1; font-weight: bold;">🚶‍♂️ À pied</div>
                  <div style="color: #0369a1;">${stop.walkTime}</div>
                </div>
                <div style="background: #f0fdf4; padding: 6px; border-radius: 4px; text-align: center;">
                  <div style="color: #166534; font-weight: bold;">🚗 En voiture</div>
                  <div style="color: #166534;">${stop.driveTime}</div>
                </div>
              </div>
            </div>
          `);
      });

      // Useful places around campus
      const places = [
        {
          name: "Bibliothèque Municipale",
          coords: [45.649, 0.157] as [number, number],
          icon: "📚",
          color: "#7c3aed",
          walkTime: "6 min",
          driveTime: "2 min",
          description: "Grande bibliothèque avec espaces d'étude",
          hours: "9h00 - 20h00",
        },
        {
          name: "Centre Médical",
          coords: [45.651, 0.154] as [number, number],
          icon: "🏥",
          color: "#059669",
          walkTime: "7 min",
          driveTime: "3 min",
          description: "Centre de santé universitaire",
          hours: "8h00 - 18h00",
        },
        {
          name: "Gymnase Universitaire",
          coords: [45.652, 0.165] as [number, number],
          icon: "🏃‍♂️",
          color: "#ea580c",
          walkTime: "4 min",
          driveTime: "2 min",
          description: "Complexe sportif avec piscine",
          hours: "6h00 - 22h00",
        },
        {
          name: "Restaurant Universitaire",
          coords: [45.651, 0.161] as [number, number],
          icon: "🍽️",
          color: "#0891b2",
          walkTime: "3 min",
          driveTime: "1 min",
          description: "Restaurant principal du campus",
          hours: "11h30 - 14h00, 18h30 - 20h00",
        },
        {
          name: "Parking Principal",
          coords: [45.649, 0.164] as [number, number],
          icon: "🅿️",
          color: "#6b7280",
          walkTime: "5 min",
          driveTime: "1 min",
          description: "Parking gratuit pour étudiants",
          hours: "24h/24",
        },
        {
          name: "Gare SNCF",
          coords: [45.646, 0.152] as [number, number],
          icon: "🚂",
          color: "#4338ca",
          walkTime: "15 min",
          driveTime: "5 min",
          description: "Gare principale - TER et Intercités",
          hours: "5h00 - 23h00",
        },
      ];

      places.forEach((place) => {
        const placeIcon = createCustomIcon(place.color, place.icon);
        L.marker(place.coords, { icon: placeIcon }).addTo(map).bindPopup(`
            <div style="font-family: system-ui; max-width: 280px;">
              <h3 style="margin: 0 0 8px 0; color: ${place.color}; font-size: 16px;">
                ${place.icon} ${place.name}
              </h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;">
                ${place.description}
              </p>
              <div style="background: #f9fafb; padding: 8px; border-radius: 6px; margin-bottom: 8px; font-size: 12px;">
                <strong>Horaires:</strong> ${place.hours}
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div style="background: #f0f9ff; padding: 6px; border-radius: 4px; text-align: center;">
                  <div style="color: #0369a1; font-weight: bold;">🚶‍♂️ À pied</div>
                  <div style="color: #0369a1;">${place.walkTime}</div>
                </div>
                <div style="background: #f0fdf4; padding: 6px; border-radius: 4px; text-align: center;">
                  <div style="color: #166534; font-weight: bold;">🚗 En voiture</div>
                  <div style="color: #166534;">${place.driveTime}</div>
                </div>
              </div>
            </div>
          `);
      });

      // Campus area highlight
      const campusArea = L.circle([45.650002, 0.16], {
        color: "#3b82f6",
        fillColor: "#3b82f6",
        fillOpacity: 0.1,
        radius: 200,
        weight: 2,
        dashArray: "5, 5",
      }).addTo(map);

      campusArea.bindPopup(`
        <div style="font-family: system-ui; text-align: center;">
          <h3 style="margin: 0 0 8px 0; color: #1e40af;">🎓 Zone Campus</h3>
          <p style="margin: 0; font-size: 14px; color: #374151;">
            Périmètre principal de l'université
          </p>
        </div>
      `);

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
      <div ref={mapRef} className="h-full w-full z-10 rounded-lg"></div>
      {!isMapReady && (
        <div className="absolute inset-0 bg-white dark:bg-zinc-900 bg-opacity-80 dark:bg-opacity-80 flex flex-col items-center justify-center z-20 rounded-lg">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-600 border-l-blue-500 dark:border-l-blue-400 rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700 dark:text-gray-300">
            Chargement de la carte...
          </p>
        </div>
      )}
    </>
  );
}
