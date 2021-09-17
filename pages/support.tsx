import React, { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { Text, Box, Divider, Flex } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import SupportFormContainer from "../containers/SupportFormContainer";
import FAQSection from "../components/FAQSection";

const Support: FC = () => (
  <MainView>
    <Head>
      <title>Support - GeoBuff</title>
    </Head>
    <HeroHeader heading="Support" />
    <Box background="white">
      <Flex
        direction="column"
        maxWidth={{ base: "80%", md: "50%" }}
        mx="auto"
        py={9}
        fontSize={{ base: "12px", md: "inherit" }}
        justifyContent="center"
      >
        <Box>
          <Text>
            {`Have an issue? Send a message to support and we'll get back to
            as soon as we can.`}
          </Text>
          <SupportFormContainer />
        </Box>
        <Link href="#faq">
          <Text textAlign="center" my={6} fontSize="48px" fontWeight="black">
            F.A.Q
          </Text>
        </Link>
        <Divider mb={12} />
        <FAQSection />
      </Flex>
    </Box>
  </MainView>
);

export default Support;
