import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import AdminMapsTableContainer from "../../containers/AdminMapsTableContainer";
import HeroHeader from "../../components/HeroHeader";

const MapResources: FC = () => {
  return (
    <MainView>
      <Head>
        <title>Map Resources - GeoBuff</title>
        <meta
          name="description"
          content="Like the look of our SVG maps? We've bundled and shared all of our map resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading="Map Resources" />
      <Flex
        direction="column"
        height="100%"
        width="100%"
        maxWidth={1200}
        mx="auto"
        py={9}
        px={5}
        fontSize={{ base: "12px", md: "inherit" }}
        justifyContent="center"
      >
        <AdminMapsTableContainer />
      </Flex>
    </MainView>
  );
};

export default MapResources;
