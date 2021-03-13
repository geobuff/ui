import React from "react";
import { Text } from "@chakra-ui/react";

import UserProfile from "../../components/UserProfile";
import useCurrentUser from "../../hooks/UseCurrentUser";
import useQuizzes from "../../hooks/UseQuizzes";

const UserProfileContainer = () => {
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { quizzes, loading: isLoadingQuizzes } = useQuizzes();

  if (isLoadingUser || isLoadingQuizzes) {
    return <Text>Loading...</Text>;
  }

  return <UserProfile user={user} quizzes={quizzes} />;
};

export default UserProfileContainer;
