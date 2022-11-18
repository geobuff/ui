import React, { FC, useEffect, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Select, SelectProps } from "@chakra-ui/react";

import useCountries from "../../hooks/useCountries";

import axiosClient from "../../axios";
import { FieldProps } from "../../types/field-props";
import Image from "../Image";

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
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    if (fieldProps?.value) {
      setFlagUrl("");
      axiosClient
        .get(`flags/url/${fieldProps.value}`)
        .then((response) => setFlagUrl(response.data));
    }
  }, [fieldProps]);

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
        flagUrl ? (
          <Image
            src={flagUrl}
            alt="Flag example"
            marginRight="16px"
            minHeight="22px"
            minWidth="32px"
            objectFit="cover"
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
