import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Button, Text, Fade } from "@chakra-ui/react";

import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import { groupMapping } from "../../../helpers/mapping";

import { motion } from "framer-motion";

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

  const variants = {
    open: { top: "20%" },
    closed: { top: "calc(100% - 300px)" },
  };

  const opacityVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };

  return (
    <motion.div
      animate={showResultList ? "open" : "closed"}
      variants={variants}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      style={{
        display: "inline-block",
        backgroundColor: "white",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      <Flex
        direction="column"
        backgroundColor="white"
        p={4}
        borderTopRadius={12}
      >
        <Box>
          {!showResultList && (
            <Fade in unmountOnExit>
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
            </Fade>
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
            <Fade in unmountOnExit>
              <ResultsMap
                quiz={quiz}
                checked={checkedSubmissions}
                map={groupMapping(mapping)}
                hasGameStopped={hasGameStopped}
                hasGroupings={quiz.hasGrouping}
                hasFlags={quiz.hasFlags}
              />
            </Fade>
          )}
        </Box>
      </Flex>
    </motion.div>
  );
};

GameFlagQuizBottomSheet.propTypes = {};
GameFlagQuizBottomSheet.defaultProps = {};

export default GameFlagQuizBottomSheet;
