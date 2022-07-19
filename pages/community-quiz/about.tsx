import React, { FC } from "react";

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Link,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import Image from "next/image";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} />;

const About: FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <MainView>
      <Head>
        <title>About - Community Quizzes</title>
        <meta
          name="description"
          content="Think you've got what it takes to go head-to-head with our community of GeoBuff's? Test your knowledge with our collection of user generated quizzes!"
        />
      </Head>
      <HeroHeader heading="Community Quizzes" />
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
          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex justifyContent="center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/quiz-builder.png`}
                alt="Quiz builder example"
                width={630}
                height={630}
                priority
              />
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              padding={{ base: 3, md: 12 }}
            >
              <Text fontSize="24px">
                {
                  "Use our quiz builder to create the perfect brain scratcher for your friends, students or workmates!"
                }
              </Text>
            </Flex>
          </SimpleGrid>

          {isMobile && divider}

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            mt={{ base: 12, md: 0 }}
            mb={12}
          >
            <Flex
              direction="column"
              justifyContent="center"
              padding={{ base: 3, md: 12 }}
            >
              <Text fontSize="24px">
                {
                  "Utilise our extensive collection of map or flag resources to fine tune each question."
                }
              </Text>
            </Flex>
            <Flex justifyContent="center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/resources.png`}
                alt="Resources example"
                width={630}
                height={630}
              />
            </Flex>
          </SimpleGrid>

          {isMobile && divider}

          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex justifyContent="center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/visibility.png`}
                alt="Public/private toggle example"
                width={630}
                height={630}
              />
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              padding={{ base: 3, md: 12 }}
            >
              <Text fontSize="24px">
                {
                  "Make your quiz public to see how our community of GeoBuff's fare or keep it private to share with your friends."
                }
              </Text>
            </Flex>
          </SimpleGrid>

          {isMobile && divider}

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            mt={{ base: 12, md: 0 }}
            mb={12}
          >
            <Flex
              direction="column"
              justifyContent="center"
              padding={{ base: 3, md: 12 }}
            >
              <Text fontSize="24px">
                {
                  "View, edit or delete your quizzes and check the quiz plays in your user profile!"
                }
              </Text>
            </Flex>
            <Flex justifyContent="center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/community-quiz/my-quizzes.png`}
                alt="My quizzes example"
                width={630}
                height={630}
              />
            </Flex>
          </SimpleGrid>

          {isMobile && divider}

          <Flex justifyContent="center" mt={{ base: 20, md: 12 }} mb={12}>
            <Heading size="lg">
              Heard enough?{" "}
              <Link href="/register">
                {`Sign up today to start creating your own!`}
              </Link>
            </Heading>
          </Flex>
        </Flex>
      </Box>
    </MainView>
  );
};

export default About;
