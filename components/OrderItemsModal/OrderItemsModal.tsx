import { Flex, Button, SimpleGrid } from "@chakra-ui/react";
import React, { FC } from "react";
import { Order } from "../../types/order";
import Modal from "../Modal";
import OrderTileItem from "../OrderTile/OrderTileItem";

export interface Props {
  order?: Order;
  isOpen?: boolean;
  onClose?: () => void;
}

const OrderItemsModal: FC<Props> = ({
  order = null,
  isOpen = false,
  onClose = (): void => {},
}) => {
  const footer = (
    <>
      <Button onClick={onClose}>Exit</Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Order Summary"
      footer={footer}
      minWidth={800}
    >
      <Flex paddingX={6} my={6} justifyContent="center">
        <SimpleGrid
          columns={order?.items?.length < 3 ? order.items.length : 3}
          spacingY={6}
        >
          {order?.items.map((item, i) => (
            <OrderTileItem key={i} item={item} />
          ))}
        </SimpleGrid>
      </Flex>
    </Modal>
  );
};

export default OrderItemsModal;
