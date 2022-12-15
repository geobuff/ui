import React, { FC, useContext } from "react";

import { HeroHeader } from "@geobuff/buff-ui/components";

import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

const CookiePolicy: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.cookiePolicy} - GeoBuff`}</title>
        <meta
          name="description"
          content="This cookie policy is part of GeoBuff's privacy policy. It covers the use of cookies between your device and our site."
        />
      </Head>
      <Box>
        <HeroHeader heading={t.global.cookiePolicy} />
        <Box background="white">
          <Box
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={12}
            fontSize={{ base: "12px", md: "inherit" }}
          >
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                {t.cookiePolicy.sectionOnePartOne}{" "}
                <Link href="https://geobuff.com">https://geobuff.com</Link>
                {t.cookiePolicy.sectionOnePartTwo}
              </Text>
              <Text>{t.cookiePolicy.sectionTwo}</Text>
              <Text>
                {t.cookiePolicy.sectionThreePartOne}
                <Link href="https://geobuff.com">https://geobuff.com</Link>
                {t.cookiePolicy.sectionThreePartTwo}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.cookiePolicy.whatIsACookieHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.cookiePolicy.whatIsACookieSectionOne}</Text>
              <Text>{t.cookiePolicy.whatIsACookieSectionTwo}</Text>
              <Text>{t.cookiePolicy.whatIsACookieSectionThree}</Text>
              <Text>{t.cookiePolicy.whatIsACookieSectionFour}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.cookiePolicy.typesHeading}
            </Heading>
            <Heading as="h4" size="md" mt={6} mb={3}>
              {t.cookiePolicy.typesHeadingTwo}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.cookiePolicy.typesSectionOne}</Text>
              <Text>{t.cookiePolicy.typesSectionTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.cookiePolicy.typesHeadingThree}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.cookiePolicy.typesSectionThree}</Text>
              <Text>{t.cookiePolicy.weDoNotUse}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.cookiePolicy.typesHeadingFour}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.cookiePolicy.typesSectionFive}</Text>
              <Text>{t.cookiePolicy.weDoNotUse}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.cookiePolicy.typesHeadingFive}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.cookiePolicy.typesSectionSeven}</Text>
              <Text>{t.cookiePolicy.weDoNotUse}</Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CookiePolicy;
