// src/components/SpinWheel/index.tsx
"use client";

import React, { useState, useRef } from "react";
import * as motion from "motion/react-client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { WheelCanvas } from "./wheel-canvas";
import { WHEEL_THEMES } from "./wheel-config";
import { useWheelSound } from "./useWheelSound";
import { Play } from "lucide-react";
import Snowfall from "react-snowfall";
import { cubicBezier, useAnimation } from "motion/react";

interface SpinWheelProps {
  data: any;
  themeName?: "DEFAULT" | "HALLOWEEN" | "CHRISTMAS";
}

export default function SpinWheel({
  data,
  themeName = "DEFAULT",
}: SpinWheelProps) {
  const controls = useAnimation();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const { playTick, playWin, stopTick } = useWheelSound();

  const theme = WHEEL_THEMES[themeName];
  const segments = data.segments;

  const lastIndexRef = useRef(0);

  const rotationRef = useRef(0);

  const handleSpin = async () => {
    // 1. Validation
    const today = new Date();
    const endDate = new Date(data.end_date);

    if (isSpinning) return;
    if (!data.is_active || today > endDate) {
      alert("This wheel is expired or inactive.");
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    lastIndexRef.current = 0;

    // 2. SIMULATE API
    const winningIndex = 2; // Hardcoded for testing

    // 3. PHYSICS CALCULATION
    const segmentAngle = 360 / segments.length;

    // We want to land on the CENTER of the winning index
    const winningSectorAngle = winningIndex * segmentAngle + segmentAngle / 2;

    // 4. Calculate Rotation
    const spins = 5;
    const baseRotation = 360 * spins;
    const currentRotation = rotationRef.current;

    // MATH FIX:
    // We calculate the next nearest "0" (Top) position:
    // (current + base + remainder fix)
    // Then we simply SUBTRACT the winning angle to bring that segment back to 0 (Top)
    const resetToZero = 360 - (currentRotation % 360);

    const targetRotation =
      currentRotation + baseRotation + resetToZero - winningSectorAngle;

    // 5. Randomness (Safe zone: 40% of slice width)
    const randomOffset =
      Math.random() * segmentAngle * 0.8 - segmentAngle * 0.4;

    const finalRotation = targetRotation + randomOffset;

    // Save state
    rotationRef.current = finalRotation;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 2,
        ease: cubicBezier(0.12, 0, 0.39, 0),
        onUpdate: (latestValue) => {
          const currentStep = Math.floor(
            Math.abs(latestValue as number) / segmentAngle
          );
          if (currentStep !== lastIndexRef.current) {
            playTick();
            lastIndexRef.current = currentStep;
          }
        },
      },
    });

    // 6. Stop Sound & Show Winner
    stopTick(); // Force stop the clicking sound

    playWin();

    setWinner(segments[winningIndex]);
    setIsSpinning(false);
    if (lottieRef.current) lottieRef.current.play();
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-dvh w-full overflow-hidden ${theme.backgroundClass} transition-colors duration-500`}
    >
      {themeName === "CHRISTMAS" && (
        <Snowfall
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        />
      )}
      {/* LAYER 1: BACKGROUND LOTTIE */}
      {theme.lottieBg && (
        <div className="absolute z-0 -top-10  opacity-40 pointer-events-none pt-2">
          <Lottie
            animationData={theme.lottieBg}
            className="w-md md:w-2xl object-cover bg-top"
          />
        </div>
      )}

      <div className="relative z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
        {/* POINTER */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-20">
          {/* FIX: Use bracket syntax for arbitrary values in Tailwind */}
          <div
            className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[50px] drop-shadow-xl"
            style={{ borderTopColor: theme.pointerColor }}
          />
        </div>

        {/* SPINNING SVG */}
        <motion.div
          className={`w-full h-full rounded-full border-8 shadow-2xl bg-white ${theme.borderClass}`}
          animate={controls}
          initial={{ rotate: 0 }}
          style={{ willChange: "transform" }}
        >
          <WheelCanvas segments={segments} themeColors={theme.colors} />
        </motion.div>

        {/* CENTERED SPIN BUTTON (overlays the wheel center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={handleSpin}
            disabled={isSpinning || !!winner}
            className={`pointer-events-auto z-20 w-20 h-20  rounded-full flex items-center justify-center text-white shadow-xl
          transform transition-all hover:scale-105 active:scale-95
           disabled:cursor-not-allowed
          bg-gradient-to-r from-yellow-500 to-red-600`}
            aria-pressed={isSpinning}
            aria-busy={isSpinning}
            aria-label={isSpinning ? "Spinning" : "Spin the wheel"}
            title={isSpinning ? "Spinning" : "Spin the wheel"}
          >
            {/* Icon-only label — keep icon static while spinning (no rotation) */}
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* LAYER 5: WINNER MODAL */}
      {winner && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative z-50 pointer-events-none flex justify-center items-center">
            {theme.lottieWin && (
              <Lottie
                animationData={theme.lottieWin}
                lottieRef={lottieRef}
                loop={false}
                className="w-lg "
              />
            )}

            {/* Display Winning Prize Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="absolute bottom-10 text-center pointer-events-auto"
              style={{ willChange: "transform" }}
            >
              <button
                onClick={() => setWinner(null)}
                className="bg-white text-black px-8 py-2 rounded-full font-bold hover:bg-gray-200"
              >
                Collect
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
