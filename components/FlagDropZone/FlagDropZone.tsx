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
import { use100vh } from "react-div-100vh";

interface CollectResult {
  isOver: boolean;
  canDrop: boolean;
}

interface Props {
  acceptedFlagName?: string;
  subtitle?: string;
  hasGameStarted?: boolean;
  submissionCorrect?: boolean;
  submissionIncorrect?: boolean;
  showSkipQuestion?: boolean;
  onSkipQuestion?: () => void;
  isSkipButtonDisabled?: boolean;
}

const FlagDropZone: FC<Props> = ({
  acceptedFlagName = "",
  subtitle,
  hasGameStarted = false,
  submissionCorrect = false,
  submissionIncorrect = false,
  showSkipQuestion = false,
  isSkipButtonDisabled = false,
  onSkipQuestion = (): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const iconButtonSize = useBreakpointValue({ base: "xs", md: "sm" });

  const height = use100vh();

  const isSmallMobile = isMobile && height <= 624;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FLAG,
    drop: (): DragResult => ({ name: ItemTypes.DROPZONE }),
    collect: (monitor: DropTargetMonitor): CollectResult => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const titleAndScoreNode = (
    <Flex
      alignItems="center"
      direction="column"
      opacity={hasGameStarted ? "1" : "0"}
      transition="200ms ease-in-out"
      marginY={5}
    >
      <Flex alignItems="center">
        <Text
          fontSize={{ base: "md", sm: "xl", md: "3xl" }}
          fontWeight="bold"
          color="#FFFFFF"
        >
          {acceptedFlagName}
        </Text>
        <IconButton
          isDisabled={isSkipButtonDisabled}
          borderRadius={50}
          mt={{ base: "2px", lg: "5px" }}
          marginLeft={1}
          variant="ghost"
          aria-label="Skip Question"
          color="white"
          size={iconButtonSize}
          transition="650ms ease-in-out"
          onClick={onSkipQuestion}
          _hover={
            !isSkipButtonDisabled && {
              backgroundColor: "#236175",
              transform: "rotate(360deg)",
            }
          }
          icon={<SolidRefresh mt="4px" ml="2.5px" height="18px" width="18px" />}
        />
      </Flex>

      {isMobile && subtitle && (
        <Text
          textAlign="center"
          color="white"
          marginTop={1}
          fontWeight="semibold"
          fontSize="small"
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );

  const dropZoneNode = (
    <Flex
      flex={1}
      direction="column"
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
      {isSmallMobile && titleAndScoreNode}

      {hasGameStarted && !submissionCorrect && !submissionIncorrect && (
        <Text
          color="#9FC7D9"
          fontWeight="medium"
          fontSize="sm"
          marginBottom={isSmallMobile ? 5 : 0}
        >
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
      {!isSmallMobile && titleAndScoreNode}
    </Flex>
  );
};

export default FlagDropZone;
