import React, { FC, useContext } from "react";

import { Flex, Skeleton, Text } from "@chakra-ui/react";

import { LanguageContext } from "../context/LanguageContext/LanguageContext";

import useAllPlays from "../hooks/UseAllPlays";

import { formatNumber } from "../helpers/number";

export const FooterPlaysContainer: FC = () => {
  const { plays, isLoading } = useAllPlays();
  const { t } = useContext(LanguageContext);

  return (
    <Flex direction="row" alignItems="center" height="20px">
      {isLoading ? (
        <Skeleton height="20px" width="120px" />
      ) : (
        <Text fontWeight="bold">{formatNumber(plays)}</Text>
      )}
      <Text marginLeft={1.5}>{t.footer.quizzesPlayed}</Text>
    </Flex>
  );
};
