import React from "react";
import PropTypes from "prop-types";

import CountryListItem from "../CountryListItem";
import { Box, List, Text } from "@chakra-ui/core";

const CountryList = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          No countries to display
        </Text>
      </Box>
    );
  }

  return (
    <List>
      {countries.map((country) => (
        <CountryListItem
          key={country.code}
          my={2}
          isHidden={!country.checked}
          {...country}
        />
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
