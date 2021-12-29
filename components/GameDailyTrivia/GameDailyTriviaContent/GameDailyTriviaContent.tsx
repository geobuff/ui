import React, { FC, ReactNode } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";
import { SVGMap } from "@geobuff/svg-map";

import { NewZealandRegions } from "@geobuff/svg-maps";

import CustomFlag from "../../CustomFlag";

export type TriviaContentType = "flag" | "map" | "image";

export interface Props {
  type?: TriviaContentType;
  text: string;
}

const mapStyles = {
  height: "250px",
  width: "250px",
  marginBottom: "24px",
  fill: "#27AE60",
};

const getContentByType = (type: TriviaContentType) => {
  switch (type) {
    case "flag":
      return <CustomFlag url={getFlagUrl("NZ")} height="250px" width="250px" />;
    case "map":
      return <SVGMap map={NewZealandRegions} mapStyle={mapStyles} />;

    default:
      return null;
  }
};

const GameDailyTriviaContent: FC<Props> = ({ type, text }) => {
  const contentNode = getContentByType(type);
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
