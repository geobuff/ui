import React from "react";
import PropTypes from "prop-types";

import { Flex, useBreakpointValue } from "@chakra-ui/react";

import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardFilters from "./LeaderboardFilters";
import LeaderboardPaginationControls from "./LeaderboardPaginationControls";
import LeaderboardTable from "../LeaderboardTable";

import Card from "../Card";

const Leaderboard = ({
  entries,
  hasMoreEntries,
  filterParams,
  isLoading,
  quizId,
  quizzes,
  onChangeFilterParams,
  onChangeQuiz,
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const handleChangeQuiz = (e) => {
    onChangeQuiz(parseInt(e.target.value));
    onChangeFilterParams({ ...filterParams, page: 0 });
  };

  const handleChangeRange = (e) => {
    onChangeFilterParams({ ...filterParams, range: e.target.value, page: 0 });
  };

  const handleChangeSearchUsers = (e) => {
    onChangeFilterParams({ ...filterParams, user: e.target.value, page: 0 });
  };

  const handleChangeLimit = (e) => {
    const limit = parseInt(e.target.value);
    onChangeFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const handleNextPage = () => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const handlePreviousPage = () => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  // Prevent layout shifts on load
  if (shouldRenderOnMobile === undefined) {
    return null;
  }

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", sm: "90%", md: "75%" }}
      marginX="auto"
      marginBottom={10}
      marginTop={{ base: 10, sm: 10, md: 14 }}
    >
      <LeaderboardHeader
        isLoading={isLoading}
        marginBottom={{ base: 4, md: 6 }}
      />

      <LeaderboardFilters
        quizId={quizId}
        quizzes={quizzes}
        isLoading={isLoading}
        onChangeRange={handleChangeRange}
        onChangeQuiz={handleChangeQuiz}
        onChangeSearchUsers={handleChangeSearchUsers}
      />

      <Card>
        <Flex
          direction="column"
          justifyContent="space-between"
          minHeight="750px"
          paddingTop={2}
          paddingBottom={{ base: 1, md: 3 }}
          paddingX={{ base: 0, md: 3 }}
        >
          <LeaderboardTable
            page={filterParams.page}
            limit={filterParams.limit}
            entries={entries}
            isLoading={isLoading}
          />

          <LeaderboardPaginationControls
            hasMoreEntries={hasMoreEntries}
            isLoading={isLoading}
            page={filterParams.page}
            onChangeLimit={handleChangeLimit}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

Leaderboard.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      username: PropTypes.string,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.time,
      added: PropTypes.time,
      rank: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
  hasMoreEntries: PropTypes.bool,
  filterParams: PropTypes.shape({
    page: PropTypes.number,
    limit: PropTypes.number,
  }),
  quizId: PropTypes.number,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onChangeQuiz: PropTypes.func,
  onChangeFilterParams: PropTypes.func,
};

Leaderboard.defaultProps = {
  entries: [],
  hasMoreEntries: false,
  isLoading: true,
  filterParams: {
    page: 0,
    limit: 10,
  },
  quizId: 1,
  quizzes: [],
  onChangeQuiz: () => {},
  onChangeFilterParams: () => {},
};

export default Leaderboard;
