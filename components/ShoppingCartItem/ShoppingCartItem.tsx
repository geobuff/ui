import React, { FC } from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from "@chakra-ui/react";
import Image from "../Image";

export interface Props {
  id?: number;
  imageUrl?: string;
  name?: string;
  size?: string;
  price?: number;
  quantity?: number;
  updateQuantity?: (id: number, size: string, value: number) => void;
  removeItem?: (id: number, size: string) => void;
  [x: string]: any;
}

const ShoppingCartItem: FC<Props> = ({
  id = 0,
  imageUrl = "",
  name = "",
  size = "",
  price = 0.0,
  quantity = 1,
  updateQuantity = (id: number, size: string, value: number): void => {},
  removeItem = (id: number, size: string): void => {},
  ...props
}) => (
  <Flex {...props} justifyContent="center">
    <Flex direction="column" justifyContent="center" mr={6}>
      <Image src={imageUrl} width="150px" height="150px" borderRadius="12px" />
    </Flex>
    <Flex direction="column">
      <Heading>{name}</Heading>
      <Text mt={1}>{size}</Text>
      <Text mt={1}>{`$${price}`}</Text>
      <Flex mt={3}>
        <NumberInput
          value={quantity}
          min={1}
          max={5}
          onChange={(value: string): void =>
            updateQuantity(id, size, parseInt(value))
          }
          maxWidth="75px"
          mr={6}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme="red" onClick={(): void => removeItem(id, size)}>
          Remove
        </Button>
      </Flex>
    </Flex>
  </Flex>
);

export default ShoppingCartItem;
