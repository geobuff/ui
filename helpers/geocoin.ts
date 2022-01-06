export const calculateIncrease = (score: number, maxScore: number): number => {
  const percent = (score / maxScore) * 100;
  console.log(score);
  console.log(percent);
  if (maxScore <= 112) {
    return percent > 66.6 ? 3 : percent > 33.3 ? 2 : 1;
  }
  return percent > 90
    ? 5
    : percent > 75
    ? 4
    : percent > 50
    ? 3
    : percent > 25
    ? 2
    : 1;
};
