import React, { FC, useContext } from "react";

import { Fade, Flex, Link, ScaleFade, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import SolidSuccessCircle from "../../../Icons/SolidSuccessCircle";

const ResetPasswordSuccess: FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <Fade in>
      <Flex marginBottom={4} alignItems="center" direction="column">
        <ScaleFade initialScale={0.75} in>
          <SolidSuccessCircle
            marginBottom={2}
            height="60px"
            width="56px"
            color="green.500"
          />
        </ScaleFade>
        <Text textAlign="center" fontWeight="bold" marginBottom={1}>
          {t.resetPasswordSuccess.title}
        </Text>

        <Text color="gray.600" textAlign="center" fontSize="14px">
          {t.resetPasswordSuccess.descriptionOne}
          <Link
            href="/login"
            fontWeight={600}
            _hover={{ textDecoration: "underline" }}
          >
            {t.resetPasswordSuccess.link}
          </Link>
          {t.resetPasswordSuccess.descriptionTwo}
        </Text>
      </Flex>
    </Fade>
  );
};

export default ResetPasswordSuccess;
