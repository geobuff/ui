import React, { FC } from "react";
import { Trivia } from "../../types/trivia";
import CardListSection from "../CardListSection";
import CardListItem from "../CardList/CardListItem";
import TriviaCard from "../TriviaCard/TriviaCard";
import { formatDate } from "../../helpers/date";

const GRID_LENGTH = 5;

export interface Props {
  trivia?: Trivia[];
}

const TriviaCardListSection: FC<Props> = ({ trivia = [] }) => {
  return (
    <CardListSection
      title="Daily Trivia"
      linkHref="/daily-trivia"
      linkVerb="daily trivia"
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