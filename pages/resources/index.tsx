import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Button, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import Card from "../../components/Card";

const Resources: FC = () => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const resources = [
    {
      title: t.global.map,
      subtitle: t.resources.mapDescription,
      href: "https://github.com/geobuff/svg-map",
    },
    {
      title: t.global.maps,
      subtitle: t.resources.mapsDescription,
      href: "/resources/maps",
    },
    {
      title: t.global.flags,
      subtitle: t.resources.flagsDescription,
      href: "/resources/flags",
    },
    {
      title: t.global.mappings,
      subtitle: t.resources.mappingsDescription,
      href: "/resources/mappings",
    },
  ];

  return (
    <>
      <Head>
        <title>{`${t.global.resources} - GeoBuff`}</title>
        <meta
          name="description"
          content="Like what you see? Get in touch with the team at teamgeobuff@gmail.com to find out more about hooking into our API and utilizing our resources in your own project."
        />
      </Head>
      <HeroHeader heading={t.global.resources} />
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
        <Card marginY={{ base: 3, md: 10 }} padding={6}>
          <Heading size="md" mb={3}>
            {t.resources.title}
          </Heading>
          <Text mb={6}>
            {t.resources.descriptionOne}
            <Link href="mailto: teamgeobuff@gmail.com">
              teamgeobuff@gmail.com
            </Link>
            {t.resources.descriptionTwo}
          </Text>
          {resources.map((resource, index) => (
            <React.Fragment key={index}>
              <Divider borderWidth={1} my={2} />
              <Flex
                key={index}
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                marginY={2}
                marginX={1}
              >
                <Flex
                  direction="column"
                  textAlign={{ base: "center", md: "inherit" }}
                >
                  <Text fontSize={18} fontWeight="bold" mb={{ base: 1, md: 0 }}>
                    {resource.title}
                  </Text>
                  <Text color="gray.500">{resource.subtitle}</Text>
                </Flex>
                <Button
                  onClick={() => router.push(resource.href)}
                  colorScheme="teal"
                  width="100px"
                  my={{ base: 3, md: 0 }}
                >
                  {t.global.view}
                </Button>
              </Flex>
            </React.Fragment>
          ))}
          <Divider borderWidth={1} my={2} />
        </Card>
      </Flex>
    </>
  );
};

export default Resources;
