/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  ResponsiveValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";
import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";
import { use100vh } from "react-div-100vh";

import CustomFlag from "../../CustomFlag";
import Image from "../../Image";
import { TriviaQuestionTypes } from "../../../types/trivia-question-types";

const mapStyles = {
  height: "100%",
  width: "100%",
  fill: "#6dca94",
};

const getContentByType = (
  type: TriviaQuestionTypes,
  map: string,
  highlighted: string,
  flagCode: string,
  imageUrl: string
) => {
  switch (type) {
    case "Flag":
      return (
        <AspectRatio
          ratio={8 / 5}
          maxWidth={{ base: "60%", md: "300px" }}
          width="100%"
        >
          <CustomFlag
            url={getFlagUrl(flagCode)}
            height="100%"
            maxHeight="200px"
            width="100%"
            borderRadius="24px"
          />
        </AspectRatio>
      );
    case "Map":
      let svgMap = JSON.parse(JSON.stringify(Maps[map]));
      if (highlighted) {
        svgMap = {
          ...svgMap,
          paths: svgMap.paths.map((x) => {
            if (x.name.toLowerCase() === highlighted.toLowerCase()) {
              x.style = { fill: "#e24f4f" };
            } else {
              x.style = { fill: "#6dca94" };
            }
            return x;
          }),
        };
      }

      return <SVGMap map={svgMap} mapStyle={mapStyles} />;
    case "Image":
      return (
        <Flex
          direction="column"
          justifyContent="center"
          height="80%"
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
              <Image
                src={imageUrl}
                height="100%"
                width="100%"
                marginX="auto"
                // @ts-expect-error
                objectFit="contain !important"
              />
            </AspectRatio>
          </Box>
        </Flex>
      );
    default:
      return null;
  }
};

type HeaderFontSize = string | ResponsiveValue<string | any>;

const getHeaderFontSize = (
  isTinyMobile: boolean,
  isTextQuestion: boolean
): HeaderFontSize => {
  if (!isTextQuestion && isTinyMobile) return "lg";
  return { base: isTextQuestion ? "2xl" : "xl", md: "3xl", lg: "4xl" };
};

export interface Props {
  text: string;
  type?: TriviaQuestionTypes;
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}

const GameTriviaContent: FC<Props> = ({
  text,
  type = "Text",
  map = "",
  highlighted = "",
  flagCode = "",
  imageUrl = "",
}) => {
  const isMobile = useBreakpointValue({ base: false, md: true });
  const height = use100vh();
  const isTinyMobile = height < 625;
  const isTextQuestion = type === "Text";

  const contentNode = getContentByType(
    type,
    map,
    highlighted,
    flagCode,
    imageUrl
  );

  const headerFontSize = getHeaderFontSize(isTinyMobile, isTextQuestion);

  if (isMobile === undefined) return null;

  return (
    <Flex
      direction="column"
      flex={1}
      justifyContent="center"
      alignItems="center"
      marginY={5}
      overflow="hidden"
    >
      {contentNode}
      <Heading
        color="white"
        marginTop={5}
        marginBottom={{ base: 0, md: 5 }}
        fontSize={headerFontSize}
      >
        {text}
      </Heading>
    </Flex>
  );
};

export default GameTriviaContent;
