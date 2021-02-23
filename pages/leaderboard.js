import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Heading,
  Select,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/core";

import LeaderboardTableContainer from "../containers/LeaderboardTableContainer";
import { Quizzes } from "../helpers/quizzes";

const Leaderboard = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [quiz, setQuiz] = useState(Quizzes.CountriesOfTheWorld);
  const [filterParams, setFilterParams] = useState({ page: 0, limit: 10 });
  const [hasMore, setHasMore] = useState();

  useEffect(() => {
    if (quizId !== undefined) {
      setQuiz(parseInt(quizId));
    }
  }, [quizId]);

  const quizChange = (e) => {
    setQuiz(parseInt(e.target.value));
  };

  const rangeChange = (e) => {
    setFilterParams({ ...filterParams, range: e.target.value });
  };

  const userChange = (e) => {
    setFilterParams({ ...filterParams, user: e.target.value });
  };

  const limitChange = (e) => {
    const limit = parseInt(e.target.value);
    setFilterParams({ ...filterParams, limit: limit });
  };

  const next = () => {
    setFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const previous = () => {
    setFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  return (
    <Box m={5}>
      <Heading>Leaderboard</Heading>
      <Flex>
        <Box w="70%">
          <Flex my={5}>
            <Select
              w="250px"
              background="#FFFFFF"
              onChange={quizChange}
              value={quiz}
            >
              <option value={Quizzes.CountriesOfTheWorld}>
                Countries of the World
              </option>
              <option value={Quizzes.CapitalsOfTheWorld}>
                Capitals of the World
              </option>
            </Select>
            <Select
              w="200px"
              background="#FFFFFF"
              ml={3}
              onChange={rangeChange}
            >
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
          <Box borderRadius={12} p={5} background="#FFFFFF">
            <Box p={5}>
              <LeaderboardTableContainer
                quiz={quiz}
                filterParams={filterParams}
                setHasMore={setHasMore}
              />
            </Box>
            <Divider borderWidth={2} />
            <Flex p={5}>
              <Select w="150px" background="#EDF2F7" onChange={limitChange}>
                <option value={10}>10 Per Page</option>
                <option value={20}>20 Per Page</option>
                <option value={50}>50 Per Page</option>
              </Select>
              <Box ml="auto">
                <Button
                  disabled={filterParams.page === 0}
                  mr={3}
                  onClick={previous}
                >
                  Previous
                </Button>
                <Button disabled={!hasMore} onClick={next}>
                  Next
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box
          backgroundColor="#C4C4C4"
          borderRadius={12}
          ml={12}
          w="30%"
          textAlign="center"
        >
          <Text color="#868686">TEMPLATE</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Leaderboard;
