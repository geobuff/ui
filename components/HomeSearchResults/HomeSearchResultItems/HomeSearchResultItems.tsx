import React, { FC } from "react";

import { QuizCardContainer, TriviaCardContainer } from "../../../containers";

import { QuizSearchResults } from "../../../types/quiz-search-results";
import CardListItem from "../../CardList/CardListItem";
import CommunityQuizCard from "../../CommunityQuizCard";

export interface Props {
  searchResults?: QuizSearchResults;
}

const HomeSearchResultItems: FC<Props> = ({ searchResults = null }) => (
  <>
    {searchResults?.trivia.map((quiz, index) => (
      <TriviaCardContainer
        key={quiz.id}
        index={index}
        trivia={quiz}
        triviaCount={searchResults?.trivia.length}
      />
    ))}
    {searchResults?.communityQuizzes.map((quiz) => (
      <CardListItem key={quiz.id} href={`/community-quiz/${quiz.id}`}>
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
    {searchResults?.quizzes.map((quiz, index) => (
      <QuizCardContainer
        key={quiz.id}
        index={index}
        quizCount={searchResults?.quizzes.length}
        quiz={quiz}
      />
    ))}
  </>
);

export default HomeSearchResultItems;
