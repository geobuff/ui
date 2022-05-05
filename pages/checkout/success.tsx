import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

const Success: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    setTimeout(() => {
      router.push("/orders");
    }, 3000);
  }, [router]);

  if (isLoading) {
    return <Text m={3}>Transaction successful. Clearing cart...</Text>;
  }

  return <Text m={3}>Redirecting...</Text>;
};

export default Success;
