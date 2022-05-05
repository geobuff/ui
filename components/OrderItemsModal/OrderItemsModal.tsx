import { Flex, Button, SimpleGrid, Alert, AlertIcon } from "@chakra-ui/react";
import React, { FC } from "react";
import { OrderItem } from "../../types/order";
import Modal from "../Modal";
import OrderTileItem from "../OrderTile/OrderTileItem";

export interface Props {
  items?: OrderItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

const OrderItemsModal: FC<Props> = ({
  items = [],
  isOpen = false,
  onClose = (): void => {},
}) => {
  const getContent = (): JSX.Element => {
    if (items.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No items to display.
        </Alert>
      );
    }

    return (
      <SimpleGrid columns={items.length < 3 ? items.length : 3} spacingY={6}>
        {items.map((item, i) => (
          <OrderTileItem key={i} item={item} />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Order Items"
      footer={<Button onClick={onClose}>Exit</Button>}
      minWidth={800}
    >
      <Flex paddingX={6} my={6} justifyContent="center">
        {getContent()}
      </Flex>
    </Modal>
  );
};

export default OrderItemsModal;
