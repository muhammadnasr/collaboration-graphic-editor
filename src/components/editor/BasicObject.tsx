import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import { DesignObject } from "../../types";

export interface BasicObjectProps {
  object: DesignObject;
  currentUserId: number;
  onMoving: (updatedObject: DesignObject) => void;
  onMoved: (oldObject: DesignObject, updatedObject: DesignObject) => void;
}

/**
 * This component is responsible for rendering basic objects
 */
const BasicObject: React.FC<BasicObjectProps> = ({ currentUserId, object, onMoving, onMoved }) => {
  const nodeRef = useRef(null);
  const [prevPosition, setPrevPosition] = useState({ x: object.left, y: object.top });
  const [position, setPosition] = useState({ x: object.left, y: object.top });

  useEffect(() => {
    setPosition({ x: object.left, y: object.top });
  }, [object]);

  return (
    <Draggable
      disabled={object.selectedBy && object.selectedBy !== currentUserId ? true : false}
      nodeRef={nodeRef}
      position={position}
      onStart={(_e, data) => {
        setPrevPosition({ x: data.x, y: data.y });
      }}
      onStop={(_e, data) => {
        if (position.x === prevPosition.x && position.y === prevPosition.y) {
          if (!object.selectedBy) {
            object.selectedBy = currentUserId;
          } else if (object.selectedBy === currentUserId) {
            object.selectedBy = null;
          } 
          //TODO: create a separate event for object selection (instead of onMoving)
          onMoving({ ...object, left: data.x, top: data.y });
          return;
        }

        object.selectedBy = currentUserId;
        onMoved(
          { ...object, left: prevPosition.x, top: prevPosition.y },
          { ...object, left: data.x, top: data.y }
        );
        setPrevPosition({ x: data.x, y: data.y });
      }}
      onDrag={(_e, data) => {
        setPosition({ x: data.x, y: data.y });
        onMoving({ ...object, left: data.x, top: data.y });
        object.selectedBy = currentUserId;
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
          //TODO: highlight selected object by it's user color
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
