import React, { FC } from "react";
import CardListSection from "../CardListSection";
import CardListItem from "../CardList/CardListItem";
import QuizCard from "../QuizCard/QuizCard";
import { Quiz } from "../../types/quiz";

export interface Props {
  title?: string;
  linkHref?: string;
  linkVerb?: string;
  quizzes?: Quiz[];
}

const QuizCardListSection: FC<Props> = ({
  title = "Map Games",
  linkHref = "/map-games",
  linkVerb = "map games",
  quizzes = [],
}) => {
  return (
    <CardListSection
      title={title}
      linkHref={linkHref}
      linkVerb={linkVerb}
      paddingX={{ base: 3, md: 0 }}
    >
      {quizzes.map((quiz, index) => (
        <CardListItem
          key={quiz.id}
          href={`/quiz/${quiz?.route}`}
          isEnabled={quiz.enabled}
          paddingRight={{
            base: index === quizzes.length - 1 && "12px",
            md: 0,
          }}
        >
          <QuizCard
            name={quiz.name}
            imageUrl={quiz.imageUrl}
            time={quiz.time}
            maxScore={quiz.maxScore}
            plural={quiz.plural}
            position={{ base: "relative", md: "absolute" }}
            marginLeft={{ base: 3, md: 0 }}
          />
        </CardListItem>
      ))}
    </CardListSection>
  );
};

export default QuizCardListSection;
