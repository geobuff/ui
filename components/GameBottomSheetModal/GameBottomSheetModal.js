import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Sheet from "react-modal-sheet";

import ResultsList from "../ResultsList";
import ResultsMap from "../ResultsMap";
import Twemoji from "../Twemoji";

import { groupMapping } from "../../helpers/mapping";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

const GameBottomSheetModal = ({
  quiz,
  mapping,
  checked,
  recents,
  hasGameRunOnce,
  hasGameStarted,
  hasGameStopped,
  isOpen,
  onGameStart,
  onGameStop,
}) => (
  <Box
    as={Sheet}
    isOpen={isOpen}
    snapPoints={snapPoints}
    initialSnap={initialSnap}
    mt="120px"
    top="100% !important"
    minHeight="92vh"
    springConfig={{
      stiffness: 600,
      damping: 60,
      mass: 0.2,
    }}
  >
    <Sheet.Container style={{ position: "fixed" }}>
      <Box pt={1} height="54px" as={Sheet.Header} />
      <Sheet.Content>
        <Flex
          direction="column"
          height="100%"
          overflowY="scroll"
          mx={5}
          my={0}
          pb="100px"
        >
          <Box>
            <Heading pt={0} size="md">
              <Flex justifyContent="center">
                {quiz.hasLeaderboard && (
                  <Link href={`/leaderboard?quizId=${quiz.id}`}>
                    <ChakraLink>
                      <Twemoji emoji="🏆" mr={2} />
                    </ChakraLink>
                  </Link>
                )}
                {quiz.name}
              </Flex>
            </Heading>

            <Divider my={4} />

            <Box my={4}>
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                isFullWidth
                onClick={hasGameStarted ? onGameStop : onGameStart}
                p={8}
                size="md"
              >
                <Text fontWeight="700" fontSize="22px">
                  {hasGameStarted
                    ? "GIVE UP"
                    : hasGameRunOnce
                    ? "RETRY"
                    : "START"}
                </Text>
              </Button>
            </Box>
          </Box>

          <Divider my={4} />

          <Box mt={4}>
            <Text fontWeight="bold" mb={1}>
              {"RECENT"}
            </Text>
            <ResultsList quiz={quiz} results={recents} />
          </Box>

          <Box>
            <ResultsMap
              checked={checked}
              map={groupMapping(mapping)}
              hasGameStopped={hasGameStopped}
              hasGroupings={quiz.hasGrouping}
              hasFlags={quiz.hasFlags}
            />
          </Box>
        </Flex>
      </Sheet.Content>
    </Sheet.Container>
  </Box>
);

GameBottomSheetModal.propTypes = {
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
  mapping: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
      svgName: PropTypes.string,
      alternativeNames: PropTypes.arrayOf(PropTypes.string),
      prefixes: PropTypes.arrayOf(PropTypes.string),
      group: PropTypes.string,
    })
  ),
  checked: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  recents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  hasGameRunOnce: PropTypes.bool,
  hasGameStarted: PropTypes.bool,
  hasGameStopped: PropTypes.bool,
  isOpen: PropTypes.bool,
  onGameStart: PropTypes.func,
  onGameStop: PropTypes.func,
};

GameBottomSheetModal.defaultProps = {
  quiz: {},
  mapping: [],
  checked: [],
  recents: [],
  hasGameRunOnce: false,
  hasGameStarted: false,
  hasGameStopped: false,
  isOpen: false,
  onGameStart: () => {},
  onGameStop: () => {},
};

export default GameBottomSheetModal;
