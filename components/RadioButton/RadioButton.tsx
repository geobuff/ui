import React, { FC } from "react";

import { Box, RadioProps, UseRadioProps, useRadio } from "@chakra-ui/react";

export interface Props extends RadioProps {
  color?: string;
  radioProps?: UseRadioProps;
}

const RadioButton: FC<Props> = ({ children, radioProps, color = "green" }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        fontWeight="semibold"
        textAlign="center"
        _checked={{
          bg: `${color}.500`,
          color: "white",
          borderColor: `${color}.500`,
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioButton;
