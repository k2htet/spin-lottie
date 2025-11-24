// src/app/spin-wheel/page.tsx
import SpinWheel from "@/components/spin-wheel";

// The JSON you provided
const wheelData = {
  name: "Halloween Special",
  type: "SPIN_WHEEL",
  schedule_type: "DAILY",
  is_active: true,
  start_date: "2024-08-01T00:00:00Z",
  end_date: "2025-012-01T00:00:00Z", // Adjusted to future date so it works
  setting: { is_kyc_verify: true },
  segments: [
    {
      name: "Grand Prize",
      prize_type: "ITEM",
      inventory_id: 123,
      percentage: 30,
      index: 0,
    },
    {
      name: "Better Luck Next Time",
      prize_type: "THANKS",
      percentage: 70,
      index: 1,
    },
    {
      name: "Bonus Cash",
      prize_type: "AC",
      amount: 1000,
      percentage: 70,
      index: 2,
    },
    {
      name: "Mini Game",
      prize_type: "FREE_MINI_GAME",
      amount: 12,
      free_mini_game_id: 3,
      percentage: 70,
      index: 3,
    },
  ],
};

export default function SpinPage() {
  return (
    <main>
      {/* Change theme to 'CHRISTMAS' or 'DEFAULT' to test skins */}
      <SpinWheel data={wheelData} themeName="CHRISTMAS" />
    </main>
  );
}
