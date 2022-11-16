import React, { FC, useContext } from "react";

import {
  Box,
  Skeleton,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import Card from "../../components/Card";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

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
