import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, ListItem, Text } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

import FlagFallback from "./FlagFallback";
import CustomFlag from "./CustomFlag";

import Twemoji from "../Twemoji";

const ResultsListItem = ({
  code,
  isHidden,
  isMissedResult,
  svgName,
  hasFlag,
  ...props
}) => (
  <ListItem listStyleType="none" {...props}>
    <Fade in>
      <Flex alignItems="center">
        {hasFlag ? (
          <>
            {!isHidden && !isMissedResult ? (
              <CustomFlag url={getFlagUrl(code)} />
            ) : (
              <FlagFallback />
            )}
          </>
        ) : (
          <Twemoji
            emoji={isHidden ? "🔲" : isMissedResult ? "❌" : "✅"}
            height="18px"
            width="18px"
          />
        )}
        <Text
          ml={2}
          fontWeight="600"
          fontSize={14}
          color={isMissedResult && "#e24f4f"}
        >
          {!isHidden ? svgName : "???"}
        </Text>
      </Flex>
    </Fade>
  </ListItem>
);

ResultsListItem.propTypes = {
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  isMissedResult: PropTypes.bool,
  svgName: PropTypes.string,
  hasFlag: PropTypes.bool,
};

export default ResultsListItem;
