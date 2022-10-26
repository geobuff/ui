import React, { FC, useContext } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import AdminMappingsTableContainer from "../../containers/AdminMappingsTableContainer";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const MappingResources: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

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
        <AdminMappingsTableContainer />
      </Flex>
    </MainView>
  );
};

export default MappingResources;
