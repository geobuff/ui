import React, { createContext, useState, FC } from "react";
import { MerchItem } from "../../types/merch-item";

export const ShoppingCartContext = createContext({
  cart: null,
  addToCart: (item: MerchItem): void => {},
});

export const ShoppingCartContextProvider: FC = ({ children = null }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item: MerchItem): void => {
    setCart([...cart, item]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
