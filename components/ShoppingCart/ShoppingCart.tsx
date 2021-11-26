import React, { FC, useState } from "react";

import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Button,
  Alert,
  AlertIcon,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";

import { CartItem } from "../../types/cart-item";
import Card from "../Card";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";
import ShoppingCartItem from "./ShoppingCartItem";

export interface Props {
  cart?: CartItem[];
  onUpdateQuantity?: (id: number, size: string, value: number) => void;
  onRemoveItem?: (id: number, size: string) => void;
  onGetTotal?: () => number;
  shippingPrice?: number;
}

const ShoppingCart: FC<Props> = ({
  cart = [],
  onUpdateQuantity = (id: number, size: string, value: number): void => {},
  onRemoveItem = (id: number, size: string): void => {},
  onGetTotal = (): number => 0,
  shippingPrice = 5,
}) => {
  const router = useRouter();

  const [discount, setDiscount] = useState(0);
  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState(false);
  const [discountError, setDiscountError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const applyDiscount = (): void => {
    setCheckingDiscount(true);
    setDiscountSuccess(false);
    setDiscountError(false);
    if (inputValue === "NOSHIP420") {
      setTimeout(() => {
        setDiscount(5);
        setCheckingDiscount(false);
        setDiscountSuccess(true);
        setInputValue("");
      }, 2000);
    } else {
      setTimeout(() => {
        setCheckingDiscount(false);
        setDiscountError(true);
        setInputValue("");
      }, 2000);
    }
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
        <Box overflow="auto">
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
                  <ShoppingCartItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    size={item.size}
                    price={item.price}
                    quantity={item.quantity}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {cart.length === 0 ? (
          <Alert status="info" borderRadius={6} mt={6}>
            <AlertIcon />
            {"Your cart is empty."}
          </Alert>
        ) : (
          <Flex justifyContent={{ base: "center", md: "flex-end" }} my={6}>
            <Flex
              width={{ base: "100%", md: "50%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl marginY={6} mr={{ base: 0, md: 6 }}>
                <FormLabel htmlFor="discount">{"Discount code"}</FormLabel>
                <Input
                  placeholder="Enter code..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  size="lg"
                  fontSize="16px"
                  background="#F6F6F6"
                  borderRadius={6}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ background: "#e0e0e0" }}
                  disabled={discountSuccess}
                />
                {discountError && (
                  <Box position="absolute" top="83px" left="2px">
                    <Text fontSize="11px" color="red.500">
                      Invalid discount code. Please try again.
                    </Text>
                  </Box>
                )}
                {discountSuccess && (
                  <Box position="absolute" top="83px" left="2px">
                    <Text fontSize="11px" color="green.500">
                      Successfully applied discount code.
                    </Text>
                  </Box>
                )}
              </FormControl>
              <Flex
                direction="column"
                justifyContent="center"
                px={{ base: 0, md: 6 }}
                mt={{ base: 3, md: 0 }}
              >
                <Button
                  isLoading={checkingDiscount}
                  onClick={applyDiscount}
                  disabled={discountSuccess}
                >
                  Apply
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Card>
      {cart.length > 0 && (
        <Flex
          justifyContent={{ base: "center", md: "flex-end" }}
          paddingX={6}
          mt={12}
        >
          <Flex direction="column" width={{ base: "100%", md: "25%" }}>
            <Stack mb={12}>
              <Flex justifyContent="space-between">
                <Text>Subtotal:</Text>
                <Text>{`$${onGetTotal()}`}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Shipping:</Text>
                <Text>{`$${shippingPrice}`}</Text>
              </Flex>
              {discount > 0 && (
                <Flex justifyContent="space-between">
                  <Text>Discount:</Text>
                  <Text>{`-$${discount}`}</Text>
                </Flex>
              )}
              <Flex justifyContent="space-between" fontWeight="bold">
                <Text>Total:</Text>
                <Text>{`$${
                  Math.round((onGetTotal() + shippingPrice - discount) * 100) /
                  100
                }`}</Text>
              </Flex>
            </Stack>
            <Button colorScheme="teal">Proceed To Checkout</Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ShoppingCart;
