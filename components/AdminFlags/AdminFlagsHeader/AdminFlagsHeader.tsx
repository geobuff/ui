import React, { FC } from "react";
import { Heading, Flex } from "@chakra-ui/react";

const AdminFlagsHeader: FC = () => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    marginBottom={5}
    marginX={2}
  >
    <Heading fontSize="24px">{"Flags"}</Heading>
  </Flex>
);

export default AdminFlagsHeader;
