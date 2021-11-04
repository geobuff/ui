import React, { FC } from "react";
import {
  Flex,
  Text,
  Heading,
  useRadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";

import Image from "../Image";

import { FieldProps } from "../../types/field-props";
import { Avatar } from "../../types/avatar";
import RadioCard from "./RadioCard";

interface Props {
  fieldProps?: FieldProps;
  avatars?: Avatar[];
  current?: Avatar;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const AvatarSelect: FC<Props> = ({
  fieldProps = { value: "" },
  avatars = [],
  current = null,
  setFieldValue = (
    field: string,
    value: any,
    shouldValidate?: boolean
  ): void => {},
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "avatarId",
    defaultValue: fieldProps?.value,
    onChange: (value: number) => setFieldValue("avatarId", value.toString()),
  });

  const group = getRootProps();

  return (
    <>
      <Flex direction="column">
        <Flex
          alignItems="center"
          borderRadius={"100%"}
          backgroundColor={current?.background}
          borderWidth={10}
          border="solid 5px"
          borderColor={current?.border}
          padding={3}
          height="162.5px"
          width="162.5px"
          marginBottom={6}
          marginX="auto"
        >
          <Image
            src={current?.imageUrl}
            alt={current?.name}
            height="87.5px"
            width="87.5px"
            marginX="auto"
          />
        </Flex>
        <Heading mx="auto" mb={2} size="md">
          {current?.name}
        </Heading>
        <Text mb={12}>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas integer eget aliquet nibh praesent."
          }
        </Text>
      </Flex>

      <SimpleGrid
        {...group}
        background="#F0F0F0"
        borderRadius="12px"
        columns={3}
      >
        {avatars.map((avatar) => {
          const fieldProps = { value: avatar.id.toString() };
          // @ts-expect-error
          const radio = getRadioProps(fieldProps);
          return <RadioCard key={avatar.id} radio={radio} avatar={avatar} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default AvatarSelect;
