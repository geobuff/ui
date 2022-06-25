export const getTriviaScoreMessage = (
  score: number,
  maxScore: number,
  date: string,
  path: string
): string => {
  let result = `GeoBuff Daily - ${date}\n\n🦾🌎`;
  for (let i = 0; i < maxScore; i++) {
    if (i < score) {
      result += "🟩";
    } else {
      result += "🟥";
    }
  }

  return result + `\n\n${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
};
