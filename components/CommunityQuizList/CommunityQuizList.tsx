import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
  Text,
  Link,
} from "@chakra-ui/react";

import DelayedRender from "../DelayedRender";
import { CommunityQuiz } from "../../types/community-quiz-dto";
import CommunityQuizCard from "../CommunityQuizCard";
import { useSession } from "next-auth/react";

export interface Props {
  quizzes?: CommunityQuiz[];
}

const CommunityQuizList: FC<Props> = ({ quizzes = [] }) => {
  const { status } = useSession();
  const containerMaxWidth = quizzes.length < 5 ? 1000 : 1400;

  if (quizzes.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        {`No community quizzes to display.`}
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
          {"Like what you see? "}
          {status === "authenticated" ? (
            <Link href="/community-quiz/create">
              {"Create your own using our custom quiz builder!"}
            </Link>
          ) : (
            <Link href="/create/community-quizzes">
              {"Learn more about our custom quiz builder!"}
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
          {quizzes.map((quiz) => (
            <Link key={quiz.id} href={`/community-quiz/${quiz.id}`}>
              <AspectRatio
                maxWidth="260px"
                minHeight={{ base: "180px", sm: "206px", md: "216px" }}
                maxHeight="230px"
                ratio={3 / 2}
                transition="all 150ms ease-out"
                _hover={{ transform: "scale(1.030)" }}
              >
                <CommunityQuizCard
                  name={quiz.name}
                  userId={quiz.userId}
                  username={quiz.username}
                  maxScore={quiz.maxScore}
                  verified={quiz.verified}
                />
              </AspectRatio>
            </Link>
          ))}
        </SimpleGrid>
      </DelayedRender>
    </Box>
  );
};

export default CommunityQuizList;
