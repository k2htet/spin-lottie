// simple theme and defaults for Egg Hit game
export const EGG_THEME = {
  colors: ["#F97316", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"],
  eggSize: 54,
};

export const SAMPLE_EGGS = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  name: `Prize ${i + 1}`,
  amount: (i + 1) * 10,
}));
