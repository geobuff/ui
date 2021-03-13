import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import Sheet from "react-modal-sheet";

import ResultsList from "../ResultsList";
import ResultsMap from "../ResultsMap";
import ResultsListWrapper from "../ResultsListWrapper";

import { mergeArrayByName } from "../../helpers/array";
import { groupMapping } from "../../helpers/mapping";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

const GameBottomSheetModal = ({
  quiz,
  mapping,
  checked,
  recents,
  hasGameStarted,
  gameStartText,
  onGameStart,
  onGameStop,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Because we want the modal to stay open, this forces the
  // modal to stay open even if it's forced closed by pesky users
  const handleClose = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  return (
    <Box
      as={Sheet}
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      mt="120px"
      minHeight="92vh"
      springConfig={{
        stiffness: 600,
        damping: 60,
        mass: 0.2,
      }}
    >
      <Sheet.Container>
        <Box pt={1} height="54px" as={Sheet.Header} />
        <Sheet.Content>
          <Box overflowY="scroll" mx={5} my={0} pb="100px">
            <Box>
              <Heading pt={0} size="md" textAlign="center">
                {quiz.name}
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
                    {hasGameStarted ? "GIVE UP" : gameStartText}
                  </Text>
                </Button>
              </Box>
            </Box>

            <Divider my={4} />

            <Box mt={4}>
              <Text fontWeight="bold" mb={1}>
                {"RECENT"}
              </Text>
              <ResultsList
                quizId={quiz.id}
                verb={quiz.verb}
                results={recents}
              />
            </Box>

            <Box>
              {quiz.hasGrouping ? (
                <ResultsMap
                  quizId={quiz.id}
                  results={checked}
                  map={groupMapping(mapping)}
                  verb={quiz.verb}
                />
              ) : (
                <ResultsListWrapper
                  quizId={quiz.id}
                  results={mergeArrayByName(mapping, checked)}
                  verb={quiz.verb}
                />
              )}
            </Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Box>
  );
};

GameBottomSheetModal.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
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
  hasGameStarted: PropTypes.bool,
  gameStartText: PropTypes.string,
  onGameStart: PropTypes.func,
  onGameStop: PropTypes.func,
};

GameBottomSheetModal.defaultProps = {
  quiz: {},
  mapping: [],
  checked: [],
  recents: [],
  hasGameStarted: false,
  gameStartText: "START",
  onGameStart: () => {},
  onGameStop: () => {},
};

export default GameBottomSheetModal;
