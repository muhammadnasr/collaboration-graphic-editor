import React, { useState } from "react";
import { useStore } from "../../stores/main";

/**
 * This component is responsible for choosing a design to edit
 * or creating a new one
 */
const DesignPickerPage: React.FC = () => {
  const setDesignId = useStore((state) => state.setDesignId);
  const [newDesignId, setNewDesignId] = useState<string>("");

  const handleNewDesignCreate = () => {
    setDesignId("");
  };
  const handleJoinDesign = () => {
    setDesignId(newDesignId);
  };

  return (
    <>
      <h1>Please provide a design id to edit or create a new one</h1>

      <label htmlFor="designId">
        Design Id:
        <input
          value={newDesignId}
          onChange={(e) => {
            setNewDesignId(e.target.value);
          }}
          type="text"
          id="designId"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleJoinDesign();
          }}
        />
      </label>
      <button onClick={handleJoinDesign}>Edit</button>
      <br />
      <br />
      <button onClick={handleNewDesignCreate}>Create a new design</button>
    </>
  );
};

export default DesignPickerPage;
