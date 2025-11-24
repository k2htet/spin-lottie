"use client";

import React, { useEffect, useState } from "react";

// Helper to generate random range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface Particle {
  id: number;
  style: React.CSSProperties;
  colorClass: string;
}

export default function PumpkinExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate random particles only on client-side (fixes Hydration Error)
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => {
      // Randomize direction and rotation
      const dx = random(-150, 150) + "px";
      const dy = random(-150, 150) + "px";
      const r = random(-720, 720) + "deg";

      // Randomize color (Skin vs Guts)
      const isGuts = Math.random() > 0.7;
      const colorClass = isGuts ? "bg-yellow-700" : "bg-orange-500";

      return {
        id: i,
        colorClass,
        style: {
          "--dx": dx,
          "--dy": dy,
          "--r": r,
        } as React.CSSProperties,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="group relative w-32 h-32 cursor-pointer">
      {/* 1. VISIBLE PUMPKIN (Disappears on Hover) */}
      <div className="relative z-10 w-full h-full transition-all duration-75 ease-out group-hover:opacity-0 group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-lg"
        >
          <path
            d="M12 2C12.5523 2 13 2.44772 13 3V4.06185C16.8821 4.50937 20 7.58901 20 11.5C20 16.1944 16.4183 20 12 20C7.58172 20 4 16.1944 4 11.5C4 7.58901 7.11789 4.50937 11 4.06185V3C11 2.44772 11.4477 2 12 2Z"
            fill="#EA580C"
          />
          <path
            d="M9 11.5C9 10.6716 9.67157 10 10.5 10C11.3284 10 12 10.6716 12 11.5C12 12.3284 11.3284 13 10.5 13C9.67157 13 9 12.3284 9 11.5Z"
            fill="#7C2D12"
          />
          <path
            d="M13.5 10C12.6716 10 12 10.6716 12 11.5C12 12.3284 12.6716 13 13.5 13C14.3284 13 15 12.3284 15 11.5C15 10.6716 14.3284 10 13.5 10Z"
            fill="#7C2D12"
          />
          <path
            d="M12 15C11 16.5 13 16.5 12 15ZM10 16C9 17.5 15 17.5 14 16C13.5 15.25 10.5 15.25 10 16Z"
            fill="#7C2D12"
          />
          <path
            d="M12 2V4"
            stroke="#65A30D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2. EXPLOSION PARTICLES (Hidden by default, animate on Group Hover) */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={p.style}
          className={`
            absolute top-1/2 left-1/2 w-2 h-2 rounded-sm shadow-sm pointer-events-none
            opacity-0 z-0
            ${p.colorClass}
            group-hover:animate-explode
          `}
        />
      ))}

      {/* Optional: Text Hint */}
      <div className="absolute -bottom-8 left-0 right-0 text-center text-orange-400 text-sm opacity-70 font-bold">
        Hover Me!
      </div>
    </div>
  );
}
