import React from "react";
import PropTypes from "prop-types";
import { Box, Fade, Flex, ListItem, Text } from "@chakra-ui/core";
import flag from "country-code-emoji";

import Twemoji from "../Twemoji";
import { Quizzes } from "../../helpers/quizzes";

const flagFallback = (
  <Box
    height="18px"
    width="24.5px"
    borderRadius={4}
    backgroundColor="#364858"
  />
);

const ResultsListItem = ({ quiz, code, isHidden, svgName, ...props }) => {
  if (
    quiz === Quizzes.CountriesOfTheWorld ||
    quiz === Quizzes.CapitalsOfTheWorld
  ) {
    const isValidCountryCode = code && code.length === 2;
    const shouldFallback = !isValidCountryCode || isHidden;

    return (
      <ListItem listStyleType="none" {...props}>
        <Fade in>
          <Flex alignItems="center">
            {!shouldFallback ? <Twemoji emoji={flag(code)} /> : flagFallback}
            <Text ml={2} fontWeight="600" fontSize={14}>
              {!isHidden ? svgName : "???"}
            </Text>
          </Flex>
        </Fade>
      </ListItem>
    );
  }

  return (
    <ListItem listStyleType="none" {...props}>
      <Fade in>
        <Flex alignItems="center">
          {flagFallback}
          <Text ml={2} fontWeight="600" fontSize={14}>
            {!isHidden ? svgName : "???"}
          </Text>
        </Flex>
      </Fade>
    </ListItem>
  );
};

ResultsListItem.propTypes = {
  quiz: PropTypes.number,
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  svgName: PropTypes.string,
};

export default ResultsListItem;
