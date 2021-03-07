const CONSTANT = 0.6324555320337;

export const getLevel = (xp) => {
  if (xp === 0) return 1;
  return Math.floor(CONSTANT * Math.sqrt(xp));
};

export const getLevelCompletion = (xp) => {
  return ((CONSTANT * Math.sqrt(xp)) % 1) * 100;
};
