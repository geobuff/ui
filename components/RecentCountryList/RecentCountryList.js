import React from "react";
import PropTypes from "prop-types";

import { List } from "@chakra-ui/core";
import CountryListItem from "../CountryListItem";

const RecentCountryList = ({ countries, max }) => {
  if (!countries) {
    return null;
  }
  return (
    <List>
      {countries.slice(0, max).map(({ code, name }) => (
        <CountryListItem key={code} code={code} name={name} my={2} />
      ))}
    </List>
  );
};

RecentCountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  max: PropTypes.number,
};
RecentCountryList.defaultProps = {
  countries: [],
  max: 3,
};

export default RecentCountryList;
