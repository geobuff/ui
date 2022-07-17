import React, { useState, FC, ChangeEvent, useEffect } from "react";
import type { AppProps } from "next/app";
import { debounce } from "throttle-debounce";
import axios from "axios";
import axiosClient from "../axios";
import dynamic from "next/dynamic";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { DateTime } from "luxon";

import MainView from "../components/MainView";
import { QuizzesFilterDto } from "../types/quizzes-filter-dto";
import { GetStaticProps } from "next";
import { formatDate, isDateBefore } from "../helpers/date";
import DelayedRender from "../components/DelayedRender";
import { FilteredTrivia } from "../components/TriviaList/TriviaList";
import { TriviaFilterDto } from "../types/trivia-filter-dto";
import { CommunityQuizFilterDto } from "../types/community-quiz-filter-dto";
import { signIn, useSession } from "next-auth/react";
import TriviaCardListSection from "../components/TriviaCardListSection";
import HomeHeader from "../components/HomeHeader";
import { QuizSearchResults } from "../types/quiz-search-results";

const QuizCardListSection = dynamic(
  () => import("../components/QuizCardListSection")
);

const CommunityQuizCardListSection = dynamic(
  () => import("../components/CommunityQuizCardListSection")
);

const HomeNoSearchResults = dynamic(
  () => import("../components/HomeNoSearchResults")
);

const HomeSearchResults = dynamic(
  () => import("../components/HomeSearchResults")
);

const Home: FC<AppProps> = ({ pageProps }) => {
  const { data: session } = useSession();

  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<QuizSearchResults>();
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

  const handleDebounceChange = debounce(1000, (event) => {
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

  const getContent = (): JSX.Element => {
    if (!filter) {
      return (
        <Box minHeight="776px">
          <DelayedRender shouldFadeIn waitBeforeShow={100}>
            {filteredTrivia.length > 0 && (
              <TriviaCardListSection trivia={filteredTrivia} />
            )}

            {communityQuizzes.length > 0 && (
              <CommunityQuizCardListSection quizzes={communityQuizzes} />
            )}

            {mapQuizzes.length > 0 && (
              <QuizCardListSection quizzes={mapQuizzes} />
            )}

            {flagQuizzes.length > 0 && (
              <QuizCardListSection
                title="Flag Games"
                linkHref="/flag-games"
                linkVerb="flag games"
                quizzes={flagQuizzes}
              />
            )}
          </DelayedRender>
        </Box>
      );
    }

    if (searchResults?.length === 0 && !isSearching) {
      return <HomeNoSearchResults filter={filter} />;
    }

    return (
      <HomeSearchResults
        isSearching={isSearching}
        searchResults={searchResults}
        filter={filter.trim()}
      />
    );
  };

  return (
    <MainView>
      <HomeHeader
        inputValue={inputValue}
        onChange={handleChange}
        onClearInput={handleClearInput}
      />

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
        {getContent()}
      </Box>
    </MainView>
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
