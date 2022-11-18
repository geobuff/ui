import React, { FC, createContext, useState } from "react";

export interface DragItem {
  isDragging: boolean;
  code: string;
  url: string;
}

export const FlagGameContext = createContext({
  dragItem: { isDragging: false, code: "" } as DragItem,
  isDragging: false,
  handleDragging: (dragItem: DragItem) => {},
});

interface Props {
  children?: React.ReactNode;
}

export const FlagGameContextProvider: FC<Props> = ({ children = null }) => {
  const [dragItem, setDragItem] = useState<DragItem>({
    isDragging: false,
    code: "",
    url: "",
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
