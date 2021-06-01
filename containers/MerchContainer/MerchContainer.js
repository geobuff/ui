import React from "react";

import useMerch from "../../hooks/UseMerch";
import MerchList from "../../components/MerchList";

const MerchContainer = () => {
  const { merch, isLoading: isMerchLoading } = useMerch();

  if (isMerchLoading) {
    return null;
  }

  return <MerchList merch={merch} />;
};

export default MerchContainer;
