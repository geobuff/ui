import React, { FC } from "react";
import { Alert, AlertIcon, Box, Link } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import posts from "./posts";

const Blog: FC = () => {
  return (
    <MainView>
      <Head>
        <title>Blog - GeoBuff</title>
        <meta
          name="description"
          content="Latest ramblings from the GeoBuff team about Geography, current affairs, new features and more..."
        />
      </Head>
      <HeroHeader heading="Blog" />
      <Box width={800} mx="auto" py={9}>
        {posts.length === 0 ? (
          <Alert status="info" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            Nothing to see here.
          </Alert>
        ) : (
          <>
            {posts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            ))}
          </>
        )}
      </Box>
    </MainView>
  );
};

export default Blog;
