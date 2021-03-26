import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Button, Heading, Select, Flex, Input } from "@chakra-ui/react";

import LeaderboardTableContainer from "../../containers/LeaderboardTableContainer";
import MainView from "../MainView";

const Leaderboard = ({ quizId, quizzes }) => {
  const [quiz, setQuiz] = useState(quizId === 0 ? quizzes[0].id : quizId);
  const [filterParams, setFilterParams] = useState({ page: 0, limit: 10 });
  const [hasMore, setHasMore] = useState();

  const quizChange = (e) => {
    setQuiz(parseInt(e.target.value));
    setFilterParams({ ...filterParams, page: 0 });
  };

  const rangeChange = (e) => {
    setFilterParams({ ...filterParams, range: e.target.value, page: 0 });
  };

  const userChange = (e) => {
    setFilterParams({ ...filterParams, user: e.target.value, page: 0 });
  };

  const limitChange = (e) => {
    const limit = parseInt(e.target.value);
    setFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const next = () => {
    setFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const previous = () => {
    setFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  return (
    <MainView>
      <Flex
        direction="column"
        maxWidth={{ base: "100%", md: "70%" }}
        marginX={{ base: 2, md: "auto" }}
      >
        <Heading mt={12} ml={3}>
          Leaderboard
        </Heading>
        <Box>
          <Flex my={5}>
            <Select
              width="250px"
              background="#FFFFFF"
              onChange={quizChange}
              value={quiz}
            >
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.name}
                </option>
              ))}
            </Select>
            <Select
              w="200px"
              background="#FFFFFF"
              mx={3}
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
                quizId={quiz}
                filterParams={filterParams}
                setHasMore={setHasMore}
              />
            </Box>
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
      </Flex>
    </MainView>
  );
};

Leaderboard.propTypes = {
  quizId: PropTypes.number,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      maxScore: PropTypes.number,
      time: PropTypes.number,
      mapSVG: PropTypes.string,
      imageUrl: PropTypes.string,
      verb: PropTypes.string,
      apiPath: PropTypes.string,
      route: PropTypes.string,
      hasLeaderboard: PropTypes.bool,
      hasGrouping: PropTypes.bool,
      enabled: PropTypes.bool,
    })
  ),
};

export default Leaderboard;
