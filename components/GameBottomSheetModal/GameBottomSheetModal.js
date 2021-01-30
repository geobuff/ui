import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Button, Divider, Heading, Text } from "@chakra-ui/core";

import Sheet from "react-modal-sheet";

import CountryList from "../.../../../components/CountryList";
import CountryResultsListContainer from "../.../../../components/CountryResultsListContainer";
import CapitalResultsListContainer from "../.../../../components/CapitalResultsListContainer";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

const GameBottomSheetModal = ({
  title,
  checkedCountries,
  hasGameStarted,
  onGameStart,
  onGameStop,
  recentCountries,
  verb,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Because we want the modal to stay open, this forces the
  // modal to stay open even if it's forced closed by pesky users
  const handleClose = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  const getContainer = () => {
    switch (verb) {
      case "capitals":
        return (
          <CapitalResultsListContainer checkedCapitals={checkedCountries} />
        );
      default:
        return (
          <CountryResultsListContainer checkedCountries={checkedCountries} />
        );
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
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Box
            mx={5}
            my={0}
            // TODO: Update padding based on current snapPoint
            pb="400px"
          >
            <Box>
              <Heading pt={0} size="md" textAlign="center">
                {title}
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

            <Box mt={4} overflowY="scroll">
              <Text fontWeight="bold" mb={1}>
                {"RECENT"}
              </Text>
              <CountryList countries={recentCountries} verb={verb} />
            </Box>

            <Box>{getContainer()}</Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
    </Box>
  );
};

GameBottomSheetModal.propTypes = {
  title: PropTypes.string,
  checkedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  hasGameStarted: PropTypes.bool,
  onGameStart: PropTypes.func,
  onGameStop: PropTypes.func,
  recentCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  verb: PropTypes.string,
};

GameBottomSheetModal.defaultProps = {
  checkedCountries: [],
  hasGameStarted: false,
  onGameStart: () => {},
  onGameStop: () => {},
  recentCountries: [],
  verb: "countries",
};

export default GameBottomSheetModal;
