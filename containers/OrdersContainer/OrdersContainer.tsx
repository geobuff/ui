import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import MyOrders from "../../components/MyOrders";

import axiosClient from "../../axios";
import MyOrdersPlaceholder from "../../placeholders/MyOrdersPlaceholder";
import { AuthUser } from "../../types/auth-user";
import { Order } from "../../types/order";

const OrdersContainer: FC = () => {
  const { data, status } = useSession();
  const session = data as any;
  const user = session?.user as AuthUser;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get(`/orders/user/${user?.email}`, session?.authConfig)
        .then((response) => {
          setOrders(response.data);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session, user]);

  if (isLoading) {
    return <MyOrdersPlaceholder />;
  }

  return <MyOrders orders={orders} isError={isError} />;
};

export default OrdersContainer;
