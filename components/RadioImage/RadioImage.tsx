import React, { FC } from "react";

import { Box, UseRadioProps, useRadio } from "@chakra-ui/react";
import Image from "next/image";

export interface Props {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  radioProps?: UseRadioProps;
}

const RadioImage: FC<Props> = ({
  src = "",
  alt = "",
  width = 0,
  height = 0,
  radioProps,
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" {...checkbox}>
      <input {...input} />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          cursor: "pointer",
        }}
        priority
      />
    </Box>
  );
};

export default RadioImage;
