import React, { FC } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import CountrySelect from "../../CountrySelect";

// export interface Props {}

const RegisterFormStepThree: FC = () => {
  return (
    <Box>
      <Flex marginY={6}>
        <Field name="username">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.username && form.touched.username}
            >
              <FormLabel fontWeight="bold" htmlFor="username">
                {"Username"}
              </FormLabel>
              <Input
                {...field}
                id="username"
                autoComplete="off"
                placeholder="Enter username..."
                type="text"
                size="lg"
                height="40px"
                fontSize="16px"
                background="#F6F6F6"
                borderRadius={6}
                _placeholder={{ color: "gray.500" }}
                _hover={{ background: "#e0e0e0" }}
              />
              <Box position="absolute" top="68px" left="2px">
                <FormErrorMessage fontSize="11px">
                  {form.errors.username}
                </FormErrorMessage>
              </Box>
            </FormControl>
          )}
        </Field>
      </Flex>

      <Flex marginY={6}>
        <Field name="countryCode">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.countryCode && form.touched.countryCode}
            >
              <FormLabel htmlFor="countryCode" fontWeight="bold">
                {"Country"}
              </FormLabel>

              <CountrySelect fieldProps={field} />
              <Box position="absolute" top="68px" left="2px">
                <FormErrorMessage fontSize="11px">
                  {form.errors.countryCode}
                </FormErrorMessage>
              </Box>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Box>
  );
};

export default RegisterFormStepThree;
