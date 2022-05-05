import React, { useEffect, FC } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

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
