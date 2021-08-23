import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import axiosClient from "../../axios/axiosClient";

interface Payload {
  userId: number;
  sessionId: string;
}

const Success = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading && user) {
      const sessionId = router.query.session_id[0];
      const payload: Payload = {
        userId: user.id,
        sessionId: sessionId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosClient.post("/subscription/premium", payload, config).then(() => {
        setIsLoading(false);
        updateUser({
          ...user,
          isPremium: true,
          stripeSessionId: sessionId,
        });
        setTimeout(() => router.push("/profile"), 50);
      });
    }
  }, [router, user, isUserLoading, updateUser]);

  if (isLoading) {
    return <Text m={3}>Updating subscription...</Text>;
  }

  return <Text m={3}>Redirecting back to profile...</Text>;
};

export default Success;
