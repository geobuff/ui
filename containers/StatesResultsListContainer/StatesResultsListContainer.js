import React from "react";
import PropTypes from "prop-types";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useStates from "../../hooks/UseStates";
import { mergeArrayByName } from "../../helpers/array";
import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";

const StatesResultsListContainer = ({ quiz, checkedStates }) => {
  const { allStates, isPending } = useStates();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsListWrapper
      quiz={quiz}
      results={mergeArrayByName(allStates, checkedStates)}
    />
  );
};

StatesResultsListContainer.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  checkedStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

StatesResultsListContainer.defaultProps = {
  quiz: {},
  checkedStates: [],
};

export default StatesResultsListContainer;
