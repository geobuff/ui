import React, { FC, useContext } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../contexts";

import { QuizCardContainer } from ".";
import { Quiz } from "../types/quiz";

const GRID_LENGTH = 5;

interface Props {
  isLoading?: boolean;
  title?: string;
  linkHref?: string;
  linkVerb?: string;
  quizzes?: Quiz[];
}

export const CardListSectionContainer: FC<Props> = ({
  isLoading = false,
  title = "",
  linkHref = "",
  linkVerb = "",
  quizzes = [],
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useContext(LanguageContext);

  return (
    <CardListSection
      isMobile={isMobile}
      isLoading={isLoading}
      lessItemsThanGrid={quizzes.length < GRID_LENGTH}
      title={title}
      linkHref={linkHref}
      linkText={`${t.global.seeAll}${isMobile ? "" : ` ${linkVerb}`}`}
      paddingX={{ base: 3, md: 0 }}
    >
      {quizzes.map((quiz, index) => (
        <QuizCardContainer
          key={quiz.id}
          index={index}
          quizCount={quizzes.length}
          quiz={quiz}
        />
      ))}
    </CardListSection>
  );
};
