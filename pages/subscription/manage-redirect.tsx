import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";

const ManageRedirect: FC = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();

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
