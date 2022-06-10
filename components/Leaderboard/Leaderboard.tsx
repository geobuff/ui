import React, { FC } from "react";

import { Flex, useBreakpointValue } from "@chakra-ui/react";

import LeaderboardHeader from "./LeaderboardHeader/LeaderboardHeader";
import LeaderboardFilters from "./LeaderboardFilters/LeaderboardFilters";
import LeaderboardPaginationControls from "./LeaderboardPaginationControls/LeaderboardPaginationControls";
import LeaderboardTable from "./LeaderboardTable";

import Card from "../Card";
import { LeaderboardEntry } from "../../types/leaderboard-entry";
import { LeaderboardFilterParams } from "../../types/leaderboard-filter-params";
import { Quiz } from "../../types/quiz";
import router from "next/router";

interface Props {
  entries?: LeaderboardEntry[];
  hasMoreEntries?: boolean;
  isLoading?: boolean;
  filterParams?: LeaderboardFilterParams;
  quizId?: string;
  quizzes?: Quiz[];
  onChangeQuiz?: React.Dispatch<React.SetStateAction<string>>;
  onChangeFilterParams?: React.Dispatch<
    React.SetStateAction<LeaderboardFilterParams>
  >;
  rank?: string;
  setRank?: React.Dispatch<React.SetStateAction<string>>;
}

const Leaderboard: FC<Props> = ({
  entries = [],
  hasMoreEntries = false,
  filterParams = { page: 0, limit: 10 },
  isLoading = false,
  quizId = "1",
  quizzes = [],
  onChangeFilterParams = (): void => {},
  onChangeQuiz = (): void => {},
  rank = "",
  setRank = (): void => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const handleChangeQuiz = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onChangeQuiz(event.target.value);
    onChangeFilterParams({ ...filterParams, page: 0 });
  };

  const handleChangeRange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      range: event.target.value,
      page: 0,
    });
  };

  const handleChangeSearchUsers = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      user: event.target.value,
      page: 0,
    });
  };

  const handleChangeSearchRank = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (rank) {
      router.replace("/leaderboard", undefined, { shallow: true });
    }

    const updatedRank = event?.target?.value || "0";

    setRank(updatedRank);
    onChangeFilterParams({
      ...filterParams,
      rank: updatedRank ? parseInt(updatedRank) : 0,
    });
  };

  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const limit = parseInt(event.target.value);
    onChangeFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const handleNextPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const handlePreviousPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  // Prevent layout shifts on load
  if (shouldRenderOnMobile === undefined) {
    return null;
  }

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 1300 }}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 10, sm: 10, md: 14 }}
      paddingX={3}
      width="100%"
    >
      <LeaderboardHeader
        isLoading={isLoading}
        marginBottom={{ base: 4, md: 6 }}
      />

      <LeaderboardFilters
        quizId={quizId}
        quizzes={quizzes}
        isLoading={isLoading}
        onChangeQuiz={handleChangeQuiz}
        onChangeRange={handleChangeRange}
        onChangeSearchUsers={handleChangeSearchUsers}
        rank={rank}
        onChangeSearchRank={handleChangeSearchRank}
      />

      <Card>
        <Flex
          direction="column"
          justifyContent="space-between"
          minHeight="750px"
          paddingTop={2}
          paddingBottom={{ base: 1, md: 3 }}
        >
          <LeaderboardTable entries={entries} isLoading={isLoading} />

          <LeaderboardPaginationControls
            hasMoreEntries={hasMoreEntries}
            isLoading={isLoading}
            page={filterParams.page}
            onChangeLimit={handleChangeLimit}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            rank={rank}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Leaderboard;
