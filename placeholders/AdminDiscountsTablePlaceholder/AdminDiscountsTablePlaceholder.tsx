import React, { FC } from "react";

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {
  rows?: number;
}

const AdminDiscountsTablePlaceholder: FC<Props> = ({ rows = 10 }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Prevent layout shift on load
  if (isMobile === undefined) {
    return null;
  }

  return (
    <Table size="md" variant="striped" colorscheme="gray">
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
          <Th textAlign="right">
            <Skeleton height="24px" width="80px" />
          </Th>
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdminDiscountsTablePlaceholder;
