import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import BottomSheet from "./BottomSheet";
import { groupMapping } from "../../../helpers/mapping";

const GameFlagQuizBottomSheet = ({
  checkedSubmissions,
  mapping,
  quiz,
  flagDragItems,
  hasGameStarted,
  hasGameRunOnce,
  hasGameStopped,
  onCheckSubmission,
  onGameStop,
  onGameStart,
}) => {
  const [showResultList, setShowResultsList] = useState(false); // TODO: Consider renaming to something modal related

  function onClose() {
    setShowResultsList(false);
  }

  function onOpen() {
    setShowResultsList(true);
  }

  return (
    <BottomSheet isOpen={showResultList}>
      <Flex
        direction="column"
        backgroundColor="white"
        p={4}
        borderTopRadius={12}
      >
        <Box>
          {!showResultList && (
            <>
              <GameFlags
                codes={flagDragItems}
                onCheckSubmission={onCheckSubmission}
                //   onCheckSubmission={(submission) =>
                //     setCurrentSubmission(submission)
                //   }
              />
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                isFullWidth
                onClick={hasGameStarted ? onGameStop : onGameStop}
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
            </>
          )}

          <Button
            my={4}
            isFullWidth
            variant="outline"
            onClick={() => setShowResultsList(!showResultList)}
          >
            {"Results"}
          </Button>

          {showResultList && (
            <ResultsMap
              quiz={quiz}
              checked={checkedSubmissions}
              map={groupMapping(mapping)}
              hasGameStopped={hasGameStopped}
              hasGroupings={quiz.hasGrouping}
              hasFlags={quiz.hasFlags}
            />
          )}
        </Box>
      </Flex>
    </BottomSheet>
  );
};

GameFlagQuizBottomSheet.propTypes = {};
GameFlagQuizBottomSheet.defaultProps = {};

export default GameFlagQuizBottomSheet;
