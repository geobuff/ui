import React, { useState, FC } from "react";

import { Box, Divider, Fade, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import GameHeader from "../../GameHeader";

import { groupMapping } from "../../../helpers/mapping";
import { Mapping } from "../../../types/mapping";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { ExpiryTimestamp } from "../../../types/expiry-timestamp";
import GameInputCardTimer from "../../GameInputCard/GameInputCardTimer";

const motionDivStyles: Record<string, any> = {
  backgroundColor: "white",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
};

interface Props {
  checkedSubmissions?: Mapping[];
  mapping?: Mapping[];
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  hasGrouping?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  hasFlags?: boolean;
  flagDragItems?: string[];
  timeRemaining?: number;
  expiryTimestamp?: ExpiryTimestamp;
  onCheckSubmission?: (submission: string) => void;
}

const GameFlagQuizBottomSheet: FC<Props> = ({
  checkedSubmissions = [],
  mapping = [],
  hasLeaderboard = false,
  id = 0,
  name = "",
  hasGrouping = false,
  hasGameStarted = false,
  hasGameStopped = false,
  hasFlags = false,
  flagDragItems = [],
  timeRemaining = 0,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  onCheckSubmission = (submission: string): void => {},
}) => {
  const [showResultList, setShowResultsList] = useState(false);

  // const { isDragging } = useContext(FlagGameContext);

  const variants = {
    open: { top: "20%" },
    closed: { top: "calc(100% - 260px)" },
    /**
     * Pulls sheet down when dragging, may reintroduce later
     * for smaller devices
     */
    // isDragging: { top: "calc(100% - 220px)" },
  };

  const getAnimationVariant = () => {
    // See comment in variants above
    // if (isDragging) {
    //   return "isDragging";
    // }

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
          color="gray.800"
        />
      </Flex>
      <Divider />
    </Box>
  );

  return (
    <motion.div
      animate={animate}
      variants={variants}
      style={motionDivStyles}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 400,
      }}
    >
      <Flex
        direction="column"
        backgroundColor="white"
        paddingX={4}
        paddingY={2}
        borderTopRadius={12}
      >
        <Flex alignItems="center" justifyContent="center" width="100%">
          <GameInputCardTimer
            shouldShowTitle={false}
            expiryTimestamp={expiryTimestamp}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            totalSeconds={timeRemaining}
            fontSize="32px"
          />
        </Flex>
        <GameHeader
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
