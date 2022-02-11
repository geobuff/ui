import React, { FC } from "react";
import {
  Box,
  BoxProps,
  Button,
  Divider,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { StatusCode } from "../../types/statusCode";

const hoverStyles = {
  transition: "200ms ease-in-out",
  cursor: "grab",
  _hover: {
    color: "green.500",
  },
};

const dividerHoverStyles = {
  ...hoverStyles,
  transition: "175ms ease-in-out",
  _hover: {
    borderColor: "green.500",
  },
};

const errorText = {
  [StatusCode.NotFound]: {
    title: "404",
    subtitle: "Page Not Found",
    description: "We're sorry, but the page you're looking for does not exist.",
  },
  [StatusCode.InternalServerError]: {
    title: "Somethings Wrong...",
    subtitle: "An Unexpected Error Occurred",
    description:
      "We're sorry, but theres an issue on our side. We'll fix it as soon as we can.",
  },
};

export interface Props extends BoxProps {
  code: StatusCode;
}

const ErrorView: FC<Props> = ({ code, ...props }) => {
  const isInternalError = code === StatusCode.InternalServerError;
  return (
    <Box textAlign="center" color="white" padding={5} {...props}>
      <Heading
        as="h1"
        fontWeight="black"
        fontSize={
          isInternalError
            ? { base: "48px", md: "72px" }
            : { base: "130px", md: "250px" }
        }
        lineHeight={isInternalError ? "1.25" : "0.99"}
        {...hoverStyles}
      >
        {errorText[code].title}
      </Heading>
      <Divider
        borderColor="white"
        opacity={1}
        borderWidth={{ base: 2, md: 3 }}
        marginY={{ base: 3, md: 6 }}
        {...dividerHoverStyles}
      />
      <Heading
        as="h2"
        fontSize={
          isInternalError
            ? { base: "xl", md: "4xl" }
            : { base: "2xl", md: "5xl" }
        }
        fontWeight="extrabold"
        {...hoverStyles}
      >
        {errorText[code].subtitle}
      </Heading>
      <Divider
        borderColor="white"
        opacity={1}
        borderWidth={{ base: 2, md: 3 }}
        marginY={{ base: 3, md: 6 }}
        {...dividerHoverStyles}
      />
      {errorText[code].description && (
        <Text marginBottom={6} fontWeight="medium" {...hoverStyles}>
          {errorText[code].description}
        </Text>
      )}
      <Link href="/">
        <Button
          variant="outline"
          _hover={{ color: "black", backgroundColor: "white" }}
        >
          {"Return home"}
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorView;
