import React from "react";
import PropTypes from "prop-types";

import StatesResultsList from "../../components/StatesResultsList/StatesResultsList";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useStates from "../../hooks/UseStates";

const StatesResultsListContainer = ({ checkedStates }) => {
  const { allStates, isPending } = useStates();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={51} />;
  }

  return <StatesResultsList states={allStates} checkedStates={checkedStates} />;
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
