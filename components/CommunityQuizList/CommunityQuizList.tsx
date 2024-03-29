import React, { FC, useContext } from "react";

import { DelayedRender } from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { CommunityQuizCardContainer } from "../../containers";

import { CommunityQuiz } from "../../types/community-quiz-dto";

export interface Props {
  quizzes?: CommunityQuiz[];
}

const CommunityQuizList: FC<Props> = ({ quizzes = [] }) => {
  const { status } = useSession();
  const { t } = useContext(LanguageContext);

  const containerMaxWidth = quizzes.length < 5 ? 1000 : 1400;

  if (quizzes.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        {t.global.noQuizzesAlert}
      </Alert>
    );
  }

  return (
    <Box
      width="100%"
      maxWidth={containerMaxWidth}
      marginBottom={10}
      marginLeft="auto"
      marginRight="auto"
      paddingX={{ base: 3, md: 10 }}
      _hover={{
        cursor: "pointer",
      }}
    >
      <Alert
        status="info"
        borderRadius={6}
        marginBottom={3}
        marginTop={{ base: 6, md: 0 }}
      >
        <AlertIcon />
        <Text>
          {t.communityQuizList.upsellPre}
          {status === "authenticated" ? (
            <Link href="/community-quiz/create">
              {t.communityQuizList.upsellAuthenticatedAction}
            </Link>
          ) : (
            <Link href="/create/community-quizzes">
              {t.communityQuizList.upsellLearnMore}
            </Link>
          )}
        </Text>
      </Alert>
      <DelayedRender shouldFadeIn waitBeforeShow={100}>
        <SimpleGrid
          marginTop="32px"
          column={3}
          justifyContent="center"
          minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
          spacing={{ base: "12px", md: "24px" }}
        >
          {quizzes.map((quiz, index) => (
            <CommunityQuizCardContainer
              key={quiz.id}
              index={index}
              quizCount={quizzes.length}
              quiz={quiz}
            />
          ))}
        </SimpleGrid>
      </DelayedRender>
    </Box>
  );
};

export default CommunityQuizList;
