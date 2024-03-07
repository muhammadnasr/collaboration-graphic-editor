import React, { useEffect, } from "react";
import { Cursor, CursorsMap } from "../../types";
import CursorComponent from "./CursorComponent";

export interface CursorsContainerProps {
  currentUserId: number;
  cursors: CursorsMap;
  onCursorUpdate(cursor: Cursor): void;
}

const CursorsContainer: React.FC<CursorsContainerProps> = ({ currentUserId, cursors, onCursorUpdate }) => {

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onCursorUpdate({ userId: currentUserId, x: event.clientX + window.scrollX, y: event.clientY + window.scrollY });
    };

    const handleScroll = (event: Event) => {
      //TODO: add another event for scroll update and send it to the server 
      //(maybe we need to store scroll separately from cursor position inside the cursor object)
      //onCursorScrollUpdate({ userId: currentUserId, x: cursors[currentUserId].x + window.scrollX, y:  + window.scrollY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
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

export default CursorsContainer;
