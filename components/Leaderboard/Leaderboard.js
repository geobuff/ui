import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Heading,
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import LeaderboardTableContainer from "../../containers/LeaderboardTableContainer";
import MainView from "../MainView";

import Twemoji from "../Twemoji";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import Search from "../../Icons/Search";

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
        <Flex alignItems="center" marginTop={12}>
          <Box as="span" marginRight={1} paddingTop={1}>
            <Twemoji emoji="🏆" height="42px" width="42px" />
          </Box>
          <Heading as="h1" ml={3} fontSize="42px" fontWeight="bold">
            {"Leaderboard"}
          </Heading>
        </Flex>

        <Box>
          <Flex my={5} justifyContent="space-between">
            <Flex>
              <Select
                width="250px"
                borderColor="transparent"
                fontWeight="bold"
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
                borderColor="transparent"
                background="#FFFFFF"
                fontWeight="bold"
                mx={3}
                onChange={rangeChange}
              >
                <option value={null}>{"All Time"}</option>
                <option value="week">{"This Week"}</option>
                <option value="day">{"Today"}</option>
              </Select>
            </Flex>

            <Box maxWidth="230px">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search
                    marginTop="6px"
                    marginLeft="12px"
                    height="24px"
                    width="24px"
                    color="#000"
                  />
                </InputLeftElement>
                <Input
                  background="#FFFFFF"
                  borderRadius={8}
                  height="40px"
                  marginLeft="auto"
                  paddingLeft="46px"
                  placeholder="Search username..."
                  onChange={userChange}
                  _placeholder={{ color: "#4d4d4d" }}
                  _hover={{ border: "1px solid #CBD5E0" }}
                />
              </InputGroup>
            </Box>
          </Flex>
          <Flex
            direction="column"
            justifyContent="space-between"
            borderRadius={12}
            minHeight="750px"
            p={5}
            background="#FFFFFF"
          >
            <LeaderboardTableContainer
              quizId={quiz}
              filterParams={filterParams}
              setHasMore={setHasMore}
            />
            <Flex p={5}>
              <Select
                backgroundColor="#F3F3F3"
                border="none"
                fontWeight="bold"
                onChange={limitChange}
                width="150px"
                _hover={{ backgroundColor: "#e6e6e6" }}
              >
                <option value={10}>{"10 Per Page"}</option>
                <option value={20}>{"20 Per Page"}</option>
                <option value={50}>{"50 Per Page"}</option>
              </Select>
              <Box ml="auto">
                <Button
                  backgroundColor="#F3F3F3"
                  disabled={filterParams.page === 0}
                  marginRight={3}
                  onClick={previous}
                  width="120px"
                  _hover={{ backgroundColor: "#e6e6e6" }}
                >
                  <ArrowLeft marginRight="6px" height="20px" width="20px" />
                  {"Previous"}
                </Button>

                <Button
                  backgroundColor="#F3F3F3"
                  disabled={!hasMore}
                  onClick={next}
                  width="120px"
                  _hover={{ backgroundColor: "#e6e6e6" }}
                >
                  {"Next"}
                  <ArrowRight marginLeft="6px" height="20px" width="20px" />
                </Button>
              </Box>
            </Flex>
          </Flex>
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
