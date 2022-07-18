import React, { FC } from "react";
import { CommunityQuiz } from "../../types/community-quiz-dto";
import CardListItem from "../CardList/CardListItem";
import CardListSection from "../CardListSection";
import CommunityQuizCard from "../CommunityQuizCard/CommunityQuizCard";

const GRID_LENGTH = 5;

export interface Props {
  quizzes?: CommunityQuiz[];
}

const CommunityQuizCardListSection: FC<Props> = ({ quizzes = [] }) => {
  return (
    <CardListSection
      title="Community Quizzes"
      linkHref="/community-quiz"
      linkVerb="community quizzes"
      paddingX={{ base: 3, md: 0 }}
      lessItemsThanGrid={quizzes.length < GRID_LENGTH}
    >
      {quizzes.map((quiz, index) => (
        <CardListItem
          key={quiz.id}
          href={`/community-quiz/${quiz.id}`}
          paddingRight={{
            base: index === quizzes.length - 1 && "12px",
            md: 0,
          }}
        >
          <CommunityQuizCard
            name={quiz.name}
            userId={quiz.userId}
            username={quiz.username}
            maxScore={quiz.maxScore}
            verified={quiz.verified}
            position={{ base: "relative", md: "absolute" }}
            marginLeft={{ base: 3, md: 0 }}
          />
        </CardListItem>
      ))}
    </CardListSection>
  );
};

export default CommunityQuizCardListSection;