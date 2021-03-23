import React from "react";
import Link from "next/link";

import PropTypes from "prop-types";
import {
  AspectRatio,
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
} from "@chakra-ui/react";

import QuizCard from "../QuizCard";

const QuizList = ({ quizzes }) => (
  <Box
    width={{ base: "95%", sm: "80%", md: "65%" }}
    maxWidth="1200px"
    marginTop="32px"
    paddingBottom="32px"
    marginLeft="auto"
    marginRight="auto"
    _hover={{
      cursor: "pointer",
    }}
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
          minChildWidth={{ base: "140px", sm: "185px", md: "200px" }}
          spacing={{ base: "16px", md: "24px" }}
        >
          {quizzes.map((quiz) => (
            <Link
              href={`/quiz/${quiz.name.replaceAll(" ", "-").toLowerCase()}`}
              key={quiz.id}
            >
              <AspectRatio
                maxW="260px"
                minHeight="200px"
                maxHeight="220px"
                ratio={3 / 2}
                transition="all 150ms ease-out"
                _hover={{ transform: "scale(1.030)" }}
              >
                <QuizCard quiz={quiz} />
              </AspectRatio>
            </Link>
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
      time: PropTypes.number,
      imageUrl: PropTypes.string,
      verb: PropTypes.string,
      apiPath: PropTypes.string,
      hasLeaderboard: PropTypes.bool,
      enabled: PropTypes.bool,
    })
  ),
};

export default QuizList;
