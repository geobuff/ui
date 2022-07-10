import { useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import CheckoutForm from "../../components/CheckoutForm";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import useShippingOptions from "../../hooks/UseShippingOptions";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";
import { AuthUser } from "../../types/auth-user";
import { CheckoutFormSubmit } from "../../types/checkout-form-submit";
import { CheckoutPayload } from "../../types/checkout-payload";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutFormContainer: FC = () => {
  const { data: session, status } = useSession();
  const isUserLoading = status === "loading";
  const user = session?.user as AuthUser;

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
    <Elements stripe={stripePromise}>
      <CheckoutForm
        shippingOptions={shippingOptions}
        email={user?.email}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Elements>
  );
};

export default CheckoutFormContainer;
