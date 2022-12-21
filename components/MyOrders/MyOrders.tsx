import React, { FC, useContext } from "react";

import { Card } from "@geobuff/buff-ui/components";

import { Alert, AlertIcon, Flex } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { Order } from "../../types/order";
import OrderTile from "../OrderTile";

export interface Props {
  orders?: Order[];
  isError?: boolean;
}

const MyOrders: FC<Props> = ({ orders = [], isError = false }) => {
  const { t } = useContext(LanguageContext);

  const getContent = () => {
    if (isError) {
      return (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          {t.myOrders.errorAlert}
        </Alert>
      );
    }

    if (orders.length === 0) {
      return (
        <Alert status="info" borderRadius={6}>
          <AlertIcon />
          {t.myOrders.noOrdersAlert}
        </Alert>
      );
    }

    return (
      <>
        {orders.map((order, i) => (
          <Card my={6} key={i}>
            <OrderTile order={order} />
          </Card>
        ))}
      </>
    );
  };

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 800 }}
      width="100%"
      marginX="auto"
      marginBottom={14}
      marginTop={10}
      paddingX={3}
    >
      {getContent()}
    </Flex>
  );
};

export default MyOrders;
