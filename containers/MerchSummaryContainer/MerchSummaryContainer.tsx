import React, { FC, useState } from "react";
import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";

import MerchSummary from "../../components/MerchSummary";
import { addedToCart } from "../../helpers/toasts";
import useMerch from "../../hooks/UseMerch";
import MerchSummaryPlaceholder from "../../placeholders/MerchSummaryPlaceholder";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";

interface Props {
  id?: number;
}

const MerchSummaryContainer: FC<Props> = ({ id = 0 }) => {
  const { merch, isLoading } = useMerch();
  const toast = useToast();

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "top",
    md: "bottom-right",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: MerchSummaryFormSubmit): void => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast(addedToCart(toastPosition));
      setIsSubmitting(false);
    }, 2000);
  };

  if (isLoading) {
    return <MerchSummaryPlaceholder />;
  }

  return (
    <MerchSummary
      item={merch.find((x) => x.id === id)}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default MerchSummaryContainer;
