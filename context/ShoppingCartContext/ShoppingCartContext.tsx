import React, { createContext, useState, FC } from "react";
import { CartItem } from "../../types/cart-item";

export const ShoppingCartContext = createContext({
  cart: [],
  isLoading: false,
  addToCart: (item: CartItem): void => {},
  updateQuantity: (id: number, size: string, value: number): void => {},
  removeItem: (id: number, size: string): void => {},
  getItemCount: (): number => 0,
  getTotal: (): number => 0,
});

export const ShoppingCartContextProvider: FC = ({ children = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const cartString = window.localStorage.getItem("geobuff.cart");
    return cartString ? JSON.parse(cartString) : [];
  });

  const updateLocalStorage = (cart: CartItem[]): void => {
    window.localStorage.setItem("geobuff.cart", JSON.stringify(cart));
  };

  const addToCart = (item: CartItem): void => {
    setIsLoading(true);
    const match = cart.find((x) => x.id === item.id && x.size === item.size);
    if (match !== undefined) {
      const items = [...cart];
      const index = cart.indexOf(match);
      const item = { ...items[index] };
      item.quantity++;
      items[index] = item;
      setCart(items);
      updateLocalStorage(cart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      updateLocalStorage(cart);
    }
    setIsLoading(false);
  };

  const updateQuantity = (id: number, size: string, value: number): void => {
    setIsLoading(true);
    const item = cart.find((x) => x.id === id && x.size === size);
    const index = cart.indexOf(item);
    const items = [...cart];
    items[index].quantity = value;
    setCart(items);
    updateLocalStorage(items);
    setIsLoading(false);
  };

  const removeItem = (id: number, size: string): void => {
    setIsLoading(true);
    const item = cart.find((x) => x.id === id && x.size === size);
    const index = cart.indexOf(item);
    const items = [...cart];
    items.splice(index, 1);
    setCart(items);
    updateLocalStorage(items);
    setIsLoading(false);
  };

  const getItemCount = (): number =>
    cart.map((x) => x.quantity).reduce((prev, curr) => (prev += curr));

  const getTotal = (): number =>
    cart.reduce((prev, curr) => (prev += curr.quantity * curr.price), 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
