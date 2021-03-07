import React from "react";
import PropTypes from "prop-types";
import {
  AspectRatio,
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
} from "@chakra-ui/react";
import GameCard from "../GameCard/GameCard";

const QuizList = ({ quizzes }) => (
  <Box
    width={{ base: "95%", sm: "80%", md: "60%" }}
    marginTop="32px"
    marginLeft="auto"
    marginRight="auto"
  >
    {quizzes.length === 0 ? (
      <Alert status="info" borderRadius={12} p={5} mt={5}>
        <AlertIcon />
        {"No quizzes to display."}
      </Alert>
    ) : (
      <>
        <SimpleGrid
          justifyContent="center"
          minChildWidth={{ base: "145px", sm: "175px", md: "200px" }}
          spacing={{ base: "16px", md: "24px" }}
          marginBottom="72px"
        >
          {quizzes.map((quiz) => (
            <AspectRatio key={quiz.id} maxW="275px" ratio={6 / 7}>
              <GameCard quiz={quiz.id} />
            </AspectRatio>
          ))}
        </SimpleGrid>
      </>
    )}
  </Box>
);

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      maxScore: PropTypes.number,
      enabled: PropTypes.bool,
    })
  ),
};

export default QuizList;
