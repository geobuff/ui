import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";

import MainView from "../components/MainView";
import ErrorView from "../components/ErrorView";
import Head from "next/head";
import { StatusCode } from "../types/statusCode";

const Custom404: FC = () => {
  return (
    <>
      <Head>
        <title>{"Page Not Found - GeoBuff"}</title>
        <meta
          name="description"
          content="Uh-oh! Looks like we this page can't be found."
        />
      </Head>
      <MainView backgroundColor="#276F86" hasFooter={false} overflowX="hidden">
        <Flex
          alignItems="center"
          justifyContent="center"
          flex={1}
          height="100%"
          width="100%"
          direction="column"
          maxWidth={1400}
          padding={5}
          marginX="auto"
        >
          <ErrorView code={StatusCode.NotFound} />
        </Flex>
      </MainView>
    </>
  );
};

export default Custom404;
