import React, { FC, useContext } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

import MainView from "../../components/MainView";
import HeroHeader from "../../components/HeroHeader";
import Card from "../../components/Card";
import CommunityQuizFormContainer from "../../containers/CommunityQuizFormContainer";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const Create: FC = () => {
  const { user } = useContext(CurrentUserContext);

  // TODO: remove when ready
  if (!user?.isAdmin) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Create Community Quiz - GeoBuff"}</title>
        <meta
          name="description"
          content="Think you can do better? Then prove yourself by creating your own quiz with our Community Quiz builder. Perfect for Teachers and true GeoBuffs!"
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
};

export default Create;
