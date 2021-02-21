import React from "react";
import { Box, Button, Heading, Select, Divider, Flex } from "@chakra-ui/core";

import LeaderboardTableContainer from "../containers/LeaderboardTableContainer";

const filterParams = {
  page: 0,
  limit: 10,
};

const Leaderboard = () => (
  <Box m={5}>
    <Heading my={6}>Leaderboard</Heading>
    <Flex my={5}>
      <Select w="250px">
        <option>Counties of the World</option>
        <option>Capitals of the World</option>
      </Select>
      <Select w="250px" ml={3}>
        <option>All Time</option>
        <option>This Week</option>
        <option>Today</option>
      </Select>
      <Select w="250px" ml="auto">
        <option>mrscrub</option>
        <option>kirbymcscruburry</option>
      </Select>
    </Flex>
    <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
      <Box p={5}>
        <LeaderboardTableContainer filterParams={filterParams} />
      </Box>
      <Divider></Divider>
      <Flex p={5}>
        <Select w="250px">
          <option>10 Per Page</option>
          <option>20 Per Page</option>
          <option>50 Per Page</option>
        </Select>
        <Box ml="auto">
          <Button>Previous</Button>
          <Button>Next</Button>
        </Box>
      </Flex>
    </Box>
  </Box>
);

export default Leaderboard;
