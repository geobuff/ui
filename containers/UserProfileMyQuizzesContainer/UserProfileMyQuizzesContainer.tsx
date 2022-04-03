import React, { FC } from "react";
import UserProfileMyQuizzes from "../../components/UserProfileMyQuizzes";
import useUserCommunityQuizzes from "../../hooks/UseUserCommunityQuizzes";
import UserProfileLeaderboardEntriesPlaceholder from "../../placeholders/UserProfileLeaderboardEntriesPlaceholder";

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
  const { quizzes, isLoading } = useUserCommunityQuizzes(userId);

  if (isLoading) {
    return <UserProfileLeaderboardEntriesPlaceholder />;
  }

  return (
    <UserProfileMyQuizzes
      quizzes={quizzes}
      isCurrentUser={isCurrentUser}
      username={username}
    />
  );
};

export default UserProfileMyQuizzesContainer;
