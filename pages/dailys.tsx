import React, { FC } from "react";
import Head from "next/head";

import DailysContainer from "../containers/DailysContainer";
import HeroHeader from "../components/HeroHeader";
import { Box, Flex } from "@chakra-ui/react";
import MainView from "../components/MainView";

const Dailys: FC = () => {
  return (
    <>
      <Head>
        <title> {"Dailys - GeoBuff"}</title>
      </Head>
      <MainView>
        <HeroHeader heading="Dailys" />
        <Box background="white">
          <Flex
            direction="column"
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={9}
            fontSize={{ base: "12px", md: "inherit" }}
            justifyContent="center"
          >
            <DailysContainer />
          </Flex>
        </Box>
      </MainView>
    </>
  );
};

export default Dailys;
