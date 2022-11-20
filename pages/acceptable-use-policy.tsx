import React, { FC, useContext } from "react";

import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import HeroHeader from "../components/HeroHeader";
import MainView from "../components/MainView";

const AcceptableUsePolicy: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainView>
      <Head>
        <title>{`${t.global.acceptableUsePolicy} - GeoBuff`}</title>
        <meta
          name="description"
          content="A set of guidelines that are designed to protect us, our customers and the general Internet community from unethical, irresponsible and illegal activity."
        />
      </Head>
      <Box>
        <HeroHeader heading={t.global.acceptableUsePolicy} />
        <Box background="white">
          <Box
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={12}
            fontSize={{ base: "12px", md: "inherit" }}
          >
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.acceptableUsePolicy.sectionOne}</Text>
              <Text>{t.acceptableUsePolicy.sectionTwo}</Text>
              <Text>{t.acceptableUsePolicy.sectionThree}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.acceptableUsePolicy.fairUseHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.acceptableUsePolicy.fairUseSectionOne}</Text>
              <Text>{t.acceptableUsePolicy.fairUseSectionTwo}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.acceptableUsePolicy.customerAccountabilityHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                {t.acceptableUsePolicy.customerAccountabilitySectionOne}
              </Text>
              <Text>
                {t.acceptableUsePolicy.customerAccountabilitySectionTwo}
              </Text>
              <Text>
                {t.acceptableUsePolicy.customerAccountabilitySectionThree}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.acceptableUsePolicy.prohibitedActivityHeading}
            </Heading>
            <Heading as="h4" size="md" mt={6} mb={3}>
              {t.acceptableUsePolicy.prohibitedActivityHeadingTwo}
            </Heading>
            <Text my={3}>
              {t.acceptableUsePolicy.prohibitedActivitySectionOne}
            </Text>
            <OrderedList my={3}>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionTwo}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionThree}
              </ListItem>
            </OrderedList>
            <Text mt={3} mb={6}>
              {t.acceptableUsePolicy.prohibitedActivitySectionFour}
            </Text>

            <Heading as="h4" size="md">
              {t.acceptableUsePolicy.prohibitedActivityHeadingThree}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.acceptableUsePolicy.prohibitedActivitySectionFive}</Text>
              <Text>{t.acceptableUsePolicy.prohibitedActivitySectionSix}</Text>
              <Text>
                {t.acceptableUsePolicy.prohibitedActivitySectionSeven}
              </Text>
              <Text>
                {t.acceptableUsePolicy.prohibitedActivitySectionEight}
              </Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.acceptableUsePolicy.prohibitedActivityHeadingFour}
            </Heading>
            <Stack spacing={3} my={3}>
              <Text>{t.acceptableUsePolicy.prohibitedActivitySectionNine}</Text>
              <Text>{t.acceptableUsePolicy.prohibitedActivitySectionTen}</Text>
              <Text>
                {t.acceptableUsePolicy.prohibitedActivitySectionEleven}
              </Text>
              <Text>
                {t.acceptableUsePolicy.prohibitedActivitySectionTwelve}
              </Text>
              <Text>
                {t.acceptableUsePolicy.prohibitedActivitySectionThirteen}
              </Text>
            </Stack>
            <OrderedList>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionFourteen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionFifteen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionSixteen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionSeventeen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionEighteen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionNineteen}
              </ListItem>
              <ListItem>
                {t.acceptableUsePolicy.prohibitedActivitySectionTwenty}
              </ListItem>
            </OrderedList>
            <Text mt={3} mb={6}>
              {t.acceptableUsePolicy.prohibitedActivitySectionTwentyOne}
            </Text>

            <Heading as="h4" size="md">
              {t.acceptableUsePolicy.prohibitedActivityHeadingFive}
            </Heading>
            <Text mt={3} mb={6}>
              {t.acceptableUsePolicy.prohibitedActivitySectionTwentyTwo}
            </Text>

            <Heading as="h3" size="lg">
              {t.acceptableUsePolicy.aboutHeading}
            </Heading>
            <Stack spacing={3} my={3}>
              <Text>{t.acceptableUsePolicy.aboutSectionOne}</Text>
              <Text>{t.acceptableUsePolicy.aboutSectionTwo}</Text>
            </Stack>
            <UnorderedList mb={6}>
              <ListItem>{t.acceptableUsePolicy.aboutSectionThree}</ListItem>
              <ListItem>{t.acceptableUsePolicy.aboutSectionFour}</ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Box>
    </MainView>
  );
};

export default AcceptableUsePolicy;
