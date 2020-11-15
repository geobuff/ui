import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/core";
import Twemoji from "../Twemoji";

const NavigationBar = () => {
  return (
    <Box
      m={0}
      py={1}
      px={5}
      backgroundColor="white"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text ml={2} fontSize={[22, 26, 26]} fontWeight="bold">
            <Twemoji
              emoji="🌏"
              height={[6, 7, 7]}
              width={[6, 7, 7]}
              pt={["4px", "5px", "5px"]}
              mr={2}
            />
            {"Geobuff"}
          </Text>
        </Link>

        <Link href="/leaderboard" _hover={{ textDecoration: "none" }}>
          <Twemoji emoji="🏆" height={[6, 7, 7]} width={[6, 7, 7]} pt="2px" />
        </Link>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
