import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@chakra-ui/react";
import { Box, Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import Twemoji from "../Twemoji";
import flag from "country-code-emoji";
import { secondsToMinutesString } from "../../helpers/time";

// TODO: Move component
import FlagFallback from "../ResultsListItem/FlagFallback";

const LeaderboardTable = ({ page, limit, entries }) => {
  if (entries.length === 0) {
    return (
      <Alert status="info" borderRadius={6}>
        No entries to display.
      </Alert>
    );
  }

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
          {entries.map((entry, index) => (
            <Tr key={index} fontWeight="bold">
              <Td paddingY={3} paddingX={6}>
                {page * limit + index + 1}
              </Td>
              <Td paddingY={3} paddingX={6}>
                <Flex alignItems="center">
                  <Box marginRight={3} marginTop="5.5px" alignItems="center">
                    {entry.countryCode ? (
                      <Twemoji emoji={flag(entry.countryCode)} />
                    ) : (
                      <Box marginY="5px" paddingBottom="2px">
                        <FlagFallback />
                      </Box>
                    )}
                  </Box>
                  {entry.username}
                </Flex>
              </Td>
              <Td isNumeric paddingY={3} paddingX={6}>
                {secondsToMinutesString(entry.time)}
              </Td>
              <Td isNumeric paddingY={3} paddingX={6}>
                {entry.score}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

LeaderboardTable.propTypes = {
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

export default LeaderboardTable;
