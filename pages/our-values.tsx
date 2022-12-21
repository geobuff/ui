import React, { FC, useContext } from "react";

import { HeroHeader, Twemoji } from "@geobuff/buff-ui/components";

import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../contexts/LanguageContext";

const OurValues: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.ourValues} - GeoBuff`}</title>
        <meta
          name="description"
          content="What defines us and what we're building? Learn more about the values that characterize our team and drive our mission statement."
        />
      </Head>
      <HeroHeader heading={t.global.ourValues} />
      <Box background="white">
        <Box
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={9}
          fontSize={{ base: "12px", md: "inherit" }}
        >
          <Box
            mt={6}
            mb={12}
            width={{ base: "90%", md: 600 }}
            mx="auto"
            lineHeight="28px"
          >
            <Box textAlign="center">
              <Twemoji emoji="🙌" height="75px" width="75px" mb={3} />
              <Flex direction="column" textAlign="center">
                <Heading size="md" mb={3}>
                  {t.ourValues.valueOneTitle}
                </Heading>
                <Text textAlign="left">{t.ourValues.valueOneDescription}</Text>
              </Flex>
            </Box>
          </Box>
          <Box
            mb={12}
            width={{ base: "90%", md: 600 }}
            mx="auto"
            lineHeight="28px"
          >
            <Box textAlign="center">
              <Twemoji emoji="🗺️" height="75px" width="75px" mb={3} />
              <Flex direction="column" textAlign="center">
                <Heading size="md" mb={3}>
                  {t.ourValues.valueTwoTitle}
                </Heading>
                <Text textAlign="left">{t.ourValues.valueTwoDescription}</Text>
              </Flex>
            </Box>
          </Box>
          <Box
            mb={24}
            width={{ base: "90%", md: 600 }}
            mx="auto"
            lineHeight="28px"
          >
            <Box textAlign="center">
              <Twemoji emoji="🧗‍♀️" height="75px" width="75px" mb={3} />
              <Flex direction="column" textAlign="center">
                <Heading size="md" mb={3}>
                  {t.ourValues.valueThreeTitle}
                </Heading>
                <Text textAlign="left">
                  {t.ourValues.valueThreeDescription}
                </Text>
              </Flex>
            </Box>
          </Box>
          <Box width={{ base: "90%", md: 600 }} mx="auto" mb={12}>
            <Heading size="md" mb={6}>
              {t.ourValues.feedbackTitle}
            </Heading>
            <Text>
              {`${t.ourValues.feedbackMessage} `}
              <Link href="mailto: teamgeobuff@gmail.com">
                teamgeobuff@gmail.com
              </Link>
              {`.`}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OurValues;
