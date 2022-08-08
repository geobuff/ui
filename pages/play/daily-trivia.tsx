import React, { FC } from "react";
import LandingPage from "../../components/LandingPage/LandingPage";
import { LandingPageRow } from "../../types/landing-page-row";

const rows: LandingPageRow[] = [
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/desktop-map-question.png`,
    imageAlt: "Desktop map question",
    explainer:
      "Dog ate your Geography homework? Our auto-generating daily trivia is perfect for getting you back up to speed on everything geo-related.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/mobile-flag-question.png`,
    imageAlt: "Mobile flag question",
    explainer:
      "Our responsive UI works seamlessly between desktop and mobile so you can learn on the go or at home on the big screen.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/desktop-image-question.png`,
    imageAlt: "Desktop image question",
    explainer:
      "Questions on maps, flags, landmarks, currencies, rivers, mountains, borders, exports, national sports and more...",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/game-over.png`,
    imageAlt: "Game over example",
    explainer:
      "Copy your score and share with friends so they know you're ready to drop those Countries of the World at a moments notice.",
  },
];

const PlayMapGames: FC = () => (
  <LandingPage
    title="Daily Geography Trivia"
    description="Dog ate your Geography homework? Our auto-generating daily Geography trivia is perfect for getting you back up to speed on everything geo-related."
    rows={rows}
    question="Heard enough?"
    actionText="Click here to get stuck into today's quiz!"
    actionHref="/daily-trivia/today"
  />
);

export default PlayMapGames;
