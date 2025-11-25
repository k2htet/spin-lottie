// src/components/SpinWheel/useHowlerSound.ts
import { useRef, useEffect } from "react";
import { Howl } from "howler";

export const useHowler = () => {
  const tickRef = useRef<Howl | null>(null);
  const winRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Tick Sound
    tickRef.current = new Howl({
      src: ["/spin.mp3"],
      volume: 0.5,
      rate: 1.0,
      // Important for rapid ticking: allows sounds to overlap slightly
      // so it doesn't sound "choppy"
      pool: 10,
    });

    // Initialize Win Sound
    winRef.current = new Howl({
      src: ["/win.mp3"],
      volume: 1.0,
    });

    // Cleanup on unmount
    return () => {
      tickRef.current?.unload();
      winRef.current?.unload();
    };
  }, []);

  const playTick = () => {
    // Howler manages the "play" instance automatically.
    // We just call play. No need to reset currentTime.
    tickRef.current?.play();
  };

  const playWin = () => {
    winRef.current?.play();
  };

  const stopTick = () => {
    tickRef.current?.stop();
  };

  return { playTick, playWin, stopTick };
};
