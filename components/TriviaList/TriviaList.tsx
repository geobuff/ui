import React, { FC, useContext } from "react";

import { Alert, AlertIcon, Box, SimpleGrid } from "@chakra-ui/react";
import { DateTime } from "luxon";

import { LanguageContext } from "../../contexts/LanguageContext";

import { TriviaCardContainer } from "../../containers";

import { formatDate, isDateBefore } from "../../helpers/date";
import { FilteredTrivia } from "../../types/filtered-trivia";
import { Trivia } from "../../types/trivia";
import DelayedRender from "../DelayedRender";

interface Props {
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
          {filteredTrivia?.map((quiz, index) => (
            <TriviaCardContainer
              key={quiz.id}
              index={index}
              triviaCount={filteredTrivia.length}
              trivia={quiz}
            />
          ))}
        </SimpleGrid>
      </DelayedRender>
    </Box>
  );
};

export default TriviaList;
