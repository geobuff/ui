import React, { FC } from "react";
import {
  Flex,
  Text,
  Heading,
  useRadioGroup,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

import { FieldProps } from "../../types/field-props";
import { Avatar } from "../../types/avatar";
import RadioCard from "./RadioCard";
import ProfileUserAvatar from "../ProfileUserAvatar";
import CustomFlag from "../CustomFlag";

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
    onChange: (value: string) => setFieldValue("avatarId", value),
  });

  const group = getRootProps();

  return (
    <>
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex
          direction="column"
          justifyContent="center"
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
          <Box my={3} mx="auto" textAlign="center">
            <Flex>
              <Heading size="md">{current?.name}</Heading>
              <Flex direction="column" justifyContent="center">
                {current?.flagUrl && (
                  <CustomFlag
                    url={current?.flagUrl}
                    code={current?.countryCode}
                    ml={3}
                  />
                )}
              </Flex>
            </Flex>
            <Text color="gray.500">{current?.type}</Text>
          </Box>

          <Text
            color="gray.500"
            fontSize="small"
            marginBottom={3}
            lineHeight={1.5}
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
          const radio = getRadioProps(fieldProps);
          return <RadioCard key={avatar.id} radio={radio} avatar={avatar} />;
        })}
      </SimpleGrid>
    </>
  );
};

export default AvatarSelect;
