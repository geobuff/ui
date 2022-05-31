/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { QuestionType } from "../../types/manual-trivia-question-form-submit";

import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";
import { Flex } from "@chakra-ui/react";
import Image from "../Image";

export interface Props {
  typeId?: string;
  map?: string;
  highlighted?: string;
  imageUrl?: string;
}

const mapStyles = {
  height: "100%",
  width: "100%",
  fill: "#6dca94",
  marginTop: "40px",
  marginBottom: "10px",
};

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
