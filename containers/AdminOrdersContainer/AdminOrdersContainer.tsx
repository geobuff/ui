import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import AdminOrdersTable from "../../components/AdminOrdersTable";
import { OrderStatuses } from "../../types/order-statuses";
import { OrderPageDto } from "../../types/order-page-dto";
import { OrdersFilterDto } from "../../types/orders-filter-dto";
import DeleteOrderModal from "../../components/DeleteOrderModal";
import ProgressOrderModal from "../../components/ProgressOrderModal";
import { useDisclosure } from "@chakra-ui/react";
import { Order } from "../../types/order";
import OrderSummaryModal from "../../components/OrderItemsModal";

const AdminOrdersContainer: FC = () => {
  const {
    isOpen: isDeleteOrderModalOpen,
    onOpen: onDeleteOrderModalOpen,
    onClose: onDeleteOrderModalClose,
  } = useDisclosure();

  const {
    isOpen: isProgressOrderModalOpen,
    onOpen: onProgressOrderModalOpen,
    onClose: onProgressOrderModalClose,
  } = useDisclosure();

  const {
    isOpen: isOrderItemsModalOpen,
    onOpen: onOrderItemsModalOpen,
    onClose: onOrderItemsModalClose,
  } = useDisclosure();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const [orderPage, setOrderPage] = useState<OrderPageDto>();
  const [page, setPage] = useState(0);
  const [statusId, setStatusId] = useState(OrderStatuses.PENDING);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [error, setError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  useEffect(() => {
    setIsLoading(true);
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

  const handleProgressToShipped = (): void => {
    setError(false);
    setIsSubmitting(true);
    const payload = { statusId: OrderStatuses.SHIPPED };

    axiosClient
      .put(`/orders/status/${orderId}`, payload, getAuthConfig())
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id !== orderId),
        });
        onProgressOrderModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteOrder = (): void => {
    setError(false);
    setIsSubmitting(true);
    axiosClient
      .delete(`/orders/${orderId}`, getAuthConfig())
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id !== orderId),
        });
        onDeleteOrderModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  const handleStatusChange = (statusId: number): void => {
    setStatusId(statusId);
    setPage(0);
    setError(false);
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

  const handleDeleteClick = (orderId: number): void => {
    setOrderId(orderId);
    onDeleteOrderModalOpen();
  };

  const handleProgressClick = (orderId: number): void => {
    setOrderId(orderId);
    onProgressOrderModalOpen();
  };

  const handleOrderClick = (order: Order): void => {
    setSelectedOrder(order);
    onOrderItemsModalOpen();
  };

  return (
    <>
      <AdminOrdersTable
        orderPage={orderPage}
        page={page}
        statusId={statusId}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onProgressClick={handleProgressClick}
        onDeleteClick={handleDeleteClick}
        onStatusChange={handleStatusChange}
        onOrderClick={handleOrderClick}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <OrderSummaryModal
        isOpen={isOrderItemsModalOpen}
        onClose={onOrderItemsModalClose}
        order={selectedOrder}
      />
      <DeleteOrderModal
        isOpen={isDeleteOrderModalOpen}
        onClose={onDeleteOrderModalClose}
        isSubmitting={isSubmitting}
        onSubmit={handleDeleteOrder}
        error={error}
      />
      <ProgressOrderModal
        isOpen={isProgressOrderModalOpen}
        previous="Payment Received"
        next="Shipped"
        onClose={onProgressOrderModalClose}
        isSubmitting={isSubmitting}
        onSubmit={handleProgressToShipped}
        error={error}
      />
    </>
  );
};

export default AdminOrdersContainer;
