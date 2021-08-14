import React from "react";
import { Fade, Flex, Text, ScaleFade } from "@chakra-ui/react";

import SolidSuccessCircle from "../../../Icons/SolidSuccessCircle";

const ForgotPasswordSuccess = () => (
  <Fade in out>
    <Flex marginBottom={4} alignItems="center" direction="column">
      <ScaleFade initialScale={0.75} in>
        <SolidSuccessCircle
          marginBottom={2}
          height="60px"
          width="56px"
          color="green.500"
        />
      </ScaleFade>
      <Text
        textAlign="center"
        fontWeight="500"
        fontSize="14px"
        maxWidth={{ base: "250px", md: "100%" }}
      >
        {"Successfully sent password reset link. Please check your email."}
      </Text>
    </Flex>
  </Fade>
);

ForgotPasswordSuccess.propTypes = {};
ForgotPasswordSuccess.defaultProps = {};

export default ForgotPasswordSuccess;
