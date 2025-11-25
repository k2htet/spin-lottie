"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface EggItemProps {
  id: number;
  isBroken: boolean;
  prizeValue: string;
  onCrack: (id: number) => void;
}

export const EggItem = ({
  id,
  isBroken,
  prizeValue,
  onCrack,
}: EggItemProps) => {
  return (
    <div className="relative w-24 h-32 flex justify-center items-end">
      {/* 1. THE PRIZE (Hidden behind egg until broken) */}
      <AnimatePresence>
        {isBroken && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            className="absolute z-0 font-bold text-yellow-400 text-xl drop-shadow-md"
          >
            {prizeValue}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE EGG SVG */}
      <motion.button
        whileHover={!isBroken ? { scale: 1.05, rotate: [0, -5, 5, 0] } : {}}
        whileTap={!isBroken ? { scale: 0.95 } : {}}
        onClick={() => !isBroken && onCrack(id)}
        className="relative z-10 w-full h-full focus:outline-none"
        style={{
          cursor: isBroken ? "default" : "url('/images/hammer.png'), pointer",
        }} // Optional custom cursor
      >
        <AnimatePresence mode="wait">
          {!isBroken ? (
            /* STATE A: WHOLE EGG */
            <motion.svg
              key="whole"
              viewBox="0 0 100 130"
              className="w-full h-full drop-shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }} // Puff out effect
            >
              {/* Egg Shell */}
              <ellipse cx="50" cy="65" rx="45" ry="60" fill="#fef3c7" />{" "}
              {/* Cream color */}
              <path
                d="M50 5 Q95 5 95 65 Q95 125 50 125 Q5 125 5 65 Q5 5 50 5"
                fill="url(#eggGradient)"
              />
              {/* Shine/Highlight */}
              <ellipse
                cx="35"
                cy="35"
                rx="10"
                ry="20"
                fill="white"
                fillOpacity="0.4"
                transform="rotate(-20 35 35)"
              />
              <defs>
                <radialGradient id="eggGradient" cx="0.3" cy="0.3" r="0.8">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="100%" stopColor="#fde68a" />
                </radialGradient>
              </defs>
            </motion.svg>
          ) : (
            /* STATE B: BROKEN EGG SHELLS */
            <motion.svg
              key="broken"
              viewBox="0 0 100 130"
              className="w-full h-full drop-shadow-sm opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Bottom Half */}
              <path
                d="M5 65 Q5 125 50 125 Q95 125 95 65 L80 80 L65 65 L50 85 L35 65 L20 80 L5 65 Z"
                fill="#fde68a"
                stroke="#d97706"
                strokeWidth="2"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
