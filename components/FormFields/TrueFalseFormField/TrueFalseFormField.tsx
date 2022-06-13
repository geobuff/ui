import { color } from "@chakra-ui/react";
import React, { FC } from "react";
import { booleanRadioOptions } from "../../../helpers/form";
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
}) => (
  <RadioGroupFormField
    name={name}
    label={label}
    isLabelVisible={isLabelVisible}
    color={color}
    selectedValue={selectedValue}
    options={booleanRadioOptions}
    setFieldHelper={setFieldHelper}
  />
);

export default TrueFalseFormField;
