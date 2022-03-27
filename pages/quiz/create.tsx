import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";
import Card from "../../components/Card";
import CommunityQuizForm from "../../components/CommunityQuizForm/CommunityQuizForm";

const Create: FC = () => {
  return (
    <>
      <Head>
        <title>{"Create Community Quiz - GeoBuff"}</title>
      </Head>
      <MainView>
        <HeroHeader height={{ base: "180px", md: "220px" }} />
        <Flex
          direction="column"
          borderRadius={12}
          width="100%"
          maxWidth={900}
          marginX="auto"
          paddingX={4}
          marginTop={-125}
          marginBottom={14}
          justifyContent="center"
        >
          <Card padding={{ base: 6, md: 8 }}>
            <Heading>{"Create Community Quiz"}</Heading>

            <Flex width="100%" flex={1} marginTop={10}>
              <CommunityQuizForm />
            </Flex>
          </Card>
        </Flex>
      </MainView>
    </>
  );
};

export default Create;
