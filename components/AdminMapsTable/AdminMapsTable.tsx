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
  Divider,
  Link,
} from "@chakra-ui/react";

import TableCell from "../TableCell";
import AdminFlagsTablePlaceholder from "../../placeholders/AdminFlagsTablePlaceholder";
import Card from "../Card";
import { GetMapsDto } from "../../types/get-maps-dto";
import AdminMapsHeader from "./AdminMapsHeader/AdminMapsHeader";

export interface Props {
  maps?: GetMapsDto[];
  isLoading?: boolean;
  onUpload?: (event: any) => void;
}

const AdminMapsTable: FC<Props> = ({
  maps = [],
  isLoading = true,
  onUpload = () => {},
}) => {
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
          {maps.map((entry) => (
            <Tr key={entry.key} fontWeight={600}>
              <TableCell paddingY={4} paddingX={6} minWidth="260px">
                {entry.name}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_MAPS_URL}/${entry.key}.svg`}
                  isExternal
                >
                  {`${entry.key}.svg`}
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
      marginTop={6}
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
          <AdminMapsHeader onUpload={onUpload} />

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
