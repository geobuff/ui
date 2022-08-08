import React, { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import MainView from "../MainView";
import Head from "next/head";
import HeroHeader from "../HeroHeader";
import { MDXProvider } from "@mdx-js/react";

const h1 = (props) => <Heading size="2xl" my="0.5rem" {...props} />;
const p = (props) => <Text {...props} />;

const components = {
  h1,
  p,
};

interface Meta {
  date: string;
  slug: string;
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
    <Box width={800} mx="auto" py={9}>
      <MDXProvider components={components}>
        <article>{children}</article>
      </MDXProvider>
    </Box>
  </MainView>
);

export default BlogPost;
