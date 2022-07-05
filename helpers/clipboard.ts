export const getTriviaScoreMessage = (
  score: number,
  maxScore: number,
  date: string,
  path: string
): string =>
  `GeoBuff Daily - ${date}\n\n${getScoreEmojis(score, maxScore)}\n\n${
    process.env.NEXT_PUBLIC_SITE_URL
  }${path}`;

export const getCommunityQuizScoreMessage = (
  score: number,
  maxScore: number,
  name: string,
  path: string
): string =>
  `Community Quiz - ${name}\n\n${getScoreEmojis(score, maxScore)}\n\n${
    process.env.NEXT_PUBLIC_SITE_URL
  }${path}`;

const getScoreEmojis = (score: number, maxScore: number): string => {
  let result = "🦾🌎";
  for (let i = 0; i < maxScore; i++) {
    if (i < score) {
      result += "🟩";
    } else {
      result += "🟥";
    }
  }
  return result;
};
