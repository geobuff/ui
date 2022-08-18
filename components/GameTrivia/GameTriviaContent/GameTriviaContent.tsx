/* eslint-disable no-case-declarations */
import React, { FC, useEffect, useState } from "react";

import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  ResponsiveValue,
  useBreakpointValue,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { SVGMap } from "@geobuff/svg-map";
import { use100vh } from "react-div-100vh";

import CustomFlag from "../../CustomFlag";
import Image from "next/image";
import { TriviaQuestionTypes } from "../../../types/trivia-question-types";
import {
  getGameMap,
  getMapStyles,
  highlightSection,
} from "../../../helpers/map";
import { SVGBase } from "../../../types/svg-base";
import usePrevious from "../../../hooks/UsePrevious";

type HeaderFontSize = string | ResponsiveValue<string | any>;

const getHeaderFontSize = (
  isTinyMobile: boolean,
  isTextQuestion: boolean,
  isImageQuestion?: boolean
): HeaderFontSize => {
  if (isImageQuestion && isTinyMobile) return "md";
  if (!isTextQuestion && isTinyMobile) return "lg";
  return { base: isTextQuestion ? "2xl" : "xl", md: "3xl", lg: "4xl" };
};

export interface Props {
  text: string;
  type?: TriviaQuestionTypes;
  map?: SVGBase;
  mapName?: string;
  highlighted?: string;
  flagCode?: string;
  flagUrl?: string;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
}

const GameTriviaContent: FC<Props> = ({
  text,
  type = "Text",
  map = null,
  mapName = "",
  highlighted = "",
  flagCode = "",
  flagUrl = "",
  imageUrl = "",
  imageAttributeName = "",
  imageAttributeUrl = "",
  imageWidth = 0,
  imageHeight = 0,
  imageAlt = "",
}) => {
  const isMobile = useBreakpointValue({ base: false, md: true });
  const height = use100vh();
  const isTinyMobile = height < 625;
  const isSmallerMobile = height < 785;
  const isTextQuestion = type === "Text";
  const isImageQuestion = type === "Image";

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const prevImageUrl = usePrevious(imageUrl);

  useEffect(() => {
    if (imageUrl) {
      if (prevImageUrl) {
        setCurrentImageUrl("");
        setTimeout(() => setCurrentImageUrl(imageUrl));
      } else {
        setCurrentImageUrl(imageUrl);
      }
    }
  }, [imageUrl]);

  const getContentByType = (): JSX.Element => {
    switch (type) {
      case "Flag":
        if (flagUrl) {
          return (
            <CustomFlag
              url={flagUrl}
              code={flagCode}
              width={300}
              height={187.5}
            />
          );
        }
        break;
      case "Map":
        if (!map) {
          return <></>;
        }

        const gameMap = getGameMap(map, mapName);
        highlighted && highlightSection(gameMap, mapName, highlighted);
        return <SVGMap map={gameMap} mapStyle={getMapStyles(mapName)} />;
      case "Image":
        return (
          <Flex
            direction="column"
            justifyContent="center"
            height={isSmallerMobile ? "70%" : "80%"}
            width="100%"
            marginX="auto"
          >
            <Box width="100%" height="100%">
              <AspectRatio
                ratio={1}
                maxWidth={{ base: "100%", md: "80%" }}
                maxHeight={"100%"}
                marginX="auto"
              >
                {currentImageUrl ? (
                  <Flex direction="column">
                    <Image
                      src={currentImageUrl}
                      alt={imageAlt}
                      height={imageHeight}
                      width={imageWidth}
                      objectFit="contain"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      priority
                    />
                    {imageAttributeName && (
                      <Text fontSize="10px" mt={1} color="white">
                        {`Photo by `}
                        <Link href={imageAttributeUrl}>
                          {imageAttributeName}
                        </Link>
                        {` on `}
                        <Link
                          href={`https://unsplash.com?utm_source=GeoBuff&utm_medium=referral`}
                        >
                          Unsplash
                        </Link>
                      </Text>
                    )}
                  </Flex>
                ) : (
                  <></>
                )}
              </AspectRatio>
            </Box>
          </Flex>
        );
      default:
        return null;
    }
  };

  const headerFontSize = getHeaderFontSize(
    isTinyMobile || isSmallerMobile,
    isTextQuestion,
    isImageQuestion
  );

  if (isMobile === undefined) return null;

  return (
    <Flex
      direction="column"
      flex={1}
      justifyContent="center"
      alignItems="center"
      marginY={isSmallerMobile ? 1 : 5}
      overflow="hidden"
    >
      {getContentByType()}
      <Heading color="white" marginY={5} fontSize={headerFontSize}>
        {text}
      </Heading>
    </Flex>
  );
};

export default GameTriviaContent;
