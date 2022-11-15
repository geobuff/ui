import React, { FC, useContext } from "react";
import { FlexProps, FormControl, Select } from "@chakra-ui/react";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

const LanguageSelect: FC<FlexProps> = ({ ...props }) => {
  const { language, onChangeLanguage } = useContext(LanguageContext);

  return (
    <FormControl {...props}>
      <Select value={language} onChange={(e) => onChangeLanguage(e)}>
        <option>{"en"}</option>
        <option>{"es"}</option>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
