import React, { FC } from "react";

import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingSpinner: FC = () => (
  <Flex justifyContent="center" minHeight="400px">
    <Spinner marginTop={2} />
  </Flex>
);
