import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useStripe } from "@stripe/react-stripe-js";

import UpdateUserFormModal from "../../components/UpdateUserFormModal";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UpdateUserFormContainer = ({ isOpen, onClose }) => {
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

  const handleClickManage = () => {
    const payload = {
      sessionId: user.stripeSessionId,
    };

    axiosClient.post("/subscription/manage", payload).then((response) => {
      window.location.href = response.data.url;
    });
  };

  const handleClickUpgrade = () => {
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

  return (
    <UpdateUserFormModal
      isOpen={isOpen}
      onClose={onClose}
      user={user}
      onSubmit={handleSubmit}
      onClickUpgrade={handleClickUpgrade}
      onClickManage={handleClickManage}
      error={error}
      isSubmitting={isSubmitting}
    />
  );
};

UpdateUserFormContainer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
UpdateUserFormContainer.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default UpdateUserFormContainer;
