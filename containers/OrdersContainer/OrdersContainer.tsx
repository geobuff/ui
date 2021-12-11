import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import MyOrders from "../../components/MyOrders";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Order } from "../../types/order";

interface Props {
  email: string;
}

const OrdersContainer: FC<Props> = ({ email }) => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(`/orders/${email}`, getAuthConfig()).then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <MyOrders orders={orders} />;
};

export default OrdersContainer;
