/* eslint-disable no-case-declarations */
import React, { FC } from "react";
import { QuestionType } from "../../types/manual-trivia-question-form-submit";

import { SVGMap } from "@geobuff/svg-map";
import * as Maps from "@geobuff/svg-maps";
import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import Image from "next/image";
import { getGameMap, getMapStyles, highlightSection } from "../../helpers/map";
import Link from "next/link";

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
  const getContentByType = (): JSX.Element => {
    switch (typeId) {
      case QuestionType.Map:
        if (!map) {
          return <></>;
        }

        const gameMap = getGameMap(Maps[map], map);
        highlighted && highlightSection(gameMap, map, highlighted);
        return (
          <Box marginTop="40px" marginBottom="10px">
            <SVGMap map={gameMap} mapStyle={getMapStyles(map)} />
          </Box>
        );
      case QuestionType.Image:
        return imageUrl ? (
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
              <ChakraLink>
                <Link href={imageAttributeUrl}>{imageAttributeName}</Link>
              </ChakraLink>
              {` on `}
              <ChakraLink>
                <Link
                  href={`https://unsplash.com?utm_source=GeoBuff&utm_medium=referral`}
                >
                  Unsplash
                </Link>
              </ChakraLink>
            </Text>
          </Flex>
        ) : (
          <></>
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
