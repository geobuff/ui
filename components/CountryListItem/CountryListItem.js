import React from "react";
import { Flex, ListItem, Text } from "@chakra-ui/core";
import Twemoji from "../Twemoji";

const CountryListItem = () => {
  return (
    <ListItem listStyleType="none">
      <Flex alignItems="center">
        <Twemoji emoji="🇳🇿" />
        <Text ml={2} fontWeight="600" fontSize={14}>
          {"New Zealand"}
        </Text>
      </Flex>
    </ListItem>
  );
};

export default CountryListItem;
