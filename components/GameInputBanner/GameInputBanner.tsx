import React, { FC, createRef, useContext, useEffect } from "react";

import { SolidCloseCircle } from "@geobuff/buff-ui/components";

import {
  Box,
  Fade,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { ExpiryTimestamp } from "../../types/expiry-timestamp";
import { QuizTypes } from "../../types/quiz-types";
import GameInputBannerError from "./GameInputBannerError/GameInputBannerError";
import GameInputBannerTimer from "./GameInputBannerTimer/GameInputBannerTimer";

export interface Props {
  typeId?: number;
  maxScore?: number;
  plural?: string;
  score?: number;
  time?: number;
  errorMessage?: string;
  expiryTimestamp?: ExpiryTimestamp;
  hasError?: boolean;
  hasGameStarted?: boolean;
  hasGameStopped?: boolean;
  inputValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearInput?: () => void;
}

const GameInputBanner: FC<Props> = ({
  typeId = 0,
  maxScore = 0,
  plural = "",
  time = 0,
  score = 0,
  errorMessage = "",
  expiryTimestamp = { minutes: 0, seconds: 0 },
  hasError = false,
  hasGameStarted = false,
  hasGameStopped = false,
  inputValue = "",
  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {},
  onClearInput = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const isFlagGame = typeId === QuizTypes.FLAG;
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!isFlagGame && hasGameStarted) {
      inputRef.current.focus();
    }
  }, [isFlagGame, hasGameStarted]);

  const handleClearInput = (): void => {
    onClearInput();
    inputRef.current.focus();
  };

  const scoreLabel = `${score} ${t.global.of} ${maxScore} ${plural}`;

  const scoreNode = (
    <>
      {scoreLabel?.length > 23 ? (
        <Tooltip label={plural}>
          <Box textAlign="center" mr={3}>
            <GameInputBannerTimer
              expiryTimestamp={expiryTimestamp}
              hasGameStarted={hasGameStarted}
              hasGameStopped={hasGameStopped}
              totalSeconds={time}
            />
            <Text
              color="white"
              fontSize="12px"
              fontWeight={700}
              minWidth="125px"
              maxWidth="140px"
              width="100%"
              noOfLines={1}
            >
              {scoreLabel}
            </Text>
          </Box>
        </Tooltip>
      ) : (
        <Box textAlign="center" mr={3}>
          <GameInputBannerTimer
            fontSize={isFlagGame ? "24px" : "32px"}
            expiryTimestamp={expiryTimestamp}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            totalSeconds={time}
          />
          <Text
            color="white"
            fontSize="12px"
            fontWeight={700}
            minWidth="125px"
            maxWidth="140px"
            width="100%"
            noOfLines={1}
          >
            {scoreLabel}
          </Text>
        </Box>
      )}
    </>
  );

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        backgroundColor="#27AE60"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.08)"
        px={3}
        py={2}
        zIndex={1}
        position="relative"
      >
        {scoreNode}

        {!isFlagGame && (
          <InputGroup>
            <Input
              ref={inputRef}
              isDisabled={!hasGameStarted}
              isInvalid={hasError}
              placeholder={`${t.global.enter} ${plural}...`}
              onChange={onChange}
              value={inputValue}
            />
            <InputRightElement>
              <Fade in={inputValue?.length > 0}>
                <IconButton
                  aria-label={t.global.closeCircle}
                  right={3}
                  maxHeight="22px"
                  minWidth="22px"
                  marginBottom="2px"
                  backgroundColor="transparent"
                  borderRadius={25}
                  onClick={handleClearInput}
                  color={hasError ? "red.500" : "#a6a6a6"}
                  fontWeight="bold"
                  _hover={{ backgroundColor: "transparent", color: "#5c5c5c" }}
                >
                  <SolidCloseCircle height={5} width={5} padding={0} />
                </IconButton>
              </Fade>
            </InputRightElement>
          </InputGroup>
        )}
      </Flex>
      <Box>
        <GameInputBannerError errorMessage={errorMessage} />
      </Box>
    </>
  );
};

export default GameInputBanner;
