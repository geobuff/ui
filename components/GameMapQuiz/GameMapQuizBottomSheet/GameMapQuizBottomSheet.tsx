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

import ResultsList from "../../ResultsList";
import ResultsMap from "../../ResultsMap";
import Twemoji from "../../Twemoji";

import { groupMapping } from "../../../helpers/mapping";
import { Mapping } from "../../../types/mapping";
import { Result } from "../../../types/result";

const snapPoints = [600, 400, 300, 90];
const initialSnap = snapPoints.length - 2;

export interface Props {
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  verb?: string;
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
  verb = "",
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

  // Custom DragIndicator Fixes issue with the original package indicator flying around on drag
  const DragIndicator: FC = () => (
    <>
      <Box position="absolute" width="100%" top={5}>
        <Box
          margin="auto"
          borderRadius={25}
          height={"4.35px"}
          width={8}
          backgroundColor="#dddddd"
          mb={1}
        />
      </Box>
      <Box pt={1} height="44px" as={Sheet.Header} />
    </>
  );

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
      onClose={(): void => {}}
    >
      <Sheet.Container style={{ position: "fixed" }}>
        <DragIndicator />
        <Sheet.Content>
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
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
            }}
          >
            <Heading pt={0} size="md">
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

            <Divider my={4} />

            <Box my={2}>
              <Button
                colorScheme={hasGameStarted ? "red" : "green"}
                isFullWidth
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
              <ResultsList results={recents} verb={verb} hasFlags={hasFlags} />
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
