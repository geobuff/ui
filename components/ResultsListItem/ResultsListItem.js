import React from "react";
import PropTypes from "prop-types";
import { Fade, Flex, ListItem, Text } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

import FlagFallback from "./FlagFallback";
import CustomFlag from "./CustomFlag";

const ResultsListItem = ({ code, isHidden, svgName, hasFlag, ...props }) => {
  return (
    <ListItem listStyleType="none" {...props}>
      <Fade in>
        <Flex alignItems="center">
          {hasFlag && (
            <>
              {!isHidden ? (
                <CustomFlag url={getFlagUrl(code)} />
              ) : (
                <FlagFallback />
              )}
            </>
          )}
          <Text ml={2} fontWeight="600" fontSize={14}>
            {!isHidden ? svgName : "???"}
          </Text>
        </Flex>
      </Fade>
    </ListItem>
  );
};

ResultsListItem.propTypes = {
  code: PropTypes.string,
  isHidden: PropTypes.bool,
  svgName: PropTypes.string,
  hasFlag: PropTypes.bool,
};

export default ResultsListItem;
