import React, { FC, useContext } from "react";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import ShoppingCartPlaceholder from "../../placeholders/ShoppingCartPlaceholder";

const ShoppingCartContainer: FC = () => {
  const { cart, isLoading, updateQuantity, removeItem, getTotal } = useContext(
    ShoppingCartContext
  );

  if (isLoading) {
    return <ShoppingCartPlaceholder />;
  }

  return (
    <ShoppingCart
      cart={cart}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
      getTotal={getTotal}
    />
  );
};

export default ShoppingCartContainer;
