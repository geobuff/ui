import React from "react";
import { Text } from "@chakra-ui/react";

import UserProfile from "../../components/UserProfile";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileContainer = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <UserProfile user={user} />;
};

export default UserProfileContainer;
