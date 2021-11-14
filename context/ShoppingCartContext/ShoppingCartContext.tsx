import React, { createContext, useState, FC } from "react";
import { CartItem } from "../../types/cart-item";

export const ShoppingCartContext = createContext({
  cart: null,
  addToCart: (item: CartItem): void => {},
  updateQuantity: (id: number, size: string, value: number): void => {},
  removeItem: (id: number, size: string): void => {},
});

export const ShoppingCartContextProvider: FC = ({ children = null }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem): void => {
    const match = cart.find((x) => x.id === item.id && x.size === item.size);
    if (match !== undefined) {
      const items = [...cart];
      const index = cart.indexOf(match);
      const item = { ...items[index] };
      item.quantity++;
      items[index] = item;
      setCart(items);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const updateQuantity = (id: number, size: string, value: number): void => {
    const item = cart.find((x) => x.id === id && x.size === size);
    const index = cart.indexOf(item);
    const items = [...cart];
    items[index].quantity = value;
    setCart(items);
  };

  const removeItem = (id: number, size: string): void => {
    const item = cart.find((x) => x.id === id && x.size === size);
    const index = cart.indexOf(item);
    const items = [...cart];
    items.splice(index, 1);
    setCart(items);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
