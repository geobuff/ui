import React, { createRef, useEffect, FC, useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import Sheet from "react-modal-sheet";

import GameHeader from "../../GameHeader";
import ResultsList from "../../ResultsList";
import ResultsMap from "../../ResultsMap";

import { groupMapping } from "../../../helpers/mapping";
import { Mapping } from "../../../types/mapping";
import { Result } from "../../../types/result";
import { AppContext } from "../../../context/AppContext";

const snapPoints = [600, 400, 300, 90];
const initialSnap = snapPoints.length - 2;

export interface Props {
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  plural?: string;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: Mapping[];
  checked?: Mapping[];
  recents?: Result[];
  hasGameRunOnce?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  isOpen?: boolean;
  onGameStart?: () => void;
  onGameStop?: () => void;
}

const GameMapQuizBottomSheet: FC<Props> = ({
  hasLeaderboard = false,
  id = 0,
  name = "",
  plural = "",
  hasFlags = false,
  hasGrouping = false,
  mapping = [],
  checked = [],
  recents = [],
  hasGameRunOnce = false,
  hasGameStarted = false,
  hasGameStopped = false,
  isOpen = false,
  onGameStart = (): void => {},
  onGameStop = (): void => {},
}) => {
  const ref = createRef<any>();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isNavSidebarOpen } = useContext(AppContext);

  // Push modal down on game start
  useEffect(() => {
    if (hasGameStarted && isMobile) {
      snapTo(snapPoints.length - 1);
    }
  }, [hasGameStarted, isMobile]);

  const snapTo = (snapIndex: number): void => ref?.current?.snapTo(snapIndex);

  const gameControlButtonText = hasGameStarted
    ? "GIVE UP"
    : hasGameRunOnce
    ? "RETRY"
    : "START";

  return (
    <Box
      ref={ref}
      as={Sheet}
      isOpen={isOpen && !isNavSidebarOpen}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      mt="120px"
      top="100% !important"
      minHeight="92vh"
      zIndex="1000 !important"
      springConfig={{
        stiffness: 600,
        damping: 60,
        mass: 0.2,
      }}
      onClose={(): void => {}}
    >
      <Sheet.Container style={{ position: "fixed" }} onViewportBoxUpdate={null}>
        <Box as={Sheet.Header} onViewportBoxUpdate={null} />
        <Box
          margin="auto"
          borderRadius={25}
          height={"4.35px"}
          width={8}
          backgroundColor="#dddddd"
          mb={3}
          marginTop={-4}
        />

        <Sheet.Content onViewportBoxUpdate={null}>
          <Flex
            direction="column"
            height="100%"
            overflowY="scroll"
            mx={4}
            my={0}
            pb="100px"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
                display: "none",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
            }}
          >
            <GameHeader
              hasLeaderboard={hasLeaderboard}
              heading={name}
              quizId={id}
            />

            <Divider my={4} />

            <Box my={2}>
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                width="full"
                onClick={hasGameStarted ? onGameStop : onGameStart}
                p={8}
                size="md"
              >
                <Text fontWeight="700" fontSize="22px">
                  {gameControlButtonText}
                </Text>
              </Button>
            </Box>

            <Divider my={4} />

            <Box mt={2} mb={4}>
              <Text fontWeight="bold" mb={1}>
                {"RECENT"}
              </Text>
              <ResultsList
                results={recents}
                plural={plural}
                hasFlags={hasFlags}
              />
            </Box>

            <ResultsMap
              checked={checked}
              map={groupMapping(mapping)}
              hasGameStopped={hasGameStopped}
              hasGroupings={hasGrouping}
              hasFlags={hasFlags}
            />
          </Flex>
        </Sheet.Content>
      </Sheet.Container>
    </Box>
  );
};

export default GameMapQuizBottomSheet;
