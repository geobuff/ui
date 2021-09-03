import React, { useEffect, useState, FC } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import axiosClient from "../../axios/axiosClient";
import UserProfileSummary from "../../components/UserProfileSummary";
import useCurrentUser from "../../hooks/UseCurrentUser";
import UserProfileSummaryPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";

const UserProfileSummaryContainer: FC = () => {
  const { user } = useCurrentUser();
  const stripe = useStripe();

  const [isLoading, setIsLoading] = useState(true);

  // Fix issue where user does not load in time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  });

  const handleClickManage = (): void => {
    const payload = {
      sessionId: user.stripeSessionId,
    };

    axiosClient.post("/subscription/manage", payload).then((response) => {
      window.location.href = response.data.url;
    });
  };

  const handleClickUpgrade = (): void => {
    const payload = {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    };

    axiosClient
      .post("/subscription/create-checkout-session", payload)
      .then((response) => {
        stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      });
  };

  if (isLoading) {
    return <UserProfileSummaryPlaceholder />;
  }

  return (
    <UserProfileSummary
      onClickUpgrade={handleClickUpgrade}
      onClickManage={handleClickManage}
      {...user}
    />
  );
};

export default UserProfileSummaryContainer;
