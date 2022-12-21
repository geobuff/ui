import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";
import { ArrowLeft } from "@geobuff/buff-ui/components";

import { Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import AdminMappingsTableContainer from "../../containers/AdminMappingsTableContainer";

const MappingResources: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.mappingResources.title} - GeoBuff`}</title>
        <meta
          name="description"
          content="Like the look of our game mappings? We've bundled and shared all of our mapping resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading={t.mappingResources.title} />
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
    </>
  );
};

export default MappingResources;
