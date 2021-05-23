import React from "react";
import PropTypes from "prop-types";

import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import Image from "../Image";
import { secondsToMinutesString } from "../../helpers/time";

const UserProfileScores = ({ scores }) => (
  <Box>
    <Heading size="md" textAlign="center" m={6}>
      Scores
    </Heading>
    <Box my={6}>
      {scores.length === 0 ? (
        <Alert borderRadius={6}>
          <AlertIcon />
          No scores to display.
        </Alert>
      ) : (
        <SimpleGrid minChildWidth="115px" spacingX="16px" spacingY="32px">
          {scores.map((score) => (
            <Flex
              key={score.id}
              direction="column"
              alignItems="center"
              textAlign="center"
            >
              <Box position="relative" width="115px">
                <Image
                  height="70px"
                  width="115px"
                  objectFit="cover"
                  borderRadius={5}
                  src={score.quizImageUrl}
                />
                <Box
                  position="absolute"
                  borderRadius={5}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  opacity={0}
                  transition=".5s ease"
                  backgroundColor="#292929"
                  _hover={{ opacity: 0.9 }}
                >
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    color="white"
                    fontWeight="bold"
                  >
                    <Text>{`${score.score}/${score.quizMaxScore}`}</Text>
                    <Text>{`${secondsToMinutesString(score.time)}`}</Text>
                  </Box>
                </Box>
              </Box>
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
      badgeGroup: PropTypes.number,
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
