import React, { FC } from "react";
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import MainView from "../../components/MainView";
import Head from "next/head";
import HeroHeader from "../../components/HeroHeader";
import Card from "../../components/Card";
import { useRouter } from "next/router";

const resources = [
  {
    title: "Map",
    subtitle: "The React component used to display our maps.",
    href: "https://github.com/geobuff/svg-map",
  },
  {
    title: "Maps",
    subtitle: "Our collection of free-to-use SVG maps.",
    href: "/resources/maps",
  },
  {
    title: "Flags",
    subtitle: "Our collection of free-to-use flag urls.",
    href: "/resources/flags",
  },
  {
    title: "Mappings",
    subtitle: "The collection of mappings that drive our games.",
    href: "/resources/mappings",
  },
];

const Resources: FC = () => {
  const router = useRouter();

  return (
    <MainView>
      <Head>
        <title>Resources - GeoBuff</title>
        <meta
          name="description"
          content="Like what you see? We've bundled and shared all of our map, flag and mapping resources so that others can use them in their own projects."
        />
      </Head>
      <HeroHeader heading="Resources" />
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
        <Card marginY={10} padding={6}>
          <Heading size="md" mb={3}>{`Like what you see?`}</Heading>
          <Text mb={6}>
            {`We've bundled and shared all of our resources so that others can use them in their own projects.`}
          </Text>
          {resources.map((resource, index) => (
            <React.Fragment key={index}>
              <Divider borderWidth={1} my={2} />
              <Flex
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginY={2}
                marginX={1}
              >
                <Flex direction="column">
                  <Text fontSize={18} fontWeight="bold">
                    {resource.title}
                  </Text>
                  <Text color="gray.500">{resource.subtitle}</Text>
                </Flex>
                <Button
                  onClick={() => router.push(resource.href)}
                  colorScheme="teal"
                  width="100px"
                >
                  {"View"}
                </Button>
              </Flex>
            </React.Fragment>
          ))}
          <Divider borderWidth={1} my={2} />
        </Card>
      </Flex>
    </MainView>
  );
};

export default Resources;
