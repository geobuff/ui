import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";

const ManageRedirect = () => {
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

      axiosClient.post(`/users/${user.id}`, config).then((response) => {
        setIsLoading(false);
        if (user.isPremium && !response.data.isPremium) {
          updateUser({
            ...user,
            isPremium: false,
          });
        }

        router.push("/profile");
      });
    }
  }, [router, user, isUserLoading, updateUser]);

  if (isLoading) {
    return <Text m={3}>Confirming subscription details...</Text>;
  }

  return <Text m={3}>Redirecting back to profile...</Text>;
};

export default ManageRedirect;
