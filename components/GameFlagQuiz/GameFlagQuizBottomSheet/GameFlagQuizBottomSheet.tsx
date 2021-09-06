import React, { useState, useEffect, useContext, FC } from "react";
import {
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

import Twemoji from "../../Twemoji";
import ResultsMap from "../../ResultsMap";
import GameFlags from "../../GameFlags";
import { groupMapping } from "../../../helpers/mapping";

import { motion } from "framer-motion";
import { FlagGameContext } from "../../../context/FlagGameContext";
import { Mapping } from "../../../types/mapping";

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
    closed: { top: "calc(100% - 260px)" },
  };

  useEffect(() => {
    const dragDifference = dragEnd - dragStart;
    const hitsOpenThreshold = dragDifference >= 15 && !showResultList;
    const hitsCloseThreshold = dragEnd - dragStart >= 2 && showResultList;

    if ((hitsOpenThreshold || hitsCloseThreshold) && !isDragging) {
      setShowResultsList(!showResultList);
    }
  }, [dragEnd]);

  const handleDrag = (info: PointerEvent): void => {
    setDragStart(info.x);
  };

  const handleDragEnd = (info: PointerEvent): void => {
    setDragEnd(info.x);
  };

  const DragIndicator: FC = () => (
    <Box
      margin="auto"
      borderRadius={25}
      height={"4.35px"}
      width={8}
      backgroundColor="#dddddd"
      mb={1}
      mt={-1}
    />
  );

  return (
    <motion.div
      animate={showResultList ? "open" : "closed"}
      variants={variants}
      // @ts-ignore
      drag={isDragging ? "none" : "y"}
      dragConstraints={{ bottom: 10, top: 0 }}
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        damping: 50,
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
        <DragIndicator />
        <Heading pt={2} size="md">
          <Flex justifyContent="center">
            {hasLeaderboard && (
              <Link href={`/leaderboard?quizId=${id}`}>
                <ChakraLink>
                  <Twemoji emoji="🏆" mr={2} />
                </ChakraLink>
              </Link>
            )}
            {name}
          </Flex>
        </Heading>

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
              <Box
                marginTop={5}
                marginLeft="-5"
                marginRight="-5"
                height="1000px"
                backgroundColor="white"
              />
            </Fade>
          )}

          {showResultList && (
            <Fade in unmountOnExit>
              <ResultsMap
                checked={checkedSubmissions}
                map={groupMapping(mapping)}
                hasGameStopped={hasGameStopped}
                hasGroupings={hasGrouping}
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
