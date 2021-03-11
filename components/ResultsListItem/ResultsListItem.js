import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, ListItem, Text } from "@chakra-ui/react";
import flag from "country-code-emoji";
import { getUKCountyFlagUrl, getUSStateFlagUrl } from "@geobuff/flags";

import Twemoji from "../Twemoji";
import { Quizzes } from "../../helpers/quizzes";
import FlagFallback from "./FlagFallback";
import CustomFlag from "./CustomFlag";

const ResultsListItem = ({ quizId, code, isHidden, svgName, ...props }) => {
  const getFlagElement = () => {
    switch (quizId) {
      case Quizzes.CountriesOfTheWorld:
      case Quizzes.CapitalsOfTheWorld:
        return <Twemoji emoji={flag(code)} />;
      case Quizzes.UKCounties:
        return <CustomFlag url={getUKCountyFlagUrl(code)} />;
      case Quizzes.USStates:
        return <CustomFlag url={getUSStateFlagUrl(code)} />;
      default:
        return null;
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
  quizId: PropTypes.number,
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  svgName: PropTypes.string,
};

export default ResultsListItem;
