import React, { FC, useContext, useEffect, useState } from "react";

import { LoadingImage } from "@geobuff/buff-ui/components";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { Field } from "formik";

import { LanguageContext } from "../../../contexts/LanguageContext";

import axiosClient from "../../../axios";
import CountrySelect from "../../CountrySelect";

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
  const { t } = useContext(LanguageContext);

  const [flagUrl, setFlagUrl] = useState("");
  const [flagEntries, setFlagEntries] = useState([]);
  const [isFlagEntriesLoading, setIsFlagEntriesLoading] = useState(false);

  useEffect(() => {
    if (flagCode) {
      setFlagUrl("");
      axiosClient
        .get(`flags/url/${flagCode}`)
        .then((response) => setFlagUrl(response.data));
    }
  }, [flagCode]);

  useEffect(() => {
    if (flagCategory) {
      setIsFlagEntriesLoading(true);
      axiosClient
        .get(`flags/${flagCategory}`)
        .then((response) => setFlagEntries(response.data))
        .finally(() => setIsFlagEntriesLoading(false));
    }
  }, [flagCategory]);

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
                  flagUrl ? (
                    <LoadingImage
                      src={flagUrl}
                      alt={t.communityQuizFlagSelectField.imageAlt}
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
                <option value="">
                  {t.communityQuizFlagSelectField.placeholder}
                </option>
                {!isFlagEntriesLoading &&
                  flagEntries.map((entry, index) => (
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
