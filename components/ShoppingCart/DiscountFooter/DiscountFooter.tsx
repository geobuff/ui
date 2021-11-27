import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import axiosClient from "../../../axios";
import { Discount } from "../../../types/discount";

export interface Props {
  merchIds?: number[];
  setDiscount?: React.Dispatch<React.SetStateAction<number>>;
}

const DiscountFooter: FC<Props> = ({
  merchIds = [],
  setDiscount = (): void => {},
}) => {
  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const applyDiscount = (): void => {
    setCheckingDiscount(true);
    setError("");

    axiosClient
      .get(`/discounts/${inputValue}`)
      .then((response) => {
        if (response.status === 204) {
          setError("Invalid discount code. Please try again.");
        } else {
          const discount: Discount = response.data;
          if (
            discount.merchId.Valid &&
            merchIds.find((x) => x === discount.merchId.Int64) === undefined
          ) {
            setError(
              "Discount code does not apply to any of the items in this cart. Please try again."
            );
          } else {
            setDiscount(discount.amount);
            setSuccess(`Successfully applied discount code ${discount.code}.`);
          }
        }
      })
      .catch(() => setError("Error applying discount code. Please try again."))
      .finally(() => {
        setCheckingDiscount(false);
        setInputValue("");
      });
  };

  return (
    <Flex justifyContent={{ base: "center", md: "flex-end" }} my={6}>
      <Flex
        width={{ base: "100%", md: "50%" }}
        direction={{ base: "column", md: "row" }}
      >
        <FormControl marginY={6} mr={{ base: 0, md: 6 }}>
          <FormLabel htmlFor="discount">{"Discount code"}</FormLabel>
          <Input
            placeholder="Enter code..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="lg"
            fontSize="16px"
            background="#F6F6F6"
            borderRadius={6}
            _placeholder={{ color: "gray.500" }}
            _hover={{ background: "#e0e0e0" }}
            disabled={!!success}
          />
          {error && (
            <Box position="absolute" top="83px" left="2px">
              <Text fontSize="11px" color="red.500">
                {error}
              </Text>
            </Box>
          )}
          {success && (
            <Box position="absolute" top="83px" left="2px">
              <Text fontSize="11px" color="green.500">
                {success}
              </Text>
            </Box>
          )}
        </FormControl>
        <Flex
          direction="column"
          justifyContent="center"
          px={{ base: 0, md: 6 }}
          mt={{ base: 3, md: 0 }}
        >
          <Button
            isLoading={checkingDiscount}
            onClick={applyDiscount}
            disabled={!!success}
          >
            Apply
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DiscountFooter;
