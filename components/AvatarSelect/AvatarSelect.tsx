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
import ProfileUserAvatar from "../ProfileUserAvatar";

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
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex
          direction="column"
          justifyContent="center"
          mr={{ base: 0, md: 6 }}
          mb={{ base: 6, md: 0 }}
        >
          <ProfileUserAvatar
            shape="square"
            height={100}
            width={100}
            primaryImageUrl={current?.secondaryImageUrl}
            secondaryImageUrl={current?.primaryImageUrl}
            hasBorder={false}
          />
          <Heading mx="auto" mb={2} size="md">
            {current?.name}
          </Heading>
          <Text
            color="gray.500"
            fontSize="small"
            fontWeight="medium"
            marginBottom={3}
          >
            {current?.description}
          </Text>
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
