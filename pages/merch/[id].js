import React from "react";
import { useRouter } from "next/router";

import { Text } from "@chakra-ui/react";

const MerchProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Text>Product page for merch item: {id}</Text>;
};

export default MerchProduct;
