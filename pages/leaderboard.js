import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Divider,
  Flex,
  Input,
} from "@chakra-ui/core";

import LeaderboardTableContainer from "../containers/LeaderboardTableContainer";
import { Quizzes } from "../helpers/quizzes";

const Leaderboard = () => {
  const [quiz, setQuiz] = useState(Quizzes.CountriesOfTheWorld);
  const [filterParams, setFilterParams] = useState({ page: 0, limit: 10 });

  const quizChange = (e) => {
    setQuiz(parseInt(e.target.value));
  };

  const rangeChange = (e) => {
    setFilterParams({ ...filterParams, range: e.target.value });
  };

  const userChange = (e) => {
    setFilterParams({ ...filterParams, user: e.target.value });
  };

  return (
    <Box m={5}>
      <Heading my={6}>Leaderboard</Heading>
      <Flex my={5}>
        <Select w="250px" onChange={quizChange}>
          <option value={Quizzes.CountriesOfTheWorld}>
            Countries of the World
          </option>
          <option value={Quizzes.CapitalsOfTheWorld}>
            Capitals of the World
          </option>
        </Select>
        <Select w="250px" ml={3} onChange={rangeChange}>
          <option value={null}>All Time</option>
          <option value="week">This Week</option>
          <option value="day">Today</option>
        </Select>
        <Input
          w="250px"
          ml="auto"
          placeholder="Enter username..."
          onChange={userChange}
        />
      </Flex>
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Box p={5}>
          <LeaderboardTableContainer quiz={quiz} filterParams={filterParams} />
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
};

export default Leaderboard;
