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
}

const rooms: Room[] = [
  {
    id: "BD",
    name: "BD",
    description: "Salle BD",
    x: 10,
    y: 10,
    width: 100,
    height: 80,
    color: "#A7C7E7",
  },
  {
    id: "FFA",
    name: "FFA",
    description: "Salle FFA",
    x: 120,
    y: 10,
    width: 100,
    height: 80,
    color: "#C1E1C1",
  },
  {
    id: "Sarabandes",
    name: "Sarabandes",
    description: "Salle Sarabandes",
    x: 230,
    y: 10,
    width: 100,
    height: 80,
    color: "#FFCCCB",
  },
  {
    id: "Iris 1",
    name: "Iris 1",
    description: "Salle Iris 1",
    x: 10,
    y: 100,
    width: 320,
    height: 40,
    color: "#F5F5F5",
  },
  {
    id: "Iris 2",
    name: "Iris 2",
    description: "Salle Iris 2",
    x: 10,
    y: 150,
    width: 150,
    height: 100,
    color: "#FFE4B5",
  },
  {
    id: "Salle",
    name: "Salle",
    description: "Salle",
    x: 170,
    y: 150,
    width: 160,
    height: 100,
    color: "#E6E6FA",
  },
  {
    id: "Entrée",
    name: "Entrée",
    description: "Entrée",
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

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectedRoom &&
        svgRef.current &&
        !svgRef.current.contains(e.target as Node)
      ) {
        setSelectedRoom(null);
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

          {/* Render rooms */}
          {rooms.map((room) => (
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
                className="cursor-pointer hover:opacity-90 transition-all duration-200"
                onClick={() => handleRoomClick(room)}
              />
              <text
                x={room.x + room.width / 2}
                y={room.y + room.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#333"
                pointerEvents="none"
              >
                {room.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Popup centered in the middle of the map */}
      {selectedRoom && (
        <div
          className="fixed bg-white p-4 rounded-lg shadow-lg z-20 border border-gray-200 animate-fade-in"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "220px",
          }}
        >
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closePopup();
            }}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-1 pr-5 text-gray-800">
            {selectedRoom.name}
          </h3>
          <div className="w-12 h-1 bg-gray-200 mb-2 rounded-full"></div>
          <p className="text-gray-700">{selectedRoom.description}</p>
          <div className="mt-3 text-xs text-gray-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
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
            Click outside to close
          </div>
        </div>
      )}

      {/* Legend - shows room types */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md z-10 border border-gray-100">
        <h4 className="text-xs font-semibold mb-1">Legend</h4>
        <div className="flex flex-col gap-1">
          {[...new Set(rooms.map((r) => r.description))].map((desc, i) => (
            <div key={i} className="flex items-center gap-1 text-xs">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: rooms.find((r) => r.description === desc)
                    ?.color,
                }}
              ></div>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
