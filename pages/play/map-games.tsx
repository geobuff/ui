import React, { FC } from "react";
import LandingPage from "../../components/LandingPage/LandingPage";
import { LandingPageRow } from "../../types/landing-page-row";

const rows: LandingPageRow[] = [
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/games-list.png`,
    imageAlt: "Games list example",
    explainer:
      "How well do you know the Countries of the World? Test your Cartography knowledge with our extensive collection of interactive map games!",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/game-start.png`,
    imageAlt: "Game start example",
    explainer:
      "Our responsive UI works seamlessly between desktop and mobile so you can learn on the fly or on at home on the big screen.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/mid-game.png`,
    imageAlt: "Mid-game example",
    explainer:
      "Type your way to victory in this race against the clock. Can you beat the fastest time on the leaderboard?",
  },
];

const PlayMapGames: FC = () => (
  <LandingPage
    title="Play Map Games"
    description="How well do you know the Countries of the World? Test your Cartography and Geography knowledge with our collection of interactive map games!"
    rows={rows}
    question="Heard enough?"
    actionText="Click here to check out our collection!"
    actionHref="/map-games"
  />
);

export default PlayMapGames;
