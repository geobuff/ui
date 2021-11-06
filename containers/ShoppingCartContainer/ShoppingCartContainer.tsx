import React, { FC, useContext } from "react";
import ShoppingCart from "../../components/ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const ShoppingCartContainer: FC = () => {
  const { cart } = useContext(ShoppingCartContext);

  return <ShoppingCart cart={cart} />;
};

export default ShoppingCartContainer;
