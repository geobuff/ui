import React, { FC } from "react";
import {
  AspectRatio,
  Box,
  Fade,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { ItemTypes } from "../../types/item-types";
import { DragResult } from "../../types/drag-result";
import SolidRefresh from "../../Icons/SolidRefresh";

interface CollectResult {
  isOver: boolean;
  canDrop: boolean;
}

interface Props {
  acceptedFlagName?: string;
  hasGameStarted?: boolean;
  submissionCorrect?: boolean;
  submissionIncorrect?: boolean;
  showSkipQuestion?: boolean;
  onSkipQuestion?: () => void;
  isSkipButtonDisabled?: boolean;
}

const FlagDropZone: FC<Props> = ({
  acceptedFlagName = "",
  hasGameStarted = false,
  submissionCorrect = false,
  submissionIncorrect = false,
  showSkipQuestion = false,
  isSkipButtonDisabled = false,
  onSkipQuestion = (): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FLAG,
    drop: (): DragResult => ({ name: ItemTypes.DROPZONE }),
    collect: (monitor: DropTargetMonitor): CollectResult => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const dropZoneNode = (
    <Flex
      flex={1}
      justifyContent="center"
      alignItems="center"
      ref={drop}
      role="Dropzone"
      minWidth={{ base: "175px", lg: "100%" }}
      minHeight={{ base: "100px", lg: "100%" }}
      height={{ base: "100%" }}
      width={{ base: "100%", lg: "100%" }}
      margin={0}
      borderRadius="12%"
      transition="all 150ms ease-out"
      transform={isOver && "scale(1.125)"}
      background={
        submissionCorrect
          ? "green.500"
          : submissionIncorrect
          ? "red.500"
          : "#236175"
      }
    >
      {hasGameStarted && !submissionCorrect && !submissionIncorrect && (
        <Text color="white">
          {canDrop && isOver ? "Release to drop..." : "Drag a flag here..."}
        </Text>
      )}
    </Flex>
  );

  return (
    <Flex
      width="100%"
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
      minWidth={{ base: "100%", md: "79%" }}
      paddingLeft={{ base: 0, lg: "375px" }}
    >
      {isMobile ? (
        <AspectRatio width="60%" ratio={8 / 5}>
          {dropZoneNode}
        </AspectRatio>
      ) : (
        <AspectRatio
          width="60%"
          minWidth="320px"
          maxWidth={{ xl: "420px", "2xl": "560px" }}
          marginX="auto"
          ratio={2 / 1.4}
        >
          {dropZoneNode}
        </AspectRatio>
      )}

      <Flex
        alignItems="center"
        opacity={hasGameStarted ? "1" : "0"}
        transition="200ms ease-in-out"
      >
        <Box position="relative">
          <Text
            fontSize={{ base: "md", sm: "xl", md: "3xl" }}
            lineHeight="2"
            fontWeight="bold"
            marginY={5}
            color="#FFFFFF"
            minHeight="40px"
          >
            {acceptedFlagName}
          </Text>
          <Fade in={showSkipQuestion} unmountOnExit={!showSkipQuestion}>
            <IconButton
              position="absolute"
              top={{ base: 6, lg: 8 }}
              right={-9}
              isDisabled={isSkipButtonDisabled}
              borderRadius={50}
              mt={{ base: "1px", lg: "5px" }}
              variant="ghost"
              aria-label="Skip Question"
              color="white"
              opacity={0.9}
              size="sm"
              transition="650ms ease-in-out"
              onClick={onSkipQuestion}
              _hover={{
                backgroundColor: "#236175",
                transform: "rotate(360deg)",
              }}
              icon={
                <SolidRefresh mt="4px" ml="2.5px" height="18px" width="18px" />
              }
            />
          </Fade>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FlagDropZone;
