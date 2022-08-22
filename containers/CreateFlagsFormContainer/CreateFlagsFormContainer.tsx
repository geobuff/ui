import React, { FC } from "react";
import CreateFlagsForm from "../../components/CreateFlagsForm";
import useMappingsWithoutFlags from "../../hooks/UseMappingsWithoutFlags";
import { FlagsFormSubmit } from "../../types/flags-form-submit";

export interface Props {
  onSubmit?: (values: FlagsFormSubmit) => void;
  onClose?: () => void;
  isSubmitting?: boolean;
}

const CreateFlagsFormContainer: FC<Props> = ({
  onSubmit = () => {},
  onClose = () => {},
  isSubmitting = false,
}) => {
  const { data, isLoading } = useMappingsWithoutFlags();

  return (
    <CreateFlagsForm
      availableMappings={data}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onClose={onClose}
      isSubmitting={isSubmitting}
    />
  );
};

export default CreateFlagsFormContainer;
