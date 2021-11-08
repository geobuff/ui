import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { MerchItem } from "../../types/merch-item";
import ShoppingCartItem from "../ShoppingCartItem";

export interface Props {
  cart?: MerchItem[];
}

const ShoppingCart: FC<Props> = ({ cart = [] }) => (
  <Flex background="white" width="100%" justifyContent="center" padding={12}>
    <Flex direction="column">
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
        <>
          {cart.map((item) => (
            <ShoppingCartItem
              key={item.id}
              imageUrl={item.images.find((x) => x.isPrimary).imageUrl}
              name={item.name}
              price={item.price.Float64}
            />
          ))}
          <Button mt={12}>Checkout</Button>
        </>
      )}
    </Flex>
  </Flex>
);
export default ShoppingCart;
