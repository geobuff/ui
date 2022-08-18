/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { QuestionType } from "../../types/manual-trivia-question-form-submit";

import { SVGMap } from "@geobuff/svg-map";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import Image from "next/image";
import { getGameMap, getMapStyles, highlightSection } from "../../helpers/map";
import useMap from "../../hooks/UseMap";

export interface Props {
  typeId?: string;
  map?: string;
  highlighted?: string;
  imageUrl?: string;
  imageAttributeName?: string;
  imageAttributeUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
}

const QuestionTypeValuePreview: FC<Props> = ({
  typeId = "1",
  map = "",
  highlighted = "",
  imageUrl = "",
  imageAttributeName = "",
  imageAttributeUrl = "",
  imageWidth = 0,
  imageHeight = 0,
  imageAlt = "",
}) => {
  const { data: svgMap, isLoading: isMapLoading } = useMap(map);

  const getContentByType = (): JSX.Element => {
    switch (typeId) {
      case QuestionType.Map:
        if (!map || isMapLoading) {
          return <></>;
        }

        const gameMap = getGameMap(svgMap, map);
        highlighted && highlightSection(gameMap, map, highlighted);
        return (
          <Box marginTop="40px" marginBottom="10px">
            <SVGMap map={gameMap} mapStyle={getMapStyles(map)} />
          </Box>
        );
      case QuestionType.Image:
        if (!imageUrl) {
          return <></>;
        }

        return (
          <Flex direction="column">
            <Image
              src={imageUrl}
              alt={imageAlt}
              height={imageHeight}
              width={imageWidth}
              style={{
                marginTop: 6,
                marginBottom: 1,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              priority
            />
            <Text fontSize="8px">
              {`Photo by `}
              <Link href={imageAttributeUrl}>{imageAttributeName}</Link>
              {` on `}
              <Link
                href={`https://unsplash.com?utm_source=GeoBuff&utm_medium=referral`}
              >
                Unsplash
              </Link>
            </Text>
          </Flex>
        );
      default:
        return <></>;
    }
  };

  return (
    <Flex justifyContent="center" height="auto" width="50%" marginX="auto">
      {getContentByType()}
    </Flex>
  );
};

export default QuestionTypeValuePreview;
