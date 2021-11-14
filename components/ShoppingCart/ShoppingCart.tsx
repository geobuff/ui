import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { CartItem } from "../../types/cart-item";
import ShoppingCartItem from "../ShoppingCartItem";

export interface Props {
  cart?: CartItem[];
  updateQuantity?: (id: number, size: string, value: number) => void;
  removeItem?: (id: number, size: string) => void;
}

const ShoppingCart: FC<Props> = ({
  cart = [],
  updateQuantity = (id: number, size: string, value: number): void => {},
  removeItem = (id: number, size: string): void => {},
}) => (
  <Flex background="white" width="100%" justifyContent="center" padding={12}>
    {cart.length === 0 ? (
      <Alert
        status="info"
        borderRadius={6}
        p={5}
        mt={5}
        width={{ base: "100%", md: "50%" }}
      >
        <AlertIcon />
        {"Your cart is empty."}
      </Alert>
    ) : (
      <Flex direction="column">
        {cart.map((item, i) => (
          <ShoppingCartItem
            key={i}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            size={item.size}
            quantity={item.quantity}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            mb={12}
          />
        ))}
        <Button mt={12}>Checkout</Button>
      </Flex>
    )}
  </Flex>
);

export default ShoppingCart;
