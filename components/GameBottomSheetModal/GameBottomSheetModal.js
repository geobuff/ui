import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";

import Sheet from "react-modal-sheet";

import ResultsList from "../ResultsList";
import CountryResultsListContainer from "../../containers/CountryResultsListContainer";
import CapitalResultsListContainer from "../../containers/CapitalResultsListContainer";
import StatesResultsListContainer from "../../containers/StatesResultsListContainer";
import CountiesResultsListContainer from "../../containers/CountiesResultsListContainer";
import { Quizzes, getTitle } from "../../helpers/quizzes";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

const GameBottomSheetModal = ({
  quiz,
  checked,
  recents,
  hasGameStarted,
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

  const getContainer = () => {
    switch (quiz) {
      case Quizzes.CountriesOfTheWorld:
        return <CountryResultsListContainer checkedCountries={checked} />;
      case Quizzes.CapitalsOfTheWorld:
        return <CapitalResultsListContainer checkedCapitals={checked} />;
      case Quizzes.USStates:
        return <StatesResultsListContainer checkedStates={checked} />;
      case Quizzes.UKCounties:
        return <CountiesResultsListContainer checkedCounties={checked} />;
      default:
        throw Error("Invalid quiz option.");
    }
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
                {getTitle(quiz)}
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
                    {hasGameStarted ? "GIVE UP" : "START"}
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

            <Box>{getContainer()}</Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Box>
  );
};

GameBottomSheetModal.propTypes = {
  quiz: PropTypes.number,
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
  onGameStart: PropTypes.func,
  onGameStop: PropTypes.func,
};

GameBottomSheetModal.defaultProps = {
  quiz: Quizzes.CountriesOfTheWorld,
  checked: [],
  recents: [],
  hasGameStarted: false,
  onGameStart: () => {},
  onGameStop: () => {},
};

export default GameBottomSheetModal;
