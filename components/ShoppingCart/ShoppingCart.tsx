import React, { FC, useContext } from "react";

import { ArrowLeft } from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { CartItem } from "../../types/cart-item";
import Card from "../Card";
import DiscountFooter from "./DiscountFooter";
import PriceSummary from "./PriceSummary";
import ShoppingCartItem from "./ShoppingCartItem";

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
  const { t } = useContext(LanguageContext);

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
            {t.shoppingCart.continueShopping}
          </Text>
        </Button>
      </Flex>
      <Card>
        <Box overflow="auto">
          <Table size="md" variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th textAlign="left">{t.global.details.toUpperCase()} </Th>
                <Th textAlign="right">{t.global.price.toUpperCase()}</Th>
                <Th textAlign="right">{t.global.quantity.toUpperCase()}</Th>
                <Th textAlign="right">{t.global.total.toUpperCase()}</Th>
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
            {t.shoppingCart.emptyAlert}
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
