import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

const GameFlags = ({ mapping }) => (
  <Box width="100%" height="100%">
    {mapping.map((entry, i) => (
      <Box key={i} my={6}>
        <Image
          src={getFlagUrl(entry.code)}
          width="245px"
          height="180px"
          borderRadius={4}
          mx="auto"
        />
      </Box>
    ))}
  </Box>
);

GameFlags.propTypes = {
  mapping: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
      svgName: PropTypes.string,
      alternativeNames: PropTypes.arrayOf(PropTypes.string),
      prefixes: PropTypes.arrayOf(PropTypes.string),
      group: PropTypes.string,
    })
  ),
};
GameFlags.defaultProps = {
  mapping: [],
};

export default GameFlags;
