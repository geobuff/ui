import React, { FC } from "react";

import {
  BoxProps,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import Twemoji from "../Twemoji";

export interface Props extends BoxProps {
  hasLeaderboard?: boolean;
  quizId?: number;
  heading: string;
  shouldTruncateText?: boolean;
}

const GameHeader: FC<Props> = ({
  hasLeaderboard = false,
  quizId,
  heading,
  shouldTruncateText = false,
  ...props
}) => {
  const showLeaderboardIcon = hasLeaderboard && quizId;

  const leaderboardLinkIcon = (
    <Link href={`/leaderboard?quizId=${quizId}`}>
      <ChakraLink>
        <Twemoji emoji="🏆" height="22px" width="22px" pt={1} mr={2} />
      </ChakraLink>
    </Link>
  );

  return (
    <Heading
      size="md"
      textAlign="center"
      {...props}
      maxWidth={{ base: "100%", md: "270px" }}
    >
      {shouldTruncateText ? (
        <Flex width="100%" justifyContent="center" alignItems="center">
          {showLeaderboardIcon && leaderboardLinkIcon}
          <Text as="span" isTruncated={shouldTruncateText}>
            {heading}
          </Text>
        </Flex>
      ) : (
        <>
          {showLeaderboardIcon && leaderboardLinkIcon}
          {heading}
        </>
      )}
    </Heading>
  );
};

export default GameHeader;
