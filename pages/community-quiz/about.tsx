import React, { FC } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import Image from "../../components/Image";

const About: FC = () => {
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
          maxWidth={800}
          mx="auto"
          py={9}
          px={5}
          fontSize={{ base: "12px", md: "inherit" }}
          justifyContent="center"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex justifyContent="center">
              <Image src="/community-quiz/quiz-builder.png" />
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text>
                {
                  "Use our quiz builder to create the perfect brain scratcher for your friends, students or workmates!"
                }
              </Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex direction="column" justifyContent="center">
              <Text>
                {
                  "Utilise our extensive collection of map or flag resources to fine tune each question."
                }
              </Text>
            </Flex>
            <Flex justifyContent="center">
              <Image src="/community-quiz/resources.png" />
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex justifyContent="center">
              <Image src="/community-quiz/visibility.png" />
            </Flex>
            <Flex direction="column" justifyContent="center">
              <Text>
                {
                  "Make your quiz public to see how our community of GeoBuff's fare or keep it private to share with your friends."
                }
              </Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
            <Flex direction="column" justifyContent="center">
              <Text>
                {
                  "View, edit or delete your quizzes and check the quiz plays in your user profile!"
                }
              </Text>
            </Flex>
            <Flex justifyContent="center">
              <Image src="/community-quiz/my-quizzes.png" />
            </Flex>
          </SimpleGrid>
          <Flex justifyContent="center" my={12}>
            <Heading size="md">
              Heard enough?{" "}
              <ChakraLink>
                <Link href="/register">Sign up</Link>{" "}
              </ChakraLink>{" "}
              today to start creating your own!
            </Heading>
          </Flex>
        </Flex>
      </Box>
    </MainView>
  );
};

export default About;
