import React, { FC, useContext } from "react";

import { LanguageContext } from "../../contexts/LanguageContext";

import LandingPage from "../../components/LandingPage/LandingPage";

import { LandingPageRow } from "../../types/landing-page-row";

const PlayMapGames: FC = () => {
  const { t } = useContext(LanguageContext);

  const rows: LandingPageRow[] = [
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/desktop-map-question.png`,
      imageAlt: t.playDailyTrivia.imageAltOne,
      explainer: t.playDailyTrivia.explainerOne,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/mobile-flag-question.png`,
      imageAlt: t.playDailyTrivia.imageAltTwo,
      explainer: t.playDailyTrivia.explainerTwo,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/desktop-image-question.png`,
      imageAlt: t.playDailyTrivia.imageAltThree,
      explainer: t.playDailyTrivia.explainerThree,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/daily-trivia/game-over.png`,
      imageAlt: t.playDailyTrivia.imageAltFour,
      explainer: t.playDailyTrivia.explainerFour,
    },
  ];

  return (
    <LandingPage
      title={t.playDailyTrivia.title}
      description={t.playDailyTrivia.description}
      rows={rows}
      question={t.playDailyTrivia.question}
      actionText={t.playDailyTrivia.actionText}
      actionHref="/daily-trivia/today"
    />
  );
};

export default PlayMapGames;
