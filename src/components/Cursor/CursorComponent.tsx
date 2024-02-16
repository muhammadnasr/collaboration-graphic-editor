import { useEffect, useRef, useState } from "react";
import { Cursor} from "../../types";

const MAX_CURSORS = 5;

const CursorComponent: React.FC<{ cursor: Cursor }> = ({ cursor }) => {
  const [showName, setShowName] = useState(true);
  const parentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
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
        nameElement.style.left = `${cursor.x - parentOffsetX}px`;
        nameElement.style.right = 'auto';
      }

      // Adjust the top position of the name element
      nameElement.style.top = `${cursor.y - parentOffsetY + 26}px`;
    }
  }, [showName, cursor]);

  const cursorImageIndex = cursor.userId % MAX_CURSORS;

  const nameBackgroundColor = cursorImageIndex === 1 ? "#039855" :
    cursorImageIndex === 2 ? "#DC6803" :
    cursorImageIndex === 3 ? "#039855" :
    cursorImageIndex === 4 ? "#DC6803" :
    cursorImageIndex === 5 ? "#039855" : "";

  return (
    <div ref={parentRef} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: cursor.x - parentOffset.x,
          top: cursor.y - parentOffset.y,
          width: 20,
          height: 20,
          backgroundImage: `url(./images/cursors/cursor${cursor.userId % MAX_CURSORS}.png)`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      />
      {showName && (
        <div
          ref={nameRef}
          className="name"
          style={{
            position: 'absolute',
            top: cursor.y - parentOffset.y + 26, // Adjust the top position
            width: 83,
            height: 40,
            backgroundColor: nameBackgroundColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          User {cursor.userId}
        </div>
      )}
    </div>
  );
};

export default CursorComponent;