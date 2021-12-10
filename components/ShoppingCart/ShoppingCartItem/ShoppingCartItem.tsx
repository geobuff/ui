import React, { FC } from "react";
import Link from "next/link";
import {
  Button,
  Flex,
  Link as ChakraLink,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

import Image from "../../Image";
import TableCell from "../../TableCell";

export interface Props {
  id?: number;
  imageUrl?: string;
  name?: string;
  sizeId?: number;
  sizeName?: string;
  price?: number;
  quantity?: number;
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
  onUpdateQuantity = (id: number, sizeId: number, value: number): void => {},
  onRemoveItem = (id: number, sizeId: number): void => {},
}) => (
  <>
    <TableCell paddingY={3} paddingX={6} minWidth="400px">
      <Link href={`/merch/${id}`}>
        <ChakraLink>
          <Flex>
            <Image
              src={imageUrl}
              width="150px"
              height="150px"
              borderRadius="12px"
              mr={6}
            />
            <Flex direction="column" justifyContent="center">
              <Text>{`${name} - ${sizeName}`}</Text>
            </Flex>
          </Flex>
        </ChakraLink>
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
          max={5}
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
      {`$${price * quantity}`}
    </TableCell>
    <TableCell>
      <Flex justifyContent="center">
        <Button
          colorScheme="red"
          onClick={(): void => onRemoveItem(id, sizeId)}
        >
          Remove
        </Button>
      </Flex>
    </TableCell>
  </>
);

export default ShoppingCartItem;
