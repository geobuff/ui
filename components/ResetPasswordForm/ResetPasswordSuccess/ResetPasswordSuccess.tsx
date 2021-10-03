import React, { FC } from "react";

import Link from "next/link";
import {
  Fade,
  Flex,
  Link as ChakraLink,
  Text,
  ScaleFade,
} from "@chakra-ui/react";

import SolidSuccessCircle from "../../../Icons/SolidSuccessCircle";

const ResetPasswordSuccess: FC = () => (
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
        {"Successfully updated password!"}
      </Text>

      <Text color="gray.600" textAlign="center" fontSize="14px">
        {"Please "}
        <Link href="/login">
          <ChakraLink fontWeight={600} _hover={{ textDecoration: "underline" }}>
            {"login"}
          </ChakraLink>
        </Link>
        {" to continue."}
      </Text>
    </Flex>
  </Fade>
);

export default ResetPasswordSuccess;
