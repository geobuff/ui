import React, { useEffect, FC, useState } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
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
          }, 2000);
        });
      }
    }
  }, [router]);

  if (isLoading) {
    return <Text m={3}>Cancelling transaction...</Text>;
  }

  return <Text m={3}>Redirecting back to cart...</Text>;
};

export default Canceled;
