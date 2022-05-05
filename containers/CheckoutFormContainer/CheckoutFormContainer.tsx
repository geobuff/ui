import { useStripe } from "@stripe/react-stripe-js";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import CheckoutForm from "../../components/CheckoutForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import useShippingOptions from "../../hooks/UseShippingOptions";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { CheckoutPayload } from "../../types/checkout-payload";

const CheckoutFormContainer: FC = () => {
  const { user, isLoading: isUserLoading } = useContext(CurrentUserContext);
  const {
    toLineItems,
    discountId,
    clearCart,
    isLoading: isShoppingCartLoading,
  } = useContext(ShoppingCartContext);

  const {
    data: shippingOptions,
    isLoading: isShippingOptionsLoading,
  } = useShippingOptions();

  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();

  const handleSubmit = (values: CheckoutFormSubmit): void => {
    setIsLoading(true);

    const payload: CheckoutPayload = {
      items: toLineItems(),
      customer: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
      },
      shippingId: parseInt(values.shippingId),
      discountId: {
        Int64: discountId,
        Valid: discountId !== 0,
      },
    };

    axiosClient
      .post("/checkout/create-checkout-session", payload)
      .then((response) => {
        clearCart();
        stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      });
  };

  if (isUserLoading || isShippingOptionsLoading || isShoppingCartLoading) {
    return <CheckoutFormPlaceholder />;
  }

  return (
    <CheckoutForm
      shippingOptions={shippingOptions}
      email={user?.email}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default CheckoutFormContainer;
