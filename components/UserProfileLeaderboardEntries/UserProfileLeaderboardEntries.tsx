import React, { FC, useContext } from "react";
import { DateTime } from "luxon";

import {
  Box,
  Heading,
  Table,
  Text,
  Tbody,
  Thead,
  Tooltip,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  Flex,
  Link,
} from "@chakra-ui/react";

import Card from "../Card";
import CustomFlag from "../CustomFlag";

import { secondsToMinutesString } from "../../helpers/time";
import { UserLeaderboardEntry } from "../../types/user-leaderboard-entry";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

interface Props {
  entries?: UserLeaderboardEntry[];
}

const UserProfileLeaderboardEntries: FC<Props> = ({ entries = [] }) => {
  const { t } = useContext(LanguageContext);

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
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>{t.global.quiz}</Th>
                  <Th>{t.global.rank}</Th>
                  <Th>{t.global.score}</Th>
                  <Th>{t.global.time}</Th>
                  <Th>{t.global.added}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {entries.map((entry) => (
                  <Tr key={entry.id}>
                    <Link
                      href={`/leaderboard?quizId=${entry.quizId}&rank=${entry.rank}`}
                      display="contents"
                    >
                      <Td>
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
                      </Td>
                      <Td>{entry.rank}</Td>
                      <Td>{entry.score}</Td>
                      <Td>{secondsToMinutesString(entry.time)}</Td>
                      <Td>
                        <Text minWidth="100px">
                          {DateTime.fromISO(entry.added).toISODate()}
                        </Text>
                      </Td>
                    </Link>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default UserProfileLeaderboardEntries;
