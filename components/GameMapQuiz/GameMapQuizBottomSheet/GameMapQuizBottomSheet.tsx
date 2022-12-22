import React, { FC, useContext, useEffect, useState } from "react";

import {
  BottomSheet,
  GameHeader,
  ResultsList,
  ResultsMap,
} from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { AppContext } from "../../../contexts/AppContext";
import { LanguageContext } from "../../../contexts/LanguageContext";

import { groupMapping } from "../../../helpers/mapping";
import { MappingEntry } from "../../../types/mapping-entry";
import { Result } from "../../../types/result";

export interface Props {
  hasLeaderboard?: boolean;
  id?: number;
  name?: string;
  plural?: string;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: MappingEntry[];
  checked?: MappingEntry[];
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
  const { t } = useContext(LanguageContext);
  const { isNavSidebarOpen } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [isMinimised, setIsMinimised] = useState(false);

  // Push modal down on game start
  useEffect(() => {
    if (hasGameStarted && isMobile) {
      setIsMinimised(true);
    }
  }, [hasGameStarted, isMobile]);

  const gameControlButtonText = hasGameStarted
    ? t.global.giveUp.toUpperCase()
    : hasGameRunOnce
    ? t.global.retry.toUpperCase()
    : t.global.start.toUpperCase();

  return (
    <BottomSheet isOpen={isOpen && !isNavSidebarOpen} isMinimised={isMinimised}>
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
          href={`/leaderboard?quizId=${id}`}
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
            {t.global.recent.toUpperCase()}
          </Text>
          <ResultsList
            results={recents}
            noResultsMessage={`${t.global.no} ${plural} ${t.global.toDisplay}`}
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
    </BottomSheet>
  );
};

export default GameMapQuizBottomSheet;
