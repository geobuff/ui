import React, { useEffect } from "react";
import { useRouter } from "next/router";

import UserProfile from "../../components/UserProfile";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileContainer = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user, router]);

  if (!user) {
    return null;
  }

  return <UserProfile user={user} />;
};

export default UserProfileContainer;
