import React, { FC, useContext } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { formatDate } from "../../helpers/date";
import { Trivia } from "../../types/trivia";
import CardListItem from "../CardList/CardListItem";
import TriviaCard from "../TriviaCard/TriviaCard";

const GRID_LENGTH = 5;

export interface Props {
  trivia?: Trivia[];
  isLoading?: boolean;
}

const TriviaCardListSection: FC<Props> = ({
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
        <CardListItem
          key={quiz.id}
          href={`/daily-trivia/${formatDate(quiz.date)}`}
          paddingRight={{
            base: index === trivia.length - 1 && "12px",
            md: 0,
          }}
        >
          <TriviaCard
            name={quiz.name}
            maxScore={quiz.maxScore}
            position={{ base: "relative", md: "absolute" }}
            marginLeft={{ base: 3, md: 0 }}
          />
        </CardListItem>
      ))}
    </CardListSection>
  );
};

export default TriviaCardListSection;
