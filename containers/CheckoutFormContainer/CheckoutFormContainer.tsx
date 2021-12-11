import { useStripe } from "@stripe/react-stripe-js";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import CheckoutForm from "../../components/CheckoutForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { CheckoutPayload } from "../../types/checkout-payload";

const CheckoutFormContainer: FC = () => {
  const { user, isLoading: isUserLoading } = useContext(CurrentUserContext);
  const { toLineItems } = useContext(ShoppingCartContext);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();

  const handleSubmit = (values: CheckoutFormSubmit): void => {
    setIsLoading(true);
    const payload: CheckoutPayload = {
      items: toLineItems(),
      customer: values,
    };

    axiosClient
      .post("/checkout/create-checkout-session", payload)
      .then((response) => {
        stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      });
  };

  if (isUserLoading) {
    return <CheckoutFormPlaceholder />;
  }

  return (
    <CheckoutForm
      email={user?.email}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default CheckoutFormContainer;
