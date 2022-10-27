import React, { FC, useContext } from "react";

import { Flex, Link, Text } from "@chakra-ui/react";
import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

const RegisterLink: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex direction="row" margin={{ sm: 3, md: 5 }} marginTop={{ base: 2 }}>
      <Text fontSize="14px" marginRight={1} fontWeight="500">
        {t.registerLink.message}
      </Text>
      <Link
        href="/register"
        fontSize="14px"
        fontWeight="500"
        textDecoration="underline"
        _hover={{ color: "#5c5c5c" }}
      >
        {t.registerLink.action}
      </Link>
    </Flex>
  );
};

export default RegisterLink;
