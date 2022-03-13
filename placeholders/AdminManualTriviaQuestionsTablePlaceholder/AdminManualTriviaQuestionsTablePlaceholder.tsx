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
  Flex,
} from "@chakra-ui/react";

interface Props {
  rows?: number;
}

const AdminManualTriviaQuestionsTablePlaceholder: FC<Props> = ({
  rows = 10,
}) => {
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
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="80px" />
          </Th>
          <Th textAlign="left">
            <Skeleton height="24px" width="60px" opacity={0} />
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
              <Flex width="100">
                <Skeleton height="26px" width="100%" />
                <Skeleton height="26px" width="100%" marginLeft={2} />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdminManualTriviaQuestionsTablePlaceholder;
