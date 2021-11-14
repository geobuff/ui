import React, { FC, useContext } from "react";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const ShoppingCartContainer: FC = () => {
  const { cart, updateQuantity, removeItem } = useContext(ShoppingCartContext);

  return (
    <ShoppingCart
      cart={cart}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
    />
  );
};

export default ShoppingCartContainer;
