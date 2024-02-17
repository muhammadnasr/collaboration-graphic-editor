import { useEffect, useRef, useState } from "react";
import { Cursor } from "../../types";

const MAX_CURSORS = 5;

const CursorComponent: React.FC<{ cursor: Cursor }> = ({ cursor }) => {

  const parentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);

  const [showName, setShowName] = useState(true);
  const [fadeCursor, setFadeCursor] = useState(false);
  const [parentOffset, setParentOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setShowName(true);
    const timer = setTimeout(() => setShowName(false), 3000);
    return () => clearTimeout(timer);
  }, [cursor]);

  useEffect(() => {
    const timer = setTimeout(() => setFadeCursor(true), 15000);
    return () => clearTimeout(timer);
  }, [cursor]);

  useEffect(() => {
    setFadeCursor(false);
  }, [cursor]);

  useEffect(() => {
    const parentElement = parentRef.current;
    const nameElement = nameRef.current;
    if (parentElement && nameElement) {
      const rect = parentElement.getBoundingClientRect();
      const parentOffsetX = rect.left + window.scrollX;
      const parentOffsetY = rect.top + window.scrollY;
      setParentOffset({ x: parentOffsetX, y: parentOffsetY });

      if (cursor.x + nameElement.offsetWidth - parentOffsetX > rect.width) {
        nameElement.style.right = '0';
        nameElement.style.left = 'auto';
      } else if (cursor.x - nameElement.offsetWidth - parentOffsetX < 0) {
        nameElement.style.left = '0';
        nameElement.style.right = 'auto';
      } else {
        nameElement.style.left = `${cursor.x - parentOffsetX + 17}px`;
        nameElement.style.right = 'auto';
      }

      // Adjust the top position of the name element
      nameElement.style.top = `${cursor.y - parentOffsetY + 17}px`;
    }
  }, [showName, cursor]);

  const cursorIndex = cursor.userId % MAX_CURSORS;
  const nameBackgroundColors = ["#1570EF", "#039855", "#DC6803", "#DD2590", "#7CD4FD"];

  return (
    <div ref={parentRef} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: cursor.x - parentOffset.x,
          top: cursor.y - parentOffset.y,
          width: 20,
          height: 20,
          backgroundImage: `url(./images/cursors/cursor${cursorIndex}.png)`,
          backgroundSize: "cover",
          overflow: "hidden",
          transition: 'opacity 1s',
          opacity: fadeCursor ? 0 : 1,
        }}
      />
      {showName && (
        <div
          ref={nameRef}
          className="nameBox"
          style={{
            position: 'absolute',
            width: 64,
            height: 32,
            color: "white",
            backgroundColor: nameBackgroundColors[cursorIndex],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          User {cursor.userId + 1}
        </div>
      )}
    </div>
  );
};

export default CursorComponent;