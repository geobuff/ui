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
  imageUrl?: string;
  name?: string;
  size?: string;
  price?: number;
  quantity?: number;
}

const ShoppingCartItem: FC<Props> = ({
  imageUrl = "",
  name = "",
  size = "",
  price = 0.0,
  quantity = 1,
}) => (
  <Flex>
    <Flex direction="column" justifyContent="center" mr={6}>
      <Image src={imageUrl} width="150px" height="150px" borderRadius="12px" />
    </Flex>
    <Flex direction="column">
      <Heading>{name}</Heading>
      <Text mt={1}>{size}</Text>
      <Text mt={1}>{`$${price}`}</Text>
      <Flex mt={3}>
        <NumberInput
          defaultValue={quantity}
          min={1}
          max={5}
          maxWidth="75px"
          mr={6}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme="red">Remove</Button>
      </Flex>
    </Flex>
  </Flex>
);

export default ShoppingCartItem;
