import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import AdminMappingsTableContainer from "../../containers/AdminMappingsTableContainer";

const MappingResources: FC = () => {
  return (
    <MainView>
      <Head>
        <title>Mapping Resources - GeoBuff</title>
        <meta
          name="description"
          content="Like the look of our game mappings? We've bundled and shared all of our mapping resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading="Mapping Resources" />
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
        <AdminMappingsTableContainer />
      </Flex>
    </MainView>
  );
};

export default MappingResources;
