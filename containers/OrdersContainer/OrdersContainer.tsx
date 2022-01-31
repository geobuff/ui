import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import MyOrders from "../../components/MyOrders";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import MyOrdersPlaceholder from "../../placeholders/MyOrdersPlaceholder";
import { Order } from "../../types/order";

interface Props {
  email: string;
}

const OrdersContainer: FC<Props> = ({ email }) => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/orders/user/${email}`, getAuthConfig())
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <MyOrdersPlaceholder />;
  }

  return <MyOrders orders={orders} isError={isError} />;
};

export default OrdersContainer;
