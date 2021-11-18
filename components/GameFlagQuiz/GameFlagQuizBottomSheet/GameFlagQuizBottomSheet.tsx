import React, { useState, useEffect, useContext, FC } from "react";

import { Box, Button, Divider, Fade, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import GameHeader from "../../GameHeader";

import { FlagGameContext } from "../../../context/FlagGameContext";

import { groupMapping } from "../../../helpers/mapping";
import { Mapping } from "../../../types/mapping";
import { ChevronUpIcon } from "@chakra-ui/icons";

interface Props {
  checkedSubmissions?: Mapping[];
  mapping?: Mapping[];
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  hasGrouping?: boolean;
  hasFlags?: boolean;
  flagDragItems?: string[];
  hasGameStarted?: boolean;
  hasGameRunOnce?: boolean;
  hasGameStopped?: boolean;
  onCheckSubmission?: (submission: string) => void;
  onGameStop?: () => void;
  onGameStart?: () => void;
}

const GameFlagQuizBottomSheet: FC<Props> = ({
  checkedSubmissions = [],
  mapping = [],
  hasLeaderboard = false,
  id = 0,
  name = "",
  hasGrouping = false,
  hasFlags = false,
  flagDragItems = [],
  hasGameStarted = false,
  hasGameRunOnce = false,
  hasGameStopped = false,
  onCheckSubmission = (submission: string): void => {},
  onGameStop = (): void => {},
  onGameStart = (): void => {},
}) => {
  const [showResultList, setShowResultsList] = useState(false);

  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const { isDragging } = useContext(FlagGameContext);

  const variants = {
    open: { top: "20%" },
    closed: { top: "calc(100% - 280px)" },
    isDragging: { top: "calc(100% - 220px)" },
  };

  const getAnimationVariant = () => {
    if (isDragging) {
      return "isDragging";
    }

    return showResultList ? "open" : "closed";
  };

  const animate = getAnimationVariant();

  const resultHeaderButton = (
    <Box
      marginTop={showResultList ? 4 : 3}
      marginBottom={3}
      onClick={() => setShowResultsList(!showResultList)}
    >
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text
          margin={2}
          fontSize={showResultList ? "large" : "medium"}
          fontWeight="semibold"
        >
          {"Results"}
        </Text>
        <ChevronUpIcon
          transform={showResultList && "rotate(180deg)"}
          height={8}
          width={8}
        />
      </Flex>
      <Divider />
    </Box>
  );

  return (
    <motion.div
      animate={animate}
      variants={variants}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 400,
      }}
      style={{
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
        <GameHeader
          mt={3}
          hasLeaderboard={hasLeaderboard}
          quizId={id}
          heading={name}
          shouldTruncateText
        />

        <Box>
          {!showResultList && (
            <Fade in unmountOnExit>
              <GameFlags
                codes={flagDragItems}
                onCheckSubmission={onCheckSubmission}
              />
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                isFullWidth
                onClick={hasGameStarted ? onGameStop : onGameStart}
                p={7}
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
              {resultHeaderButton}
            </Fade>
          )}

          {showResultList && (
            <Fade in unmountOnExit>
              {resultHeaderButton}
              <ResultsMap
                checked={checkedSubmissions}
                map={groupMapping(mapping)}
                hasGameStopped={hasGameStopped}
                hasGroupings={hasGrouping}
                hasHeader={false}
                hasFlags={hasFlags}
              />
            </Fade>
          )}
        </Box>
      </Flex>
    </motion.div>
  );
};

export default GameFlagQuizBottomSheet;
