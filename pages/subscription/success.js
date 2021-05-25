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
      const sessionId = router.query.session_id;
      const payload = {
        userId: user.id,
        sessionId: sessionId,
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
          stripeSessionId: sessionId,
        });
        router.push("/profile");
      });
    }
  }, [router, user, isUserLoading, updateUser]);

  return (
    <Text m={3}>
      Successfully updated subscription. Redirecting back to profile...
    </Text>
  );
};

export default Success;
