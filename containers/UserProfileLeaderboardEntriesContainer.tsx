import React, { FC, useContext } from "react";

import {
  Card,
  CustomFlag,
  Table,
  TableCellEntry,
} from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import { LanguageContext } from "../contexts/LanguageContext";

import useUserLeaderboardEntries from "../hooks/UseUserLeaderboardEntries";

import { secondsToMinutesString } from "../helpers/time";

interface Props {
  userId: number;
}

export const UserProfileLeaderboardEntriesContainer: FC<Props> = ({
  userId,
}) => {
  const { t } = useContext(LanguageContext);

  const { entries, isLoading } = useUserLeaderboardEntries(userId);

  const getRows = (): TableCellEntry[][] => {
    return entries.map((entry) => [
      {
        node: (
          <Flex direction="row" alignItems="center">
            {entry.quizName.length > 23 ? (
              <>
                <CustomFlag
                  url={entry.quizImageUrl}
                  code={entry.quizName}
                  mr={3}
                />
                <Tooltip label={entry.quizName}>
                  <Text maxWidth="200px" noOfLines={1}>
                    {entry.quizName}
                  </Text>
                </Tooltip>
              </>
            ) : (
              <>
                <CustomFlag
                  url={entry.quizImageUrl}
                  code={entry.quizName}
                  mr={3}
                />
                <Text maxWidth="200px" noOfLines={1}>
                  {entry.quizName}
                </Text>
              </>
            )}
          </Flex>
        ),
      },
      { node: entry.rank },
      { node: entry.score },
      { node: secondsToMinutesString(entry.time) },
      {
        node: (
          <Text minWidth="100px">
            {DateTime.fromISO(entry.added).toISODate()}
          </Text>
        ),
      },
    ]);
  };

  return (
    <Card paddingX={{ base: 4, md: 6 }} paddingY={{ base: 5, md: 6 }}>
      <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
        {t.userProfileLeaderboardEntries.title}
      </Heading>
      <Box my={6}>
        {entries.length === 0 ? (
          <Alert borderRadius={6}>
            <AlertIcon />
            {t.global.noEntriesAlert}
          </Alert>
        ) : (
          <Box overflow="auto">
            <Table
              columnCount={5}
              headers={[
                { node: t.global.quiz },
                { node: t.global.rank },
                { node: t.global.score },
                { node: t.global.time },
                { node: t.global.added },
              ]}
              rows={getRows()}
              noEntriesMessage={t.global.noEntriesAlert}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};
