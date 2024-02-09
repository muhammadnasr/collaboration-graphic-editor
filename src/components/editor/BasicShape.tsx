import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import { DesignObject } from "../../types";

export interface BasicShapeProps {
  object: DesignObject;
  onUpdate: (objectData: DesignObject) => void;
}

/**
 * This component is responsible for rendering basic objects
 */
const BasicShape: React.FC<BasicShapeProps> = ({ object, onUpdate }) => {
  const nodeRef = useRef(null);

  const [position, setPosition] = useState({ x: object.left, y: object.top });

  useEffect(() => {
    setPosition({ x: object.left, y: object.top });
  }, [object]);

  return (
    <Draggable
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
        }}
      />
    </Draggable>
  );
};

export default BasicShape;
