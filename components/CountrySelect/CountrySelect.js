import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { getFlagUrl } from "@geobuff/flags";
import { Select } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "../Image";

import useMapping from "../../hooks/UseMapping";

const CountrySelect = ({ fieldProps }) => {
  const { mapping: countries } = useMapping(1);

  const countryOptions = useMemo(
    () =>
      countries
        .map((country) => ({
          value: country.code,
          label: country.svgName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [countries]
  );

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
      _hover={{ background: "#e0e0e0" }}
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
          <ChevronDownIcon minHeight="24px" width="24px" />
        )
      }
    >
      <option value="" disabled>
        {"Please select a country..."}
      </option>
      {countryOptions?.map(({ value, label }) => (
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
