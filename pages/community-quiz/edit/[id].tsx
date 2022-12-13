import React, { useContext, useEffect, useState } from "react";

import { Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import EditCommunityQuizFormContainer from "../../../containers/EditCommunityQuizFormContainer";

import Card from "../../../components/Card";
import HeroHeader from "../../../components/HeroHeader";

export default function Edit(): JSX.Element {
  const router = useRouter();
  const [quizId, setQuizId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useContext(LanguageContext);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const quizId = router.query.id as string;
      setQuizId(parseInt(quizId));
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${t.editCommunityQuiz.title} - GeoBuff`}</title>
        <meta
          name="description"
          content="Edit your quiz with our Community Quiz builder! Perfect for teachers or those looking to spice up their next team meeting."
        />
      </Head>
      <HeroHeader height={{ base: "180px", md: "220px" }} />
      <Flex
        direction="column"
        borderRadius={12}
        width="100%"
        maxWidth={900}
        marginX="auto"
        paddingX={4}
        marginTop={-125}
        marginBottom={14}
        justifyContent="center"
      >
        <Card padding={{ base: 6, md: 8 }}>
          <Heading>{t.editCommunityQuiz.title}</Heading>

          <Flex width="100%" marginTop={10}>
            {isLoading ? null : (
              <EditCommunityQuizFormContainer quizId={quizId} />
            )}
          </Flex>
        </Card>
      </Flex>
    </>
  );
}

Edit.requireAuth = true;
