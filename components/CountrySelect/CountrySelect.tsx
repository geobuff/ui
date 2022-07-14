import React, { FC } from "react";

import { Select, SelectProps } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "../Image";

import useCountries from "../../hooks/useCountries";
import { FieldProps } from "../../types/field-props";
import UseWorldFlagGroup from "../../hooks/UseWorldFlagGroup";

export interface Props extends SelectProps {
  fieldProps?: FieldProps;
  isDisabled?: boolean;
  isFlagOnly?: boolean;
}

const CountrySelect: FC<Props> = ({
  fieldProps = { value: "" },
  isDisabled = false,
  isFlagOnly = false,
  ...props
}) => {
  const { countries, isLoading } = useCountries();
  const { getFlagUrl } = UseWorldFlagGroup();

  return (
    <Select
      {...fieldProps}
      id="countryCode"
      size="lg"
      background="#F6F6F6"
      border="none"
      borderRadius={6}
      color={!fieldProps.value ? "gray.500" : "inherit"}
      fontSize="16px"
      fontWeight={600}
      height="40px"
      _disabled={{ opacity: 0.2, cursor: "not-allowed" }}
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
            marginRight="16px"
            minHeight="22px"
            minWidth="32px"
            objectFit="cover"
            src={getFlagUrl(fieldProps?.value)}
            opacity={isDisabled ? 0.2 : 1}
            borderRadius={5}
          />
        ) : (
          <ChevronDownIcon stroke="black" />
        )
      }
      {...props}
    >
      <option value="" disabled>
        {isLoading ? "Loading countries..." : "Select a country..."}
      </option>
      {countries?.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export default CountrySelect;
