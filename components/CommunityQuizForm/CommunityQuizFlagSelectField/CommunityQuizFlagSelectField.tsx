import React, { FC } from "react";
import { Field } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { flags, getFlagUrl } from "@geobuff/flags";

import { ChevronDownIcon } from "@chakra-ui/icons";

import Image from "../../Image";
import CountrySelect from "../../CountrySelect";

const getFlagsByCategory = (category: string) => {
  if (category === "world") {
    return Object.keys(flags).filter((flag) => flag.length === 2);
  }

  return Object.keys(flags).filter(
    (flag) => flag.slice(0, 2) === category && flag.length !== 2
  );
};

export interface Props {
  flagCategory?: string;
  flagCode?: string;
}

const CommunityQuizFlagSelect: FC<Props> = ({
  flagCategory = "world",
  flagCode,
}) => {
  return (
    <Flex marginY={4} width="100%">
      <Field name="flagCode">
        {({ field, form }) => (
          <FormControl
            isInvalid={form.errors.flagCode && form.touched.flagCode}
          >
            <FormLabel htmlFor="flagCode" fontWeight="bold">
              {"Flag Code"}
            </FormLabel>

            {flagCategory === "world" ? (
              <CountrySelect height="44px" id="flagCode" fieldProps={field} />
            ) : (
              <Select
                {...field}
                id="flagCode"
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
                      src={getFlagUrl(flagCode)}
                      borderRadius={5}
                    />
                  ) : (
                    <ChevronDownIcon stroke="black" />
                  )
                }
              >
                <option value="">{"select a flag code..."}</option>
                {getFlagsByCategory(flagCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            )}
            <FormErrorMessage fontSize="11px">
              {form.errors.flagCode}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};

export default CommunityQuizFlagSelect;
