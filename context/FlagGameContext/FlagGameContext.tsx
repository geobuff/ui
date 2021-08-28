import React, { createContext, useState, FC } from "react";

export const FlagGameContext = createContext({
  isDragging: false,
  handleDragging: (isDrag: boolean) => {},
});

export const FlagGameContextProvider: FC = ({ children = null }) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragging = (isDrag: boolean) => setIsDragging(isDrag);

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
