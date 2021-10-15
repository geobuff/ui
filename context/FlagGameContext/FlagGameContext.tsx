import React, { createContext, useState, FC } from "react";

export interface DragItem {
  isDragging: boolean;
  code: string;
}

export const FlagGameContext = createContext({
  dragItem: { isDragging: false, code: "" } as DragItem,
  isDragging: false,
  handleDragging: (dragItem: DragItem) => {},
});

export const FlagGameContextProvider: FC = ({ children = null }) => {
  const [dragItem, setDragItem] = useState<DragItem>({
    isDragging: false,
    code: "",
  });

  const handleDragging = (dragItem: DragItem): void => {
    setDragItem(dragItem);
  };

  return (
    <FlagGameContext.Provider
      value={{
        dragItem,
        isDragging: dragItem?.isDragging,
        handleDragging,
      }}
    >
      {children}
    </FlagGameContext.Provider>
  );
};
