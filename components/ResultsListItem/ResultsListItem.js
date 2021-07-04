import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, Text } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

import FlagFallback from "./FlagFallback";
import CustomFlag from "../CustomFlag";

import Twemoji from "../Twemoji";

const ResultsListItem = ({
  code,
  isHidden,
  isMissedResult,
  svgName,
  hasFlag,
  shouldFadeIn,
  ...props
}) => {
  const mainContent = (
    <Flex alignItems="center" marginY={2} {...props}>
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
  );

  return <> {shouldFadeIn ? <Fade in> {mainContent} </Fade> : mainContent} </>;
};

ResultsListItem.propTypes = {
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  isMissedResult: PropTypes.bool,
  svgName: PropTypes.string,
  hasFlag: PropTypes.bool,
  shouldFadeIn: PropTypes.bool,
};

ResultsListItem.defaultProps = {
  code: "",
  isHidden: false,
  isMissedResult: false,
  svgName: "",
  hasFlag: false,
  shouldFadeIn: false,
};

export default ResultsListItem;
