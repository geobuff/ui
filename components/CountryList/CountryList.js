import React from "react";
import PropTypes from "prop-types";

import CountryListItem from "../CountryListItem/CountryListItem";

const CountryList = ({ countries }) => {
  if (!countries) {
    return null;
  }

  return countries.map(({ code, name }) => (
    <CountryListItem key={code} code={code} name={name} my={2} />
  ));
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
CountryList.defaultProps = {
  countries: [],
};

export default CountryList;
