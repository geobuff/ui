import React, { FC, useContext } from "react";
import CheckoutForm from "../../components/CheckoutForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import CheckoutFormPlaceholder from "../../placeholders/CheckoutFormPlaceholder";

const CheckoutFormContainer: FC = () => {
  const { user, isLoading } = useContext(CurrentUserContext);

  if (isLoading) {
    return <CheckoutFormPlaceholder />;
  }

  return <CheckoutForm email={user?.email} />;
};

export default CheckoutFormContainer;
