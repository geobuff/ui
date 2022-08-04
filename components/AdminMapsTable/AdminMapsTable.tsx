import React, { FC } from "react";
import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Divider,
  Link,
} from "@chakra-ui/react";

import TableCell from "../TableCell";
import AdminFlagsTablePlaceholder from "../../placeholders/AdminFlagsTablePlaceholder";
import Card from "../Card";
import { GetMapsDto } from "../../types/get-maps-dto";

export interface Props {
  maps?: GetMapsDto[];
  isLoading?: boolean;
}

const AdminMapsTable: FC<Props> = ({ maps = [], isLoading = true }) => {
  const getTable = (): JSX.Element => {
    if (maps.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No maps to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"NAME"} </Th>
            <Th textAlign="left">{"SVG"}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {maps.map((map, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={4} paddingX={6} minWidth="260px">
                {map.name}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_MAPS_URL}/${map.key}.svg`}
                  isExternal
                >
                  {`${map.key}.svg`}
                </Link>
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 1300 }}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 10, sm: 10, md: 14 }}
      paddingX={3}
      width="100%"
    >
      <Card>
        <Flex
          direction="column"
          justifyContent="space-between"
          paddingTop={2}
          paddingBottom={{ base: 1, md: 3 }}
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={5}
            marginX={2}
          >
            <Heading fontSize="24px">{"Maps"}</Heading>
          </Flex>

          <Divider borderWidth={1} marginBottom={6} />

          <Box overflow="scroll" margin={2}>
            {isLoading ? <AdminFlagsTablePlaceholder /> : getTable()}
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AdminMapsTable;
