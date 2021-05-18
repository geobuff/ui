import React from "react";
import PropTypes from "prop-types";

import { getFlagUrl } from "@geobuff/flags";
import { Select } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "../Image";

import useCountries from "../../hooks/useCountries";

const CountrySelect = ({ fieldProps }) => {
  const { countries, isLoading } = useCountries();

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
      height="44px"
      _hover={{
        background: isLoading ? "#F6F6F6" : "#e0e0e0",
        cursor: isLoading ? "not-allowed" : "inherit",
      }}
      icon={
        fieldProps.value ? (
          <Image
            marginRight="16px"
            minHeight="22px"
            minWidth="32px"
            objectFit="cover"
            src={getFlagUrl(fieldProps?.value)}
            borderRadius={5}
          />
        ) : (
          <ChevronDownIcon stroke="black" />
        )
      }
    >
      <option value="" disabled>
        {isLoading ? "Loading countries..." : "Please select a country..."}
      </option>
      {countries?.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

CountrySelect.propTypes = {
  fieldProps: PropTypes.shape({
    value: PropTypes.any,
  }),
};
CountrySelect.defaultProps = {
  fieldProps: {
    value: "",
  },
};

export default CountrySelect;
