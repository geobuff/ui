import React from "react";
import PropTypes from "prop-types";
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
  Skeleton,
} from "@chakra-ui/react";

import LeaderTablePlaceholder from "./LeaderboardTablePlaceholder";
import FlagFallback from "../ResultsListItem/FlagFallback";
import Twemoji from "../Twemoji";
import TableCell from "../TableCell";

import { secondsToMinutesString } from "../../helpers/time";
import Sparkles from "../Sparkles/Sparkles";

const LeaderboardTable = ({ page, limit, entries, isLoading }) => {
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

  const getNodeByRank = (rank) => {
    if (isLoading) {
      return <Skeleton height="32px" width="30px" />;
    }

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

  const getTextNodeByRank = (rank, username, countryCode) => {
    switch (rank) {
      case 1:
        return (
          <Fade in>
            <Sparkles showSparkles={!isLoading}>
              <Flex alignItems="center">
                <Box marginRight={3} marginTop="5.5px" alignItems="center">
                  {countryCode ? (
                    <Twemoji emoji={flag(countryCode)} />
                  ) : (
                    <Box marginY="4px">
                      <FlagFallback />
                    </Box>
                  )}
                </Box>
                <Text fontWeight="bold">{username}</Text>
              </Flex>
            </Sparkles>
          </Fade>
        );
      default:
        return (
          <Flex alignItems="center">
            <Box marginRight={3} marginTop="5.5px" alignItems="center">
              {countryCode ? (
                <Twemoji emoji={flag(countryCode)} />
              ) : (
                <Box marginY="4px">
                  <FlagFallback />
                </Box>
              )}
            </Box>
            <Text>{username}</Text>
          </Flex>
        );
    }
  };

  return (
    <Box overflow="auto">
      <Table size="md" variant="striped" colorscheme="gray">
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
                <Flex alignItems="center">
                  {getNodeByRank(page * limit + index + 1)}
                </Flex>
              </TableCell>
              <TableCell paddingY={3} paddingX={6} minWidth="200px">
                {getTextNodeByRank(
                  page * limit + index + 1,
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

LeaderboardTable.propTypes = {
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  limit: PropTypes.number,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      username: PropTypes.string,
      countryCode: PropTypes.string,
      score: PropTypes.number,
      time: PropTypes.time,
      added: PropTypes.time,
    })
  ),
};

LeaderboardTable.defaultProps = {
  isLoading: true,
  limit: 10,
  page: 0,
  entries: [],
};

export default LeaderboardTable;
