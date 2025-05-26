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
      className="relative w-full h-full bg-gray-50 border border-gray-300 rounded-lg overflow-hidden shadow-md"
    >
      <div className="w-full h-full overflow-auto">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 350 300"
          style={{
            background: "white",
            backgroundImage:
              "repeating-linear-gradient(#f8f8f8 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, #f8f8f8 0 1px, transparent 1px 20px)",
          }}
        >
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>

          {rooms.map((room) => {
            const hasCourse = !!room.courseName;
            const roomNameYOffset = hasCourse ? -5 : 0;
            const courseNameYOffset = 8;

            return (
              <g key={room.id}>
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  rx="3"
                  ry="3"
                  fill={room.color}
                  stroke={selectedRoom?.id === room.id ? "#3B82F6" : "#666"}
                  strokeWidth={selectedRoom?.id === room.id ? "2" : "1"}
                  filter="url(#shadow)"
                  className="cursor-pointer hover:opacity-90 transition-all duration-200 room-rect"
                  onClick={() => handleRoomClick(room)}
                />
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + roomNameYOffset}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={hasCourse ? "9" : "10"}
                  fontWeight="bold"
                  fill="#333"
                  pointerEvents="none"
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
                    fill="#555"
                    pointerEvents="none"
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
          className="fixed bg-white rounded-lg shadow-lg z-20 border border-gray-200/75 animate-popup-in overflow-hidden"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "360px",
          }}
        >
          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: selectedRoom.color }}
          ></div>

          <div className="p-5">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

            <h3 className="font-semibold text-xl text-gray-800 mb-1 pr-8">
              {selectedRoom.name}
            </h3>

            {selectedRoom.courseName && (
              <p className="text-md text-blue-600 font-medium mb-3">
                {selectedRoom.courseName}
              </p>
            )}

            <p className="text-sm text-gray-600 mb-4">
              {selectedRoom.description}
            </p>

            {(selectedRoom.teacher || selectedRoom.schedule) && (
              <div className="space-y-2 border-t border-gray-200 pt-3 mt-3">
                {selectedRoom.teacher && (
                  <div className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400"
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
                    <strong className="font-medium mr-1">Professeur:</strong>
                    {selectedRoom.teacher}
                  </div>
                )}

                {selectedRoom.schedule && (
                  <div className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400"
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
                    <strong className="font-medium mr-1">Horaire:</strong>
                    {selectedRoom.schedule}
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 text-xs text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1.5"
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
              Clickez sur X pour fermer
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popup-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-popup-in {
          animation: popup-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
