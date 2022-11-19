import React, { FC, useContext, useState } from "react";

import { useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import useShippingOptions from "../../hooks/UseShippingOptions";

import CheckoutForm from "../../components/CheckoutForm";

import axiosClient from "../../axios";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";
import { AuthUser } from "../../types/auth-user";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { CheckoutPayload } from "../../types/checkout-payload";

interface Props {
  isMapsApiLoading?: boolean;
}

const CheckoutFormContainer: FC<Props> = ({ isMapsApiLoading = true }) => {
  const { data: session, status } = useSession();
  const isUserLoading = status === "loading";
  const user = session?.user as AuthUser;

  const {
    toLineItems,
    discountId,
    clearCart,
    isLoading: isShoppingCartLoading,
  } = useContext(ShoppingCartContext);

  const { data: shippingOptions, isLoading: isShippingOptionsLoading } =
    useShippingOptions();

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
      isMapsApiLoading={isMapsApiLoading}
      onSubmit={handleSubmit}
    />
  );
};

export default CheckoutFormContainer;
