import React, { useState, FC, ChangeEvent, useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import { debounce } from "throttle-debounce";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Fade,
  IconButton,
  useBreakpointValue,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import MainView from "../components/MainView";
import HeroBanner from "../components/HeroBanner";

import Search from "../Icons/Search";
import SolidCloseCircle from "../Icons/SolidCloseCircle";
import axiosClient from "../axios";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { GetStaticProps } from "next";
import { formatDate, isDateBefore } from "../helpers/date";
import TriviaCard from "../components/TriviaCard";
import QuizCard from "../components/QuizCard";
import DelayedRender from "../components/DelayedRender";
import { FilteredTrivia } from "../components/TriviaList/TriviaList";
import CardListSection from "../components/CardListSection";
import CardListItem from "../components/CardList/CardListItem";

const Home: FC<AppProps> = ({ pageProps }) => {
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClearInput = (): void => {
    setInputValue("");
    setFilter("");
    setSearchResults([]);
  };

  const onChange = (value: string): void => {
    setFilter(value);
  };

  const handleDebounceChange = debounce(500, (event) => {
    onChange(event);
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    handleDebounceChange(event.target.value);

    if (event.target.value?.length === 2) {
      setIsSearching(true);
    }
  };

  useEffect(() => {
    if (filter.trim().length < 3) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    axiosClient
      .post(`/quizzes/all`, {
        filter,
        page: 0,
        limit: 15,
        orderByPopularity: true,
      })
      .then((response) => {
        setSearchResults(response.data.quizzes || []);
      })
      .finally(() => setIsSearching(false));
  }, [filter]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const numberToSlice = isMobile ? 14 : 15;

  const mapQuizzes = pageProps?.mapQuizzes?.slice(0, numberToSlice);
  const flagQuizzes = pageProps?.flagQuizzes?.slice(0, numberToSlice);
  const filteredTrivia = pageProps?.trivia
    .map((quiz: FilteredTrivia) => ({
      ...quiz,
      isActive: isDateBefore(
        DateTime.fromISO(formatDate(quiz.date)),
        DateTime.fromISO(new Date().toISOString())
      ),
    }))
    .filter((t) => t.isActive)
    .slice(0, isMobile ? 7 : 5);

  const searchResultItems = useMemo(
    () => (
      <>
        {searchResults?.map((quiz) => (
          <CardListItem
            key={quiz.id}
            href={quiz.enabled ? `/quiz/${quiz?.route}` : "/"}
          >
            <QuizCard
              name={quiz.name}
              imageUrl={quiz.imageUrl}
              time={quiz.time}
              maxScore={quiz.maxScore}
              verb={quiz.verb}
              position={{ base: "relative", md: "absolute" }}
              marginLeft={3}
            />
          </CardListItem>
        ))}
      </>
    ),
    [searchResults]
  );

  return (
    <MainView>
      <HeroBanner
        title="We Stand With Ukraine"
        textColor="#F9DB3C"
        backgroundColor="#2650B3"
        backgroundImageUrl="/world-map-ukraine.svg"
      />
      <Box>
        <Box
          mx="auto"
          position="relative"
          left={0}
          right={0}
          bottom="21px"
          maxWidth={{
            base: "85%",
            sm: "80%",
            md: "40%",
            lg: "600px",
          }}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search
                marginTop="8px"
                marginLeft="14px"
                height="24px"
                width="24px"
                color="gray.500"
              />
            </InputLeftElement>
            <Input
              paddingLeft="44px"
              width="100%"
              size="lg"
              onChange={handleChange}
              placeholder="Enter quiz name..."
              value={inputValue}
            />
            <InputRightElement>
              <Fade in={inputValue?.length > 0}>
                <IconButton
                  aria-label="close circle"
                  position="absolute"
                  top="11px"
                  right={3}
                  maxHeight="22px"
                  minWidth="22px"
                  backgroundColor="transparent"
                  borderRadius={25}
                  onClick={handleClearInput}
                  color="#a6a6a6"
                  fontWeight="bold"
                  _hover={{
                    backgroundColor: "transparent",
                    color: "#5c5c5c",
                  }}
                >
                  <SolidCloseCircle height={5} width={5} padding={0} />
                </IconButton>
              </Fade>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>

      <Box
        width="100%"
        maxWidth={1300}
        marginTop={2}
        marginBottom={{ base: 5, md: 16 }}
        marginLeft="auto"
        marginRight="auto"
        paddingX={{ base: 0, md: 10 }}
        minHeight="400px"
      >
        {!!searchResults.length && !isSearching && filter ? (
          <>
            {!searchResults.length && !isSearching ? (
              <Flex width="100%" paddingX={3}>
                <Alert
                  status="info"
                  borderRadius={6}
                  p={5}
                  mt={3}
                  mb={"100px"}
                  width="100%"
                >
                  <AlertIcon />
                  {`There were no results for '${filter}'`}
                </Alert>
              </Flex>
            ) : (
              <CardListSection
                title={
                  isSearching
                    ? `Searching for '${filter.trim()}' `
                    : `Search results for '${filter.trim()}'`
                }
                isLoading={isSearching}
                paddingX={3}
              >
                {searchResultItems}
              </CardListSection>
            )}
          </>
        ) : (
          <>
            {filter?.length > 2 ? (
              <>
                {!searchResults.length && !isSearching ? (
                  <Flex width="100%" paddingX={3}>
                    <Alert
                      status="info"
                      borderRadius={6}
                      p={5}
                      mt={3}
                      mb={"100px"}
                      maxWidth="100%"
                    >
                      <AlertIcon />
                      {`There were no results for '${filter}'`}
                    </Alert>
                  </Flex>
                ) : (
                  <CardListSection
                    title={
                      isSearching
                        ? `Searching for '${filter.trim()}' `
                        : `Search results for '${filter.trim()}'`
                    }
                    isLoading={isSearching}
                    paddingX={3}
                  >
                    {searchResults?.map((quiz) => (
                      <CardListItem
                        key={quiz.id}
                        href={quiz.enabled ? `/quiz/${quiz?.route}` : "/"}
                      >
                        <QuizCard
                          name={quiz.name}
                          imageUrl={quiz.imageUrl}
                          time={quiz.time}
                          maxScore={quiz.maxScore}
                          verb={quiz.verb}
                          position={{ base: "relative", md: "absolute" }}
                          marginLeft={3}
                        />
                      </CardListItem>
                    ))}
                  </CardListSection>
                )}
              </>
            ) : (
              <Box minHeight="776px">
                <DelayedRender shouldFadeIn waitBeforeShow={100}>
                  <CardListSection
                    title="Daily Trivia"
                    linkHref="/daily-trivia"
                    linkVerb="daily trivia"
                    marginTop={0}
                    paddingX={{ base: 3, md: 0 }}
                  >
                    {filteredTrivia.map((quiz, index) => (
                      <CardListItem
                        key={quiz.id}
                        href={`/daily-trivia/${formatDate(quiz.date)}`}
                        paddingRight={{
                          base: index === filteredTrivia.length - 1 && "12px",
                          md: 0,
                        }}
                      >
                        <TriviaCard
                          name={quiz.name}
                          position={{ base: "relative", md: "absolute" }}
                          marginLeft={{ base: 3, md: 0 }}
                        />
                      </CardListItem>
                    ))}
                  </CardListSection>

                  <CardListSection
                    title="Map Games"
                    linkHref="/map-games"
                    linkVerb="map games"
                    paddingX={{ base: 3, md: 0 }}
                  >
                    {mapQuizzes.map((quiz, index) => (
                      <CardListItem
                        key={quiz.id}
                        href={quiz.enabled ? `/quiz/${quiz?.route}` : "/"}
                        paddingRight={{
                          base: index === filteredTrivia.length - 1 && "12px",
                          md: 0,
                        }}
                      >
                        <QuizCard
                          name={quiz.name}
                          imageUrl={quiz.imageUrl}
                          time={quiz.time}
                          maxScore={quiz.maxScore}
                          verb={quiz.verb}
                          position={{ base: "relative", md: "absolute" }}
                          marginLeft={{ base: 3, md: 0 }}
                        />
                      </CardListItem>
                    ))}
                  </CardListSection>

                  <CardListSection
                    title="Flag Games"
                    linkHref="/flag-games"
                    linkVerb="flag games"
                    paddingX={{ base: 3, md: 0 }}
                  >
                    {flagQuizzes.map((quiz, index) => (
                      <CardListItem
                        key={quiz.id}
                        href={quiz.enabled ? `/quiz/${quiz?.route}` : "/"}
                        paddingRight={{
                          base: index === filteredTrivia.length - 1 && "12px",
                          md: 0,
                        }}
                      >
                        <QuizCard
                          name={quiz.name}
                          imageUrl={quiz.imageUrl}
                          time={quiz.time}
                          maxScore={quiz.maxScore}
                          verb={quiz.verb}
                          position={{ base: "relative", md: "absolute" }}
                          marginLeft={{ base: 3, md: 0 }}
                        />
                      </CardListItem>
                    ))}
                  </CardListSection>
                </DelayedRender>
              </Box>
            )}
          </>
        )}
      </Box>
    </MainView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 15,
    orderByPopularity: true,
  };

  const { data: mapData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...body,
      filter: "map",
    }
  );

  const { data: flagData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...body,
      filter: "flag",
    }
  );

  const { data: triviaData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    {
      page: 0,
      limit: 10,
    }
  );

  if (!mapData && !flagData && !triviaData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mapQuizzes: mapData.quizzes,
      flagQuizzes: flagData.quizzes,
      trivia: triviaData.trivia,
    },
  };
};

export default Home;
