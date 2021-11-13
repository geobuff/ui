import React, { FC } from "react";

import useMerch from "../../hooks/UseMerch";
import MerchList from "../../components/MerchList";
import MerchListPlaceholder from "../../placeholders/MerchListPlaceholder";

const MerchListContainer: FC = () => {
  const { merch, isLoading: isMerchLoading } = useMerch();

  if (isMerchLoading) {
    return <MerchListPlaceholder noOfTiles={10} />;
  }

  return <MerchList merch={merch} />;
};

export default MerchListContainer;
