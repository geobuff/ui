import React from "react";
import PropTypes from "prop-types";
import { Box, Fade, Flex, ListItem, Text } from "@chakra-ui/core";

const StateListItem = ({ isHidden, svgName, ...props }) => (
  <ListItem listStyleType="none" {...props}>
    <Fade in>
      <Flex alignItems="center">
        <Box
          height="18px"
          width="24.5px"
          borderRadius={4}
          backgroundColor="#364858"
        />
        <Text ml={2} fontWeight="600" fontSize={14}>
          {!isHidden ? svgName : "???"}
        </Text>
      </Flex>
    </Fade>
  </ListItem>
);

StateListItem.propTypes = {
  isHidden: PropTypes.bool,
  svgName: PropTypes.string,
};

StateListItem.defaultProps = {
  isHidden: false,
  svgName: "Hawaii",
};

export default StateListItem;
