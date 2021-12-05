import React, { useEffect, FC } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

const Canceled: FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/shopping-cart");
    }, 3000);
  }, [router]);

  return <Text m={3}>Transaction cancelled. Redirecting back to cart...</Text>;
};

export default Canceled;
