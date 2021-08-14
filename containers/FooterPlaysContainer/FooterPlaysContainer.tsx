import React from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";

import usePlays from "../../hooks/UsePlays";
import { formatNumber } from "../../helpers/number";

const FooterPlaysContainer = () => {
  const { plays, isLoading } = usePlays();

  return (
    <Flex direction="row" alignItems="center" height="20px">
      {isLoading ? (
        <Skeleton height="20px" width="120px" />
      ) : (
        <Text color="#B0B0B0" fontWeight="bold">
          {formatNumber(plays)}
        </Text>
      )}
      <Text color="#B0B0B0" marginLeft={1.5}>
        quizzes played
      </Text>
    </Flex>
  );
};

export default FooterPlaysContainer;
