import React, { FC, useContext } from "react";

import {
  Box,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import Card from "../../components/Card";

const UserProfileLeaderboardEntriesPlaceholder: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <Card paddingX={{ base: 4, md: 6 }} paddingY={2}>
      <Skeleton>
        <Heading size="md" m={6}>
          {t.userProfileLeaderboardEntries.title}
        </Heading>
      </Skeleton>
      <Box my={6}>
        <Skeleton>
          <Table>
            <Thead>
              <Tr>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td />
              </Tr>
            </Tbody>
          </Table>
        </Skeleton>
      </Box>
    </Card>
  );
};

export default UserProfileLeaderboardEntriesPlaceholder;
