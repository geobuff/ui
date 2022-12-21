import React, { FC, useContext } from "react";

import { Twemoji } from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Fade,
  Flex,
  Link,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import flag from "country-code-emoji";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { secondsToMinutesString } from "../../../helpers/time";
import LeaderTablePlaceholder from "../../../placeholders/LeaderboardTablePlaceholder/LeaderboardTablePlaceholder";
import { AuthUser } from "../../../types/auth-user";
import { LeaderboardEntry } from "../../../types/leaderboard-entry";
import AdminFlag from "../../AdminFlag";
import Sparkles from "../../Sparkles/Sparkles";
import TableCell from "../../Table/TableCell";

interface Props {
  entries?: LeaderboardEntry[];
  isLoading?: boolean;
}

const LeaderboardTable: FC<Props> = ({ entries = [], isLoading = true }) => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const { t } = useContext(LanguageContext);

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
          {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG_CODE ? (
            <AdminFlag />
          ) : (
            <Twemoji emoji={flag(countryCode)} />
          )}
        </Box>
        <Link href={`/profile/${userId}`}>
          <Text fontWeight="bold">{username}</Text>
        </Link>
        {username === user?.username && (
          <Text ml={2} fontWeight={600} color="gray.500">
            {t.leaderboardTable.you}
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
            <Th textAlign="left">{t.leaderboardTable.rank} </Th>
            <Th textAlign="left">{t.leaderboardTable.username}</Th>
            <Th textAlign="right">{t.leaderboardTable.time}</Th>
            <Th textAlign="right">{t.leaderboardTable.score}</Th>
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
