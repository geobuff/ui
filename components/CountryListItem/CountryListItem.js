import React from "react";
import PropTypes from "prop-types";
import { Box, Fade, Flex, ListItem, Text } from "@chakra-ui/core";
import flag from "country-code-emoji";

import Twemoji from "../Twemoji";

const flagFallback = (
  <Box
    height="18px"
    width="24.5px"
    borderRadius={4}
    backgroundColor="#364858"
  />
);

const CountryListItem = ({ code, isHidden, name, ...props }) => {
  const isValidCountryCode = code && code.length === 2;
  const shouldFallback = !isValidCountryCode || isHidden;

  return (
    <ListItem listStyleType="none" {...props}>
      <Fade in>
        <Flex alignItems="center">
          {!shouldFallback ? <Twemoji emoji={flag(code)} /> : flagFallback}
          <Text ml={2} fontWeight="600" fontSize={14}>
            {!isHidden ? name : "???"}
          </Text>
        </Flex>
      </Fade>
    </ListItem>
  );
};

CountryListItem.propTypes = {
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  name: PropTypes.string,
};

CountryListItem.defaultProps = {
  code: "nz",
  isHidden: false,
  name: "New Zealand",
};

export default CountryListItem;
