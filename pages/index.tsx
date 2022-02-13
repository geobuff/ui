import React, { useState, useCallback, FC, ChangeEvent } from "react";
import type { AppProps } from "next/app";
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
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroBanner from "../components/HeroBanner";

import Search from "../Icons/Search";
import SolidCloseCircle from "../Icons/SolidCloseCircle";
import QuizList from "../components/QuizList";
import axiosClient from "../axios";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { GetStaticProps } from "next";
import TriviaList from "../components/TriviaList";
import CardList from "../components/CardList";
import { formatDate } from "../helpers/date";
import TriviaCard from "../components/TriviaCard";
import QuizCard from "../components/QuizCard";

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

  const handleDebounceChange = useCallback(debounce(onChange, 500), [onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setInputValue(value);
    handleDebounceChange(value);
  };

  // const getFilteredQuizzes = () => {
  //   if (filter) {
  //     return pageProps.quizzes.filter((quiz) =>
  //       quiz.name.toLowerCase().includes(filter.toLocaleLowerCase())
  //     );
  //   }
  //   return pageProps?.quizzes;
  // };

  // const filteredQuizzes = getFilteredQuizzes();

  const isMobile = useBreakpointValue({ base: true, md: false });

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
        maxWidth={1400}
        marginTop="32px"
        marginBottom="100px"
        marginLeft="auto"
        marginRight="auto"
        // minHeight="1000px"
        paddingX={{ base: 3, md: 10 }}
      >
        <Heading marginBottom={{ base: 2, md: 5 }} fontSize="2xl">
          {"Daily Trivia"}
        </Heading>
        <CardList>
          {pageProps?.trivia.slice(0, 5)?.map((quiz) => (
            // !!quiz.isActive && (
            <Link key={quiz.id} href={`/daily-trivia/${formatDate(quiz.date)}`}>
              <>
                {isMobile ? (
                  <Box
                    display="inline-block"
                    width="260px"
                    height={"220px"}
                    marginRight={3}
                    paddingY={3}
                  >
                    <TriviaCard name={quiz.name} />
                  </Box>
                ) : (
                  <AspectRatio
                    maxWidth="260px"
                    minHeight={{ base: "180px", sm: "206px", md: "216px" }}
                    maxHeight="230px"
                    ratio={3 / 2}
                    transition="all 150ms ease-out"
                    _hover={{ transform: "scale(1.030)" }}
                  >
                    <TriviaCard name={quiz.name} />
                  </AspectRatio>
                )}
              </>
            </Link>
          ))}
        </CardList>
        <Heading
          marginTop={{ base: 5, md: 10 }}
          marginBottom={{ base: 2, md: 5 }}
          fontSize="2xl"
        >
          {"Popular Map Games"}
        </Heading>
        <CardList>
          {pageProps?.mapQuizzes?.map((quiz) => (
            // !!quiz.isActive && (
            <Link key={quiz.id} href={`/daily-trivia/${formatDate(quiz.date)}`}>
              <>
                {isMobile ? (
                  <Box
                    display="inline-block"
                    width="260px"
                    height={"220px"}
                    marginRight={3}
                    paddingY={3}
                  >
                    <QuizCard
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
                    minHeight={{ base: "180px", sm: "206px", md: "216px" }}
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
        <Heading
          marginTop={{ base: 5, md: 10 }}
          marginBottom={{ base: 2, md: 5 }}
          fontSize="2xl"
        >
          {"Popular Flag Games"}
        </Heading>
        <CardList>
          {pageProps?.flagQuizzes?.map((quiz) => (
            // !!quiz.isActive && (
            <Link key={quiz.id} href={`/daily-trivia/${formatDate(quiz.date)}`}>
              <>
                {isMobile ? (
                  <Box
                    display="inline-block"
                    width="260px"
                    height={"220px"}
                    marginRight={3}
                    paddingY={3}
                  >
                    <QuizCard
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
                    minHeight={{ base: "180px", sm: "206px", md: "216px" }}
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
      </Box>

      {/* <TriviaList trivia={pageProps?.trivia.slice(0, 10)} />

      <QuizList quizzes={pageProps?.mapQuizzes} heading="Popular Map Games" />
      <QuizList quizzes={pageProps?.flagQuizzes} heading="Popular Flag Games" /> */}
    </MainView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 10,
  };

  const { data: mapQuizzes } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...body,
      filter: "map",
    }
  );

  const { data: flagQuizzes } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    {
      ...body,
      filter: "flag",
    }
  );

  const { data: trivia } = await axiosClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/trivia`
  );

  if (!mapQuizzes && !flagQuizzes && !trivia) {
    return {
      notFound: true,
    };
  }

  console.log({ mapQuizzes, flagQuizzes, trivia }, "page Props");

  return {
    props: {
      mapQuizzes: mapQuizzes.quizzes,
      flagQuizzes: flagQuizzes.quizzes,
      trivia,
    },
  };
};

export default Home;
