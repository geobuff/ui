import React, { FC } from "react";
import { Flex, Text, Heading, RadioGroup, Radio } from "@chakra-ui/react";

import Image from "../Image";

import { FieldProps } from "../../types/field-props";
import { Avatar } from "../../types/avatar";

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
}) => (
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
        height="130px"
        width="130px"
        marginBottom={6}
        marginX="auto"
      >
        <Image
          src={current?.imageUrl}
          alt={current?.name}
          height="70px"
          width="70px"
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

    <RadioGroup
      {...fieldProps}
      id="avatarId"
      value={current?.id}
      onChange={(value): void => setFieldValue("avatarId", value.toString())}
    >
      {avatars?.map((avatar) => (
        <Radio key={avatar.id} value={avatar.id}>
          {avatar.name}
        </Radio>
      ))}
    </RadioGroup>
  </>
);

export default AvatarSelect;
