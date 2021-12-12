import { Flex, Skeleton } from "@chakra-ui/react";
import React, { FC } from "react";
import Card from "../../components/Card";

const MyOrdersPlaceholder: FC = () => (
  <Flex
    direction="column"
    maxWidth={{ base: "100%", md: 1300 }}
    marginX="auto"
    marginBottom={14}
    marginTop={{ base: 10, sm: 10, md: 14 }}
    paddingX={3}
    width="100%"
  >
    <Skeleton>
      <Card py="100px"></Card>
    </Skeleton>
  </Flex>
);

export default MyOrdersPlaceholder;
