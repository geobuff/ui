import React, { useState, useCallback, FC, ChangeEvent } from "react";
import type { AppProps } from "next/app";
import Link from "next/link";

import { debounce } from "debounce";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Fade,
  IconButton,
  Heading,
  AspectRatio,
  Link as ChakraLink,
  useBreakpointValue,
  Flex,
  Alert,
  AlertIcon,
  useMediaQuery,
  GridItem,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import MainView from "../components/MainView";
import HeroBanner from "../components/HeroBanner";

import Search from "../Icons/Search";
import SolidCloseCircle from "../Icons/SolidCloseCircle";
import axiosClient from "../axios";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { GetStaticProps } from "next";
import CardList from "../components/CardList";
import { formatDate, isDateBefore } from "../helpers/date";
import TriviaCard from "../components/TriviaCard";
import QuizCard from "../components/QuizCard";
import DelayedRender from "../components/DelayedRender";
import { FilteredTrivia } from "../components/TriviaList/TriviaList";
import CardListSection from "../components/CardListSection";
import CardListItem from "../components/CardList/CardListItem";

const Home: FC<AppProps> = ({ pageProps }) => {
  const [filter, setFilter] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClearInput = (): void => {
    setInputValue("");
    setFilter("");
  };

  const onChange = (value: string): void => {
    setFilter(value);
  };

  const handleDebounceChange = useCallback(debounce(onChange, 300), [onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setInputValue(value);
    handleDebounceChange(value);
  };

  const getFilteredQuizzes = () => {
    if (filter) {
      return [
        ...pageProps?.mapQuizzes.filter((quiz) =>
          quiz.name.toLowerCase().includes(filter.toLocaleLowerCase())
        ),
        ...pageProps?.flagQuizzes.filter((quiz) =>
          quiz.name.toLowerCase().includes(filter.toLocaleLowerCase())
        ),
      ];
    }
    return [];
  };

  const filteredQuizzes = getFilteredQuizzes();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLargerThan1205] = useMediaQuery("(min-width: 1205)");

  const numberToSlice = isMobile ? 14 : 15;

  const filteredTrivia = pageProps?.trivia
    .map((quiz: FilteredTrivia) => ({
      ...quiz,
      isActive: isDateBefore(
        DateTime.fromISO(formatDate(quiz.date)),
        DateTime.fromISO(new Date().toISOString())
      ),
    }))
    .filter((t) => t.isActive)
    .slice(0, 5);

  // TODO: see if we can move this to just content
  if (isLargerThan1205 === undefined || isMobile === undefined) return null;

  return (
    <MainView>
      <HeroBanner />
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
                  _hover={{ backgroundColor: "transparent", color: "#5c5c5c" }}
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
        paddingX={{ base: 3, md: 10 }}
      >
        {filter ? (
          <>
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={{ base: 1, md: 6 }}
            >
              <Heading fontSize={{ base: 16, md: "2xl" }}>
                {`Search results for '${filter}'`}
              </Heading>
            </Flex>
            {!filteredQuizzes.length ? (
              <Alert status="info" borderRadius={6} p={5} mt={5}>
                <AlertIcon />
                {`There were no results for '${filter}'`}
              </Alert>
            ) : (
              <CardList>
                {filteredQuizzes?.map((quiz) => (
                  <Link
                    key={quiz.id}
                    href={`/daily-trivia/${formatDate(quiz.date)}`}
                  >
                    <>
                      {isMobile ? (
                        <Box
                          display="inline-block"
                          width="200px"
                          height="216px"
                          marginRight={3}
                          paddingY={3}
                        >
                          <QuizCard
                            position="relative"
                            name={quiz.name}
                            imageUrl={quiz.imageUrl}
                            time={quiz.time}
                            maxScore={quiz.maxScore}
                            verb={quiz.verb}
                          />
                        </Box>
                      ) : (
                        <AspectRatio
                          maxWidth="260px"
                          minHeight={{
                            base: "180px",
                            sm: "206px",
                            md: "216px",
                          }}
                          maxHeight="230px"
                          ratio={3 / 2}
                          transition="all 150ms ease-out"
                          _hover={{ transform: "scale(1.030)" }}
                        >
                          <QuizCard
                            name={quiz.name}
                            imageUrl={quiz.imageUrl}
                            time={quiz.time}
                            maxScore={quiz.maxScore}
                            verb={quiz.verb}
                          />
                        </AspectRatio>
                      )}
                    </>
                  </Link>
                ))}
              </CardList>
            )}
          </>
        ) : (
          <Box minHeight={{ base: "775px", md: "775px" }}>
            <DelayedRender shouldFadeIn waitBeforeShow={100}>
              <CardListSection
                title="Trivia"
                linkHref="/daily-trivia"
                linkVerb="trivia"
                marginTop={0}
              >
                {filteredTrivia.map((quiz) => (
                  <CardListItem
                    key={quiz.id}
                    href={`/daily-trivia/${formatDate(quiz.date)}`}
                  >
                    <TriviaCard
                      name={quiz.name}
                      position={{ base: "relative", md: "absolute" }}
                    />
                  </CardListItem>
                ))}
              </CardListSection>

              <CardListSection
                title="Map Games"
                linkHref="/map-games"
                linkVerb="map games"
              >
                {pageProps?.mapQuizzes?.slice(0, numberToSlice).map((quiz) => (
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
                    />
                  </CardListItem>
                ))}
              </CardListSection>

              <CardListSection
                title="Flag Games"
                linkHref="/flag-games"
                linkVerb="flag games"
              >
                {pageProps?.flagQuizzes?.slice(0, numberToSlice).map((quiz) => (
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
                    />
                  </CardListItem>
                ))}
              </CardListSection>
            </DelayedRender>
          </Box>
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
