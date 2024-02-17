import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import { DesignObject } from "../../types";

export interface BasicObjectProps {
  object: DesignObject;
  currentUserId: number;
  onUpdate: (updatedObject: DesignObject) => void;
}

/**
 * This component is responsible for rendering basic objects
 */
const BasicObject: React.FC<BasicObjectProps> = ({ currentUserId, object, onUpdate }) => {
  const nodeRef = useRef(null);

  const [position, setPosition] = useState({ x: object.left, y: object.top });

  useEffect(() => {
    setPosition({ x: object.left, y: object.top });
  }, [object]);

  return (
    <Draggable
      disabled={object.selectedBy && object.selectedBy !== currentUserId ? true : false}
      nodeRef={nodeRef}
      position={position}
      onStop={(_e, data) => {
        setPosition({ x: data.x, y: data.y });
        onUpdate({ ...object, left: data.x, top: data.y });
      }}
      onDrag={(_e, data) => {
        setPosition({ x: data.x, y: data.y });
        onUpdate({ ...object, left: data.x, top: data.y });
      }}
      onMouseDown={() => {
        if (!object.selectedBy) {
          object.selectedBy = currentUserId;
        } else if (object.selectedBy === currentUserId) {
          object.selectedBy = null;
        }
      }}
    >
      <div
        ref={nodeRef}
        className="object"
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          backgroundColor: object.color,
          borderRadius: object.type === "circle" ? "50%" : "0%",
          border: object.selectedBy ? "3px dotted yellow" : "",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
        </span>
      </div>
    </Draggable>
  );
};

export default BasicObject;
