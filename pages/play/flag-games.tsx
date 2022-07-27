import React, { FC } from "react";
import LandingPage from "../../components/LandingPage/LandingPage";
import { LandingPageRow } from "../../types/landing-page-row";

const rows: LandingPageRow[] = [
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/game-start.png`,
    imageAlt: "Game start",
    explainer:
      "How well do you know the Flags of the World? Test your Vexillology skills with our collection of interactive drag and drop flag games!",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/flag-drag.png`,
    imageAlt: "Flag drag example",
    explainer: "Drag your way to victory in this race against the clock.",
  },
  {
    imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/flag-drop.png`,
    imageAlt: "Flag drop example",
    explainer:
      "Our responsive UI let's you know when you're on the right track or when you've accidently got Costa Rica mixed up with Croatia.",
  },
];

const PlayMapGames: FC = () => (
  <LandingPage
    title="Play Flag Games"
    description="How well do you know the Flags of the World? Test your Vexillology and Geography skills with our collection of interactive drag and drop flag games!"
    rows={rows}
    question="Heard enough?"
    actionText="Click here to check out our collection!"
    actionHref="/flag-games"
  />
);

export default PlayMapGames;
