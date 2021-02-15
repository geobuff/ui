import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, ListItem, Text } from "@chakra-ui/core";
import flag from "country-code-emoji";
import { getUKCountyFlagUrl, getUSStateFlagUrl } from "@geobuff/flags";

import Twemoji from "../Twemoji";
import { Quizzes } from "../../helpers/quizzes";
import FlagFallback from "./FlagFallback";
import CustomFlag from "./CustomFlag";

const ResultsListItem = ({ quiz, code, isHidden, svgName, ...props }) => {
  const getFlagElement = () => {
    switch (quiz) {
      case Quizzes.CountriesOfTheWorld:
      case Quizzes.CapitalsOfTheWorld:
        return <Twemoji emoji={flag(code)} />;
      case Quizzes.UKCounties:
        return <CustomFlag url={getUKCountyFlagUrl(code)} />;
      case Quizzes.USStates:
        return <CustomFlag url={getUSStateFlagUrl(code)} />;
      default:
        throw Error("Invalid quiz value.");
    }
  };

  return (
    <ListItem listStyleType="none" {...props}>
      <Fade in>
        <Flex alignItems="center">
          {!isHidden ? getFlagElement() : <FlagFallback />}
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
