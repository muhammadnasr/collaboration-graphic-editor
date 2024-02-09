import React from "react";
import { DesignObject, DesignState } from "../../types";
import BasicObject from "./BasicShape";

export interface BasicEditorProps {
  state: DesignState | null;
  onObjectUpdate(objectData: DesignObject): void;
}

/**
 * This component is responsible for providing basic editor functionality
 */
const EditorBase: React.FC<BasicEditorProps> = ({ state, onObjectUpdate }) => {
  const handleObjectUpdate = (objectData: DesignObject) => {
    onObjectUpdate(objectData);
  };

  if (!state) return null;

  return (
    <div className="editor">
      {state.objects.map((object) => {
        return (
          <BasicObject
            key={object.id}
            object={object}
            onUpdate={handleObjectUpdate}
          />
        );
      })}
    </div>
  );
};

export default EditorBase;
