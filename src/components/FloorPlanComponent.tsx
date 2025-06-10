"use client";

import { useState, useRef, useEffect } from "react";

interface Room {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  courseName?: string;
  teacher?: string;
  schedule?: string;
}

const rooms: Room[] = [
  {
    id: "BD",
    name: "Salle BD",
    description: "Salle de Bureau des Étudiants",
    x: 10,
    y: 10,
    width: 100,
    height: 80,
    color: "#A7C7E7",
    teacher: "Responsable BDE",
    schedule: "Ouvert 9h-17h",
  },
  {
    id: "FFA",
    name: "Salle FFA",
    description: "Salle de cours",
    x: 120,
    y: 10,
    width: 100,
    height: 80,
    color: "#C1E1C1",
    courseName: "Physique I",
    teacher: "Mme. Lefevre",
    schedule: "Mar 14h-16h",
  },
  {
    id: "Sarabandes",
    name: "Sarabandes",
    description: "Amphithéâtre",
    x: 230,
    y: 10,
    width: 100,
    height: 80,
    color: "#FFCCCB",
    courseName: "Conférence IA",
    teacher: "Dr. Martin",
    schedule: "Jeu 10h-11h",
  },
  {
    id: "Iris 1",
    name: "Iris 1",
    description: "Salle Informatique",
    x: 10,
    y: 100,
    width: 320,
    height: 40,
    color: "#F5F5F5",
    courseName: "Algorithmique",
    teacher: "M. Durand",
    schedule: "Lun 9h-12h",
  },
  {
    id: "Iris 2",
    name: "Iris 2",
    description: "Salle de Projet",
    x: 10,
    y: 150,
    width: 150,
    height: 100,
    color: "#FFE4B5",
    courseName: "Projet Web",
    teacher: "Mme. Petit",
    schedule: "Mer 13h-17h",
  },
  {
    id: "Salle",
    name: "Salle Polyvalente",
    description: "Espace commun",
    x: 170,
    y: 150,
    width: 160,
    height: 100,
    color: "#E6E6FA",
  },
  {
    id: "Entrée",
    name: "Entrée",
    description: "Accueil",
    x: 130,
    y: 260,
    width: 80,
    height: 30,
    color: "#D3D3D3",
  },
];

export default function FloorPlanComponent() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const closePopup = () => {
    setSelectedRoom(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const popupElement = document.getElementById("room-popup");
      if (
        selectedRoom &&
        popupElement &&
        !popupElement.contains(e.target as Node)
      ) {
        if (svgRef.current && !svgRef.current.contains(e.target as Node)) {
          closePopup();
        } else if (
          svgRef.current &&
          svgRef.current.contains(e.target as Node)
        ) {
          let targetElement = e.target as SVGElement;
          let isRoomRect = false;
          while (targetElement && targetElement !== svgRef.current) {
            if (
              targetElement.tagName === "rect" &&
              targetElement.classList.contains("room-rect")
            ) {
              isRoomRect = true;
              break;
            }
            targetElement = targetElement.parentNode as SVGElement;
          }
          if (!isRoomRect) {
            closePopup();
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedRoom]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden"
    >
      <div className="w-full h-full overflow-auto">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 350 300"
          className="bg-white dark:bg-zinc-800"
          style={{
            backgroundImage:
              "repeating-linear-gradient(rgba(0,0,0,0.03) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0 1px, transparent 1px 20px)",
          }}
        >
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow
                dx="2"
                dy="2"
                stdDeviation="3"
                floodOpacity="0.15"
              />
            </filter>
            <filter
              id="hover-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="3"
                dy="3"
                stdDeviation="5"
                floodOpacity="0.25"
              />
            </filter>
          </defs>

          {rooms.map((room) => {
            const hasCourse = !!room.courseName;
            const roomNameYOffset = hasCourse ? -5 : 0;
            const courseNameYOffset = 8;
            const isSelected = selectedRoom?.id === room.id;

            return (
              <g key={room.id}>
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  rx="6"
                  ry="6"
                  fill={room.color}
                  stroke={isSelected ? "#3B82F6" : "rgba(0,0,0,0.1)"}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  filter={isSelected ? "url(#hover-shadow)" : "url(#shadow)"}
                  className="cursor-pointer hover:brightness-105 transition-all duration-300 room-rect"
                  style={{
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                  onClick={() => handleRoomClick(room)}
                />
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + roomNameYOffset}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={hasCourse ? "9" : "10"}
                  fontWeight="600"
                  fill="rgba(0,0,0,0.8)"
                  pointerEvents="none"
                  className="select-none"
                >
                  {room.name}
                </text>
                {hasCourse && room.courseName && (
                  <text
                    x={room.x + room.width / 2}
                    y={
                      room.y +
                      room.height / 2 +
                      roomNameYOffset +
                      courseNameYOffset
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fill="rgba(0,0,0,0.6)"
                    pointerEvents="none"
                    className="select-none"
                  >
                    {room.courseName.length > room.width / 5
                      ? room.courseName.substring(
                          0,
                          Math.floor(room.width / 5) - 2,
                        ) + "..."
                      : room.courseName}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {selectedRoom && (
        <div
          id="room-popup"
          className="absolute bg-white dark:bg-zinc-800 rounded-xl shadow-2xl z-20 border border-gray-200/50 dark:border-zinc-600/50 animate-popup-in overflow-hidden backdrop-blur-sm"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "380px",
            maxHeight: "80%",
          }}
        >
          <div
            className="h-2 w-full"
            style={{ backgroundColor: selectedRoom.color }}
          ></div>

          <div className="p-6 overflow-y-auto max-h-full">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                closePopup();
              }}
              aria-label="Close popup"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100 mb-1 pr-10">
              {selectedRoom.name}
            </h3>

            {selectedRoom.courseName && (
              <p className="text-md text-blue-600 dark:text-blue-400 font-medium mb-3">
                {selectedRoom.courseName}
              </p>
            )}

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {selectedRoom.description}
            </p>

            {(selectedRoom.teacher || selectedRoom.schedule) && (
              <div className="space-y-3 border-t border-gray-200 dark:border-zinc-600 pt-4 mt-4">
                {selectedRoom.teacher && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <svg
                      className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <strong className="font-medium mr-2">Professeur:</strong>
                    {selectedRoom.teacher}
                  </div>
                )}

                {selectedRoom.schedule && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <svg
                      className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <strong className="font-medium mr-2">Horaire:</strong>
                    {selectedRoom.schedule}
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cliquez sur X pour fermer
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popup-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-popup-in {
          animation: popup-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
