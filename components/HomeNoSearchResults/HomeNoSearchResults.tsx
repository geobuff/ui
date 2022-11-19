import React, { FC, useContext } from "react";

import { Alert, AlertIcon, Flex } from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export interface Props {
  filter?: string;
}

const HomeNoSearchResults: FC<Props> = ({ filter = "" }) => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex width="100%" paddingX={3}>
      <Alert
        status="info"
        borderRadius={6}
        p={5}
        mt={3}
        mb={"100px"}
        width="100%"
      >
        <AlertIcon />
        {`${t.homeNoSearchResults.alertPre} '${filter}'`}
      </Alert>
    </Flex>
  );
};

export default HomeNoSearchResults;
