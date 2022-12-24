import React, { FC, useEffect, useState } from "react";

import UserProfileMyQuizzes from "../components/UserProfileMyQuizzes";

import axiosClient from "../axios";
import { CommunityQuizStatus } from "../types/community-quiz-status";

interface Props {
  userId?: number;
  isCurrentUser?: boolean;
  username?: string;
}

export const UserProfileMyQuizzesContainer: FC<Props> = ({
  userId = 0,
  isCurrentUser = false,
  username,
}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/community-quizzes/user/${userId}`)
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserProfileMyQuizzes
      quizzes={
        isCurrentUser
          ? quizzes
          : quizzes.filter((x) => x.status !== CommunityQuizStatus.PENDING)
      }
      isLoading={isLoading}
      isCurrentUser={isCurrentUser}
      username={username}
      error={error}
    />
  );
};
