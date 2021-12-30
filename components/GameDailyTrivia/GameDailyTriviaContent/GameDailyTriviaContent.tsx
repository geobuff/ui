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
  fill: "#27AE60",
};

const getContentByType = (
  type: DailyTriviaQuestionType,
  map: string,
  flagCode: string,
  imageUrl: string
) => {
  switch (type) {
    case "flag":
      return (
        <CustomFlag url={getFlagUrl(flagCode)} height="250px" width="250px" />
      );
    case "map":
      return <SVGMap map={Maps[map]} mapStyle={mapStyles} />;
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
  flagCode?: string;
  imageUrl?: string;
}

const GameDailyTriviaContent: FC<Props> = ({
  text,
  type = "text",
  map = "",
  flagCode = "",
  imageUrl = "",
}) => {
  const contentNode = getContentByType(type, map, flagCode, imageUrl);

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
