import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axiosClient from "../../axios";
import MyOrders from "../../components/MyOrders";
import MyOrdersPlaceholder from "../../placeholders/MyOrdersPlaceholder";
import { AuthUser } from "../../types/auth-user";
import { Order } from "../../types/order";

const OrdersContainer: FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get(`/orders/user/${user?.email}`, user?.authConfig)
        .then((response) => {
          setOrders(response.data);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <MyOrdersPlaceholder />;
  }

  return <MyOrders orders={orders} isError={isError} />;
};

export default OrdersContainer;
