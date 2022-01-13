/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { AspectRatio, Flex, Heading } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";
import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";

import CustomFlag from "../../CustomFlag";
import Image from "../../Image";
import { DailyTriviaQuestionType } from "../../../types/daily-trivia-question-type";

const mapStyles = {
  height: "100%",
  width: "100%",
  fill: "#6dca94",
};

const highlightedStyling = {
  fill: "#e24f4f",
};

const getContentByType = (
  type: DailyTriviaQuestionType,
  map: string,
  highlighted: string,
  flagCode: string,
  imageUrl: string
) => {
  switch (type) {
    case "flag":
      return (
        <AspectRatio
          ratio={8 / 5}
          maxWidth={{ base: "75%", md: "300px" }}
          width="100%"
        >
          <CustomFlag
            url={getFlagUrl(flagCode)}
            height="100%"
            maxHeight="200px"
            width="100%"
          />
        </AspectRatio>
      );
    case "map":
      let svgMap = Maps[map];
      if (highlighted) {
        svgMap = {
          ...svgMap,
          paths: svgMap.paths.map((x) => {
            if (x.name.toLowerCase() === highlighted.toLowerCase()) {
              x.style = highlightedStyling;
            }
            return x;
          }),
        };
      }

      return <SVGMap map={svgMap} mapStyle={mapStyles} />;
    case "image":
      return <Image src={imageUrl} height="100%" width="100%" />;
    default:
      return null;
  }
};

export interface Props {
  text: string;
  type?: DailyTriviaQuestionType;
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}

const GameDailyTriviaContent: FC<Props> = ({
  text,
  type = "text",
  map = "",
  highlighted = "",
  flagCode = "",
  imageUrl = "",
}) => {
  const contentNode = getContentByType(
    type,
    map,
    highlighted,
    flagCode,
    imageUrl
  );

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
      <Heading color="white" marginY={5}>
        {text}
      </Heading>
    </Flex>
  );
};

export default GameDailyTriviaContent;
