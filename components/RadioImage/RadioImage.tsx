import React, { FC } from "react";
import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";
import Image from "../Image";

export interface Props {
  src?: string;
  radioProps?: UseRadioProps;
}

const RadioImage: FC<Props> = ({ src, radioProps }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Image
        {...checkbox}
        src={src}
        alt="Unsplash image preview"
        width="auto"
        height="75px"
        cursor="pointer"
        _focus={{
          boxShadow: "outline",
        }}
      />
    </Box>
  );
};

export default RadioImage;
