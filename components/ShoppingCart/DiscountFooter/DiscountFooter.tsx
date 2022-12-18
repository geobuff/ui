import React, { FC, useContext, useEffect, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

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
  const { t } = useContext(LanguageContext);
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
          {t.discountFooter.title}
        </Text>
        <FormControl mr={{ base: 0, md: 6 }}>
          <VisuallyHidden>
            <FormLabel htmlFor="discount">{t.discountFooter.title}</FormLabel>
          </VisuallyHidden>
          <Flex width="100%" direction="row">
            <Input
              value={inputValue}
              isDisabled={!!discountSuccess}
              placeholder={t.discountFooter.placeholder}
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
              {t.global.apply}
            </Button>
            <Button
              marginLeft={3}
              height="44px"
              width="150px"
              isLoading={checkingDiscount}
              onClick={clearDiscount}
              disabled={!discountSuccess}
            >
              {t.global.clear}
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
