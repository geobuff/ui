import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import GameExistingEntry from "../GameExistingEntry";

import ArrowLeft from "../../Icons/ArrowLeft";
import SolidQuestionMarkCircle from "../../Icons/SolidQuestionMarkCircle";
import { secondsToMinutesString } from "../../helpers/time";
import { getTitle, getTotal } from "../../helpers/quizzes";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={6} />;

const explainerCloseModal =
  "Feel free to close this modal to view the map and your results. Don’t worry, you’ll still be able to submit your score afterwards!";
const explainerScoreQuizNotLoggedIn =
  "You must login to update your high score.";
const explainerScoreQuizLoggedIn =
  "If this score is greater than your existing score, we will update it behind the scenes.";
const explainerLeaderboardQuizNotLoggedIn =
  "You must login to submit a leaderboard entry.";
const explainerNoExistingEntry =
  "No existing entry for this quiz. By clicking submit you will create a new leaderboard entry.";
const explainerExistingEntry =
  "You have an existing entry for this quiz. By clicking submit you will update your existing entry.";

const GameOverModal = ({
  quiz,
  score,
  time,
  loggedIn,
  existingEntry,
  isOpen,
  onClose,
  onSubmit,
  submitting,
}) => {
  const scoreQuizNotLoggedIn = !onSubmit && !loggedIn;
  const scoreQuizLoggedIn = !onSubmit && loggedIn;
  const leaderboardQuizNotLoggedIn = onSubmit && !loggedIn;
  const noExistingEntry = onSubmit && loggedIn && !existingEntry;
  const shouldShowExistingEntry = onSubmit && loggedIn && existingEntry;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent borderRadius="12px">
        <ModalBody padding={0}>
          <Button
            alignItems="center"
            backgroundColor="transparent"
            marginTop={2}
            marginLeft={2}
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <ArrowLeft height={5} width={5} marginRight={1} />
            <Text fontWeight="bold" fontSize="14px">
              {"View map & results"}
            </Text>
            <Tooltip padding={2} label={explainerCloseModal}>
              <Text>
                <SolidQuestionMarkCircle
                  height={3}
                  width={3}
                  marginLeft={1}
                  marginBottom="2px"
                  color="gray.600"
                />
              </Text>
            </Tooltip>
          </Button>

          <Box paddingY={10} paddingX={8}>
            <Box textAlign="center">
              <Text fontSize="32px" fontWeight="black">
                {"GAME OVER"}
              </Text>

              <Text color="#828282" fontSize="22px" fontWeight="bold">
                {getTitle(quiz)}
              </Text>
            </Box>

            {divider}

            <Flex marginY={4} marginX={2} justifyContent="space-between">
              <Box>
                <Text fontSize="16px" fontWeight="bold">
                  {"SCORE"}
                </Text>
                <Flex alignItems="flex-end">
                  <Text
                    fontSize="46px"
                    fontWeight="black"
                    lineHeight="40px"
                    marginRight={1}
                    marginY={2}
                  >
                    {score}
                  </Text>
                  <Text
                    color="#768389"
                    fontSize="26px"
                    fontWeight="bold"
                    lineHeight="40px"
                    marginBottom={1}
                  >
                    {`/ ${getTotal(quiz)}`}
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Text fontSize="16px" fontWeight="bold">
                  {"TIME"}
                </Text>
                <Text
                  fontSize="46px"
                  fontWeight="black"
                  lineHeight="40px"
                  marginY={2}
                >
                  {secondsToMinutesString(time)}
                </Text>
              </Box>
            </Flex>

            {divider}

            {scoreQuizNotLoggedIn && (
              <Box>
                <Text
                  color="#828282"
                  fontSize="12px"
                  fontWeight="medium"
                  textAlign="center"
                >
                  {explainerScoreQuizNotLoggedIn}
                </Text>
              </Box>
            )}

            {leaderboardQuizNotLoggedIn && (
              <Box>
                <Text
                  color="#828282"
                  fontSize="12px"
                  fontWeight="medium"
                  textAlign="center"
                >
                  {explainerLeaderboardQuizNotLoggedIn}
                </Text>
              </Box>
            )}

            {scoreQuizLoggedIn && (
              <Box>
                <Text
                  color="#828282"
                  fontSize="12px"
                  fontWeight="medium"
                  textAlign="center"
                >
                  {explainerScoreQuizLoggedIn}
                </Text>
              </Box>
            )}

            {noExistingEntry && (
              <Box>
                <Text
                  color="#828282"
                  fontSize="12px"
                  fontWeight="medium"
                  textAlign="center"
                >
                  {explainerNoExistingEntry}
                </Text>
              </Box>
            )}

            {shouldShowExistingEntry && (
              <Box>
                <Text color="#828282" fontSize="12px" fontWeight="bold">
                  {"Existing Entry"}
                </Text>
                <Box marginY={2}>
                  <GameExistingEntry {...existingEntry} />
                </Box>
                <Text color="#828282" fontSize="12px" fontWeight="medium">
                  {explainerExistingEntry}
                </Text>
              </Box>
            )}
          </Box>
        </ModalBody>

        <ModalFooter marginBottom={1}>
          {onSubmit && (
            <Button
              colorScheme="green"
              onClick={() => onSubmit(existingEntry)}
              disabled={!loggedIn || submitting}
            >
              {"Submit"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameOverModal;

GameOverModal.propTypes = {
  quiz: PropTypes.number,
  score: PropTypes.number,
  time: PropTypes.number,
  loggedIn: PropTypes.bool,
  existingEntry: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    rank: PropTypes.number,
    score: PropTypes.number,
    time: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

GameOverModal.defaultProps = {
  quiz: 1,
  score: 0,
  time: 100,
  loggedIn: true,
  existingEntry: null,
  isOpen: false,
  onClose: () => {},
  onSubmit: () => {},
  submitting: false,
};
