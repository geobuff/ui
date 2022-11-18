import React, { FC } from "react";

import { formatDate } from "../../../helpers/date";
import { QuizSearchResults } from "../../../types/quiz-search-results";
import CardListItem from "../../CardList/CardListItem";
import CommunityQuizCard from "../../CommunityQuizCard";
import QuizCard from "../../QuizCard";
import TriviaCard from "../../TriviaCard";

export interface Props {
  searchResults?: QuizSearchResults;
}

const HomeSearchResultItems: FC<Props> = ({ searchResults = null }) => {
  return (
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
      {searchResults?.quizzes.map((quiz) => (
        <CardListItem
          key={quiz.id}
          href={`/quiz/${quiz?.route}`}
          isEnabled={quiz.enabled}
        >
          <QuizCard
            name={quiz.name}
            imageUrl={quiz.imageUrl}
            time={quiz.time}
            maxScore={quiz.maxScore}
            plural={quiz.plural}
            position={{ base: "relative", md: "absolute" }}
            marginLeft={3}
          />
        </CardListItem>
      ))}
    </>
  );
};

export default HomeSearchResultItems;
