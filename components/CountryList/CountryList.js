import React from "react";
import PropTypes from "prop-types";

import CountryListItem from "../CountryListItem";
import { List } from "@chakra-ui/core";

const CountryList = ({ countries }) => {
  if (!countries) {
    return null;
  }

  return (
    <List>
      {countries.map((country) => (
        <CountryListItem key={country.code} my={2} {...country} />
      ))}
    </List>
  );
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
