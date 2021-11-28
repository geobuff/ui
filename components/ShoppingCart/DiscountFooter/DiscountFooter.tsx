import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

export interface Props {
  merchIds?: number[];
  checkingDiscount?: boolean;
  discountSuccess?: string;
  discountError?: string;
  applyDiscount?: (code: string, merchIds: number[]) => void;
}

const DiscountFooter: FC<Props> = ({
  merchIds = [],
  checkingDiscount = false,
  discountSuccess = "",
  discountError = "",
  applyDiscount = (code: string, merchIds: number[]): void => {},
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (discountError || discountSuccess) {
      setInputValue("");
    }
  }, [discountSuccess, discountError]);

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
            disabled={!!discountSuccess}
          />
          {discountError && (
            <Box position="absolute" top="83px" left="2px">
              <Text fontSize="11px" color="red.500">
                {discountError}
              </Text>
            </Box>
          )}
          {discountSuccess && (
            <Box position="absolute" top="83px" left="2px">
              <Text fontSize="11px" color="green.500">
                {discountSuccess}
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
            onClick={() => applyDiscount(inputValue, merchIds)}
            disabled={!!discountSuccess}
          >
            Apply
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DiscountFooter;
