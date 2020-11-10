import React from "react";
import PropTypes from "prop-types";
import twemoji from "twemoji";

import { Box } from "@chakra-ui/core";

const Twemoji = ({ emoji, height, width, ...props }) => (
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

Twemoji.displatName = "Twemoji";

Twemoji.propTypes = {
  emoji: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

Twemoji.defaultProps = {
  emoji: "🇳🇿",
  height: "24px",
  width: "24px",
};

export default Twemoji;
