import { useRef, useEffect } from "react";

export const useEggSound = () => {
  const tickRef = useRef<HTMLAudioElement | null>(null);
  const crackRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tickRef.current = new Audio("/tick.mp3");
    crackRef.current = new Audio("/crack.mp3");

    if (tickRef.current) {
      tickRef.current.volume = 0.5;
      tickRef.current.preload = "auto";
    }
    if (crackRef.current) crackRef.current.preload = "auto";
  }, []);

  const playTick = () => {
    if (tickRef.current) {
      tickRef.current.currentTime = 0;
      tickRef.current.play().catch(() => {});
    }
  };

  const playCrack = () => {
    if (crackRef.current) {
      crackRef.current.currentTime = 0;
      crackRef.current.play().catch(() => {});
    }
  };

  const stopTick = () => {
    if (tickRef.current) {
      tickRef.current.pause();
      tickRef.current.currentTime = 0;
    }
  };

  return { playTick, playCrack, stopTick };
};
