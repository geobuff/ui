import React, { useEffect, FC, useContext } from "react";
import { useRouter } from "next/router";

import UserProfile from "../../components/UserProfile";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const UserProfileContainer: FC = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user, router]);

  return <UserProfile user={user} />;
};

export default UserProfileContainer;
