import React, { FC, useContext } from "react";

import { LanguageContext } from "../../contexts/LanguageContext";

import LandingPage from "../../components/LandingPage/LandingPage";

import { LandingPageRow } from "../../types/landing-page-row";

const PlayMapGames: FC = () => {
  const { t } = useContext(LanguageContext);

  const rows: LandingPageRow[] = [
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/game-start.png`,
      imageAlt: t.playFlagGames.imageAltOne,
      explainer: t.playFlagGames.explainerOne,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/flag-drag.png`,
      imageAlt: t.playFlagGames.imageAltTwo,
      explainer: t.playFlagGames.explainerTwo,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/flag-games/flag-drop.png`,
      imageAlt: t.playFlagGames.imageAltThree,
      explainer: t.playFlagGames.explainerThree,
    },
  ];

  return (
    <LandingPage
      title={t.playFlagGames.title}
      description={t.playFlagGames.description}
      rows={rows}
      question={t.playFlagGames.question}
      actionText={t.playFlagGames.actionText}
      actionHref="/flag-games"
    />
  );
};

export default PlayMapGames;
