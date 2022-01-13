/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { AspectRatio, Flex, Heading } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";
import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";

import CustomFlag from "../../CustomFlag";
import Image from "../../Image";
import { TriviaQuestionType } from "../../../types/trivia-question-type";

const mapStyles = {
  height: "100%",
  width: "100%",
  fill: "#6dca94",
};

const highlightedStyling = {
  fill: "#e24f4f",
};

const getContentByType = (
  type: TriviaQuestionType,
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
          />
        </AspectRatio>
      );
    case "Map":
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
    case "Image":
      return <Image src={imageUrl} height="100%" width="100%" />;
    default:
      return null;
  }
};

export interface Props {
  text: string;
  type?: TriviaQuestionType;
  map?: string;
  highlighted?: string;
  flagCode?: string;
  imageUrl?: string;
}

const GameDailyTriviaContent: FC<Props> = ({
  text,
  type = "Text",
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

  const isTextQuestion = type === "Text";

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
        fontSize={{ base: isTextQuestion ? "2xl" : "xl", md: "3xl" }}
      >
        {text}
      </Heading>
    </Flex>
  );
};

export default GameDailyTriviaContent;
