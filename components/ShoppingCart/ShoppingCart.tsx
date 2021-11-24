import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Button,
  Alert,
  AlertIcon,
  Box,
  Stack,
} from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { CartItem } from "../../types/cart-item";
import TableCell from "../TableCell";
import Image from "../Image";
import Card from "../Card";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";

export interface Props {
  cart?: CartItem[];
  updateQuantity?: (id: number, size: string, value: number) => void;
  removeItem?: (id: number, size: string) => void;
  getTotal?: () => number;
  shipping?: number;
}

const ShoppingCart: FC<Props> = ({
  cart = [],
  updateQuantity = (id: number, size: string, value: number): void => {},
  removeItem = (id: number, size: string): void => {},
  getTotal = (): number => 0,
  shipping = 5,
}) => {
  const router = useRouter();

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
      <Flex mb={3}>
        <Button
          alignItems="center"
          backgroundColor="transparent"
          marginTop={2}
          marginLeft={2}
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => router.push("/merch")}
        >
          <ArrowLeft height={5} width={5} marginRight={1} />
          <Text fontWeight="bold" fontSize="14px">
            {"Continue Shopping"}
          </Text>
        </Button>
      </Flex>
      <Card>
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"ITEM DETAILS"} </Th>
              <Th textAlign="right">{"PRICE"}</Th>
              <Th textAlign="right">{"QUANTITY"}</Th>
              <Th textAlign="right">{"TOTAL"}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item, i) => (
              <Tr key={i} fontWeight={600}>
                <TableCell paddingY={3} paddingX={6} minWidth="400px">
                  <Flex>
                    <Image
                      src={item.imageUrl}
                      width="150px"
                      height="150px"
                      borderRadius="12px"
                      mr={6}
                    />
                    <Flex direction="column" justifyContent="center">
                      <Text>{`${item.name} - ${item.size}`}</Text>
                    </Flex>
                  </Flex>
                </TableCell>
                <TableCell isNumeric paddingY={3} paddingX={6}>
                  {`$${item.price}`}
                </TableCell>
                <TableCell paddingY={3} paddingX={6}>
                  <Flex justifyContent="right">
                    <NumberInput
                      value={item.quantity}
                      min={1}
                      max={5}
                      onChange={(value: string): void =>
                        updateQuantity(item.id, item.size, parseInt(value))
                      }
                      maxWidth="75px"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </TableCell>
                <TableCell isNumeric paddingY={3} paddingX={6}>
                  {`$${item.price * item.quantity}`}
                </TableCell>
                <TableCell>
                  <Flex justifyContent="center">
                    <Button
                      colorScheme="red"
                      onClick={(): void => removeItem(item.id, item.size)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </TableCell>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {cart.length === 0 && (
          <Alert status="info" borderRadius={6} mt={6}>
            <AlertIcon />
            {"Your cart is empty."}
          </Alert>
        )}
      </Card>
      {cart.length > 0 && (
        <Flex justifyContent="flex-end" paddingX={6} mt={12}>
          <Flex direction="column" width="25%">
            <Stack mb={12}>
              <Flex justifyContent="space-between">
                <Text>Subtotal:</Text>
                <Text>{`$${getTotal()}`}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Shipping:</Text>
                <Text>{`$${shipping}`}</Text>
              </Flex>
              <Flex justifyContent="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>{`$${
                  Math.round((getTotal() + shipping) * 100) / 100
                }`}</Text>
              </Flex>
            </Stack>
            <Button>Proceed To Checkout</Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ShoppingCart;
