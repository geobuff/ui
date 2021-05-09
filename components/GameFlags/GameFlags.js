import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

const GameFlags = ({ flags }) => {
  if (flags.length === 0) {
    return null;
  }

  return (
    <Box width="100%" height="100%">
      <Image
        src={getFlagUrl(flags[0].code)}
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
};

GameFlags.propTypes = {
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
GameFlags.defaultProps = {
  flags: [],
};

export default GameFlags;
