import React, { useState, useEffect, useContext, FC } from "react";
import {
  Box,
  Button,
  Divider,
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
import { Quiz } from "../../../types/quiz";
import { Mapping } from "../../../types/mapping";

interface Props {
  checkedSubmissions?: Mapping[];
  mapping?: Mapping[];
  quiz?: Quiz;
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
  quiz = null,
  flagDragItems = [],
  hasGameStarted = false,
  hasGameRunOnce = false,
  hasGameStopped = false,
  onCheckSubmission = () => {},
  onGameStop = () => {},
  onGameStart = () => {},
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
    if (dragEnd - dragStart >= 10 && !isDragging) {
      setShowResultsList(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragEnd]);

  const handleDrag = (event, info) => {
    console.log(info.point.x, info.point.y);
    setDragStart(info.point.x);
  };

  const handleDragEnd = (event, info) => {
    console.log(info.point.x, info.point.y);
    setDragEnd(info.point.x);
  };

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
        <Heading pt={2} size="md">
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
                height="400px"
                backgroundColor="white"
              />
            </Fade>
          )}

          {showResultList && (
            <Fade in unmountOnExit>
              <Button
                my={4}
                isFullWidth
                variant="outline"
                onClick={() => setShowResultsList(!showResultList)}
              >
                {"Results"}
              </Button>
              <ResultsMap
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

export default GameFlagQuizBottomSheet;
