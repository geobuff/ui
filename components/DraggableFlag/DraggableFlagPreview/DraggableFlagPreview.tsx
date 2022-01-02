import React, { FC, useContext } from "react";
import { usePreview } from "react-dnd-preview";
import { isMobile } from "react-device-detect";

import { getFlagUrl } from "@geobuff/flags";

import Image from "../../Image";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { FlagGameContext } from "../../../context/FlagGameContext";

export interface Props {
  code: string;
}

const DraggableFlagPreview: FC<Props> = ({ code }) => {
  const { display, style } = usePreview();

  const { isDragging } = useContext(FlagGameContext);

  const shouldShowFlagPreview = isDragging && isMobile;

  if (!display || !shouldShowFlagPreview) {
    return null;
  }
  return (
    <div style={style}>
      <Image
        src={getFlagUrl(code)}
        borderRadius={4}
        height="72px"
        width="98px"
      />
    </div>
  );
};

export default DraggableFlagPreview;
