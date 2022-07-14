import React, { FC } from "react";
import { Field } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import Image from "../../Image";
import CountrySelect from "../../CountrySelect";
import useFlagGroups from "../../../hooks/UseFlagGroups";

export interface Props extends SelectProps {
  flagCategory?: string;
  flagCode?: string;
  label?: string;
  name: string;
}

const CommunityQuizFlagSelect: FC<Props> = ({
  label,
  name,
  flagCategory = "",
  flagCode,
  ...props
}) => {
  const { getFlagUrl, getFlagEntriesByKey } = useFlagGroups();

  return (
    <Flex width="100%">
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            {label && (
              <FormLabel htmlFor={name} fontWeight="bold">
                {label}
              </FormLabel>
            )}

            {flagCategory === "world" ? (
              <CountrySelect
                height="44px"
                fontWeight={400}
                id={name}
                fieldProps={field}
                isFlagOnly
                {...props}
              />
            ) : (
              <Select
                {...field}
                {...props}
                id={name}
                fontSize="16px"
                fontWeight={400}
                background="#F6F6F6"
                width="100%"
                minHeight="44px"
                borderRadius={6}
                color={"gray.600"}
                borderColor="transparent"
                _placeholder={{ color: "gray.500" }}
                _hover={{ background: "#e0e0e0" }}
                icon={
                  flagCode ? (
                    <Image
                      marginRight="16px"
                      minHeight="22px"
                      minWidth="32px"
                      objectFit="cover"
                      src={getFlagUrl(flagCategory, flagCode)}
                      borderRadius={5}
                    />
                  ) : (
                    <ChevronDownIcon stroke="black" />
                  )
                }
              >
                <option value="">{"select a flag code..."}</option>
                {getFlagEntriesByKey(flagCategory).map((entry, index) => (
                  <option key={index} value={entry.code}>
                    {entry.code}
                  </option>
                ))}
              </Select>
            )}
            <FormErrorMessage fontSize="11px">
              {form.errors[name]}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};

export default CommunityQuizFlagSelect;
