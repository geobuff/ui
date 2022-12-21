import React, { FC, useContext } from "react";

import { Alert, AlertIcon, Box, SimpleGrid } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { QuizCardContainer } from "../../containers";

import { Quiz } from "../../types/quiz";

interface Props {
  quizzes?: Quiz[];
}

const QuizList: FC<Props> = ({ quizzes = [] }) => {
  const { t } = useContext(LanguageContext);

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
      {!quizzes.length ? (
        <Alert status="info" borderRadius={6} p={5} mt={5}>
          <AlertIcon />
          {t.global.noQuizzesAlert}
        </Alert>
      ) : (
        <>
          <SimpleGrid
            justifyContent="center"
            minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
            spacing={{ base: "16px", md: "24px" }}
          >
            {quizzes?.map((quiz, index) => (
              <QuizCardContainer
                key={quiz.id}
                index={index}
                quizCount={quizzes.length}
                quiz={quiz}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default QuizList;
