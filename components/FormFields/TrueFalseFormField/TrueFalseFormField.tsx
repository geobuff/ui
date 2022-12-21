import React, { FC, useContext } from "react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { FormSetFieldValue, FormValue } from "../../../types/form";
import RadioGroupFormField from "../RadioGroupFormField";

export interface Props {
  name: string;
  label?: string;
  isLabelVisible?: boolean;
  color?: string;
  selectedValue?: FormValue;
  setFieldHelper?: FormSetFieldValue;
}

const TrueFalseFormField: FC<Props> = ({
  name = "",
  label = "",
  isLabelVisible = true,
  color = "green",
  selectedValue = null,
  setFieldHelper = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const options = [
    { label: t.global.true, value: "true" },
    { label: t.global.false, value: "false" },
  ];

  return (
    <RadioGroupFormField
      name={name}
      label={label}
      isLabelVisible={isLabelVisible}
      color={color}
      selectedValue={selectedValue}
      options={options}
      setFieldHelper={setFieldHelper}
    />
  );
};

export default TrueFalseFormField;
