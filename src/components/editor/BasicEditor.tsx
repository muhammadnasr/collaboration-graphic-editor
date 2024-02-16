import React from "react";
import { Cursor, DesignObject, Design } from "../../types";
import BasicObject from "./BasicShape";
import CursorContainer from "../Cursor/CursorContainer"; 

export interface BasicEditorProps {
  currentUserId: number | null;
  design: Design | null;
  onObjectUpdate(objectData: DesignObject): void;
  onCursorUpdate(cursor: Cursor): void;
}

/**
 * This component is responsible for providing basic editor functionality
 */
const BasicEditor: React.FC<BasicEditorProps> = ({ currentUserId, design, onObjectUpdate, onCursorUpdate }) => {
  const handleObjectUpdate = (objectData: DesignObject) => {
    onObjectUpdate(objectData);
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
            onUpdate={handleObjectUpdate}
          />
        );
      })}
      <CursorContainer currentUserId={currentUserId as number} cursors={design.cursors} onCursorUpdate={handleCursorUpdate} />
    </div>
  );
};

export default BasicEditor;
