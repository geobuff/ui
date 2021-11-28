import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import ArrowLeft from "../../Icons/ArrowLeft";
import Card from "../../components/Card";

export interface Props {
  noOfItems?: number;
}

const ShoppingCartPlaceholder: FC<Props> = ({ noOfItems = 1 }) => (
  <Flex
    direction="column"
    maxWidth={{ base: "100%", md: 1300 }}
    marginX="auto"
    marginBottom={14}
    marginTop={{ base: 10, sm: 10, md: 14 }}
    paddingX={3}
    width="100%"
  >
    <Flex mb={3}>
      <Skeleton>
        <Button alignItems="center" marginTop={2} marginLeft={2}>
          <ArrowLeft height={5} width={5} marginRight={1} />
          <Text fontWeight="bold" fontSize="14px">
            {"Continue Shopping"}
          </Text>
        </Button>
      </Skeleton>
    </Flex>
    <Card>
      <Box overflow="auto">
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">
                <Skeleton>{"ITEM DETAILS"}</Skeleton>
              </Th>
              <Th textAlign="right">
                <Skeleton>{"PRICE"}</Skeleton>
              </Th>
              <Th textAlign="right">
                <Skeleton>{"QUANTITY"}</Skeleton>
              </Th>
              <Th textAlign="right">
                <Skeleton>{"TOTAL"}</Skeleton>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(noOfItems)].map((_, i) => (
              <Tr key={i}>
                <Td>
                  <Skeleton minWidth="400px" height="150px" />
                </Td>
                <Td>
                  <Skeleton width="100%" height="50px" />
                </Td>
                <Td>
                  <Skeleton width="100%" height="50px" />
                </Td>
                <Td>
                  <Skeleton width="100%" height="50px" />
                </Td>
                <Td>
                  <Skeleton>
                    <Button>Remove</Button>
                  </Skeleton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent={{ base: "center", md: "flex-end" }} my={6}>
        <Flex
          width={{ base: "100%", md: "50%" }}
          direction={{ base: "column", md: "row" }}
        >
          <Skeleton height="75px" width="100%" />
        </Flex>
      </Flex>
    </Card>
    <Flex
      justifyContent={{ base: "center", md: "flex-end" }}
      paddingX={6}
      mt={12}
    >
      <Flex direction="column" width={{ base: "100%", md: "25%" }}>
        <Skeleton height="150px" width="100%" />
      </Flex>
    </Flex>
  </Flex>
);

export default ShoppingCartPlaceholder;
