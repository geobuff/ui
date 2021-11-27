import React, { createContext, useState, FC } from "react";
import axiosClient from "../../axios";
import { CartItem } from "../../types/cart-item";
import { Discount } from "../../types/discount";

export const ShoppingCartContext = createContext({
  cart: [],
  isLoading: false,
  addToCart: (item: CartItem): void => {},
  updateQuantity: (id: number, size: string, value: number): void => {},
  removeItem: (id: number, size: string): void => {},
  getItemCount: (): number => 0,
  getTotal: (): number => 0,
  discountAmount: 0,
  discountCode: "",
  checkingDiscount: false,
  discountSuccess: "",
  discountError: "",
  applyDiscount: (code: string, merchIds: number[]): void => {},
});

export const ShoppingCartContextProvider: FC = ({ children = null }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [discountCode, setDiscountCode] = useState(
    typeof window === "undefined"
      ? ""
      : window.localStorage.getItem("geobuff.discountCode")
  );

  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [discountError, setDiscountError] = useState("");

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const cartString = window.localStorage.getItem("geobuff.cart");
    return cartString ? JSON.parse(cartString) : [];
  });

  const updateCartLocalStorage = (cart: CartItem[]): void => {
    window.localStorage.setItem("geobuff.cart", JSON.stringify(cart));
  };

  const updateDiscountLocalStorage = (code: string): void => {
    window.localStorage.setItem("geobuff.discountCode", code);
  };

  const removeDiscountLocalStorage = (): void => {
    window.localStorage.removeItem("geobuff.discountCode");
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
      updateCartLocalStorage(cart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
      updateCartLocalStorage(cart);
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
    updateCartLocalStorage(items);
    setIsLoading(false);
  };

  const removeItem = (id: number, size: string): void => {
    setIsLoading(true);
    const item = cart.find((x) => x.id === id && x.size === size);
    const index = cart.indexOf(item);
    const items = [...cart];
    items.splice(index, 1);
    setCart(items);
    updateCartLocalStorage(items);
    setIsLoading(false);
  };

  const getItemCount = (): number =>
    cart.map((x) => x.quantity).reduce((prev, curr) => (prev += curr));

  const getTotal = (): number =>
    cart.reduce((prev, curr) => (prev += curr.quantity * curr.price), 0);

  const applyDiscount = (code: string, merchIds: number[]): void => {
    setCheckingDiscount(true);
    setDiscountError("");

    axiosClient
      .get(`/discounts/${code}`)
      .then((response) => {
        if (response.status === 204) {
          setDiscountError("Invalid discount code. Please try again.");
          removeDiscountLocalStorage();
        } else {
          const discount: Discount = response.data;
          if (
            discount.merchId.Valid &&
            merchIds.find((x) => x === discount.merchId.Int64) === undefined
          ) {
            setDiscountError(
              "Discount code does not apply to any of the items in this cart. Please try again."
            );
            removeDiscountLocalStorage();
          } else {
            setDiscountAmount(discount.amount);
            setDiscountCode(discount.code);
            updateDiscountLocalStorage(discount.code);
            setDiscountSuccess(
              `Successfully applied discount code ${discount.code}.`
            );
          }
        }
      })
      .catch(() => {
        setDiscountError("Error applying discount code. Please try again.");
        removeDiscountLocalStorage();
      })
      .finally(() => setCheckingDiscount(false));
  };

  const [discountAmount, setDiscountAmount] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const code = window.localStorage.getItem("geobuff.discountCode");
    if (!code) return 0;
    applyDiscount(
      code,
      cart.map((x) => x.id)
    );
  });

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
        discountAmount,
        discountCode,
        checkingDiscount,
        discountSuccess,
        discountError,
        applyDiscount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
