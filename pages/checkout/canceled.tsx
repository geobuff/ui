import React, { FC, useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios";

const Canceled: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const email = router.query.email as string;
      if (email != undefined) {
        axiosClient.delete(`/orders/email/${email}`).finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            router.push("/merch");
          }, 1000);
        });
      }
    }
  }, [router]);

  if (isLoading) {
    return <Text m={3}>Cancelling transaction...</Text>;
  }

  return <Text m={3}>Redirecting...</Text>;
};

export default Canceled;
