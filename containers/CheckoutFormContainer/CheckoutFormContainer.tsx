import { useStripe } from "@stripe/react-stripe-js";
import React, { FC, useContext } from "react";
import axiosClient from "../../axios";
import CheckoutForm from "../../components/CheckoutForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { CheckoutPayload } from "../../types/checkout-payload";

const CheckoutFormContainer: FC = () => {
  const { user, isLoading } = useContext(CurrentUserContext);
  const { toLineItems } = useContext(ShoppingCartContext);
  const stripe = useStripe();

  const handleSubmit = (values: CheckoutFormSubmit): void => {
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

  if (isLoading) {
    return <CheckoutFormPlaceholder />;
  }

  return <CheckoutForm email={user?.email} onSubmit={handleSubmit} />;
};

export default CheckoutFormContainer;
