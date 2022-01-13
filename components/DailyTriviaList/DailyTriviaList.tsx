import React, { FC } from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { Trivia } from "../../types/trivia";
import DailyTriviaCard from "../DailyTriviaCard";

export interface Props {
  trivia?: Trivia[];
}

const DailyTriviaList: FC<Props> = ({ trivia = [] }) => {
  if (trivia.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        {`No daily trivia's to display.`}
      </Alert>
    );
  }

  return (
    <Box
      width="100%"
      maxWidth={1300}
      marginTop="32px"
      marginBottom={10}
      marginLeft="auto"
      marginRight="auto"
      paddingX={{ base: 3, md: 10 }}
      _hover={{
        cursor: "pointer",
      }}
    >
      <SimpleGrid
        justifyContent="center"
        minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
        spacing={{ base: "16px", md: "24px" }}
      >
        {trivia?.map((quiz) => (
          <Link key={quiz.id} href={`/daily-trivia/${quiz.date}`}>
            <AspectRatio
              maxWidth="260px"
              minHeight={{ base: "180px", sm: "206px", md: "216px" }}
              maxHeight="230px"
              ratio={3 / 2}
              transition="all 150ms ease-out"
              _hover={{ transform: "scale(1.030)" }}
            >
              <DailyTriviaCard name={quiz.name} />
            </AspectRatio>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DailyTriviaList;
