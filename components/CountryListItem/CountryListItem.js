import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, ListItem, Text } from "@chakra-ui/core";
import flag from "country-code-emoji";

import Twemoji from "../Twemoji";

const CountryListItem = ({ code, name }) => {
  const isValidCountryCode = code && code.length === 2;
  return (
    <ListItem listStyleType="none">
      <Fade in>
        <Flex alignItems="center">
          {isValidCountryCode && <Twemoji emoji={flag(code)} />}
          <Text ml={2} fontWeight="600" fontSize={14}>
            {name}
          </Text>
        </Flex>
      </Fade>
    </ListItem>
  );
};

CountryListItem.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
};

CountryListItem.defaultProps = {
  code: "nz",
  name: "New Zealand",
};

export default CountryListItem;
