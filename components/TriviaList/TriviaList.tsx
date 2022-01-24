import React, { FC } from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import { Trivia } from "../../types/trivia";
import TriviaCard from "../TriviaCard";

const formatDate = (date: string) =>
  DateTime.fromISO(date).toFormat("yyyy-MM-dd");

export interface Props {
  trivia?: Trivia[];
}

const TriviaList: FC<Props> = ({ trivia = [] }) => {
  const containerMaxWidth = trivia.length < 5 ? 1000 : 1400;

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
      <SimpleGrid
        column={3}
        justifyContent="center"
        minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
        spacing={{ base: "12px", md: "24px" }}
      >
        {trivia?.map((quiz) => (
          <Link key={quiz.id} href={`/daily-trivia/${formatDate(quiz.date)}`}>
            <AspectRatio
              maxWidth="260px"
              minHeight={{ base: "180px", sm: "206px", md: "216px" }}
              maxHeight="230px"
              ratio={3 / 2}
              transition="all 150ms ease-out"
              _hover={{ transform: "scale(1.030)" }}
            >
              <TriviaCard name={quiz.name} />
            </AspectRatio>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TriviaList;
