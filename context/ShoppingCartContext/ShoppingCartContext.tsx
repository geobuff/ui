import React, { createContext, useState, FC, useEffect } from "react";
import axiosClient from "../../axios";
import { toTwoDecimalPlaces } from "../../helpers/number";
import { CartItem } from "../../types/cart-item";
import { CheckoutItem } from "../../types/checkout-payload";
import { Discount } from "../../types/discount";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";

export const ShoppingCartContext = createContext({
  cart: [],
  isLoading: false,
  addToCart: (item: CartItem): void => {},
  updateQuantity: (id: number, sizeId: number, value: number): void => {},
  removeItem: (id: number, sizeId: number): void => {},
  clearCart: (): void => {},
  getItemCount: (): number => 0,
  getItemQuantity: (merchId: number): number => 0,
  getTotal: (): number => 0,
  discountId: 0,
  discountAmount: 0,
  discountCode: "",
  checkingDiscount: false,
  discountSuccess: "",
  discountError: "",
  applyDiscount: (code: string, merchIds: number[]): void => {},
  toLineItems: (): CheckoutItem[] => {
    return null;
  },
});

export const ShoppingCartContextProvider: FC = ({ children = null }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("geobuff.cart", []);
  const [isLoading, setIsLoading] = useState(true);

  const [discountId, setDiscountId] = useState(0);
  const [discountCode, setDiscountCode] = useLocalStorage(
    "geobuff.discountCode"
  );
  const [discountAmount, setDiscountAmount] = useState(0);

  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    axiosClient
      .post(`/merch/exists`, cart)
      .then((response) => {
        if (response.data) {
          setCart(cart);

          if (discountCode) {
            applyDiscount(
              discountCode,
              cart.map((x) => x.id)
            );
          }
        } else {
          deleteFromStorage("geobuff.cart");
        }
      })
      .catch(() => deleteFromStorage("geobuff.cart"))
      .finally(() => setIsLoading(false));
  }, []);

  const addToCart = (item: CartItem): void => {
    setIsLoading(true);
    const match = cart.find(
      (x) => x.id === item.id && x.sizeId === item.sizeId
    );

    if (match === undefined) {
      item.quantity = 1;
      setCart([...cart, item]);
    } else {
      const items = [...cart];
      const index = cart.indexOf(match);
      const item = { ...items[index] };
      item.quantity++;
      items[index] = item;
      setCart(items);
    }

    setIsLoading(false);
  };

  const updateQuantity = (id: number, sizeId: number, value: number): void => {
    setIsLoading(true);
    const item = cart.find((x) => x.id === id && x.sizeId === sizeId);
    const index = cart.indexOf(item);
    const items = [...cart];
    items[index].quantity = value;
    setCart(items);
    setIsLoading(false);
  };

  const removeItem = (id: number, sizeId: number): void => {
    setIsLoading(true);
    const item = cart.find((x) => x.id === id && x.sizeId === sizeId);
    const index = cart.indexOf(item);
    const items = [...cart];
    items.splice(index, 1);
    setCart(items);
    setIsLoading(false);
  };

  const clearCart = (): void => {
    setIsLoading(true);
    setCart([]);
    deleteFromStorage("geobuff.discountCode");
    setIsLoading(false);
  };

  const getItemCount = (): number => {
    console.log(cart, "getItemCount");
    if (!cart || cart.length) {
      return 0;
    }
    cart?.map((x) => x.quantity)?.reduce((prev, curr) => (prev += curr), 0);
  };

  const getItemQuantity = (merchId: number): number => {
    const items = cart.filter((x) => x.id === merchId);
    if (items.length === 0) return 0;
    return items.map((x) => x.quantity).reduce((prev, curr) => (prev += curr));
  };

  const getTotal = (): number => {
    const result = cart.reduce(
      (prev, curr) => (prev += curr.quantity * curr.price),
      0
    );
    return toTwoDecimalPlaces(result);
  };

  const applyDiscount = (code: string, merchIds: number[]): void => {
    setCheckingDiscount(true);
    setDiscountError("");

    axiosClient
      .get(`/discounts/${code}`)
      .then((response) => {
        if (response.status === 204) {
          setDiscountError("Invalid discount code. Please try again.");
          deleteFromStorage("geobuff.discountCode");
        } else {
          const discount: Discount = response.data;
          if (
            discount.merchId.Valid &&
            merchIds.find((x) => x === discount.merchId.Int64) === undefined
          ) {
            setDiscountError(
              "Discount code does not apply to any of the items in this cart. Please try again."
            );
            deleteFromStorage("geobuff.discountCode");
          } else {
            setDiscountId(discount.id);
            setDiscountAmount(discount.amount);
            setDiscountCode(discount.code);
            setDiscountSuccess(
              `Successfully applied discount code ${discount.code}.`
            );
          }
        }
      })
      .catch(() => {
        setDiscountError("Error applying discount code. Please try again.");
        deleteFromStorage("geobuff.discountCode");
      })
      .finally(() => setCheckingDiscount(false));
  };

  const toLineItems = (): CheckoutItem[] => {
    return cart.map((x) => {
      return {
        id: x.id,
        sizeId: x.sizeId,
        sizeName: x.sizeName,
        quantity: x.quantity,
      };
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getItemCount,
        getItemQuantity,
        getTotal,
        discountId,
        discountAmount,
        discountCode,
        checkingDiscount,
        discountSuccess,
        discountError,
        applyDiscount,
        toLineItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
