import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import FAQSection from "../components/FAQSection";
import { useRouter } from "next/router";

const FAQ: FC = () => {
  const router = useRouter();
  const [index, setIndex] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIndex(router.query.index as string);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <MainView>
      <Head>
        <title>FAQ - GeoBuff</title>
        <meta
          name="description"
          content="Questions frequently asked by GeoBuff users. Can't find what you're after? Please don't hesitate to contact support via the Discord link in the footer."
        />
      </Head>
      <HeroHeader heading="FAQ" />
      <Box background="white">
        <Flex
          direction="column"
          height="100%"
          width="100%"
          maxWidth={800}
          mx="auto"
          py={9}
          px={5}
          fontSize={{ base: "12px", md: "inherit" }}
          justifyContent="center"
        >
          {isLoading ? null : <FAQSection index={index} />}
        </Flex>
      </Box>
    </MainView>
  );
};

export default FAQ;
