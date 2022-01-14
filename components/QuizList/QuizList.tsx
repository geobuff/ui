import React, { FC } from "react";
import Link from "next/link";
import { DateTime } from "luxon";

import {
  AspectRatio,
  Box,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  SimpleGrid,
  AlertDescription,
} from "@chakra-ui/react";

import QuizCard from "../QuizCard";
import { Quiz } from "../../types/quiz";

const formattedDate = DateTime.now().toFormat("yyyy-MM-dd");
const dailyTriviaLink = `/daily-trivia/${formattedDate}`;

const dailyTriviaBanner = (
  <Alert
    status="info"
    color="blue.700"
    fontWeight="medium"
    textAlign="center"
    borderRadius={10}
    marginBottom={6}
    justifyContent="center"
    cursor="initial"
    maxWidth={950}
    mx="auto"
  >
    <AlertDescription>
      {
        "Keen to test your knowledge with ten randomly generated questions?  Try out"
      }
      <Link href={dailyTriviaLink}>
        <ChakraLink
          mx={1}
          fontWeight="semibold"
          textDecoration="underline"
          transition="all 150ms ease-out"
          _hover={{ color: "blue.800" }}
        >
          {"today's Daily Trivia"}
        </ChakraLink>
      </Link>
    </AlertDescription>
  </Alert>
);

interface Props {
  quizzes?: Quiz[];
}

const QuizList: FC<Props> = ({ quizzes = [] }) => {
  if (!quizzes.length) {
    return (
      <Alert status="info" borderRadius={6} p={5} mt={5}>
        <AlertIcon />
        {"No quizzes to display."}
      </Alert>
    );
  }

  return (
    <Box
      width="100%"
      maxWidth={1300}
      // marginTop="32px" // TODO: uncomment when removing daily trivia banner
      marginBottom={10}
      marginLeft="auto"
      marginRight="auto"
      paddingX={{ base: 3, md: 10 }}
      _hover={{
        cursor: "pointer",
      }}
    >
      {dailyTriviaBanner}
      <SimpleGrid
        justifyContent="center"
        minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
        spacing={{ base: "16px", md: "24px" }}
      >
        {quizzes?.map((quiz) => (
          <Link
            key={quiz.id}
            href={quiz.enabled ? `/quiz/${quiz?.route}` : "/"}
          >
            <AspectRatio
              maxWidth="260px"
              minHeight={{ base: "180px", sm: "206px", md: "216px" }}
              maxHeight="230px"
              ratio={3 / 2}
              transition="all 150ms ease-out"
              _hover={quiz.enabled && { transform: "scale(1.030)" }}
              opacity={!quiz.enabled ? "0.25" : "1"}
            >
              <QuizCard
                name={quiz.name}
                imageUrl={quiz.imageUrl}
                time={quiz.time}
                maxScore={quiz.maxScore}
                verb={quiz.verb}
              />
            </AspectRatio>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuizList;
