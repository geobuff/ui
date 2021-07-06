import React from "react";
import PropTypes from "prop-types";
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
} from "@chakra-ui/react";

import Card from "../Card";
import CustomFlag from "../CustomFlag";

import { secondsToMinutesString } from "../../helpers/time";

const UserProfileLeaderboardEntries = ({ entries }) => (
  <Card padding={6}>
    <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
      {"Leaderboard Entries"}
    </Heading>
    <Box my={6}>
      {entries.length === 0 ? (
        <Alert borderRadius={6}>
          <AlertIcon />
          No entries to display.
        </Alert>
      ) : (
        <Box overflow="auto">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Quiz</Th>
                <Th>Rank</Th>
                <Th>Score</Th>
                <Th>Time</Th>
                <Th>Added</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.map((entry) => (
                <Tr key={entry.id}>
                  <Td>
                    <Flex direction="row" alignItems="center">
                      {entry.quizName.length > 23 ? (
                        <>
                          <CustomFlag url={entry.quizImageUrl} mr={3} />
                          <Tooltip label={entry.quizName}>
                            <Text maxWidth="200px" isTruncated>
                              {entry.quizName}
                            </Text>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <CustomFlag url={entry.quizImageUrl} mr={3} />
                          <Text maxWidth="200px" isTruncated>
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
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  </Card>
);

UserProfileLeaderboardEntries.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      badgeGroup: PropTypes.number,
      quizName: PropTypes.string,
      quizImageUrl: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
      rank: PropTypes.number,
    })
  ),
};

export default UserProfileLeaderboardEntries;
