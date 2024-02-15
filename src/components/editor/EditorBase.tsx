import React from "react";
import { Cursor, DesignObject, Design } from "../../types";
import BasicObject from "./BasicShape";
import CursorContainer from "./CursorContainer"; 

export interface BasicEditorProps {
  design: Design | null;
  onObjectUpdate(objectData: DesignObject): void;
  onCursorUpdate(cursor: Cursor): void;
}

/**
 * This component is responsible for providing basic editor functionality
 */
const EditorBase: React.FC<BasicEditorProps> = ({ design, onObjectUpdate, onCursorUpdate }) => {
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
      <CursorContainer design={design} onCursorUpdate={handleCursorUpdate}/>
    </div>
  );
};

export default EditorBase;
