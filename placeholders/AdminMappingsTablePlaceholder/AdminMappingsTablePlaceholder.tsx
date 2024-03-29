import React, { FC } from "react";

import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface Props {
  rows?: number;
}

const AdminMappingsTablePlaceholder: FC<Props> = ({ rows = 10 }) => {
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
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {[...Array(rows)].map((_, i) => (
          <Tr padding={0} key={i}>
            <Td>
              <Skeleton height="26px" />
            </Td>
            <Td>
              <Skeleton height="26px" />
            </Td>
            <Td>
              <Skeleton height="26px" />
            </Td>
            <Td>
              <Skeleton height="26px" />
            </Td>
            <Td>
              <Skeleton height="26px" />
            </Td>
            <Td>
              <Skeleton height="26px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdminMappingsTablePlaceholder;
