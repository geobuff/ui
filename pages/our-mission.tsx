import React, { FC, useContext } from "react";
import Head from "next/head";
import { Box, Text, Link } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import Twemoji from "../components/Twemoji";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";

const OurMission: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainView>
      <Head>
        <title>{`${t.global.ourMission} - GeoBuff`}</title>
        <meta
          name="description"
          content="Why are we building GeoBuff? Learn more about our mission statement and why we're looking to build the next best thing in Geography education and trivia."
        />
      </Head>
      <HeroHeader heading={t.global.ourMission} />
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
                {`${t.ourMission.goalOneMessage} `}
                <Link href="/daily-trivia/today" color="teal.500">
                  {t.ourMission.goalOneLink}
                </Link>
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
                {`${t.ourMission.goalTwoMessageOne} `}
                <Link href="/create/community-quizzes" color="teal.500">
                  {t.ourMission.goalTwoLink}
                </Link>
                {` ${t.ourMission.goalTwoMessageTwo}`}
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
                {`${t.ourMission.goalThreeMessageOne} `}
                <Link
                  href="https://github.com/geobuff/svg-map"
                  color="teal.500"
                  isExternal
                >
                  {t.global.map.toLowerCase()}
                </Link>
                {`, `}
                <Link href="/resources/maps" color="teal.500">
                  {t.global.maps.toLowerCase()}
                </Link>
                {`, `}
                <Link href="/resources/mappings" color="teal.500">
                  {t.global.mapping}
                </Link>
                {` ${t.global.and} `}
                <Link href="/resources/flags" color="teal.500">
                  {t.global.flag}
                </Link>
                {` ${t.ourMission.goalThreeMessageTwo}`}
              </Text>
            </Box>
          </Box>
          <Box color="#828282" fontSize="15px" mt={24} mb={12}>
            <Text mb={3}>{t.ourMission.quoteOne}</Text>
            <Text>{"- Tim Marshall, Prisoners of Geography"}</Text>
          </Box>
          <Box color="#828282" fontSize="15px" mb={12}>
            <Text mb={3}>{t.ourMission.quoteTwo}</Text>
            <Text>{"- Robert D. Kaplan, The Revenge of Geography"}</Text>
          </Box>
        </Box>
      </Box>
    </MainView>
  );
};

export default OurMission;
