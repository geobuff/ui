import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FlagGameContext = createContext({
  isDragging: false,
  handleDragging: () => {},
});

export const FlagGameContextProvider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragging = (isDrag) => setIsDragging(isDrag);

  return (
    <FlagGameContext.Provider
      value={{
        isDragging,
        handleDragging,
      }}
    >
      {children}
    </FlagGameContext.Provider>
  );
};

FlagGameContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
FlagGameContextProvider.defaultProps = {
  children: null,
};
