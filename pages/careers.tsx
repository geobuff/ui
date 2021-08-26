import React, { FC } from "react";
import Head from "next/head";
import { Box, Text, Flex, Heading, Link } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import Image from "../components/Image";

const OurMission: FC = () => (
  <MainView>
    <Head>
      <title>Careers - GeoBuff</title>
    </Head>
    <HeroHeader heading="Careers" />
    <Box background="white">
      <Flex
        direction="column"
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
        justifyContent="center"
      >
        <Box>
          <Heading size="md" mb={6}>
            Interested in joining the team?
          </Heading>
          <Text>{`// TODO`}</Text>
          <Text mb={6}>{`// Insert some bs about caring about staff etc`}</Text>
          <Text>Hear from our 2021 grad about his time with us so far:</Text>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems="center"
          my={12}
        >
          <Image
            src="/dan.jpg"
            width="250px"
            height="250px"
            borderRadius="100%"
          />
          <Text maxWidth="400px" mt={{ base: 6, md: 0 }}>
            &quot;GeoBuff is the single worst organization I have ever worked
            at. The snotty founders make me bring them lunch, they push poorly
            written code straight into production, and to be honest with you, I
            think they&apos;re using this thing as a front to launder Bitcoin. I
            haven&apos;t even seen them in 2 weeks! They just left with the
            company card and said they&apos;d be back once they&apos;ve finished
            with some R&D in Cancún. They actually locked the front door when
            they left so if you&apos;re reading this please call the fire
            brigade.&quot;
          </Text>
        </Flex>
        <Box my={12}>
          <Heading size="md" mb={6}>
            Still interested in working for us?
          </Heading>
          <Text>
            Unfortunately, there are currently no open positions in the team. If
            you&apos;re bored and have a spare 5 minutes,{" "}
            <Link fontWeight={600} href="mailto:teamgeobuff@gmail.com">
              email us
            </Link>{" "}
            something interesting.
          </Text>
        </Box>
      </Flex>
    </Box>
  </MainView>
);

export default OurMission;
