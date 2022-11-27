import React, { FC, useContext } from "react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import LandingPage from "../../components/LandingPage/LandingPage";

import { LandingPageRow } from "../../types/landing-page-row";

const PlayMapGames: FC = () => {
  const { t } = useContext(LanguageContext);

  const rows: LandingPageRow[] = [
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/games-list.png`,
      imageAlt: t.playMapGames.imageAltOne,
      explainer: t.playMapGames.explainerOne,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/game-start.png`,
      imageAlt: t.playMapGames.imageAltTwo,
      explainer: t.playMapGames.explainerTwo,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/map-games/mid-game.png`,
      imageAlt: t.playMapGames.imageAltThree,
      explainer: t.playMapGames.explainerThree,
    },
  ];

  return (
    <LandingPage
      title={t.playMapGames.title}
      description={t.playMapGames.description}
      rows={rows}
      question={t.playMapGames.question}
      actionText={t.playMapGames.actionText}
      actionHref="/map-games"
    />
  );
};

export default PlayMapGames;
