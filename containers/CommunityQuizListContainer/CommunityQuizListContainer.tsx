import React, { FC, useEffect, useState } from "react";

import CommunityQuizList from "../../components/CommunityQuizList";

import axiosClient from "../../axios";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder";

const CommunityQuizListContainer: FC = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .post(`${process.env.NEXT_PUBLIC_API_URL}/community-quizzes/all`, {
        page: 0,
        limit: 30,
      })
      .then((response) => {
        setQuizzes(response.data.quizzes);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={20} />;
  }

  return <CommunityQuizList quizzes={quizzes} />;
};

export default CommunityQuizListContainer;
