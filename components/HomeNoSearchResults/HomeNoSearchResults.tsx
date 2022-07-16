import React, { FC } from "react";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";

export interface Props {
  filter?: string;
}

const HomeNoSearchResults: FC<Props> = ({ filter = "" }) => (
  <Flex width="100%" paddingX={3}>
    <Alert
      status="info"
      borderRadius={6}
      p={5}
      mt={3}
      mb={"100px"}
      width="100%"
    >
      <AlertIcon />
      {`There were no results for '${filter}'`}
    </Alert>
  </Flex>
);

export default HomeNoSearchResults;
