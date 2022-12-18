import React, { FC, useContext } from "react";

import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import Link from "next/link";

import { LanguageContext } from "../../contexts/LanguageContext";

import { formatDate, isDateBefore } from "../../helpers/date";
import { Trivia } from "../../types/trivia";
import DelayedRender from "../DelayedRender";
import TriviaCard from "../TriviaCard";

export interface FilteredTrivia extends Trivia {
  isActive: boolean;
}

export interface Props {
  trivia?: Trivia[];
}

const TriviaList: FC<Props> = ({ trivia = [] }) => {
  const containerMaxWidth = trivia.length < 5 ? 1000 : 1400;
  const { t } = useContext(LanguageContext);

  if (trivia.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        {t.triviaList.noTriviaAlert}
      </Alert>
    );
  }

  const filteredTrivia = trivia.map((quiz: FilteredTrivia) => ({
    ...quiz,
    isActive: isDateBefore(
      DateTime.fromISO(formatDate(quiz.date)),
      DateTime.fromISO(new Date().toISOString())
    ),
  }));

  return (
    <Box
      width="100%"
      maxWidth={containerMaxWidth}
      marginTop="32px"
      marginBottom={10}
      marginLeft="auto"
      marginRight="auto"
      // minHeight="1000px"
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
          {filteredTrivia?.map(
            (quiz) =>
              !!quiz.isActive && (
                <Link
                  key={quiz.id}
                  href={`/daily-trivia/${formatDate(quiz.date)}`}
                >
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
              )
          )}
        </SimpleGrid>
      </DelayedRender>
    </Box>
  );
};

export default TriviaList;
