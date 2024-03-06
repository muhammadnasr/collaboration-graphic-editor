import React from "react";
import { Cursor, DesignObject, Design } from "../../types";
import BasicObject from "./BasicObject";
import CursorsContainer from "../Cursor/CursorsContainer";

export interface BasicEditorProps {
  currentUserId: number | null;
  design: Design | null;
  //TODO: use Context API to avoid passing these functions down/up the component tree
  onObjectMoving(updatedObject: DesignObject): void;
  onObjectMoved(oldObject: DesignObject, updatedObject: DesignObject): void;
  onCursorUpdate(cursor: Cursor): void;
}

/**
 * This component is responsible for providing basic editor functionality
 */
const BasicEditor: React.FC<BasicEditorProps> = ({ currentUserId, design, onObjectMoving, onObjectMoved, onCursorUpdate }) => {
  const handleObjectMoving = (updatedObject: DesignObject) => {
    onObjectMoving(updatedObject);
  };

  const handleObjectMoved = (oldObject: DesignObject, updatedObject: DesignObject) => {
    onObjectMoved(oldObject, updatedObject);
  };

  const handleCursorUpdate = (cursor: Cursor) => {
    onCursorUpdate(cursor);
  };

  if (!design) return null;

  return (
    <div className="editor">
      {design.objects.map((object: DesignObject) => {
        return (
          <BasicObject
            key={object.id}
            object={object}
            currentUserId={currentUserId as number}
            onMoving={handleObjectMoving}
            onMoved={handleObjectMoved}
          />
        );
      })}
      <CursorsContainer currentUserId={currentUserId as number} cursors={design.cursors} onCursorUpdate={handleCursorUpdate} />
    </div>
  );
};

export default BasicEditor;
