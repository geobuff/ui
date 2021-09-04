import React, { FC } from "react";
import { usePreview } from "react-dnd-preview";
import { getFlagUrl } from "@geobuff/flags";

import Image from "../../Image";

export interface Props {
  code: string;
}

const DraggableFlagPreview: FC<Props> = ({ code }) => {
  const { display, style } = usePreview();

  if (!display) {
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
