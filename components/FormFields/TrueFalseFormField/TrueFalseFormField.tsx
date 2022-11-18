import React, { FC } from "react";

import { FormSetFieldValue, FormValue } from "../../../types/form";
import RadioGroupFormField from "../RadioGroupFormField";

const options = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

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
}) => (
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

export default TrueFalseFormField;
