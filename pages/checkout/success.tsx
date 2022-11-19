import React, { FC, useEffect } from "react";

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Success: FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/orders");
    }, 3000);
  }, [router]);

  return <Text m={3}>Redirecting...</Text>;
};

export default Success;
