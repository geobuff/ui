import React from "react";
import PropTypes from "prop-types";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useStates from "../../hooks/UseStates";
import { Quizzes } from "../../helpers/quizzes";
import { mergeArrayByName } from "../../helpers/array";
import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";

const StatesResultsListContainer = ({ checkedStates }) => {
  const { allStates, isPending } = useStates();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={51} />;
  }

  return (
    <ResultsListWrapper
      quiz={Quizzes.USStates}
      results={mergeArrayByName(allStates, checkedStates)}
    />
  );
};

StatesResultsListContainer.propTypes = {
  checkedStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

StatesResultsListContainer.defaultProps = {
  checkedStates: [],
};

export default StatesResultsListContainer;
