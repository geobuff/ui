import React, { FC, useContext } from "react";
import MyOrders from "../../components/MyOrders";
import useOrders from "../../hooks/UseOrders";

interface Props {
  email: string;
}

const OrdersContainer: FC<Props> = ({ email }) => {
  const { orders, isLoading } = useOrders(email);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <MyOrders orders={orders} />;
};

export default OrdersContainer;
