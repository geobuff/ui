import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";
import flag from "country-code-emoji";
import Twemoji from "../Twemoji";

const QuizList = ({ quizzes }) => (
  <Box width="50%" ml="auto" mr="auto">
    {quizzes.length === 0 ? (
      <Alert status="info" borderRadius={12} p={5} mt={5}>
        <AlertIcon />
        No quizzes to display.
      </Alert>
    ) : (
      <>
        {quizzes.map((quiz, index) => (
          <Box key={index}>
            {quiz.enabled ? (
              <Link
                href={`/quiz/${quiz.name.replaceAll(" ", "-").toLowerCase()}`}
              >
                <Flex backgroundColor="#F0F0F0" borderRadius={12} p={5} my={5}>
                  <Twemoji emoji={flag(quiz.code)} mr={8} />
                  <Box>
                    <Heading size="sm">{quiz.name}</Heading>
                    <Text>{quiz.description}</Text>
                  </Box>
                </Flex>
              </Link>
            ) : (
              <Flex
                backgroundColor="#F0F0F0"
                opacity={0.5}
                borderRadius={12}
                p={5}
                my={5}
              >
                <Twemoji emoji={flag(quiz.code)} mr={8} />
                <Box>
                  <Heading size="sm">{quiz.name}</Heading>
                  <Text>{quiz.description}</Text>
                </Box>
              </Flex>
            )}
          </Box>
        ))}
      </>
    )}
  </Box>
);

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      code: PropTypes.string,
      maxScore: PropTypes.number,
      enabled: PropTypes.bool,
    })
  ),
};

export default QuizList;
