import React, { useEffect, useState, FC, useContext } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import axiosClient from "../../axios/axiosClient";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const ManageRedirect: FC = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, updateUser } = useContext(
    CurrentUserContext
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading && user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosClient.get(`/users/${user.id}`, config).then((response) => {
        setIsLoading(false);
        if (user.isPremium && !response.data.isPremium) {
          updateUser({
            ...user,
            isPremium: false,
          });
        }

        setTimeout(() => router.push("/profile"), 50);
      });
    }
  }, [router, user, isUserLoading, updateUser]);

  if (isLoading) {
    return <Text m={3}>Confirming subscription details...</Text>;
  }

  return <Text m={3}>Redirecting back to profile...</Text>;
};

export default ManageRedirect;
