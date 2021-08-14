import React from "react";

import useMerch from "../../hooks/UseMerch";
import MerchList from "../../components/MerchList";
import MerchListPlaceholder from "../../placeholders/MerchListPlaceholder";

const MerchContainer = () => {
  const { merch, isLoading: isMerchLoading } = useMerch();

  if (isMerchLoading) {
    return <MerchListPlaceholder noOfTiles={2} />;
  }

  return <MerchList merch={merch} />;
};

export default MerchContainer;
