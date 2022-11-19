import React, { FC } from "react";

import { Button, Flex, Skeleton, Text } from "@chakra-ui/react";

import Card from "../../components/Card";

import ArrowLeft from "../../Icons/ArrowLeft";

const CheckoutFormPlaceholder: FC = () => (
  <Flex
    direction="column"
    maxWidth={800}
    marginX="auto"
    marginBottom={14}
    marginTop={{ base: 3, sm: 10, md: 14 }}
    paddingX={3}
    width="100%"
  >
    <Flex mb={3}>
      <Skeleton>
        <Button
          alignItems="center"
          backgroundColor="transparent"
          marginTop={2}
          marginLeft={2}
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          <ArrowLeft height={5} width={5} marginRight={1} />
          <Text fontWeight="bold" fontSize="14px">
            {"Back To Cart"}
          </Text>
        </Button>
      </Skeleton>
    </Flex>
    <Skeleton>
      <Card minHeight="750px" />
    </Skeleton>
  </Flex>
);

export default CheckoutFormPlaceholder;
