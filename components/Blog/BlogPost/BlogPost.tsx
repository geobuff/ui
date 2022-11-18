import React, { FC } from "react";

import { Box } from "@chakra-ui/react";
import Head from "next/head";

import HeroHeader from "../../HeroHeader";
import MainView from "../../MainView";

interface Meta {
  date: string;
  title: string;
  description: string;
}

export interface Props {
  meta: Meta;
  children: JSX.Element;
}

const BlogPost: FC<Props> = ({ meta, children }) => (
  <MainView>
    <Head>
      <title>{`${meta.title} - GeoBuff`}</title>
      <meta name="description" content={meta.description} />
    </Head>
    <HeroHeader heading={meta.title} subtitle={meta.date} />
    <Box
      width={{ base: "90%", md: 800 }}
      mx="auto"
      py={9}
      className="mdx-prose"
    >
      <article>{children}</article>
    </Box>
  </MainView>
);

export default BlogPost;
