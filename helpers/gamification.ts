const CONSTANT = 0.6324555320337;

export const getLevel = (xp: number): number => {
  if (xp === 0) return 1;
  return Math.floor(CONSTANT * Math.sqrt(xp));
};

export const getLevelCompletion = (xp: number): number => {
  return ((CONSTANT * Math.sqrt(xp)) % 1) * 100;
};
