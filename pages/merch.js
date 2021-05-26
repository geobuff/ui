import React from "react";
import Head from "next/head";
import { Box, Image } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";

const Merch = () => (
  <MainView>
    <Head>
      <title>Merch - GeoBuff</title>
    </Head>
    <Box>
      <HeroHeader heading="Merch" />
      <Box maxWidth={{ base: "80%", md: "50%" }} mt={6} mx="auto">
        <Image src="/merch-placeholder.png" borderRadius={12} />
      </Box>
    </Box>
  </MainView>
);

export default Merch;
