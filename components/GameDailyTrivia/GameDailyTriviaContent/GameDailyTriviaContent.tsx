/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";
import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";

import CustomFlag from "../../CustomFlag";
import Image from "../../Image";
import { DailyTriviaQuestionType } from "../../../types/daily-trivia-question-type";

const mapStyles = {
  height: "250px",
  width: "250px",
  marginBottom: "24px",
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
        <CustomFlag url={getFlagUrl(flagCode)} height="250px" width="250px" />
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
      return <Image src={imageUrl} height="250px" width="250px" />;
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
      marginBottom={5}
    >
      {contentNode}
      <Heading color="white">{text}</Heading>
    </Flex>
  );
};

export default GameDailyTriviaContent;
