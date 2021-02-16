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
} from "@chakra-ui/core";

import ArrowLeft from "../icons/ArrowLeft";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const explainerText =
  "Feel free to close this modal to view the map and your results. Don’t worry, you’ll still be able to submit your score afterwards!";

const GameOverModal = ({ isOpen, onClose, score, total, time }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
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
          </Button>

          <Box padding={10}>
            <Box textAlign="center">
              <Text fontSize="32px" fontWeight="black">
                {"GAME OVER"}
              </Text>

              <Text color="#828282" fontSize="22px" fontWeight="bold">
                {"Countries of the World Quiz"}
              </Text>
            </Box>

            {divider}

            <Flex marginY={4} justifyContent="space-between">
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
                  {time}
                </Text>
              </Box>
            </Flex>

            {divider}

            <Text fontWeight="medium" fontSize="12px" color="#828282">
              {explainerText}
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  score: PropTypes.number,
  total: PropTypes.number,
  time: PropTypes.string,
};

GameOverModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  score: 0,
  total: 0,
  time: "",
};
