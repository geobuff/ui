import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
} from "@chakra-ui/react";

const LeaderboardTablePlaceholder = ({ rows }) => (
  <Table size="md" variant="striped" colorscheme="gray">
    <Thead>
      <Tr>
        <Th textAlign="left">
          <Skeleton height="24px" width="40px" />
        </Th>
        <Th textAlign="left">
          <Skeleton height="24px" width="80px" />
        </Th>
        <Th textAlign="right">
          <Flex justifyContent="flex-end">
            <Skeleton height="24px" width="40px" />
          </Flex>
        </Th>
        <Th textAlign="right">
          <Flex justifyContent="flex-end">
            <Skeleton height="24px" width="42px" />
          </Flex>
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      {[...Array(rows)].map((_, i) => (
        <Tr padding={0} key={i}>
          <Td width={{ base: "25%", md: "17%" }}>
            <Skeleton height="26px" width={{ base: "30px", md: "30%" }} />
          </Td>
          <Td width={{ base: "30%", md: "30%" }}>
            <Flex alignItems="center">
              <Skeleton
                height="21px"
                width="28px"
                borderRadius={4}
                marginRight={3}
              />
              <Skeleton height="26px" width={{ base: "100px", md: "70%" }} />
            </Flex>
          </Td>
          <Td width={{ base: "20%", md: "20%" }}>
            <Flex justifyContent="flex-end">
              <Skeleton height="26px" width={{ base: "100%", md: "40%" }} />
            </Flex>
          </Td>
          <Td width={{ base: "20%", md: "20%" }}>
            <Flex justifyContent="flex-end">
              <Skeleton height="26px" width="40%" />
            </Flex>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

LeaderboardTablePlaceholder.propTypes = {
  rows: PropTypes.number,
};

LeaderboardTablePlaceholder.defaultProps = {
  rows: 10,
};

export default LeaderboardTablePlaceholder;
