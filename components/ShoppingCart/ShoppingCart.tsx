import React, { FC } from "react";

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
  Box,
} from "@chakra-ui/react";

import { CartItem } from "../../types/cart-item";
import Card from "../Card";
import ArrowLeft from "../../Icons/ArrowLeft";
import { useRouter } from "next/router";
import ShoppingCartItem from "./ShoppingCartItem";
import DiscountFooter from "./DiscountFooter";
import PriceSummary from "./PriceSummary";

export interface Props {
  cart?: CartItem[];
  onUpdateQuantity?: (id: number, size: string, value: number) => void;
  onRemoveItem?: (id: number, size: string) => void;
  onGetTotal?: () => number;
  discountAmount?: number;
  checkingDiscount?: boolean;
  discountSuccess?: string;
  discountError?: string;
  applyDiscount?: (code: string, merchIds: number[]) => void;
}

const ShoppingCart: FC<Props> = ({
  cart = [],
  onUpdateQuantity = (id: number, size: string, value: number): void => {},
  onRemoveItem = (id: number, size: string): void => {},
  onGetTotal = (): number => 0,
  discountAmount = 0,
  checkingDiscount = false,
  discountSuccess = "",
  discountError = "",
  applyDiscount = (code: string, merchIds: number[]): void => {},
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
          <DiscountFooter
            merchIds={cart.map((x) => x.id)}
            checkingDiscount={checkingDiscount}
            discountSuccess={discountSuccess}
            discountError={discountError}
            applyDiscount={applyDiscount}
          />
        )}
      </Card>
      {cart.length > 0 && (
        <PriceSummary discount={discountAmount} onGetTotal={onGetTotal} />
      )}
    </Flex>
  );
};

export default ShoppingCart;
