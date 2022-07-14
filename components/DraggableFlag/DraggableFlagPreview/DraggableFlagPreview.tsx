import React, { FC, useContext } from "react";
import { usePreview } from "react-dnd-preview";
import { isMobile } from "react-device-detect";

import Image from "../../Image";
import { FlagGameContext } from "../../../context/FlagGameContext";
import useFlagGroups from "../../../hooks/UseFlagGroups";

export interface Props {
  code: string;
}

const DraggableFlagPreview: FC<Props> = ({ code }) => {
  const { getFlagUrlByCode } = useFlagGroups();
  const { display, style } = usePreview();

  const { isDragging } = useContext(FlagGameContext);

  const shouldShowFlagPreview = isDragging && isMobile;

  if (!display || !shouldShowFlagPreview) {
    return null;
  }
  return (
    <div style={style}>
      <Image
        src={getFlagUrlByCode(code)}
        borderRadius={4}
        height="72px"
        width="98px"
      />
    </div>
  );
};

export default DraggableFlagPreview;
