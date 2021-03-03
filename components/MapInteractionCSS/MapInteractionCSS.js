import React from "react";
import PropTypes from "prop-types";
import { MapInteraction } from "react-map-interaction";

const MapInteractionCSS = (props) => (
  <MapInteraction {...props}>
    {({ translation, scale }) => {
      const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;

      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden",
            touchAction: "none",
            msTouchAction: "none",
            cursor: "all-scroll",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <div
            style={{
              display: "inline-block",
              transform: transform,
              transformOrigin: "0 0",
              height: "100%",
            }}
          >
            {props.children}
          </div>
        </div>
      );
    }}
  </MapInteraction>
);

MapInteractionCSS.propTypes = {
  children: PropTypes.object,
};

export default MapInteractionCSS;
