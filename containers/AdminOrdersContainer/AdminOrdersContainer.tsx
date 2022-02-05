import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import AdminOrdersTable from "../../components/AdminOrdersTable";
import { OrderStatuses } from "../../types/order-statuses";
import { OrderPageDto } from "../../types/order-page-dto";
import { OrdersFilterDto } from "../../types/orders-filter-dto";

const AdminOrdersContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [orderPage, setOrderPage] = useState<OrderPageDto>();
  const [page, setPage] = useState(0);
  const [statusId, setStatusId] = useState(OrderStatuses.PENDING);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const payload: OrdersFilterDto = {
      statusId,
      page,
      limit: 10,
    };

    axiosClient
      .post(`/orders`, payload, getAuthConfig())
      .then((response) => {
        setOrderPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [page, statusId]);

  const handleProgressToShipped = (orderId: number): void => {
    setIsSubmitting(true);
    const payload = { statusId: OrderStatuses.SHIPPED };

    axiosClient
      .put(`/orders/status/${orderId}`, payload, getAuthConfig())
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id === orderId),
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteOrder = (orderId: number): void => {
    setIsSubmitting(true);
    axiosClient
      .delete(`/orders/${orderId}`, getAuthConfig())
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id === orderId),
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleStatusChange = (statusId: number): void => {
    setStatusId(statusId);
  };

  const handlePreviousPage = (): void => {
    setIsLoading(true);
    setPage(page - 1);
    setIsLoading(false);
  };

  const handleNextPage = (): void => {
    setIsLoading(true);
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <AdminOrdersTable
      orderPage={orderPage}
      page={page}
      statusId={statusId}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onProgressToShipped={handleProgressToShipped}
      onDeleteOrder={handleDeleteOrder}
      onStatusChange={handleStatusChange}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};

export default AdminOrdersContainer;
