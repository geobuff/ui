import React, { FC, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Text,
  Box,
  Divider,
  Flex,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroHeader from "../components/HeroHeader";
import FAQSection from "../components/FAQSection";
import SupportFormContainer from "../containers/SupportFormContainer";
import { useRouter } from "next/router";

const HelpCenter: FC = () => {
  const router = useRouter();
  const { faqIndex } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitted, setSubmitted] = useState(false);

  return (
    <MainView>
      <Head>
        <title>Help Center - GeoBuff</title>
      </Head>
      <HeroHeader heading="Help Center" />
      <Box background="white">
        <Flex
          direction="column"
          maxWidth={{ base: "80%", md: "50%" }}
          mx="auto"
          py={9}
          fontSize={{ base: "12px", md: "inherit" }}
          justifyContent="center"
        >
          <Box textAlign="center" mb={6}>
            <Text>
              {`Have an issue? Send a message to support and we'll get back to
              as soon as we can.`}
            </Text>
            {submitted ? (
              <Alert status="success" borderRadius={6} mt={6}>
                <AlertIcon />
                Your request has successfully been sent to support.
              </Alert>
            ) : (
              <Button mt={6} onClick={onOpen}>
                Create request
              </Button>
            )}
            <SupportFormContainer
              isOpen={isOpen}
              onClose={onClose}
              setSubmitted={setSubmitted}
            />
          </Box>
          <Link href="#faq">
            <Text textAlign="center" my={6} fontSize="48px" fontWeight="black">
              F.A.Q
            </Text>
          </Link>
          <Divider mb={12} />
          <FAQSection index={faqIndex as string} />
        </Flex>
      </Box>
    </MainView>
  );
};

export default HelpCenter;
