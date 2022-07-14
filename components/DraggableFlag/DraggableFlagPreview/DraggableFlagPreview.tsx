import React, { FC, useContext } from "react";
import { isMobile } from "react-device-detect";

import Image from "../../Image";
import { FlagGameContext } from "../../../context/FlagGameContext";
import useFlagGroups from "../../../hooks/UseFlagGroups";

export interface Props {
  code: string;
}

// TODO: Reintroduce preview.
const DraggableFlagPreview: FC<Props> = ({ code }) => {
  const { getFlagUrlByCode } = useFlagGroups();

  const { isDragging } = useContext(FlagGameContext);

  const shouldShowFlagPreview = isDragging && isMobile;

  if (!shouldShowFlagPreview) {
    return null;
  }
  return (
    <Image
      src={getFlagUrlByCode(code)}
      borderRadius={4}
      height="72px"
      width="98px"
    />
  );
};

export default DraggableFlagPreview;
