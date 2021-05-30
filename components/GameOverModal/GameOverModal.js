import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";

import { secondsToMinutesString } from "../../helpers/time";
import axiosClient from "../../axios/axiosClient";

import Modal from "../Modal";

import ArrowLeft from "../../Icons/ArrowLeft";
import SolidQuestionMarkCircle from "../../Icons/SolidQuestionMarkCircle";
import GameOverModalExplainerText from "./GameOverModalExplainerText";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={6} />;

const explainerCloseModal =
  "Feel free to close this modal to view the map and your results. Don’t worry, you’ll still be able to submit your score afterwards!";

// TODO: rename loggedIn to isLoggedIn
const GameOverModal = ({
  quiz,
  score,
  time,
  loggedIn,
  existingEntry,
  isOpen,
  onClose,
  onSubmit,
  onRedirectWithScore,
  submitting,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });


  if (isMobile === undefined) {
    return null;
  }

  const footer = (
    <Button
      colorScheme="green"
      onClick={() => onSubmit(existingEntry)}
      disabled={!loggedIn || submitting}
    >
      {"Submit"}
    </Button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} footer={footer}>
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

      <Box padding={8}>
        <Box textAlign="center">
          <Text fontSize="46px" fontWeight="black">
            {"GAME OVER"}
          </Text>

          <Text color="#828282" fontSize="22px" fontWeight="bold">
            {quiz.name}
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
                {`/ ${quiz.maxScore}`}
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

        <Box marginTop={8}>
          <GameOverModalExplainerText
            isLoggedIn={loggedIn}
            onSubmit={onSubmit}
            onRedirectWithScore={onRedirectWithScore}
            existingEntry={existingEntry}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default GameOverModal;

GameOverModal.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
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
  quiz: {},
  score: 0,
  time: 100,
  loggedIn: true,
  existingEntry: null,
  isOpen: false,
  onClose: () => {},
  onSubmit: () => {},
  submitting: false,
};
