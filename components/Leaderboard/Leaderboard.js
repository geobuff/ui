import React, { useState } from "react";
import PropTypes from "prop-types";

import { Flex, useBreakpointValue } from "@chakra-ui/react";

import LeaderboardTableContainer from "../../containers/LeaderboardTableContainer";

import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardFilters from "./LeaderboardFilters";
import LeaderboardPaginationControls from "./LeaderboardPaginationControls";

const Leaderboard = ({
  filterParams,
  quizId,
  quizzes,
  onChangeFilterParams,
  onChangeQuiz,
}) => {
  const [hasMore, setHasMore] = useState(false);

  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  const handleChangeQuiz = (e) => {
    onChangeQuiz(parseInt(e.target.value));
    onChangeFilterParams({ ...filterParams, page: 0 });
  };

  const rangeChange = (e) => {
    onChangeFilterParams({ ...filterParams, range: e.target.value, page: 0 });
  };

  const userChange = (e) => {
    onChangeFilterParams({ ...filterParams, user: e.target.value, page: 0 });
  };

  const limitChange = (e) => {
    const limit = parseInt(e.target.value);
    onChangeFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const next = () => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const previous = () => {
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
      marginTop={10}
    >
      <LeaderboardHeader />

      <LeaderboardFilters
        quizId={quizId}
        quizzes={quizzes}
        onChangeRange={rangeChange}
        onChangeQuiz={handleChangeQuiz}
        onChangeSearchUsers={userChange}
      />

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
          quizId={quizId}
          filterParams={filterParams}
          setHasMore={setHasMore}
        />

        <LeaderboardPaginationControls
          hasMoreEntries={hasMore}
          page={filterParams.page}
          onChangeLimit={limitChange}
          onNextPage={next}
          onPreviousPage={previous}
        />
      </Flex>
    </Flex>
  );
};

Leaderboard.propTypes = {
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
