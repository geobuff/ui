import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";

import MainView from "../components/MainView";
import ErrorView from "../components/ErrorView";
import Head from "next/head";
import { StatusCode } from "../types/statusCode";

const Custom500: FC = () => {
  return (
    <>
      <Head>
        <title>{"Error - GeoBuff"}</title>
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
          <ErrorView code={StatusCode.InternalServerError} />
        </Flex>
      </MainView>
    </>
  );
};

export default Custom500;
