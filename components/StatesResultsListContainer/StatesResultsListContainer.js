import React from "react";
import PropTypes from "prop-types";

import StatesResultsList from "../StatesResultsList/StatesResultsList";
import ResultsListPlaceholder from "../ResultsListPlaceholder/ResultsListPlaceholder";
import useStates from "../../hooks/UseStates";

const StatesResultsListContainer = ({ checkedStates }) => {
  const { allStates, isPending } = useStates();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={51} />;
  }

  return (
    <StatesResultsList states={allStates} checkedCountries={checkedStates} />
  );
};

StatesResultsListContainer.propTypes = {
  states: PropTypes.array,
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
