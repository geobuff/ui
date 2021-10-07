import React, { FC } from "react";

import { Heading, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

import Twemoji from "../Twemoji";

export interface Props {
  hasLeaderboard?: boolean;
  quizId?: number;
  heading: string;
}

const GameHeader: FC<Props> = ({ hasLeaderboard = false, quizId, heading }) => {
  const showLeaderboardIcon = hasLeaderboard && quizId;
  return (
    <Heading size="md" textAlign="center">
      {showLeaderboardIcon && (
        <Link href={`/leaderboard?quizId=${quizId}`}>
          <ChakraLink>
            <Twemoji emoji="🏆" height="22px" width="22px" pt={1} mr={2} />
          </ChakraLink>
        </Link>
      )}
      {heading}
    </Heading>
  );
};

export default GameHeader;
