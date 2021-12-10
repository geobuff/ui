import React, { useEffect, useState, FC, useContext } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const Success: FC = () => {
  const router = useRouter();
  const { clearCart } = useContext(ShoppingCartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearCart();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    setTimeout(() => {
      router.push("/orders");
    }, 2000);
  }, [router]);

  if (isLoading) {
    return <Text m={3}>Transaction successful. Clearing cart...</Text>;
  }

  return <Text m={3}>Redirecting...</Text>;
};

export default Success;
