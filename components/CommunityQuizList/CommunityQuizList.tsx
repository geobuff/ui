import React, { FC } from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

import TriviaCard from "../TriviaCard";
import DelayedRender from "../DelayedRender";
import { CommunityQuiz } from "../../types/community-quiz-dto";

export interface Props {
  quizzes?: CommunityQuiz[];
}

const CommunityQuizList: FC<Props> = ({ quizzes = [] }) => {
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
      marginTop="32px"
      marginBottom={10}
      marginLeft="auto"
      marginRight="auto"
      paddingX={{ base: 3, md: 10 }}
      _hover={{
        cursor: "pointer",
      }}
    >
      <DelayedRender shouldFadeIn waitBeforeShow={100}>
        <SimpleGrid
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
                <TriviaCard name={quiz.name} maxScore={quiz.maxScore} />
              </AspectRatio>
            </Link>
          ))}
        </SimpleGrid>
      </DelayedRender>
    </Box>
  );
};

export default CommunityQuizList;
