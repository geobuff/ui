import React, { FC } from "react";

import {
  CommunityQuizCardContainer,
  QuizCardContainer,
  TriviaCardContainer,
} from "../../../containers";

import { QuizSearchResults } from "../../../types/quiz-search-results";

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
    {searchResults?.communityQuizzes.map((quiz, index) => (
      <CommunityQuizCardContainer
        key={quiz.id}
        index={index}
        quizCount={searchResults?.communityQuizzes.length}
        quiz={quiz}
      />
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
