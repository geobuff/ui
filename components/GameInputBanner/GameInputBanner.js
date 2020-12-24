import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Input, Text } from "@chakra-ui/core";

const GameInputBanner = ({ score, total, verb }) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="#27AE60"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
      px={3}
      py={2}
    >
      <Box textAlign="center" mr={3}>
        {/** TODO: suss out timer */}
        <Text lineHeight={1.15} color="white" fontSize="32px" fontWeight={700}>
          {"4:20"}
        </Text>
        <Text
          color="white"
          fontSize="12px"
          fontWeight={700}
          minWidth="125px"
          width="100%"
        >
          {`${score} of ${total} ${verb}`}
        </Text>
      </Box>
      <Input placeholder="Enter country" />
    </Flex>
  );
};

GameInputBanner.propTypes = {
  score: PropTypes.number,
  total: PropTypes.number,
  verb: PropTypes.string,
};
GameInputBanner.defaultProps = {
  score: 0,
  total: 0,
  verb: "countries",
};

export default GameInputBanner;
