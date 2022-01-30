import React, { FC, useContext, useEffect, useState } from "react";
import { Order } from "../../types/order";
import axiosClient from "../../axios";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import AdminOrdersTable from "../../components/AdminOrdersTable";
import { OrderStatuses } from "../../types/order-statuses";

const AdminOrdersContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [orders, setOrders] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProgressToShipped = (orderId: number): void => {
    setIsSubmitting(true);
    const payload = { statusId: OrderStatuses.SHIPPED };

    axiosClient
      .put(`/orders/status/${orderId}`, payload, getAuthConfig())
      .then(() => {
        const order = orders.find((x) => x.id === orderId);
        const index = orders.indexOf(order);
        const updated = orders.splice(index, 1);
        setOrders(updated);
      })
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    axiosClient
      .get(`/orders/${OrderStatuses.PAYMENT_RECEIVED}`, getAuthConfig())
      .then((response) => {
        setOrders(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return null;
  }

  return (
    <AdminOrdersTable
      orders={orders}
      isSubmitting={isSubmitting}
      onProgressToShipped={handleProgressToShipped}
    />
  );
};

export default AdminOrdersContainer;
