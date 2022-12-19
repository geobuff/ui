import React, { FC, useContext, useState } from "react";

import { DelayedRender, ResultsMap } from "@geobuff/buff-ui/components";

import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Divider, Fade, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { groupMapping } from "../../../helpers/mapping";
import { ExpiryTimestamp } from "../../../types/expiry-timestamp";
import { FlagDetails } from "../../../types/flag-details";
import { MappingEntry } from "../../../types/mapping-entry";
import GameFlags from "../../GameFlags";
import GameHeader from "../../GameHeader";
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
  checkedSubmissions?: MappingEntry[];
  mapping?: MappingEntry[];
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  hasGrouping?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  hasFlags?: boolean;
  isNotchedIphone?: boolean;
  flagDragItems?: FlagDetails[];
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
  isNotchedIphone = false,
  flagDragItems = [],
  timeRemaining = 0,
  expiryTimestamp = { minutes: 0, seconds: 0 },
  onCheckSubmission = (submission: string): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const [showResultList, setShowResultsList] = useState(false);

  const variants = {
    open: { top: "20%" },
    closed: {
      top: `calc(100% - ${isNotchedIphone ? 270 : 260}px)`,
    },
  };

  const getAnimationVariant = () => {
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
          {t.global.results}
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
    <DelayedRender waitBeforeShow={75} shouldFadeIn>
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
                  flags={flagDragItems}
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
    </DelayedRender>
  );
};

export default GameFlagQuizBottomSheet;
