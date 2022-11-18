import React from "react";

import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

import CommunityQuizFormContainer from "../../containers/CommunityQuizFormContainer";

import Card from "../../components/Card";
import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";

export default function Create(): JSX.Element {
  return (
    <>
      <Head>
        <title>{"Create Community Quiz - GeoBuff"}</title>
        <meta
          name="description"
          content="Create your own quiz with our Community Quiz builder! Perfect for teachers or those looking to spice up their next team meeting."
        />
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

            <Flex width="100%" marginTop={10}>
              <CommunityQuizFormContainer />
            </Flex>
          </Card>
        </Flex>
      </MainView>
    </>
  );
}

Create.requireAuth = true;
