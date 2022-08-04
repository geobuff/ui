import React, { FC } from "react";
import { Heading, Flex } from "@chakra-ui/react";

const AdminMappingsHeader: FC = () => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    marginBottom={5}
    marginX={2}
  >
    <Heading fontSize="24px">{"Mappings"}</Heading>
  </Flex>
);

export default AdminMappingsHeader;
