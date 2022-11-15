import React, { FC, useContext } from "react";
import { Flex, Text, Link } from "@chakra-ui/react";
import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

const LoginLink: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex
      direction="row"
      marginTop={{ base: 3, md: 5 }}
      marginRight={{ base: 0, md: 5 }}
    >
      <Text fontSize="14px" marginRight={1} fontWeight="500">
        {t.loginLink.message}
      </Text>
      <Link
        href="/login"
        fontSize="14px"
        fontWeight="500"
        textDecoration="underline"
        _hover={{ color: "#5c5c5c" }}
      >
        {t.loginLink.action}
      </Link>
    </Flex>
  );
};

export default LoginLink;
