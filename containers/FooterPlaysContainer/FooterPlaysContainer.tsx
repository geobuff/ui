import React, { FC, useContext } from "react";
import { Flex, Text, Skeleton } from "@chakra-ui/react";

import useAllPlays from "../../hooks/UseAllPlays";
import { formatNumber } from "../../helpers/number";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const FooterPlaysContainer: FC = () => {
  const { plays, isLoading } = useAllPlays();
  const { t } = useContext(LanguageContext);

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
        {t.footer.quizzesPlayed}
      </Text>
    </Flex>
  );
};

export default FooterPlaysContainer;
