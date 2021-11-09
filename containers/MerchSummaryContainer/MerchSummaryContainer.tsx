import React, { FC, useContext, useState } from "react";
import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";

import MerchSummary from "../../components/MerchSummary";
import { addedToCart } from "../../helpers/toasts";
import useMerch from "../../hooks/UseMerch";
import MerchSummaryPlaceholder from "../../placeholders/MerchSummaryPlaceholder";
import { MerchSummaryFormSubmit } from "../../types/merch-summary-form-submit";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

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

  const { addToCart } = useContext(ShoppingCartContext);

  const handleSubmit = (values: MerchSummaryFormSubmit): void => {
    setIsSubmitting(true);

    const item = merch.find((x) => x.id === id);
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price.Float64,
      size: item.sizes.find((x) => x.id === parseInt(values.size)).size,
      imageUrl: item.images.find((x) => x.isPrimary).imageUrl,
    });

    setIsSubmitting(false);
    toast(addedToCart(toastPosition));
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
