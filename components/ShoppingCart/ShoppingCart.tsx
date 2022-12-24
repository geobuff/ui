import React, { FC, useContext } from "react";

import {
  ArrowLeft,
  Card,
  Table,
  TableCellEntry,
} from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import { toTwoDecimalPlaces } from "../../helpers/number";
import { CartItem } from "../../types/cart-item";
import DiscountFooter from "./DiscountFooter";
import PriceSummary from "./PriceSummary";

export interface Props {
  isLoading?: boolean;
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
  isLoading = false,
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

  const getRows = (): TableCellEntry[][] => {
    return cart.map((item) => [
      {
        node: (
          <Link href={`/merch/${item.route}`}>
            <Flex>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={150}
                height={100}
                style={{
                  borderRadius: "12px",
                }}
                priority
              />
              <Flex direction="column" justifyContent="center" ml={6}>
                <Text>{`${item.name} - ${item.sizeName}`}</Text>
              </Flex>
            </Flex>
          </Link>
        ),
        minWidth: "400px",
      },
      {
        node: `$${item.price}`,
        isNumeric: true,
      },
      {
        node: (
          <Flex justifyContent="right">
            <NumberInput
              value={item.quantity}
              min={1}
              max={getMax(item.id, item.sizeId)}
              onChange={(value: string): void =>
                onUpdateQuantity(item.id, item.sizeId, parseInt(value))
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
        ),
      },
      {
        node: `$${toTwoDecimalPlaces(item.price * item.quantity)}`,
        isNumeric: true,
      },
      {
        node: (
          <Flex justifyContent="center">
            <Button
              colorScheme="red"
              onClick={(): void => onRemoveItem(item.id, item.sizeId)}
            >
              {t.global.remove}
            </Button>
          </Flex>
        ),
      },
    ]);
  };

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
          <Table
            isLoading={isLoading}
            columnCount={4}
            headers={[
              { node: t.global.details.toUpperCase() },
              { node: t.global.price.toUpperCase(), align: "right" },
              { node: t.global.quantity.toUpperCase(), align: "right" },
              { node: t.global.total.toUpperCase(), align: "right" },
            ]}
            rows={getRows()}
            noEntriesMessage={t.global.noEntriesAlert}
          />
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
