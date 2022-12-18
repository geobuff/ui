import React, { FC, useContext } from "react";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts";

import { QuizCardContainer } from "../../../containers";

import { formatDate } from "../../../helpers/date";
import { QuizSearchResults } from "../../../types/quiz-search-results";
import CardListItem from "../../CardList/CardListItem";
import CommunityQuizCard from "../../CommunityQuizCard";
import TriviaCard from "../../TriviaCard";

export interface Props {
  searchResults?: QuizSearchResults;
}

const HomeSearchResultItems: FC<Props> = ({ searchResults = null }) => (
  <>
    {searchResults?.trivia.map((quiz) => (
      <CardListItem
        key={quiz.id}
        href={`/daily-trivia/${formatDate(quiz.date)}`}
      >
        <TriviaCard
          name={quiz.name}
          maxScore={quiz.maxScore}
          position={{ base: "relative", md: "absolute" }}
          marginLeft={{ base: 3, md: 0 }}
        />
      </CardListItem>
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
