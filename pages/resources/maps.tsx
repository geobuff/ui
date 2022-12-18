import React, { FC, useContext } from "react";

import { ArrowLeft, HeroHeader } from "@geobuff/buff-ui/components";

import { Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import AdminMapsTableContainer from "../../containers/AdminMapsTableContainer";

const MapResources: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.mapResources.title} - GeoBuff`}</title>
        <meta
          name="description"
          content="Like the look of our SVG maps? We've bundled and shared all of our map resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading={t.mapResources.title} />
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
              {t.resources.backToResources}
            </Text>
          </Button>
        </Flex>
        <AdminMapsTableContainer />
      </Flex>
    </>
  );
};

export default MapResources;
