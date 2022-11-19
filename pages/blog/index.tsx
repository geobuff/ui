import React, { FC } from "react";

import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import Head from "next/head";

import BlogPostCard from "../../components/Blog/BlogPostCard";
import HeroHeader from "../../components/HeroHeader";
import MainView from "../../components/MainView";

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
      <Box width={{ base: "90%", md: 800 }} mx="auto" py={9}>
        {posts.length === 0 ? (
          <Alert status="info" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            Nothing to see here.
          </Alert>
        ) : (
          <>
            {posts.map((post, index) => (
              <BlogPostCard
                key={index}
                slug={post.slug}
                date={post.date}
                title={post.title}
                description={post.description}
              />
            ))}
          </>
        )}
      </Box>
    </MainView>
  );
};

export default Blog;
