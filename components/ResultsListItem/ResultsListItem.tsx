import React, { FC } from "react";
import { Fade, Flex, Text } from "@chakra-ui/react";

import FlagFallback from "./FlagFallback/FlagFallback";
import CustomFlag from "../CustomFlag";

import Twemoji from "../Twemoji";
import useFlagGroups from "../../hooks/UseFlagGroups";

export interface Props {
  code?: string;
  isHidden?: boolean;
  isMissedResult?: boolean;
  svgName?: string;
  hasFlag?: boolean;
  shouldFadeIn?: boolean;
  [x: string]: any;
}

const ResultsListItem: FC<Props> = ({
  code = "",
  isHidden = false,
  isMissedResult = false,
  svgName = "",
  hasFlag = false,
  shouldFadeIn = false,
  ...props
}) => {
  const { getFlagUrlByCode } = useFlagGroups();

  const mainContent = (
    <Flex alignItems="center" marginY={2} {...props}>
      {hasFlag ? (
        <>
          {!isHidden && !isMissedResult ? (
            <CustomFlag url={getFlagUrlByCode(code)} />
          ) : (
            <FlagFallback />
          )}
        </>
      ) : (
        <Twemoji
          emoji={isHidden ? "🔲" : isMissedResult ? "❌" : "✅"}
          height="18px"
          width="18px"
        />
      )}
      <Text
        ml={2}
        fontWeight="600"
        fontSize={14}
        color={isMissedResult && "#e24f4f"}
      >
        {!isHidden ? svgName : "???"}
      </Text>
    </Flex>
  );

  return <> {shouldFadeIn ? <Fade in> {mainContent} </Fade> : mainContent} </>;
};

export default ResultsListItem;
