import React, { FC } from "react";
import UserProfileMyQuizzes from "../../components/UserProfileMyQuizzes";
import useUserCommunityQuizzes from "../../hooks/UseUserCommunityQuizzes";
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
  const { quizzes, isLoading } = useUserCommunityQuizzes(userId);

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
    />
  );
};

export default UserProfileMyQuizzesContainer;
