import React, { FC } from "react";
import { Box, Flex, Fade, Text, Heading } from "@chakra-ui/react";

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
      background={`url(${process.env.NEXT_PUBLIC_CDN_URL}/headers/world-map.svg)`}
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
            <Heading
              as="h1"
              color="white"
              fontSize={["38px", "42px", "56px"]}
              fontWeight="black"
              lineHeight={{ base: "1.1", md: "1" }}
            >
              {heading}
            </Heading>
          </Fade>
        )}
        {!!subtitle && (
          <Fade in>
            <Text
              color="white"
              fontSize={{ base: "16px", md: "24px" }}
              lineHeight={{ base: "1.1", md: "1" }}
              mt={{ base: 3, md: 6 }}
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
