import React from "react";
import PropTypes from "prop-types";

import { Button, Flex, Text, ScaleFade } from "@chakra-ui/react";
import Link from "next/link";

import SolidSubtractCircle from "../../../Icons/SolidSubtractCircle";

const ResetPasswordError = ({ error }) => {
  return (
    <Flex marginBottom={4} alignItems="center" direction="column">
      <ScaleFade initialScale={0.75} in>
        <SolidSubtractCircle
          marginBottom={2}
          height="60px"
          width="56px"
          color="red.500"
        />
      </ScaleFade>
      <Text
        textAlign="center"
        fontSize="14px"
        fontWeight="bold"
        marginBottom={4}
        maxWidth={{ base: "250px", md: "100%" }}
      >
        {error}
      </Text>

      <Link href="/forgot-password">
        <Button size="sm" variant="outline" color="gray.600">
          {"Request New Token"}
        </Button>
      </Link>
    </Flex>
  );
};

ResetPasswordError.propTypes = {
  error: PropTypes.string,
};
ResetPasswordError.defaultProps = {
  error: "",
};

export default ResetPasswordError;
