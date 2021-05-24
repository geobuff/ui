import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";

const Success = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      const payload = {
        userId: user.id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosClient.post("/subscription/premium", payload, config).then(() => {
        updateUser({
          ...user,
          isPremium: true,
        });
        router.push("/profile");
      });
    }
  }, [router, user, isUserLoading]);

  return (
    <Text m={3}>
      Successfully updated subscription. Redirecting back to profile...
    </Text>
  );
};

export default Success;
