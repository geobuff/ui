import React, { FC, useEffect, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

export interface Props {
  merchIds?: number[];
  checkingDiscount?: boolean;
  discountSuccess?: string;
  discountError?: string;
  applyDiscount?: (code: string, merchIds: number[]) => void;
  clearDiscount?: () => void;
}

const DiscountFooter: FC<Props> = ({
  merchIds = [],
  checkingDiscount = false,
  discountSuccess = "",
  discountError = "",
  applyDiscount = () => {},
  clearDiscount = () => {},
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (discountError || discountSuccess) {
      setInputValue("");
    }
  }, [discountSuccess, discountError]);

  return (
    <Flex justifyContent="flex-end" my={6}>
      <Flex direction="column" marginY={2}>
        <Text fontWeight="medium" marginBottom={2}>
          {"Discount Code"}
        </Text>
        <FormControl mr={{ base: 0, md: 6 }}>
          <VisuallyHidden>
            <FormLabel htmlFor="discount">{"Discount code"}</FormLabel>
          </VisuallyHidden>
          <Flex width="100%" direction="row">
            <Input
              value={inputValue}
              isDisabled={!!discountSuccess}
              placeholder="Enter code..."
              size="lg"
              fontSize="16px"
              background="#F6F6F6"
              borderRadius={6}
              _placeholder={{ color: "gray.500" }}
              _hover={{ background: "#e0e0e0" }}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              marginLeft={3}
              height="44px"
              width="150px"
              isLoading={checkingDiscount}
              onClick={() => applyDiscount(inputValue, merchIds)}
              disabled={!!discountSuccess}
            >
              {"Apply"}
            </Button>
            <Button
              marginLeft={3}
              height="44px"
              width="150px"
              isLoading={checkingDiscount}
              onClick={clearDiscount}
              disabled={!discountSuccess}
            >
              {"Clear"}
            </Button>
          </Flex>

          {discountError && (
            <Text fontSize="11px" color="red.500" marginTop={2}>
              {discountError}
            </Text>
          )}
          {discountSuccess && (
            <Text fontSize="11px" color="green.500" marginTop={2}>
              {discountSuccess}
            </Text>
          )}
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default DiscountFooter;
