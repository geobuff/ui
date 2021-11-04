import React, { FC } from "react";

import AvatarSelect from "../../components/AvatarSelect";
import useAvatars from "../../hooks/UseAvatars";
import AvatarSelectPlaceholder from "../../placeholders/AvatarSelectPlaceholder";
import { FieldProps } from "../../types/field-props";

interface Props {
  fieldProps?: FieldProps;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const AvatarSelectContainer: FC<Props> = ({
  fieldProps = { value: "" },
  setFieldValue = (
    field: string,
    value: any,
    shouldValidate?: boolean
  ): void => {},
}) => {
  const { avatars, isLoading } = useAvatars();

  if (isLoading) {
    return <AvatarSelectPlaceholder />;
  }

  return (
    <AvatarSelect
      fieldProps={fieldProps}
      avatars={avatars}
      current={avatars.find((x) => x.id === parseInt(fieldProps?.value))}
      setFieldValue={setFieldValue}
    />
  );
};

export default AvatarSelectContainer;
