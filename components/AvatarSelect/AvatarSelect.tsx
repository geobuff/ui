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
      <Flex>
        <Flex direction="column" justifyContent="center" mr={6}>
          <Flex
            alignItems="center"
            borderRadius="12px"
            backgroundColor="#276f86"
            padding={3}
            height="130px"
            width="130px"
            marginBottom={6}
            marginX="auto"
          >
            <Image
              src={current?.secondaryImageUrl}
              alt={current?.name}
              height="70px"
              width="70px"
              marginX="auto"
            />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading mx="auto" mb={2} size="md">
            {current?.name}
          </Heading>
          <Text mb={12}>{current?.description}</Text>
        </Flex>
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
