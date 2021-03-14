import React from "react";
import {
  Box,
  Divider,
  Skeleton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Button,
} from "@chakra-ui/react";

const UserProfileSummaryPlaceholder = () => (
  <Box mb={6}>
    <Skeleton
      height={"120px"}
      width={"120px"}
      mx="auto"
      my={6}
      borderRadius={12}
    />
    <Divider />
    <FormControl my={6}>
      <Skeleton>
        <FormLabel>Username</FormLabel>
      </Skeleton>
      <Skeleton>
        <Input />
      </Skeleton>
    </FormControl>
    <FormControl my={6}>
      <Skeleton>
        <FormLabel>Email</FormLabel>
      </Skeleton>
      <Skeleton>
        <Input />
      </Skeleton>
    </FormControl>
    <Flex>
      <FormControl>
        <Skeleton>
          <FormLabel>Country</FormLabel>
        </Skeleton>
        <Skeleton>
          <Select />
        </Skeleton>
      </FormControl>
      <Box mt="auto" mx={6}>
        <Skeleton>
          <Button>UPDATE</Button>
        </Skeleton>
      </Box>
    </Flex>
  </Box>
);

export default UserProfileSummaryPlaceholder;
