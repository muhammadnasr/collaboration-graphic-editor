import React from "react";
import "./editor/index.css";
import { useStore } from "../stores/main";
import DesignPicker from "./editor/DesignPickerPage";
import DesignEdit from "./editor/EditorPage";

/**
 * This component is responsible for rendering the main App
 */
const App: React.FC = () => {
  const designId = useStore((state) => state.designId);
  return designId !== null ? <DesignEdit designId={designId} /> : <DesignPicker />;
};

export default App;
