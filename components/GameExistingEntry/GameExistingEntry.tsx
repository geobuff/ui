import React, { FC } from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

import { formatNumber } from "../../helpers/number";
import { secondsToMinutesString } from "../../helpers/time";

interface Props {
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
  username = "PhileasFogg",
  isLoading = true,
}) => {
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
          {"RANK"}
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
          {"USERNAME"}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : (
          <Text
            fontSize="14px"
            fontWeight="bold"
            maxWidth="150px"
            marginRight={1}
            isTruncated
          >
            {username}
          </Text>
        )}
      </Box>
      <Box>
        <Text color="#768389" fontSize="10px" fontWeight="bold">
          {"TIME"}
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
          {"SCORE"}
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
