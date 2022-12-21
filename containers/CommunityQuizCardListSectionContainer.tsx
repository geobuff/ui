import React, { FC, useContext } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../contexts/LanguageContext";

import { CommunityQuizCardContainer } from ".";
import { CommunityQuiz } from "../types/community-quiz-dto";

const GRID_LENGTH = 5;

export interface Props {
  quizzes?: CommunityQuiz[];
  isLoading?: boolean;
}

export const CommunityQuizCardListSectionContainer: FC<Props> = ({
  quizzes = [],
  isLoading = false,
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <CardListSection
      isMobile={isMobile}
      isLoading={isLoading}
      lessItemsThanGrid={quizzes.length < GRID_LENGTH}
      title={t.global.communityQuizzesUpper}
      linkHref="/community-quiz"
      linkText={`${t.global.seeAll}${
        isMobile ? "" : ` ${t.global.communityQuizzesLower}`
      }`}
      paddingX={{ base: 3, md: 0 }}
    >
      {quizzes.map((quiz, index) => (
        <CommunityQuizCardContainer
          key={quiz.id}
          index={index}
          quizCount={quizzes.length}
          quiz={quiz}
        />
      ))}
    </CardListSection>
  );
};
