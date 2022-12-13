import React, { FC } from "react";

import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";

import HeroHeader from "../../components/HeroHeader";

import { LandingPageRow } from "../../types/landing-page-row";
import LandingPageRowItem from "./LandingPageRowItem";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} />;

interface Props {
  title?: string;
  description?: string;
  rows?: LandingPageRow[];
  question?: string;
  actionText?: string;
  actionHref?: string;
}

const LandingPage: FC<Props> = ({
  title = "",
  description = "",
  rows = [],
  question = "",
  actionText = "",
  actionHref = "",
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Head>
        <title>{`${title} - GeoBuff`}</title>
        <meta name="description" content={description} />
      </Head>
      <HeroHeader heading={title} />
      <Box background="white">
        <Flex
          direction="column"
          height="100%"
          width="100%"
          maxWidth={1300}
          mx="auto"
          py={9}
          px={5}
          fontSize={{ base: "12px", md: "inherit" }}
          justifyContent="center"
        >
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              <LandingPageRowItem
                imageUrl={row.imageUrl}
                imageAlt={row.imageAlt}
                explainer={row.explainer}
                index={index}
              />
              {isMobile && divider}
            </React.Fragment>
          ))}

          <Flex justifyContent="center" mt={{ base: 20, md: 12 }} mb={12}>
            <Heading size="lg">
              {question} <Link href={actionHref}>{actionText}</Link>
            </Heading>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
