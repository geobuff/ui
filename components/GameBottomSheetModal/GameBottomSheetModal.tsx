import React, { createRef, useEffect, FC } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
  useBreakpointValue,
} from "@chakra-ui/react";
import Sheet from "react-modal-sheet";

import ResultsList from "../ResultsList";
import ResultsMap from "../ResultsMap";
import Twemoji from "../Twemoji";

import { groupMapping } from "../../helpers/mapping";
import GameFlags from "../GameFlags/GameFlags";
import { Quiz } from "../../types/quiz";
import { Mapping } from "../../types/mapping";
import { QuizType } from "../../types/quiz-type";
import { Result } from "../../types/result";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

interface Props {
  quiz?: Quiz;
  mapping?: Array<Mapping>;
  checked?: Array<Result>;
  recents?: Array<Result>;
  codes?: Array<string>;
  hasGameRunOnce?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  isOpen?: boolean;
  onGameStart?: any;
  onGameStop?: any;
  onCheckSubmission?: any;
}

const GameBottomSheetModal: FC<Props> = ({
  quiz = null,
  mapping = [],
  checked = [],
  recents = [],
  codes = [],
  hasGameRunOnce = false,
  hasGameStarted = false,
  hasGameStopped = false,
  isOpen = false,
  onGameStart = () => {},
  onGameStop = () => {},
  onCheckSubmission = () => {},
}) => {
  const isFlagQuiz = quiz.type === QuizType.FLAG;
  const ref = createRef<any>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Push modal down on game start
  useEffect(() => {
    if (hasGameStarted && isMobile) {
      snapTo(snapPoints.length - 1);
    }
  }, [hasGameStarted, isMobile]);

  const snapTo = (snapIndex) => ref?.current?.snapTo(snapIndex);

  return (
    <Box
      ref={ref}
      as={Sheet}
      isOpen={isOpen}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      mt="120px"
      top="100% !important"
      minHeight="92vh"
      springConfig={{
        stiffness: 600,
        damping: 60,
        mass: 0.2,
      }}
      onClose={() => {}}
    >
      <Sheet.Container style={{ position: "fixed" }}>
        <Box pt={1} height="54px" as={Sheet.Header} />
        <Sheet.Content>
          <Flex
            direction="column"
            height="100%"
            overflowY="scroll"
            mx={5}
            my={0}
            pb="100px"
          >
            <Box>
              <Heading pt={0} size="md">
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

              {isFlagQuiz && (
                <>
                  <GameFlags
                    codes={codes}
                    onCheckSubmission={onCheckSubmission}
                  />
                  <Divider my={4} />
                </>
              )}

              <Box my={4}>
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
              </Box>
            </Box>

            <Divider my={4} />

            <Box mt={4}>
              <Text fontWeight="bold" mb={1}>
                {"RECENT"}
              </Text>
              <ResultsList quiz={quiz} results={recents} />
            </Box>

            <ResultsMap
              checked={checked}
              map={groupMapping(mapping)}
              hasGameStopped={hasGameStopped}
              hasGroupings={quiz.hasGrouping}
              hasFlags={quiz.hasFlags}
            />
          </Flex>
        </Sheet.Content>
      </Sheet.Container>
    </Box>
  );
};

export default GameBottomSheetModal;
