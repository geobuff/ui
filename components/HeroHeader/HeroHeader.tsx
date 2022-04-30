import React, { FC } from "react";
import { Box, Flex, Fade, Text } from "@chakra-ui/react";

interface Props {
  heading?: string;
  subtitle?: string;
  [x: string]: any;
}

const HeroHeader: FC<Props> = ({ heading = "", subtitle = "", ...props }) => (
  <Box
    role="banner"
    background="linear-gradient(90deg, #27AE60 0%, #219250 100%)"
    height={{ base: "130px", md: "200px" }}
    width="100%"
    {...props}
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
        {!!heading && (
          <Fade in>
            <Text
              color="white"
              fontSize={["38px", "42px", "56px"]}
              fontWeight="black"
              lineHeight={{ base: "1.1", md: "1" }}
            >
              {heading}
            </Text>
          </Fade>
        )}
        {!!subtitle && (
          <Fade in>
            <Text
              color="white"
              fontSize={["16px", "24px"]}
              lineHeight={{ base: "1.1", md: "1" }}
              mt={6}
            >
              {subtitle}
            </Text>
          </Fade>
        )}
      </Flex>
    </Box>
  </Box>
);

export default HeroHeader;
