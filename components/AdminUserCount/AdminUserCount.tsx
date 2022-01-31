import React, { FC } from "react";
import { Text, Heading, Flex } from "@chakra-ui/react";

export interface Props {
  count?: number;
}

const AdminUserCount: FC<Props> = ({ count = 0 }) => {
  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Flex direction="column" justifyContent="center" padding={12}>
        <Heading>{count}</Heading>
        <Text fontWeight={600}>TOTAL USERS</Text>
      </Flex>
    </Flex>
  );
};

export default AdminUserCount;
