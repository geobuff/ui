import React, { FC } from "react";
import Head from "next/head";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import Twemoji from "../components/Twemoji";

const OurValues: FC = () => (
  <MainView>
    <Head>
      <title>Our Values - GeoBuff</title>
      <meta
        name="description"
        content="What defines us and what we're building? Learn more about the values that characterize our team and drive our mission statement."
      />
    </Head>
    <HeroHeader heading="Our Values" />
    <Box background="white">
      <Box
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
      >
        <Box
          mt={6}
          mb={12}
          width={{ base: "90%", md: 600 }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🙌" height="75px" width="75px" mb={3} />
            <Flex direction="column" textAlign="center">
              <Heading size="md" mb={3}>{`Quality`}</Heading>
              <Text textAlign="left">{`We're dedicated to delivering the highest quality of user experience across platforms so that users can learn on the go or at home on the big screen.`}</Text>
            </Flex>
          </Box>
        </Box>
        <Box
          mb={12}
          width={{ base: "90%", md: 600 }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🗺️" height="75px" width="75px" mb={3} />
            <Flex direction="column" textAlign="center">
              <Heading size="md" mb={3}>{`Diversity`}</Heading>
              <Text textAlign="left">{`We aim to create trivia questions, build quizzes and share resources that represent people, places and cultures from all over the world.`}</Text>
            </Flex>
          </Box>
        </Box>
        <Box
          mb={24}
          width={{ base: "90%", md: 600 }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🧗‍♀️" height="75px" width="75px" mb={3} />
            <Flex direction="column" textAlign="center">
              <Heading size="md" mb={3}>{`Challenge`}</Heading>
              <Text textAlign="left">{`Learning is more fun when you're pushing yourself. We want to deliver content that challenges our users so they can incrementally improve over time.`}</Text>
            </Flex>
          </Box>
        </Box>
        <Box width={{ base: "90%", md: 600 }} mx="auto" mb={12}>
          <Heading
            size="md"
            mb={6}
          >{`Feel like we're falling short on one of these values?`}</Heading>
          <Text>
            {`Let us know how you think we can do better at `}
            <Link href="mailto: teamgeobuff@gmail.com">
              teamgeobuff@gmail.com
            </Link>
            {`.`}
          </Text>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default OurValues;
