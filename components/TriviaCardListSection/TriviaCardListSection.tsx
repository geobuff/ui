import React, { FC, useContext } from "react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { formatDate } from "../../helpers/date";
import { Trivia } from "../../types/trivia";
import CardListItem from "../CardList/CardListItem";
import CardListSection from "../CardListSection";
import TriviaCard from "../TriviaCard/TriviaCard";

const GRID_LENGTH = 5;

export interface Props {
  trivia?: Trivia[];
}

const TriviaCardListSection: FC<Props> = ({ trivia = [] }) => {
  const { t } = useContext(LanguageContext);

  return (
    <CardListSection
      title={t.global.dailyTriviaUpper}
      linkHref="/daily-trivia"
      linkVerb={t.global.dailyTriviaLower}
      marginTop={0}
      paddingX={{ base: 3, md: 0 }}
      lessItemsThanGrid={trivia.length < GRID_LENGTH}
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
