import React, { FC } from "react";
import flag from "country-code-emoji";

import {
  Alert,
  AlertIcon,
  Box,
  Fade,
  Flex,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Link,
} from "@chakra-ui/react";

import LeaderTablePlaceholder from "../../../placeholders/LeaderboardTablePlaceholder/LeaderboardTablePlaceholder";
import Twemoji from "../../Twemoji";
import TableCell from "../../TableCell";

import { secondsToMinutesString } from "../../../helpers/time";
import Sparkles from "../../Sparkles/Sparkles";
import { LeaderboardEntry } from "../../../types/leaderboard-entry";
import CustomFlag from "../../CustomFlag";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../../types/auth-user";

interface Props {
  entries?: LeaderboardEntry[];
  isLoading?: boolean;
}

const LeaderboardTable: FC<Props> = ({ entries = [], isLoading = true }) => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  if (isLoading && !entries.length) {
    return <LeaderTablePlaceholder />;
  }

  if (entries.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        <AlertIcon />
        No entries to display.
      </Alert>
    );
  }

  const getNodeByRank = (rank: number): React.ReactNode => {
    switch (rank) {
      case 1:
        return <Twemoji emoji="🥇" />;
      case 2:
        return <Twemoji emoji="🥈" />;
      case 3:
        return <Twemoji emoji="🥉" />;
      default:
        return <Text marginX="6px">{rank}</Text>;
    }
  };

  const getTextNodeByRank = (
    rank: number,
    userId: number,
    username: string,
    countryCode: string
  ): React.ReactNode => {
    const mainContent = (
      <Flex alignItems="center">
        <Box marginRight={3} marginTop="5.5px" alignItems="center">
          {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG ? (
            <CustomFlag
              url={"https://ik.imagekit.io/ucszu5sud3vz/flag-geobuff-sm"}
              code={countryCode}
              boxSizing="border-box"
              border="2px solid #dae2ea"
            />
          ) : (
            <Twemoji emoji={flag(countryCode)} />
          )}
        </Box>
        <Link href={`/profile/${userId}`}>
          <Text fontWeight="bold">{username}</Text>
        </Link>
        {username === user?.username && (
          <Text ml={2} fontWeight={600} color="gray.500">
            {"(You)"}
          </Text>
        )}
      </Flex>
    );

    if (rank === 1 && !isLoading) {
      return (
        <Fade in>
          <Sparkles>{mainContent}</Sparkles>
        </Fade>
      );
    }

    return <Fade in>{mainContent}</Fade>;
  };

  return (
    <Box overflow="auto">
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"RANK"} </Th>
            <Th textAlign="left">{"USERNAME"}</Th>
            <Th textAlign="right">{"TIME"}</Th>
            <Th textAlign="right">{"SCORE"}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {entries?.map((entry, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={3} paddingX={6}>
                <Flex alignItems="center">{getNodeByRank(entry.rank)}</Flex>
              </TableCell>
              <TableCell paddingY={3} paddingX={6} minWidth="200px">
                {getTextNodeByRank(
                  entry.rank,
                  entry.userId,
                  entry.username,
                  entry.countryCode
                )}
              </TableCell>
              <TableCell isNumeric paddingY={3} paddingX={6}>
                {secondsToMinutesString(entry.time)}
              </TableCell>
              <TableCell isNumeric paddingY={3} paddingX={6}>
                {entry.score}
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LeaderboardTable;
