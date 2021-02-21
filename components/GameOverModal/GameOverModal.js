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
} from "@chakra-ui/core";

import GameExistingEntry from "../GameExistingEntry";

import ArrowLeft from "../../icons/ArrowLeft";
import SolidQuestionMarkCircle from "../../icons/SolidQuestionMarkCircle";
import { secondsToMinutesString } from "../../helpers/time";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={6} />;

const explainerCloseModal =
  "Feel free to close this modal to view the map and your results. Don’t worry, you’ll still be able to submit your score afterwards!";

const explainerExistingEntry =
  "You have an existing entry for this quiz, by clicking submit you will update your existing entry. ";

const GameOverModal = ({ existingEntry, total, isOpen, onClose }) => {
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
                {"Countries of the World Quiz"}
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
                    {existingEntry.score}
                  </Text>
                  <Text
                    color="#768389"
                    fontSize="26px"
                    fontWeight="bold"
                    lineHeight="40px"
                    marginBottom={1}
                  >
                    {`/ ${total}`}
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
                  {secondsToMinutesString(existingEntry.time)}
                </Text>
              </Box>
            </Flex>

            {divider}

            {existingEntry && (
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
          <Button colorScheme="green" onClick={onClose}>
            {"Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameOverModal;

GameOverModal.propTypes = {
  existingEntry: PropTypes.shape({
    rank: PropTypes.number,
    score: PropTypes.number,
    time: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
  }),
  total: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

GameOverModal.defaultProps = {
  existingEntry: null,
  total: 0,
  isOpen: false,
  onClose: () => {},
};
