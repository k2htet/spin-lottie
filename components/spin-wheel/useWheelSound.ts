// src/components/SpinWheel/useWheelSound.ts
import { useRef, useEffect } from "react";

export const useWheelSound = () => {
  const tickRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tickRef.current = new Audio("/spin.mp3");
    winRef.current = new Audio("/win.mp3");

    if (tickRef.current) {
      tickRef.current.volume = 0.5;
      tickRef.current.preload = "auto";
    }
  }, []);

  const playTick = () => {
    if (tickRef.current) {
      tickRef.current.pause();
      tickRef.current.currentTime = 0;
      tickRef.current.play().catch(() => {});
    }
  };

  // --- NEW FUNCTION: Force Stop ---
  const stopTick = () => {
    if (tickRef.current) {
      tickRef.current.pause();
      tickRef.current.currentTime = 0;
    }
  };

  const playWin = () => {
    if (winRef.current) {
      winRef.current.currentTime = 0;
      winRef.current.play().catch(() => {});
    }
  };

  // Export the new function
  return { playTick, playWin, stopTick };
};
