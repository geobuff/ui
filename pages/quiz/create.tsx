import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";
import Card from "../../components/Card";

const Create: FC = () => {
  return (
    <>
      <Head>
        <title>{"Create Community Quiz - GeoBuff"}</title>
      </Head>
      <MainView>
        <HeroHeader height={{ base: "200px", md: "250px" }} />
        <Flex
          direction="column"
          borderRadius={12}
          width="100%"
          maxWidth={1000}
          marginX="auto"
          paddingX={4}
          marginTop={-125}
          marginBottom={14}
          justifyContent="center"
        >
          <Card padding={{ base: 4, md: 6 }} minHeight="600px">
            <Heading>{"Create Community Quiz"}</Heading>
          </Card>
        </Flex>
      </MainView>
    </>
  );
};

export default Create;
