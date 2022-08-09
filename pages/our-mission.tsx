import React, { FC } from "react";
import Head from "next/head";
import { Box, Text, Link } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import Twemoji from "../components/Twemoji";

const OurMission: FC = () => (
  <MainView>
    <Head>
      <title>Our Mission - GeoBuff</title>
      <meta
        name="description"
        content="Why are we building GeoBuff? Learn more about our mission statement and why we're looking to build the next best thing in Geography education and trivia."
      />
    </Head>
    <HeroHeader heading="Our Mission" />
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
          maxWidth={{ base: "100%", md: "450px" }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🧠" height="75px" width="75px" mb={3} />
            <Text
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              mx="auto"
            >
              {`Create the world's most interactive and diverse auto-generating daily Geography trivia`}
            </Text>
          </Box>
        </Box>
        <Box
          my={12}
          maxWidth={{ base: "100%", md: "450px" }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🧑‍🏫" height="75px" width="75px" mb={3} />
            <Text
              fontSize="18px"
              fontWeight="bold"
              textAlign="center"
              mx="auto"
            >
              {`Build a custom quiz-builder that teachers can use to keep students engaged in the classroom`}
            </Text>
          </Box>
        </Box>
        <Box
          my={12}
          maxWidth={{ base: "100%", md: "450px" }}
          mx="auto"
          lineHeight="28px"
        >
          <Box textAlign="center">
            <Twemoji emoji="🧰" height="75px" width="75px" mb={3} />
            <Text fontSize="18px" fontWeight="bold" mx="auto">
              Share our{" "}
              <Link
                href="https://github.com/geobuff/svg-map"
                color="teal.500"
                isExternal
              >
                map
              </Link>
              ,{" "}
              <Link href="/resources/maps" color="teal.500">
                maps
              </Link>
              ,{" "}
              <Link href="/resources/mappings" color="teal.500">
                mapping
              </Link>{" "}
              and{" "}
              <Link href="/resources//flags" color="teal.500">
                flag
              </Link>{" "}
              resources so that others can use them in their own projects
            </Text>
          </Box>
        </Box>
        <Box color="#828282" fontSize="15px" mt={24} mb={12}>
          <Text mb={3}>
            {`"Technology may seem to overcome the distances between us in both mental and physical space, but it is easy to forget that the land where we live, work and raise our children is hugely important, and that the choices of those who lead the seven billion inhabitants of this planet will to some degree always be shaped by the rivers, mountains, deserts, lakes and seas that constrain us all – as they always have."`}
          </Text>
          <Text>{"- Tim Marshall, Prisoners of Geography"}</Text>
        </Box>
        <Box color="#828282" fontSize="15px" mb={12}>
          <Text mb={3}>
            {`"A good place to understand the present, and to ask questions about the future, is on the ground, travelling as slowly as possible."`}
          </Text>
          <Text>{"- Robert D. Kaplan, The Revenge of Geography"}</Text>
        </Box>
      </Box>
    </Box>
  </MainView>
);

export default OurMission;
