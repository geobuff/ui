import React, { useState, FC, ChangeEvent, useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import { debounce } from "throttle-debounce";
import axios from "axios";
import axiosClient from "../axios";

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
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { GetStaticProps } from "next";
import { formatDate, isDateBefore } from "../helpers/date";
import TriviaCard from "../components/TriviaCard";
import QuizCard from "../components/QuizCard";
import DelayedRender from "../components/DelayedRender";
import { FilteredTrivia } from "../components/TriviaList/TriviaList";
import CardListSection from "../components/CardListSection";
import CardListItem from "../components/CardList/CardListItem";
import Head from "next/head";
import CommunityQuizCard from "../components/CommunityQuizCard";
import { TriviaFilterDto } from "../types/trivia-filter-dto";
import { CommunityQuizFilterDto } from "../types/community-quiz-filter-dto";
import { Quiz } from "../types/quiz";
import { Trivia } from "../types/trivia";
import { CommunityQuiz } from "../types/community-quiz-dto";
import { signIn, useSession } from "next-auth/react";

const GRID_LENGTH = 5;

interface SearchResults {
  quizzes: Quiz[];
  communityQuizzes: CommunityQuiz[];
  trivia: Trivia[];
  length: number;
}

const Home: FC<AppProps> = ({ pageProps }) => {
  const { data: session } = useSession();

  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // Force sign in to hopefully resolve error.
      // See https://next-auth.js.org/tutorials/refresh-token-rotation#client-side.
      signIn();
    }
  }, [session]);

  useEffect(() => {
    if (filter.trim().length < 3) {
      setSearchResults(null);
      return;
    }

    const quizRequest = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
      data: {
        filter: filter,
        page: 0,
        limit: 15,
        orderByPopularity: false,
      },
    });

    const communityQuizRequest = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/community-quizzes/all`,
      data: {
        filter: filter,
        page: 0,
        limit: 15,
      },
    });

    const triviaRequest = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
      data: {
        filter: filter,
        page: 0,
        limit: 15,
      },
    });

    const requests = [quizRequest, communityQuizRequest, triviaRequest];

    setIsSearching(true);
    axios
      .all(requests)
      .then((responses) => {
        const quizzes = responses[0].data.quizzes;
        const communityQuizzes = responses[1].data.quizzes;
        const trivia = responses[2].data.trivia;

        setSearchResults({
          quizzes: quizzes,
          communityQuizzes: communityQuizzes,
          trivia: trivia,
          length: quizzes.length + communityQuizzes.length + trivia.length,
        });
      })
      .finally(() => setIsSearching(false));
  }, [filter]);

  const handleClearInput = (): void => {
    setInputValue("");
    setFilter("");
    setSearchResults(null);
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

  const isMobile = useBreakpointValue({ base: true, md: false });

  const numberToSlice = isMobile ? 14 : 10;

  const mapQuizzes = pageProps?.mapQuizzes?.slice(0, numberToSlice);
  const flagQuizzes = pageProps?.flagQuizzes?.slice(0, numberToSlice);
  const communityQuizzes = pageProps?.communityQuizzes?.slice(0, numberToSlice);
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
        {searchResults?.trivia.map((quiz) => (
          <CardListItem
            key={quiz.id}
            href={`/daily-trivia/${formatDate(quiz.date)}`}
          >
            <TriviaCard
              name={quiz.name}
              maxScore={quiz.maxScore}
              position={{ base: "relative", md: "absolute" }}
              marginLeft={{ base: 3, md: 0 }}
            />
          </CardListItem>
        ))}
        {searchResults?.communityQuizzes.map((quiz) => (
          <CardListItem key={quiz.id} href={`/community-quiz/${quiz.id}`}>
            <CommunityQuizCard
              name={quiz.name}
              userId={quiz.userId}
              username={quiz.username}
              maxScore={quiz.maxScore}
              verified={quiz.verified}
              position={{ base: "relative", md: "absolute" }}
              marginLeft={{ base: 3, md: 0 }}
            />
          </CardListItem>
        ))}
        {searchResults?.quizzes.map((quiz) => (
          <CardListItem
            key={quiz.id}
            href={`/quiz/${quiz?.route}`}
            isEnabled={quiz.enabled}
          >
            <QuizCard
              name={quiz.name}
              imageUrl={quiz.imageUrl}
              time={quiz.time}
              maxScore={quiz.maxScore}
              plural={quiz.plural}
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
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4707219290548480"
          crossOrigin="anonymous"
        />
      </Head>
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
          {!!searchResults?.length && !isSearching && filter ? (
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
                  {!searchResults?.length && !isSearching ? (
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
                      {searchResults?.trivia.map((quiz) => (
                        <CardListItem
                          key={quiz.id}
                          href={`/daily-trivia/${formatDate(quiz.date)}`}
                        >
                          <TriviaCard
                            name={quiz.name}
                            maxScore={quiz.maxScore}
                            position={{ base: "relative", md: "absolute" }}
                            marginLeft={{ base: 3, md: 0 }}
                          />
                        </CardListItem>
                      ))}
                      {searchResults?.communityQuizzes.map((quiz) => (
                        <CardListItem
                          key={quiz.id}
                          href={`/community-quiz/${quiz.id}`}
                        >
                          <CommunityQuizCard
                            name={quiz.name}
                            userId={quiz.userId}
                            username={quiz.username}
                            maxScore={quiz.maxScore}
                            verified={quiz.verified}
                            position={{ base: "relative", md: "absolute" }}
                            marginLeft={{ base: 3, md: 0 }}
                          />
                        </CardListItem>
                      ))}
                      {searchResults?.quizzes.map((quiz) => (
                        <CardListItem
                          key={quiz.id}
                          href={`/quiz/${quiz?.route}`}
                          isEnabled={quiz.enabled}
                        >
                          <QuizCard
                            name={quiz.name}
                            imageUrl={quiz.imageUrl}
                            time={quiz.time}
                            maxScore={quiz.maxScore}
                            plural={quiz.plural}
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
                    {filteredTrivia.length > 0 && (
                      <CardListSection
                        title="Daily Trivia"
                        linkHref="/daily-trivia"
                        linkVerb="daily trivia"
                        marginTop={0}
                        paddingX={{ base: 3, md: 0 }}
                        lessItemsThanGrid={filteredTrivia.length < GRID_LENGTH}
                      >
                        {filteredTrivia.map((quiz, index) => (
                          <CardListItem
                            key={quiz.id}
                            href={`/daily-trivia/${formatDate(quiz.date)}`}
                            paddingRight={{
                              base:
                                index === filteredTrivia.length - 1 && "12px",
                              md: 0,
                            }}
                          >
                            <TriviaCard
                              name={quiz.name}
                              maxScore={quiz.maxScore}
                              position={{ base: "relative", md: "absolute" }}
                              marginLeft={{ base: 3, md: 0 }}
                            />
                          </CardListItem>
                        ))}
                      </CardListSection>
                    )}

                    {communityQuizzes.length > 0 && (
                      <CardListSection
                        title="Community Quizzes"
                        linkHref="/community-quiz"
                        linkVerb="community quizzes"
                        paddingX={{ base: 3, md: 0 }}
                        lessItemsThanGrid={
                          communityQuizzes.length < GRID_LENGTH
                        }
                      >
                        {communityQuizzes.map((quiz, index) => (
                          <CardListItem
                            key={quiz.id}
                            href={`/community-quiz/${quiz.id}`}
                            paddingRight={{
                              base:
                                index === filteredTrivia.length - 1 && "12px",
                              md: 0,
                            }}
                          >
                            <CommunityQuizCard
                              name={quiz.name}
                              userId={quiz.userId}
                              username={quiz.username}
                              maxScore={quiz.maxScore}
                              verified={quiz.verified}
                              position={{ base: "relative", md: "absolute" }}
                              marginLeft={{ base: 3, md: 0 }}
                            />
                          </CardListItem>
                        ))}
                      </CardListSection>
                    )}

                    {mapQuizzes.length > 0 && (
                      <CardListSection
                        title="Map Games"
                        linkHref="/map-games"
                        linkVerb="map games"
                        paddingX={{ base: 3, md: 0 }}
                      >
                        {mapQuizzes.map((quiz, index) => (
                          <CardListItem
                            key={quiz.id}
                            href={`/quiz/${quiz?.route}`}
                            isEnabled={quiz.enabled}
                            paddingRight={{
                              base:
                                index === filteredTrivia.length - 1 && "12px",
                              md: 0,
                            }}
                          >
                            <QuizCard
                              name={quiz.name}
                              imageUrl={quiz.imageUrl}
                              time={quiz.time}
                              maxScore={quiz.maxScore}
                              plural={quiz.plural}
                              position={{ base: "relative", md: "absolute" }}
                              marginLeft={{ base: 3, md: 0 }}
                            />
                          </CardListItem>
                        ))}
                      </CardListSection>
                    )}

                    {flagQuizzes.length > 0 && (
                      <CardListSection
                        title="Flag Games"
                        linkHref="/flag-games"
                        linkVerb="flag games"
                        paddingX={{ base: 3, md: 0 }}
                      >
                        {flagQuizzes.map((quiz, index) => (
                          <CardListItem
                            key={quiz.id}
                            href={`/quiz/${quiz?.route}`}
                            isEnabled={quiz.enabled}
                            paddingRight={{
                              base:
                                index === filteredTrivia.length - 1 && "12px",
                              md: 0,
                            }}
                          >
                            <QuizCard
                              name={quiz.name}
                              imageUrl={quiz.imageUrl}
                              time={quiz.time}
                              maxScore={quiz.maxScore}
                              plural={quiz.plural}
                              position={{ base: "relative", md: "absolute" }}
                              marginLeft={{ base: 3, md: 0 }}
                            />
                          </CardListItem>
                        ))}
                      </CardListSection>
                    )}
                  </DelayedRender>
                </Box>
              )}
            </>
          )}
        </Box>
      </MainView>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const quizzesFilter: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 15,
    orderByPopularity: false,
  };

  const { data: mapData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...quizzesFilter,
      filter: "map",
    }
  );

  const { data: flagData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...quizzesFilter,
      filter: "flag",
    }
  );

  const triviaFilter: TriviaFilterDto = {
    page: 0,
    limit: 10,
  };

  const { data: triviaData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
    triviaFilter
  );

  const communityQuizFilter: CommunityQuizFilterDto = {
    page: 0,
    limit: 15,
  };

  const { data: communityQuizData } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/community-quizzes/all`,
    communityQuizFilter
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
      communityQuizzes: communityQuizData.quizzes,
    },
  };
};

export default Home;
