import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import UserProfileMyQuizzes from "../../components/UserProfileMyQuizzes";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";

export interface Props {
  userId?: number;
  isCurrentUser?: boolean;
}

const UserProfileMyQuizzesContainer: FC<Props> = ({
  userId = 0,
  isCurrentUser = false,
}) => {
  const { getAuthConfig } = useContext(CurrentUserContext);

  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/community-quizzes/user/${userId}`, getAuthConfig())
      .then((response) => setQuizzes(response.data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return (
    <UserProfileMyQuizzes
      quizzes={quizzes}
      isCurrentUser={isCurrentUser}
      error={error}
    />
  );
};

export default UserProfileMyQuizzesContainer;
