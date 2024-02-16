import React from "react";
import "./editor/index.css";
import { useStore } from "../stores/main";
import DesignPickerPage from "./editor/DesignPickerPage";
import EditorPage from "./editor/EditorPage";

/**
 * This component is responsible for rendering the main App
 */
const EditorApp: React.FC = () => {
  //TODO: use router to switch between pages instead of using state which might cause duplicate rendering.
  const designId = useStore((state) => state.designId);
  return designId !== null ? <EditorPage designId={designId} /> : <DesignPickerPage />;
};

export default EditorApp;
