import React, { FC } from "react";

import {
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {
  rows?: number;
}

const AdminOrdersTablePlaceholder: FC<Props> = ({ rows = 10 }) => {
  return (
    <Table size="md" variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th width="100px" />
        </Tr>
      </Thead>
      <Tbody>
        {[...Array(rows)].map((_, i) => (
          <Tr padding={0} key={i}>
            <Td width="25%">
              <Skeleton height="26px" />
            </Td>
            <Td width="25%">
              <Skeleton height="26px" />
            </Td>
            <Td width="25%">
              <Skeleton height="26px" />
            </Td>
            <Td width="25%">
              <Skeleton height="26px" />
            </Td>
            <Td width="25%">
              <Skeleton height="26px" />
            </Td>
            <Td width="25%">
              <Skeleton height="26px" width="100px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdminOrdersTablePlaceholder;
