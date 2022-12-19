import React, { FC, useContext, useEffect } from "react";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import dynamic from "next/dynamic";

import { HomeContext } from "../contexts/HomeContext";
import { LanguageContext } from "../contexts/LanguageContext";

import DelayedRender from "../components/DelayedRender";

import { formatDate, isDateBefore } from "../helpers/date";
import { CommunityQuiz } from "../types/community-quiz-dto";
import { FilteredTrivia } from "../types/filtered-trivia";
import { Quiz } from "../types/quiz";
import { Trivia } from "../types/trivia";
import { HomeHeaderContainer } from "./HomeHeaderContainer";
import { TriviaCardListSectionContainer } from "./TriviaCardListSectionContainer";

const CardListSectionContainer = dynamic(() =>
  import("./CardListSectionContainer").then(
    (mod) => mod.CardListSectionContainer
  )
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

interface Props {
  maps: Quiz[];
  flags: Quiz[];
  community: CommunityQuiz[];
  trivia: Trivia[];
  isLoading: boolean;
}

export const HomeContainer: FC<Props> = ({
  maps,
  flags,
  community,
  trivia,
  isLoading,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const numberToSlice = isMobile ? 14 : 10;

  const { t, language } = useContext(LanguageContext);

  const {
    filter,
    filteredTrivia,
    communityQuizzes,
    mapQuizzes,
    flagQuizzes,
    searchResults,
    isSearching,
    onMapQuizzesChange,
    onFlagQuizzesChange,
    onCommunityQuizzesChange,
    onFilteredTriviaChange,
    onSearchResultsChange,
    onIsSearchingChange,
  } = useContext(HomeContext);

  useEffect(() => {
    onMapQuizzesChange(maps?.slice(0, numberToSlice));
    onFlagQuizzesChange(flags?.slice(0, numberToSlice));
    onCommunityQuizzesChange(community?.slice(0, numberToSlice));

    onFilteredTriviaChange(
      trivia
        ?.map((quiz: FilteredTrivia) => ({
          ...quiz,
          isActive: isDateBefore(
            DateTime.fromISO(formatDate(quiz.date)),
            DateTime.fromISO(new Date().toISOString())
          ),
        }))
        .filter((t) => t.isActive)
        .slice(0, isMobile ? 7 : 5)
    );
  }, [maps, flags, community, trivia]);

  useEffect(() => {
    if (filter.trim().length < 3) {
      onSearchResultsChange(null);
      return;
    }

    const headers = {
      "Content-Language": language,
    };

    const quizRequest = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
      headers,
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
      headers,
      data: {
        filter: filter,
        page: 0,
        limit: 15,
      },
    });

    const triviaRequest = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/trivia/all`,
      headers,
      data: {
        filter: filter,
        page: 0,
        limit: 15,
      },
    });

    const requests = [quizRequest, communityQuizRequest, triviaRequest];

    onIsSearchingChange(true);
    Promise.all(requests)
      .then((responses) => {
        const quizzes = responses[0].data.quizzes;
        const communityQuizzes = responses[1].data.quizzes;
        const trivia = responses[2].data.trivia;

        onSearchResultsChange({
          quizzes: quizzes,
          communityQuizzes: communityQuizzes,
          trivia: trivia,
          length: quizzes.length + communityQuizzes.length + trivia.length,
        });
      })
      .finally(() => onIsSearchingChange(false));
  }, [filter]);

  const getContent = (): JSX.Element => {
    if (!filter) {
      return (
        <Box minHeight="776px">
          <DelayedRender shouldFadeIn waitBeforeShow={100}>
            {filteredTrivia?.length > 0 && (
              <TriviaCardListSectionContainer
                trivia={filteredTrivia}
                isLoading={isLoading}
              />
            )}

            {communityQuizzes?.length > 0 && (
              <CommunityQuizCardListSection
                quizzes={communityQuizzes}
                isLoading={isLoading}
              />
            )}

            {mapQuizzes?.length > 0 && (
              <CardListSectionContainer
                isLoading={isLoading}
                title={t.global.mapGamesUpper}
                linkHref="/map-games"
                linkVerb={t.global.mapGamesLower}
                quizzes={mapQuizzes}
              />
            )}

            {flagQuizzes?.length > 0 && (
              <CardListSectionContainer
                isLoading={isLoading}
                title={t.global.flagGamesUpper}
                linkHref="/flag-games"
                linkVerb={t.global.flagGamesLower}
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
    <>
      <HomeHeaderContainer />
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
    </>
  );
};
