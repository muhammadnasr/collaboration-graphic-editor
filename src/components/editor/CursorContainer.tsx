import React, { useEffect, useRef, useState } from "react";
import { Cursor, Design } from "../../types";

const MAX_CURSORS = 5;

const UserCursor: React.FC<{ cursor: Cursor }> = ({ cursor }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parentOffset, setParentOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  //TODO fix cursor position while scrolling
  useEffect(() => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const parentOffsetX = parentRect.left + window.scrollX;
      const parentOffsetY = parentRect.top + window.scrollY;
      setParentOffset({ x: parentOffsetX, y: parentOffsetY });
    }
  }, []);

  const cursorImageIndex = cursor.id ? (cursor.id.charCodeAt(0) % MAX_CURSORS) + 1 : 1;

  return (
    <div ref={parentRef} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: cursor.x - parentOffset.x,
          top: cursor.y - parentOffset.y,
          width: 20,
          height: 20,
          backgroundImage: `url(./images/cursors/cursor${cursorImageIndex}.png)`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export interface CursorContainerProps {
  design: Design;
  onCursorUpdate(cursor: Cursor): void;
}

const CursorContainer: React.FC<CursorContainerProps> = ({ design, onCursorUpdate }) => {

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      onCursorUpdate({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onCursorUpdate]);


  return (
    <>
      {Object.keys(design.cursors).map((cursorId: string) => {
        const cursor: Cursor = design.cursors[cursorId];
        cursor.id=cursorId;        
        return <UserCursor key={cursorId} cursor={cursor} />;
      })}
    </>
  );

};

export default CursorContainer;
