import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

const Canceled = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/profile");
  }, [router]);

  return <Text m={3}>Redirecting back to profile...</Text>;
};

export default Canceled;
