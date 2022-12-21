import React, { FC, useContext } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../contexts/LanguageContext";

import { TriviaCardContainer } from ".";
import { Trivia } from "../types/trivia";

const GRID_LENGTH = 5;

interface Props {
  trivia?: Trivia[];
  isLoading?: boolean;
}

export const TriviaCardListSectionContainer: FC<Props> = ({
  trivia = [],
  isLoading = false,
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <CardListSection
      isMobile={isMobile}
      isLoading={isLoading}
      lessItemsThanGrid={trivia.length < GRID_LENGTH}
      title={t.global.dailyTriviaUpper}
      linkHref="/daily-trivia"
      linkText={`${t.global.seeAll}${
        isMobile ? "" : ` ${t.global.dailyTriviaLower}`
      }`}
      marginTop={0}
      paddingX={{ base: 3, md: 0 }}
    >
      {trivia.map((quiz, index) => (
        <TriviaCardContainer
          key={quiz.id}
          index={index}
          triviaCount={trivia.length}
          trivia={quiz}
        />
      ))}
    </CardListSection>
  );
};
