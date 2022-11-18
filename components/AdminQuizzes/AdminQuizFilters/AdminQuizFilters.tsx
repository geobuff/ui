import React, { ChangeEvent, FC } from "react";

import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { debounce } from "throttle-debounce";

import Search from "../../../Icons/Search";

export interface Props {
  isLoading?: boolean;
  onChangeSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AdminQuizFilters: FC<Props> = ({
  isLoading = false,
  onChangeSearch = (): void => {},
}) => {
  const handleSearchDebounced = debounce(1000, (event) =>
    onChangeSearch(event)
  );

  return (
    <Flex
      marginBottom={{ base: 3, md: 6 }}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Flex
        marginLeft={{ base: 0, md: 2 }}
        width={{ base: "100%", sm: "100%", md: "50%" }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search
              marginTop="6px"
              marginLeft="12px"
              height="24px"
              width="24px"
              color="gray.500"
            />
          </InputLeftElement>
          <Input
            placeholder="Search name, country or type..."
            onChange={handleSearchDebounced}
            isDisabled={isLoading}
            height="42px"
            size="lg"
            fontSize="16px"
            fontWeight={400}
            background="#F6F6F6"
            borderRadius={6}
            _placeholder={{ color: "gray.500" }}
            _hover={{ background: "#e0e0e0" }}
            boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
            _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};
