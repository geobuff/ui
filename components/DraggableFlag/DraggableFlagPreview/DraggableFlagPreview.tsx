import React, { FC, useContext } from "react";
import { isMobile } from "react-device-detect";

import Image from "next/image";
import { FlagGameContext } from "../../../context/FlagGameContext";

export interface Props {
  code?: string;
  imageUrl: string;
}

// TODO: Reintroduce preview.
const DraggableFlagPreview: FC<Props> = ({ code = "", imageUrl }) => {
  const { isDragging } = useContext(FlagGameContext);

  const shouldShowFlagPreview = isDragging && isMobile;

  if (!shouldShowFlagPreview) {
    return null;
  }

  return (
    <Image
      src={imageUrl}
      alt={`Flag for ${code}`}
      height={72}
      width={98}
      style={{
        borderRadius: 4,
      }}
      priority
    />
  );
};

export default DraggableFlagPreview;
