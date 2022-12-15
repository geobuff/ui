import React, { useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import CommunityQuizFormContainer from "../../containers/CommunityQuizFormContainer";

import Card from "../../components/Card";

export default function Create(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.createCommunityQuiz.title} - GeoBuff`}</title>
        <meta
          name="description"
          content="Create your own quiz with our Community Quiz builder! Perfect for teachers or those looking to spice up their next team meeting."
        />
      </Head>
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
          <Heading>{t.createCommunityQuiz.title}</Heading>
          <Flex width="100%" marginTop={10}>
            <CommunityQuizFormContainer />
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

Create.requireAuth = true;
