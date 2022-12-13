import React, { FC, useContext } from "react";

import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Head from "next/head";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import HeroHeader from "../components/HeroHeader";

const PrivacyPolicy: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Head>
        <title>{`${t.global.privacyPolicy} - GeoBuff`}</title>
        <meta
          name="description"
          content="Your privacy is important to us. It is GeoBuff's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you."
        />
      </Head>
      <Box>
        <HeroHeader heading={t.global.privacyPolicy} />
        <Box background="white">
          <Box
            maxWidth={{ base: "80%", md: "50%" }}
            mx="auto"
            py={12}
            fontSize={{ base: "12px", md: "inherit" }}
          >
            <Stack spacing={3} mb={6}>
              <Text>
                {`${t.privacyPolicy.sectionOnePartOne} `}
                <a href="https://geobuff.com">https://geobuff.com</a>
                {`${t.privacyPolicy.sectionOnePartTwo} `}
              </Text>
              <Text>{t.privacyPolicy.sectionTwo}</Text>
              <Text>{t.privacyPolicy.sectionThree}</Text>
              <Text>{t.privacyPolicy.sectionFour}</Text>
              <Text>{t.privacyPolicy.sectionFive}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.informationWeCollectHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.informationWeCollectPartOne}</Text>
              <Text>{t.privacyPolicy.informationWeCollectPartTwo}</Text>
              <Text>{t.privacyPolicy.informationWeCollectPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.logDataHeader}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.logDataPartOne}</Text>
              <Text>{t.privacyPolicy.logDataPartTwo}</Text>
              <Text>{t.privacyPolicy.logDataPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.personalInformationHeading}
            </Heading>
            <Box mb={6}>
              <Stack spacing={3} my={3}>
                <Text>{t.privacyPolicy.personalInformationPartOne}</Text>
              </Stack>
              <UnorderedList>
                <ListItem>{t.global.email}</ListItem>
              </UnorderedList>
            </Box>

            <Heading as="h4" size="md">
              {t.privacyPolicy.userGeneratedContentHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.userGeneratedContentPartOne}</Text>
              <Text>{t.privacyPolicy.userGeneratedContentPartTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.transactionDataHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.transactionDataPartOne}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.legitimateHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.legitimatePartOne}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.collectionHeading}
            </Heading>
            <Text my={3}>{t.privacyPolicy.collectionPartOne}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.collectionPartTwo}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartThree}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFour}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFive}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSix}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSeven}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEight}</ListItem>
            </UnorderedList>
            <Text my={3}>{t.privacyPolicy.collectionPartNine}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.collectionPartTen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEleven}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartTwelve}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartThirteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFourteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartFifteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSixteen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartSeventeen}</ListItem>
              <ListItem>{t.privacyPolicy.collectionPartEighteen}</ListItem>
            </UnorderedList>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.collectionPartNineteen}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.securityHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.securityPartOne}</Text>
              <Text>{t.privacyPolicy.securityPartTwo}</Text>
              <Text>{t.privacyPolicy.securityPartThree}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.howLongHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.howLongPartOne}</Text>
              <Text>{t.privacyPolicy.howLongPartTwo}</Text>
            </Stack>
            <Heading as="h3" size="lg">
              {t.privacyPolicy.childrensPrivacyHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.childrensPrivacyPartOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.disclosureHeading}
            </Heading>
            <Text my={3}>{t.privacyPolicy.disclosureSectionOne}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.disclosureSectionTwo}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionThree}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionFour}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionFive}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionSix}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionSeven}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionEight}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionNine}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionTen}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionEleven}</ListItem>
            </UnorderedList>
            <Text my={3}>{t.privacyPolicy.disclosureSectionTwelve}</Text>
            <UnorderedList mb={6}>
              <ListItem>{t.privacyPolicy.disclosureSectionThirteen}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionFourteen}</ListItem>
              <ListItem>{t.privacyPolicy.disclosureSectionFifteen}</ListItem>
            </UnorderedList>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.rightsHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionOneStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionOneText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionTwoStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionTwoText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionThreeStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionThreeText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionFourStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionFourText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionFiveStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionFiveText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionSixStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionSixText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionSevenStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionSevenText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionEightStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionEightText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionNineStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionNineText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.rightsSectionTenStrong}</strong>{" "}
                {t.privacyPolicy.rightsSectionTenText}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.cookiesHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.cookiesSectionOne}</Text>
              <Text>{t.privacyPolicy.cookiesSectionTwo}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.transfersHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.transfersSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.limitsHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.limitsSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.changesHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.changesSectionOne}</Text>
              <Text>{t.privacyPolicy.changesSectionTwo}</Text>
              <Text>{t.privacyPolicy.changesSectionThree}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.apacHeading}
            </Heading>
            <Heading as="h4" size="md" my={3}>
              {t.privacyPolicy.apacHeadingTwo}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.apacSectionOne}
            </Text>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.gdprHeading}
            </Heading>
            <Heading as="h4" size="md" my={3}>
              {t.privacyPolicy.gdprHeadingTwo}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.gdprSectionOne}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.legalBasesHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.legalBasesSectionOne}</Text>
              <Text>{t.privacyPolicy.legalBasesSectionTwo}</Text>
            </Stack>

            <Heading as="h5" size="sm">
              {t.privacyPolicyHeadingTwo}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicySectionThree}
            </Text>

            <Heading as="h5" size="sm">
              {t.privacyPolicyHeadingThree}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicySectionFour}
            </Text>

            <Heading as="h5" size="sm">
              {t.privacyPolicyHeadingFour}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicySectionFive}
            </Text>

            <Heading as="h5" size="sm">
              {t.privacyPolicyHeadingFive}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicySectionSix}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.eeaHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.eeaSectionOne}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.yourRightsHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>
                <strong>{t.privacyPolicy.yourRightsSectionOneStrong}</strong>{" "}
                {t.privacyPolicy.yourRightsSectionOneText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.yourRightsSectionTwoStrong}</strong>{" "}
                {t.privacyPolicy.yourRightsSectionTwoText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.yourRightsSectionThreeStrong}</strong>{" "}
                {t.privacyPolicy.yourRightsSectionThreeText}
              </Text>
              <Text>
                <strong>{t.privacyPolicy.yourRightsSectionFourStrong}</strong>{" "}
                {t.privacyPolicy.yourRightsSectionFourText}
              </Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.privacyPolicy.californiaHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.californiaSectionOne}</Text>
              <Text>{t.privacyPolicy.californiaSectionTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.doNotTrackHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.doNotTrackSectionOne}</Text>
              <Text>{t.privacyPolicy.doNotTrackSectionTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.cookiesAndPixelsHeading}
            </Heading>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.cookiesAndPixelsSectionOne}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.ccpaHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.ccpaSectionOne}</Text>
              <Text>{t.privacyPolicy.ccpaSectionTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.caliNoticeHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.caliNoticeSectionOne}</Text>
              <Text>{t.privacyPolicy.caliNoticeSectionTwo}</Text>
            </Stack>

            <Heading as="h4" size="md">
              {t.privacyPolicy.rightToKnowHeading}
            </Heading>
            <Text my={3}>{t.privacyPolicy.rightToKnowSectionOne}</Text>
            <UnorderedList>
              <ListItem>{t.privacyPolicy.rightToKnowSectionTwo}</ListItem>
              <ListItem>{t.privacyPolicy.rightToKnowSectionThree}</ListItem>
              <ListItem>{t.privacyPolicy.rightToKnowSectionFour}</ListItem>
              <ListItem>{t.privacyPolicy.rightToKnowSectionFive}</ListItem>
              <ListItem>{t.privacyPolicy.rightToKnowSectionSix}</ListItem>
              <ListItem>{t.privacyPolicy.rightToKnowSectionSeven}</ListItem>
            </UnorderedList>
            <Text mt={3} mb={6}>
              {t.privacyPolicy.rightToKnowSectionEight}
            </Text>

            <Heading as="h4" size="md">
              {t.privacyPolicy.shineTheLightHeading}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.shineTheLightSectionOne}</Text>
              <Text>{t.privacyPolicy.shineTheLightSectionTwo}</Text>
            </Stack>

            <Heading as="h3" size="lg">
              {t.global.contactUs}
            </Heading>
            <Stack spacing={3} mt={3} mb={6}>
              <Text>{t.privacyPolicy.contactUsSectionOne}</Text>
              <Text>{t.global.ashleyMidgley}</Text>
              <Text>{t.global.companyEmail}</Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
