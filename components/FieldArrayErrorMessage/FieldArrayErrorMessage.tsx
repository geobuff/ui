import React from "react";
import { Field, getIn } from "formik";
import { Box, Text } from "@chakra-ui/react";

export const FieldArrayErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return (
        touch &&
        error && (
          <Box width="100%" textAlign="left">
            <Text color="red.500" fontSize="11px">
              {error}
            </Text>
          </Box>
        )
      );
    }}
  />
);
