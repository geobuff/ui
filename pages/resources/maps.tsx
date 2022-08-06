import React, { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import AdminMapsTableContainer from "../../containers/AdminMapsTableContainer";
import HeroHeader from "../../components/HeroHeader";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";

const MapResources: FC = () => {
  const router = useRouter();

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
        <Flex>
          <Button
            alignItems="center"
            backgroundColor="transparent"
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => router.push("/resources")}
          >
            <ArrowLeft height={5} width={5} marginRight={1} />
            <Text fontWeight="bold" fontSize="14px">
              {"Back to Resources"}
            </Text>
          </Button>
        </Flex>
        <AdminMapsTableContainer />
      </Flex>
    </MainView>
  );
};

export default MapResources;
