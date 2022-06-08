import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import UserProfileMyQuizzes from "../../components/UserProfileMyQuizzes";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";
import { CommunityQuizStatus } from "../../types/community-quiz-status";

export interface Props {
  userId?: number;
  isCurrentUser?: boolean;
  username?: string;
}

const UserProfileMyQuizzesContainer: FC<Props> = ({
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

  if (isLoading) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return (
    <UserProfileMyQuizzes
      quizzes={
        isCurrentUser
          ? quizzes
          : quizzes.filter((x) => x.status !== CommunityQuizStatus.PENDING)
      }
      isCurrentUser={isCurrentUser}
      username={username}
      error={error}
    />
  );
};

export default UserProfileMyQuizzesContainer;
