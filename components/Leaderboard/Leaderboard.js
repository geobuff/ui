import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import {
  Box,
  Button,
  Heading,
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
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
  const [hasMore, setHasMore] = useState(false);

  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

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

  if (shouldRenderOnMobile === undefined) {
    return null;
  }

  return (
    <MainView>
      <Head>
        <title>Leaderboard - GeoBuff</title>
      </Head>
      <Flex
        direction="column"
        maxWidth={{ base: "100%", sm: "90%", md: "75%" }}
        marginX="auto"
        marginBottom={10}
      >
        <Flex
          alignItems="center"
          marginTop={12}
          paddingX={{ base: 3, sm: 0, md: 0 }}
        >
          <Box as="span" marginRight={1} paddingTop={1}>
            <Twemoji
              emoji="🏆"
              height={{ base: "26px", sm: "36px", md: "42px" }}
              width={{ base: "26px", sm: "36px", md: "42px" }}
            />
          </Box>
          <Heading
            as="h1"
            ml={{ base: 2, md: 3 }}
            fontSize={{ base: "26px", sm: "36px", md: "42px" }}
            fontWeight="bold"
          >
            {"Leaderboard"}
          </Heading>
        </Flex>

        <Box>
          <Flex
            my={5}
            justifyContent="space-between"
            flexWrap="wrap"
            paddingX={{ base: 2.5, sm: 0, md: 0 }}
          >
            <Flex
              flexGrow={4}
              marginBottom={2}
              flexWrap="wrap"
              width={{ base: "100%", md: "inherit" }}
            >
              <Select
                maxWidth={{ base: "100%", sm: "48.5%", md: "235px" }}
                borderColor="transparent"
                fontWeight="bold"
                background="#FFFFFF"
                onChange={quizChange}
                value={quiz}
                marginRight={{ base: 0, sm: 4, md: 3 }}
                marginBottom={2}
                isTruncated
              >
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.name}
                  </option>
                ))}
              </Select>
              <Select
                maxWidth={{ base: "100%", sm: "48.5%", md: "235px" }}
                borderColor="transparent"
                background="#FFFFFF"
                fontWeight="bold"
                onChange={rangeChange}
              >
                <option value={null}>{"All Time"}</option>
                <option value="week">{"This Week"}</option>
                <option value="day">{"Today"}</option>
              </Select>
            </Flex>

            <Flex
              marginLeft={{ base: 0, md: 2 }}
              width={{ base: "100%", sm: "100%", md: "230px" }}
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search
                    marginTop="6px"
                    marginLeft="12px"
                    height="24px"
                    width="24px"
                    color="gray.500"
                  />
                </InputLeftElement>
                <Input
                  background="#FFFFFF"
                  borderRadius={6}
                  height="40px"
                  marginLeft="auto"
                  paddingLeft="46px"
                  placeholder="Search users..."
                  onChange={userChange}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ border: "1px solid #CBD5E0" }}
                />
              </InputGroup>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            justifyContent="space-between"
            borderRadius={6}
            minHeight="750px"
            padding={{ base: 3, md: 5 }}
            marginX={{ base: 0, sm: 0, md: 0 }}
            background="#FFFFFF"
          >
            <LeaderboardTableContainer
              quizId={quiz}
              filterParams={filterParams}
              setHasMore={setHasMore}
            />
            <Flex padding={{ base: 2, sm: 5 }}>
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
                  marginRight={{ base: 2, sm: 3 }}
                  onClick={previous}
                  width={{ base: "42px", md: "120px" }}
                  _hover={{ backgroundColor: "#e6e6e6" }}
                >
                  <ArrowLeft
                    marginRight={{ base: 0, md: "6px" }}
                    height="20px"
                    width="20px"
                  />
                  {shouldRenderOnMobile && "Previous"}
                </Button>

                <Button
                  backgroundColor="#F3F3F3"
                  role="group"
                  disabled={!hasMore}
                  onClick={next}
                  width={{ base: "42px", md: "120px" }}
                  _hover={{ backgroundColor: "#e6e6e6" }}
                >
                  {shouldRenderOnMobile && "Next"}
                  <ArrowRight
                    marginLeft={{ base: 0, md: "6px" }}
                    height="20px"
                    width="20px"
                  />
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
