import React, { FC, useContext } from "react";
import Image from "next/image";
import { usePreview } from "react-dnd-preview";
import { isMobile } from "react-device-detect";
import { FlagGameContext } from "../../context/FlagGameContext";

interface Props {
  code?: string;
  imageUrl?: string;
}

const DraggableFlagPreview: FC<Props> = ({ code = "", imageUrl = "" }) => {
  const { display, style } = usePreview();
  const { isDragging } = useContext(FlagGameContext);

  const shouldShowFlagPreview = isDragging && isMobile;

  if (!display || !shouldShowFlagPreview) {
    return null;
  }

  return (
    <div style={style}>
      <Image
        src={imageUrl}
        alt={`Flag preview for ${code}`}
        height={72}
        width={98}
        style={{ borderRadius: 4 }}
        priority
      />
    </div>
  );
};

export default DraggableFlagPreview;
