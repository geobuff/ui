import React, { FC, useContext } from "react";

import { LanguageContext } from "../../contexts/LanguageContext";

import LandingPage from "../../components/LandingPage/LandingPage";

import { LandingPageRow } from "../../types/landing-page-row";

const CreateCommunityQuizzes: FC = () => {
  const { t } = useContext(LanguageContext);

  const rows: LandingPageRow[] = [
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/quiz-builder.png`,
      imageAlt: t.createCommunityQuizzes.imageAltOne,
      explainer: t.createCommunityQuizzes.explainerOne,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/resources.png`,
      imageAlt: t.createCommunityQuizzes.imageAltTwo,
      explainer: t.createCommunityQuizzes.explainerTwo,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/visibility.png`,
      imageAlt: t.createCommunityQuizzes.imageAltThree,
      explainer: t.createCommunityQuizzes.explainerThree,
    },
    {
      imageUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/my-quizzes.png`,
      imageAlt: t.createCommunityQuizzes.imageAltFour,
      explainer: t.createCommunityQuizzes.explainerFour,
    },
  ];

  return (
    <LandingPage
      title={t.createCommunityQuizzes.title}
      description={t.createCommunityQuizzes.description}
      rows={rows}
      question={t.createCommunityQuizzes.question}
      actionText={t.createCommunityQuizzes.actionText}
      actionHref="/register"
    />
  );
};

export default CreateCommunityQuizzes;
