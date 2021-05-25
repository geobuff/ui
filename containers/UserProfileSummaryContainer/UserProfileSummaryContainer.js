import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useStripe } from "@stripe/react-stripe-js";

import UserProfileSummary from "../../components/UserProfileSummary";
import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileSummaryContainer = () => {
  const toast = useToast();
  const stripe = useStripe();

  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();

  const [config, setConfig] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isUserLoading && user) {
      setConfig({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }, [isUserLoading, user]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    setError(null);

    const update = {
      username: values.username,
      email: values.email,
      countryCode: values.countryCode,
      xp: user.xp,
    };

    axiosClient
      .put(`/users/${user.id}`, update, config)
      .then((response) => {
        updateUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          countryCode: response.data.countryCode,
          xp: response.data.xp,
          isPremium: response.data.isPremium,
          token: user.token,
        });

        toast({
          position: "bottom-right",
          title: "User Updated",
          description: "Successfully updated user details.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const createCheckoutSession = () => {
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

  const manageSubscription = () => {
    const payload = {
      sessionId: user.stripeSessionId,
    };

    axiosClient.post("/subscription/manage", payload).then((response) => {
      window.location.href = response.data.url;
    });
  };

  return (
    <UserProfileSummary
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      createCheckoutSession={createCheckoutSession}
      manageSubscription={manageSubscription}
    />
  );
};

export default UserProfileSummaryContainer;
