import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminOrdersTable from "../../components/AdminOrdersTable";
import { OrderStatuses } from "../../types/order-statuses";
import { OrderPageDto } from "../../types/order-page-dto";
import { OrdersFilterDto } from "../../types/orders-filter-dto";
import ProgressOrderModal from "../../components/ProgressOrderModal";
import { useDisclosure } from "@chakra-ui/react";
import { Order } from "../../types/order";
import OrderItemsModal from "../../components/OrderItemsModal";
import { useSession } from "next-auth/react";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";

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

  const { data: session, status } = useSession();

  const [orderPage, setOrderPage] = useState<OrderPageDto>();
  const [page, setPage] = useState(0);
  const [statusId, setStatusId] = useState(OrderStatuses.PAYMENT_RECEIVED);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      const payload: OrdersFilterDto = {
        statusId,
        page,
        limit: 10,
      };

      axiosClient
        .post(`/orders`, payload, session?.authConfig)
        .then((response) => {
          setOrderPage(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session, page, statusId]);

  const handleProgressToShipped = (): void => {
    setError("");
    setIsSubmitting(true);
    const payload = { statusId: OrderStatuses.SHIPPED };

    axiosClient
      .put(`/orders/status/${orderId}`, payload, session?.authConfig)
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id !== orderId),
        });
        onProgressOrderModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteOrder = (): void => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .delete(`/orders/${orderId}`, session?.authConfig)
      .then(() => {
        setOrderPage({
          ...orderPage,
          orders: orderPage.orders.filter((x) => x.id !== orderId),
        });
        onDeleteOrderModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleStatusChange = (statusId: number): void => {
    setStatusId(statusId);
    setPage(0);
    setError("");
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
    setSelectedItems(order.items);
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
      <OrderItemsModal
        isOpen={isOrderItemsModalOpen}
        onClose={onOrderItemsModalClose}
        items={selectedItems}
      />
      <DeleteModal
        header="Delete Order"
        message="Are you sure you want to delete this order?"
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
