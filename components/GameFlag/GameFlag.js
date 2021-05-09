import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

const GameFlags = ({ code }) => (
  <Box width="100%" height="100%">
    <Image
      src={getFlagUrl(code)}
      width={{ base: "80%", md: "500px" }}
      borderRadius={4}
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      margin="auto"
      pb="50px"
    />
  </Box>
);

GameFlags.propTypes = {
  code: PropTypes.string,
};
GameFlags.defaultProps = {
  code: "nz",
};

export default GameFlags;
