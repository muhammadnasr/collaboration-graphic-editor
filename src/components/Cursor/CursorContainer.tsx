import React, { useEffect, } from "react";
import { Cursor, CursorsMap } from "../../types";
import CursorComponent from "./CursorComponent";

export interface CursorContainerProps {
  currentUserId: number;
  cursors: CursorsMap;
  onCursorUpdate(cursor: Cursor): void;
}

const CursorContainer: React.FC<CursorContainerProps> = ({ currentUserId, cursors, onCursorUpdate }) => {

  useEffect(() => {
    console.log("use effect mousemove");
    const handleMouseMove = (event: MouseEvent) => {
      onCursorUpdate({ userId: currentUserId, x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentUserId, onCursorUpdate]);

  return (
    <>
      {Object.values(cursors).map((cursor) => {
        // Don't render the current user cursor
        if (cursor.userId === currentUserId) {
          return null;
        }
  
        return <CursorComponent key={cursor.userId} cursor={cursor} />;
      })}
    </>
  );

};

export default CursorContainer;
