import React, { FC, useState } from "react";
import Link from "next/link";
import { Box, Fade, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";

interface SubHeaderAction {
  link: string;
  value: string;
}

const actions: SubHeaderAction[] = [
  {
    link: "/leaderboard",
    value: "compete with players from all over the globe!",
  },
  {
    link: "/help-center#faq",
    value: "collect GeoCoin each time you complete a quiz",
  },
  { link: "/merch", value: "cop an item from our summer collection" },
];

const HeroBanner: FC = () => {
  const [index, setIndex] = useState(0);

  setTimeout(() => {
    const update = index === actions.length - 1 ? 0 : index + 1;
    setIndex(update);
  }, 10000);

  return (
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
                {"Create an account and"}{" "}
                <Link href={actions[index].link}>
                  <ChakraLink textDecoration="underline">
                    {actions[index].value}
                  </ChakraLink>
                </Link>
              </Text>
            </Box>
          </Fade>
        </Flex>
      </Box>
    </Box>
  );
};

export default HeroBanner;
