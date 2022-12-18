import React, { FC, useContext, useEffect, useRef } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

interface Props {
  index?: string;
}

const FAQSection: FC<Props> = ({ index = "" }) => {
  const geocoinRef = useRef(null);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    if (index === "4") {
      geocoinRef.current.scrollIntoView();
    }
  }, [index]);

  return (
    <Accordion defaultIndex={index ? [parseInt(index)] : []} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {t.faq.itemOneQuestion}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrderedList spacing={6} mb={6}>
            <ListItem>{t.faq.itemOneAnswerSectionOne}</ListItem>
            <ListItem>{t.faq.itemOneAnswerSectionTwo}</ListItem>
            <ListItem>{t.faq.itemOneAnswerSectionThree}</ListItem>
            <ListItem>{t.faq.itemOneAnswerSectionFour}</ListItem>
          </OrderedList>
          <Text>{t.faq.itemOneAnswerSectionFive}</Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {t.faq.itemTwoQuestion}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text>
            <Link href="/forgot-password">{t.faq.itemTwoAnswerLink}</Link>{" "}
            {t.faq.itemTwoAnswerSectionOne}
          </Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {t.faq.itemThreeQuestion}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {t.faq.itemThreeAnswerSectionOne}{" "}
          <Link href="/terms-of-service">{t.global.termsOfService}</Link>
          {t.faq.itemThreeAnswerSectionTwo}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {t.faq.itemFourQuestion}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{t.faq.itemFourAnswer}</AccordionPanel>
      </AccordionItem>

      <AccordionItem ref={geocoinRef}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {t.faq.itemFiveQuestion}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text>{t.faq.itemFiveAnswerSectionOne}</Text>
          <Text mt={3}>{t.faq.itemFiveAnswerSectionTwo}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQSection;
