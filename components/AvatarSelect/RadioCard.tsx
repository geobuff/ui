import React, { FC } from "react";

import { Box, Flex, UseRadioProps, useRadio } from "@chakra-ui/react";
import Image from "next/image";

import { Avatar } from "../../types/avatar";

interface Props {
  radio?: UseRadioProps;
  avatar?: Avatar;
}

const RadioCard: FC<Props> = ({ radio = null, avatar = null }) => {
  const { getInputProps, getCheckboxProps } = useRadio(radio);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        _checked={{
          background: "#CDCCCC",
        }}
        p={3}
      >
        <Flex
          alignItems="center"
          borderRadius={"100%"}
          backgroundColor="#276f86"
          border="solid 3px #1A202C"
          padding={3}
          height="58px"
          width="58px"
          marginX="auto"
        >
          <Image
            src={avatar.primaryImageUrl}
            alt={avatar.name}
            height={30}
            width={30}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default RadioCard;
