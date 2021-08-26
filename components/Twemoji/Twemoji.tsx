import React, { FC } from "react";
import twemoji from "twemoji";

import { Box } from "@chakra-ui/react";

interface Props {
  emoji?: string;
  height?: string | number | Array<string> | object;
  width?: string | number | Array<string> | object;
  [x: string]: any;
}

const Twemoji: FC<Props> = ({
  emoji = "🇳🇿",
  height = "24px",
  width = "24px",
  ...props
}) => (
  <Box
    as="span"
    display="inline-block"
    width={width}
    height={height}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }),
    }}
    {...props}
  />
);

Twemoji.displayName = "Twemoji";

export default React.memo(Twemoji);
