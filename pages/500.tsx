import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";
import Head from "next/head";

import ErrorView from "../components/ErrorView";

import { StatusCode } from "../types/statusCode";

const Custom500: FC = () => {
  return (
    <>
      <Head>
        <title>{"Error - GeoBuff"}</title>
        <meta
          name="description"
          content="Uh-oh! Looks like we've encountered an error. If this issue persists please contact support."
        />
      </Head>
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
        backgroundColor="#276F86"
        overflowX="hidden"
      >
        <ErrorView code={StatusCode.InternalServerError} />
      </Flex>
    </>
  );
};

export default Custom500;
