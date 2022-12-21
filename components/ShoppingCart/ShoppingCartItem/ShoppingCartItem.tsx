import React, { FC, useContext } from "react";

import { TableCell } from "@geobuff/buff-ui/components";

import {
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

import { LanguageContext } from "../../../contexts/LanguageContext";

import { toTwoDecimalPlaces } from "../../../helpers/number";

export interface Props {
  id?: number;
  imageUrl?: string;
  name?: string;
  sizeId?: number;
  sizeName?: string;
  price?: number;
  quantity?: number;
  route?: string;
  getMax?: (merchId: number, sizeId: number) => number;
  onUpdateQuantity?: (id: number, sizeId: number, value: number) => void;
  onRemoveItem?: (id: number, sizeId: number) => void;
}

const ShoppingCartItem: FC<Props> = ({
  id = 0,
  imageUrl = "",
  name = "",
  sizeId = 0,
  sizeName = "",
  price = 0,
  quantity = 0,
  route = "",
  getMax = (merchId: number, sizeId: number): number => 0,
  onUpdateQuantity = (id: number, sizeId: number, value: number): void => {},
  onRemoveItem = (id: number, sizeId: number): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <TableCell paddingY={3} paddingX={6} minWidth="400px">
        <Link href={`/merch/${route}`}>
          <Flex>
            <Image
              src={imageUrl}
              alt={name}
              width={150}
              height={100}
              style={{
                borderRadius: "12px",
              }}
              priority
            />
            <Flex direction="column" justifyContent="center" ml={6}>
              <Text>{`${name} - ${sizeName}`}</Text>
            </Flex>
          </Flex>
        </Link>
      </TableCell>
      <TableCell isNumeric paddingY={3} paddingX={6}>
        {`$${price}`}
      </TableCell>
      <TableCell paddingY={3} paddingX={6}>
        <Flex justifyContent="right">
          <NumberInput
            value={quantity}
            min={1}
            max={getMax(id, sizeId)}
            onChange={(value: string): void =>
              onUpdateQuantity(id, sizeId, parseInt(value))
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
        {`$${toTwoDecimalPlaces(price * quantity)}`}
      </TableCell>
      <TableCell>
        <Flex justifyContent="center">
          <Button
            colorScheme="red"
            onClick={(): void => onRemoveItem(id, sizeId)}
          >
            {t.global.remove}
          </Button>
        </Flex>
      </TableCell>
    </>
  );
};

export default ShoppingCartItem;
