import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";

const HeroBanner = ({ username }) => {
  return (
    <Box
      background="linear-gradient(90deg, #44D581 0%, #27AE60 100%)"
      width="100%"
      height={{
        base: "225px",
        sm: "250px",
        md: "300px",
      }}
    >
      <Box
        height="100%"
        background="url(/world-map.svg)"
        backgroundRepeat="no-repeat"
        backgroundSize={{
          base: "400px 200px",
          sm: "450px 250px",
          md: "650px 350px",
        }}
        backgroundPosition={{
          base: "right -175px top 20px",
          sm: "right -170px top 20px",
          md: "right -20px top -10px",
        }}
      >
        <Box padding={{ base: 3, sm: 6, md: 12 }}>
          <Text fontSize="48px" fontWeight="black" lineHeight="100%">
            {username ? "Welcome back," : "Welcome to"}
          </Text>
          <Text fontSize="48px" fontWeight="black">
            {username || "GeoBuff"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

HeroBanner.propTypes = {
  username: PropTypes.string,
};
HeroBanner.defaultProps = {
  username: "",
};

export default HeroBanner;
