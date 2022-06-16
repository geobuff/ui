/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { QuestionType } from "../../types/manual-trivia-question-form-submit";

import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";
import { Box, Flex } from "@chakra-ui/react";
import Image from "../Image";
import { getGameMap, getMapStyles, initializeMap } from "../../helpers/map";

export interface Props {
  typeId?: string;
  map?: string;
  highlighted?: string;
  imageUrl?: string;
}

const getContentByType = (
  typeId: string,
  map: string,
  highlighted: string,
  imageUrl: string
): JSX.Element => {
  switch (typeId) {
    case QuestionType.Map:
      if (!map) {
        return <></>;
      }

      const gameMap = getGameMap(Maps[map], map, highlighted);
      initializeMap(gameMap);
      return (
        <Box marginTop="40px" marginBottom="10px">
          <SVGMap map={gameMap} mapStyle={getMapStyles(map)} />
        </Box>
      );
    case QuestionType.Image:
      return imageUrl ? (
        <Image
          src={imageUrl}
          height="100%"
          width="100%"
          marginX="auto"
          my={6}
        />
      ) : (
        <></>
      );
    default:
      return <></>;
  }
};

const QuestionTypeValuePreview: FC<Props> = ({
  typeId = "1",
  map = "",
  highlighted = "",
  imageUrl = "",
}) => {
  return (
    <Flex justifyContent="center" height="auto" width="50%" marginX="auto">
      {getContentByType(typeId, map, highlighted, imageUrl)}
    </Flex>
  );
};

export default QuestionTypeValuePreview;
