import React, { FC, useContext } from "react";

import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { formatNumber } from "../../helpers/number";
import { secondsToMinutesString } from "../../helpers/time";

export interface Props {
  rank?: number;
  score?: number;
  time?: number;
  username?: string;
  isLoading?: boolean;
}

const GameExistingEntry: FC<Props> = ({
  rank = 0,
  score = 0,
  time = 900,
  username = "",
  isLoading = true,
}) => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex
      borderRadius={12}
      backgroundColor="#F0F0F0"
      justifyContent="space-between"
      paddingY={3}
      paddingX={4}
    >
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {t.global.rank.toUpperCase()}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : (
          <Text fontSize="14px" fontWeight="bold">
            {formatNumber(rank)}
          </Text>
        )}
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {t.global.username.toUpperCase()}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : (
          <Text
            fontSize="14px"
            fontWeight="bold"
            maxWidth="150px"
            marginRight={1}
            noOfLines={1}
          >
            {username}
          </Text>
        )}
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {t.global.time.toUpperCase()}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : (
          <Text fontSize="14px" fontWeight="bold">
            {secondsToMinutesString(time)}
          </Text>
        )}
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {t.global.score.toUpperCase()}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : (
          <Text fontSize="14px" fontWeight="bold">
            {score}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default GameExistingEntry;
