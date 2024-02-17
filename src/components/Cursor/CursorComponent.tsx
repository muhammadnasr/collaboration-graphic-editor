import { useEffect, useRef, useState } from "react";
import { Cursor } from "../../types";

const MAX_CURSORS_COUNT = 5;
const CURSOR_NAME_BOX_OFFSET_PX = 17;

const CursorComponent: React.FC<{ cursor: Cursor }> = ({ cursor }) => {

  const parentRef = useRef<HTMLDivElement>(null);
  const nameBoxRef = useRef<HTMLDivElement | null>(null);

  const [showNameBox, setShowNameBox] = useState(true);
  const [fadeCursor, setFadeCursor] = useState(false);
  const [parentOffset, setParentOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setShowNameBox(true);
    const showNameBoxTimer = setTimeout(() => {
      setShowNameBox(false);
    }, 3000);
  
    setFadeCursor(false);
    const fadeCursorTimer = setTimeout(() => {
      setFadeCursor(true);
    }, 15000);
  
    return () => {
      clearTimeout(showNameBoxTimer);
      clearTimeout(fadeCursorTimer);
    };
  }, [cursor]);

  useEffect(() => {
    const parentElement = parentRef.current;
    const nameBoxElement = nameBoxRef.current;
    if (parentElement && nameBoxElement) {
      const parentRect = parentElement.getBoundingClientRect();
      const parentOffsetX = parentRect.left + window.scrollX;
      const parentOffsetY = parentRect.top + window.scrollY;
      setParentOffset({ x: parentOffsetX, y: parentOffsetY });

      const cursorRight = cursor.x + nameBoxElement.offsetWidth;
      const cursorLeft = cursor.x - nameBoxElement.offsetWidth;

      if (cursorRight - parentOffsetX > parentRect.width) {
        nameBoxElement.style.left = 'auto';
        nameBoxElement.style.right = `${parentRect.width - cursor.x + parentOffsetX}px`;
      } else if (cursorLeft - parentOffsetX < 0) {
        nameBoxElement.style.left = `${cursor.x - parentOffsetX + CURSOR_NAME_BOX_OFFSET_PX}px`;
        nameBoxElement.style.right = 'auto';
      } else {
        nameBoxElement.style.left = `${cursor.x - parentOffsetX + CURSOR_NAME_BOX_OFFSET_PX}px`;
        nameBoxElement.style.right = 'auto';
      }

      // Adjust the top position of the name element
      nameBoxElement.style.top = `${cursor.y - parentOffsetY + CURSOR_NAME_BOX_OFFSET_PX}px`;
    }
  }, [showNameBox, cursor]);

  const cursorIndex = cursor.userId % MAX_CURSORS_COUNT;
  const nameBoxBackgroundColors = ["#1570EF", "#039855", "#DC6803", "#DD2590", "#7CD4FD"];

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
          transition: 'left 0.2s, top 0.2s, opacity 1s',
          opacity: fadeCursor ? 0 : 1,
        }}
      />
      {showNameBox && (
        <div
          ref={nameBoxRef}
          className="nameBox"
          style={{
            position: 'absolute',
            width: 64,
            height: 32,
            color: "white",
            backgroundColor: nameBoxBackgroundColors[cursorIndex],
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