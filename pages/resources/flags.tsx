import React, { FC, useContext } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import AdminFlagsTableContainer from "../../containers/AdminFlagsTableContainer";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const FlagResources: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  return (
    <MainView>
      <Head>
        <title>{`${t.flagResources.title} - GeoBuff`}</title>
        <meta
          name="description"
          content="Like the look of our flags? We've bundled and shared all of our flag resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading={t.flagResources.title} />
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
        <AdminFlagsTableContainer />
      </Flex>
    </MainView>
  );
};

export default FlagResources;
