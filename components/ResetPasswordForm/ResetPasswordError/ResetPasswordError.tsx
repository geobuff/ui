import React, { FC } from "react";

import { Button, Flex, Text, ScaleFade } from "@chakra-ui/react";
import Link from "next/link";

import SolidSubtractCircle from "../../../Icons/SolidSubtractCircle";

interface Props {
  error?: string;
}

const ResetPasswordError: FC<Props> = ({ error="" }) => (
  <Flex marginBottom={4} alignItems="center" direction="column">
    <ScaleFade initialScale={0.75} in>
      <SolidSubtractCircle
        marginBottom={2}
        height="60px"
        width="56px"
        color="red.500"
      />
    </ScaleFade>
    <Text
      textAlign="center"
      fontSize="14px"
      fontWeight="bold"
      marginBottom={4}
      maxWidth={{ base: "250px", md: "100%" }}
    >
      {error}
    </Text>

    <Link href="/forgot-password">
      <Button size="sm" variant="outline" color="gray.600">
        {"Request New Token"}
      </Button>
    </Link>
  </Flex>
);

export default ResetPasswordError;
