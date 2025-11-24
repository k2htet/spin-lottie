// src/components/SpinWheel/wheelConfig.ts
import { Gem, Gift, Ticket, Frown, Ghost, Snowflake } from "lucide-react";
import bat from "@/public/lottie/halloween-bats.json";
import pumpkinWinner from "@/public/lottie/winner.json";
import ch from "@/public/lottie/ch.json";
import cp from "@/public/lottie/cp.json";
// 1. Map your JSON "prize_type" to Visuals
export const PRIZE_STYLE_MAP: any = {
  AC: {
    color: "#F59E0B", // Gold
    icon: Gem,
    label: "Credits",
  },
  THANKS: {
    color: "#64748B", // Slate Grey
    icon: Frown,
    label: "Try Again",
  },
  ITEM: {
    color: "#8B5CF6", // Purple
    icon: Gift,
    label: "Inventory",
  },
  FREE_MINI_GAME: {
    color: "#10B981", // Emerald
    icon: Ticket,
    label: "Bonus Game",
  },
};

// 2. Create Themes (Skins)
export const WHEEL_THEMES: any = {
  DEFAULT: {
    backgroundClass: "bg-slate-900",
    borderClass: "border-gray-700",
    pointerColor: "#EF4444", // Red
    colors: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"], // Fallback colors
    lottieBg: null, // path to json
    lottieWin: null,
  },
  HALLOWEEN: {
    backgroundClass: "bg-[#1a0505]", // Dark Red/Black
    borderClass: "border-orange-600",
    pointerColor: "#F97316",
    colors: ["#270b0b", "#ea580c", "#4a044e", "#525252"], // Spooky palette
    icon: Ghost, // Theme specific icon overlay
    // You would download these from LottieFiles and put in /public/lottie/
    lottieBg: bat,
    lottieWin: pumpkinWinner,
  },
  CHRISTMAS: {
    backgroundClass: "bg-[#022c22]", // Dark Green
    borderClass: "border-red-600",
    pointerColor: "#DC2626",
    colors: ["#15803d", "#b91c1c", "#f59e0b", "#ea580c"], // Green, Red, Gold, White
    icon: Snowflake,
    lottieBg: ch,
    lottieWin: cp,
  },
};
