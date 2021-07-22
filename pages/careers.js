import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const OurMission = () => (
  <MainView>
    <Head>
      <title>Careers - GeoBuff</title>
    </Head>
    <HeroHeader heading="Careers" />
    <Box background="white">
      <Box
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
      ></Box>
    </Box>
  </MainView>
);

export default OurMission;
