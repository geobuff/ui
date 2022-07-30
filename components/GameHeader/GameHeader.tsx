import React, { FC } from "react";
import { BoxProps, Flex, Heading, Link } from "@chakra-ui/react";

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

  return (
    <Flex
      width="100%"
      justifyContent="center"
      maxWidth={{ base: "100%", md: "270px" }}
      {...props}
    >
      {showLeaderboardIcon && (
        <Link href={`/leaderboard?quizId=${quizId}`}>
          <Twemoji emoji="🏆" height="22px" width="22px" pt={1} mr={2} />
        </Link>
      )}
      <Flex direction="column" justifyContent="center">
        <Heading as="h1" size="md" noOfLines={shouldTruncateText && 1}>
          {heading}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default GameHeader;
