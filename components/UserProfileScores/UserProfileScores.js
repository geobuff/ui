import React from "react";
import PropTypes from "prop-types";

import { Alert, Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";

import Image from "../Image";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Scores
    </Heading>
    <Box my={6}>
      {scores.length === 0 ? (
        <Alert borderRadius={6}>No scores to display.</Alert>
      ) : (
        <SimpleGrid minChildWidth="100px" spacing="16px">
          {scores.map((score) => (
            <Flex
              key={score.id}
              direction="column"
              alignItems="center"
              textAlign="center"
            >
              <Image
                height="56px"
                width="56px"
                objectFit="cover"
                borderRadius={50}
                src={score.quizImageUrl}
              />
              <Text
                marginY={2}
                maxWidth="75px"
                fontSize="12px"
                fontWeight="bold"
              >
                {score.quizName}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </Box>
  </Box>
);

UserProfileScores.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      quizName: PropTypes.string,
      quizImageUrl: PropTypes.string,
      quizMaxScore: PropTypes.number,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
    })
  ),
};

export default UserProfileScores;
