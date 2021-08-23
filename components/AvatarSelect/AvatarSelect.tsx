import React, { FC } from "react";
import { Select } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "../Image";

import useAvatars from "../../hooks/UseAvatars";
import { FieldProps } from "../../types/field-props";

interface Props {
  fieldProps?: FieldProps;
}

const AvatarSelect: FC<Props> = ({ fieldProps = { value: "" } }) => {
  const { avatars, isLoading } = useAvatars();

  return (
    <Select
      {...fieldProps}
      id="avatarId"
      size="lg"
      background="#F6F6F6"
      border="none"
      borderRadius={6}
      color={!fieldProps.value ? "gray.500" : "inherit"}
      fontSize="16px"
      fontWeight={600}
      height="40px"
      _hover={{
        background: isLoading ? "#F6F6F6" : "#e0e0e0",
        cursor: isLoading ? "not-allowed" : "inherit",
      }}
      _invalid={{
        border: "2px solid #e56161",
        color: "#e56161",
      }}
      icon={
        fieldProps.value ? (
          <Image
            src={avatars.find((x) => x.id == fieldProps?.value)?.imageUrl}
            marginRight="16px"
            minHeight="22px"
            minWidth="32px"
            objectFit="cover"
            borderRadius={5}
          />
        ) : (
          <ChevronDownIcon stroke="black" />
        )
      }
    >
      <option value="" disabled>
        {isLoading ? "Loading avatars..." : "Select an avatar..."}
      </option>
      {avatars?.map((avatar) => (
        <option key={avatar.id} value={avatar.id}>
          {avatar.name}
        </option>
      ))}
    </Select>
  );
};

export default AvatarSelect;
