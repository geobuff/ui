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
  getMax?: (merchId: number, sizeId: number) => number;
  onUpdateQuantity?: (id: number, sizeId: number, value: number) => void;
  onRemoveItem?: (id: number, sizeId: number) => void;
  onGetTotal?: () => number;
  discountAmount?: number;
  checkingDiscount?: boolean;
  discountSuccess?: string;
  discountError?: string;
  applyDiscount?: (code: string, merchIds: number[]) => void;
  clearDiscount?: () => void;
}

const ShoppingCart: FC<Props> = ({
  cart = [],
  getMax = (merchId: number, sizeId: number): number => 0,
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onGetTotal = (): number => 0,
  discountAmount = 0,
  checkingDiscount = false,
  discountSuccess = "",
  discountError = "",
  applyDiscount = () => {},
  clearDiscount = () => {},
}) => {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      maxWidth={1300}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 3, sm: 10, md: 14 }}
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
                    sizeId={item.sizeId}
                    sizeName={item.sizeName}
                    price={item.price}
                    quantity={item.quantity}
                    route={item.route}
                    getMax={getMax}
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
            clearDiscount={clearDiscount}
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
