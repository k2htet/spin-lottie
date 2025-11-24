"use client";

import { useState } from "react";
import { EggItem } from "./EggItem";

// Generate 9 Eggs Mock Data
const INITIAL_EGGS = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  prize: i === 4 ? "500$" : `${(i + 1) * 10} Coins`, // Middle one is the jackpot
  isBroken: false,
}));

export default function EggSmashGame() {
  const [eggs, setEggs] = useState(INITIAL_EGGS);

  // Use a simple ref or state for sound to avoid re-creating audio
  const playCrackSound = () => {
    const audio = new Audio("/sounds/crack.mp3"); // Ensure you have this file
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handleCrack = (id: number) => {
    // 1. Play Sound
    playCrackSound();

    // 2. Update State
    setEggs((prev) =>
      prev.map((egg) => {
        if (egg.id === id) {
          // If it's a big prize, trigger confetti

          return { ...egg, isBroken: true };
        }
        return egg;
      })
    );
  };

  const resetGame = () => {
    setEggs(INITIAL_EGGS.map((e) => ({ ...e, isBroken: false })));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">
          EGG SMASH
        </h1>
        <p className="text-green-200">Pick an egg to reveal your prize!</p>
      </div>

      {/* THE 3x3 GRID */}
      <div className="grid grid-cols-3 gap-6 md:gap-10 p-6 bg-green-800/50 rounded-3xl border-4 border-green-700 shadow-2xl">
        {eggs.map((egg) => (
          <EggItem
            key={egg.id}
            id={egg.id}
            isBroken={egg.isBroken}
            prizeValue={egg.prize}
            onCrack={handleCrack}
          />
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-12 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-lg transition-transform active:scale-95"
      >
        Reset Eggs
      </button>
    </div>
  );
}
