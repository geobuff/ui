import React from "react";
import PropTypes from "prop-types";
import twemoji from "twemoji";

import { Box } from "@chakra-ui/react";

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

Twemoji.displayName = "Twemoji";

Twemoji.propTypes = {
  emoji: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
};

Twemoji.defaultProps = {
  emoji: "🇳🇿",
  height: "24px",
  width: "24px",
};

export default Twemoji;
