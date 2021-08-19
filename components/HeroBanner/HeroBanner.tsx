import React, { FC } from "react";
import { Box, Fade, Flex, Text } from "@chakra-ui/react";

const subHeaderText =
  "Create an account and compete with players from all over the globe!";

const HeroBanner: FC = () => (
  <Box
    role="banner"
    background="linear-gradient(90deg, #27AE60 0%, #219250 100%)"
    height={["260px", "300px", "420px"]}
    width="100%"
  >
    <Box
      height="100%"
      background={"url(/world-map.svg)"}
      backgroundRepeat="no-repeat"
      backgroundSize={{ base: "600px 300px", md: "1200px 475px" }}
      backgroundPosition="center top 2px"
    >
      <Flex
        direction="column"
        padding={[3, 6, 12]}
        height="100%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Fade in>
          <Text
            color="white"
            fontSize={["42px", "42px", "56px"]}
            fontWeight="black"
            lineHeight={{ base: "1.1", md: "1" }}
          >
            {"Get Your Geo Flex On"}
          </Text>

          <Box
            marginY={5}
            marginX="auto"
            maxWidth={{ sm: "400px", md: "450px" }}
          >
            <Text
              color="white"
              fontSize={["18px", "18px", "24px"]}
              fontWeight="medium"
            >
              {subHeaderText}
            </Text>
          </Box>
        </Fade>
      </Flex>
    </Box>
  </Box>
);

export default HeroBanner;
