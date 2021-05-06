import React, { useEffect } from "react";
import { useRouter } from "next/router";

import UserProfile from "../../components/UserProfile";
import useCurrentUser from "../../hooks/UseCurrentUser";
import useQuizzes from "../../hooks/UseQuizzes";

const UserProfileContainer = () => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { quizzes } = useQuizzes();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  if (!user || !quizzes) {
    return null;
  }

  return <UserProfile user={user} quizzes={quizzes} />;
};

export default UserProfileContainer;
