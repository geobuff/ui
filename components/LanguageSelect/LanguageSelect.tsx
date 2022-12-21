import React, { FC, useContext } from "react";

import { FlexProps, FormControl, Select } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { LANGUAGES } from "../../types/languages";

const LanguageSelect: FC<FlexProps> = ({ ...props }) => {
  const { language, onChangeLanguage } = useContext(LanguageContext);

  return (
    <FormControl {...props}>
      <Select value={language} onChange={(e) => onChangeLanguage(e)}>
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
