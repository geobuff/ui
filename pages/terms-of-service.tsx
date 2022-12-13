import React, { FC, useContext } from "react";

import {
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import HeroHeader from "../components/HeroHeader";

const TermsOfService: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.termsOfService} - GeoBuff`}</title>
        <meta
          name="description"
          content="These Terms of Service govern your use of the website located at and any related services provided by GeoBuff."
        />
      </Head>
      <Box>
        <HeroHeader heading={t.global.termsOfService} />
        <Box background="white">
          <Box
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={12}
            fontSize={{ base: "12px", md: "inherit" }}
          >
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                {t.termsOfService.sectionOnePartOne}
                <Link href="https://geobuff.com">https://geobuff.com</Link>
                {t.termsOfService.sectionOnePartTwo}
              </Text>
              <Text>
                {t.termsOfService.sectionTwoPartOne}
                <Link href="https://geobuff.com">https://geobuff.com</Link>
                {t.termsOfService.sectionTwoPartTwo}
              </Text>
              <Text>{t.termsOfService.sectionThree}</Text>
              <Text>{t.termsOfService.sectionFour}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.termsOfService.limitationsOfUseHeading}
            </Heading>
            <Text my={3}>{t.termsOfService.limitationsOfUseSectionOne}</Text>
            <OrderedList mb={6}>
              <ListItem>{t.termsOfService.limitationsOfUseSectionTwo}</ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionThree}
              </ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionFour}
              </ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionFive}
              </ListItem>
              <ListItem>{t.termsOfService.limitationsOfUseSectionSix}</ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionSeven}
              </ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionEight}
              </ListItem>
              <ListItem>
                {t.termsOfService.limitationsOfUseSectionNine}
              </ListItem>
              <ListItem>{t.termsOfService.limitationsOfUseSectionTen}</ListItem>
            </OrderedList>

            <Heading as="h3" size="lg">
              {t.termsOfService.intellectualPropertyHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.termsOfService.intellectualPropertySectionOne}</Text>
              <Text>{t.termsOfService.intellectualPropertySectionTwo}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.termsOfService.userGeneratedContentHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.termsOfService.userGeneratedContentSectionOne}</Text>
              <Text>{t.termsOfService.userGeneratedContentSectionTwo}</Text>
              <Text>{t.termsOfService.userGeneratedContentSectionThree}</Text>
              <Text>{t.termsOfService.userGeneratedContentSectionFour}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.termsOfService.liabilityHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.termsOfService.liabilitySectionOne}</Text>
              <Text>{t.termsOfService.liabilitySectionTwo}</Text>
              <Text>{t.termsOfService.liabilitySectionThree}</Text>
              <Text>{t.termsOfService.liabilitySectionFour}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.termsOfService.accuracyOfMaterialsHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.termsOfService.accuracyOfMaterialsSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.termsOfService.linksHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.termsOfService.linksSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.termsOfService.rightToTerminateHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.termsOfService.rightToTerminateSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.termsOfService.severanceHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.termsOfService.severanceSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.termsOfService.governingLawHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.termsOfService.governingLawSectionOne}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TermsOfService;
