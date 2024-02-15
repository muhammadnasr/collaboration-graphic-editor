import React, { useRef, useEffect } from "react";
import { useStore } from "../../stores/main";
import io, { Socket } from "socket.io-client";
import { DesignObject, Design, Cursor } from "../../types";
import BasicEditor from "./EditorBase";

interface EditorPageProps {
  designId: string;
}

const SERVER_URL = "http://localhost:3030";

/**
 * This component is responsible for choosing a design to edit
 * or creating a new one
 */
const EditorPage: React.FC<EditorPageProps> = ({ designId }) => {
  const designerName = useStore((state) => state.designerName);
  const setDesignId = useStore((state) => state.setDesignId);
  const design = useStore((state) => state.design);
  const setDesign = useStore((state) => state.setDesign);
  const leaveDesign = useStore((state) => state.leaveDesign);

  const serverSocket = useRef<Socket | null>(null);

  const handleLeaveDesign = () => {
    leaveDesign();
    serverSocket.current?.disconnect();
    serverSocket.current = null;
  };

  const handleObjectUpdate = (updatedObject: DesignObject) => {
    if (design === null) return;
    serverSocket.current?.emit("updateObject", designId, updatedObject);
  };

  const handleCursorUpdate = (updatedCursor: Cursor) => {
    if (design === null) return;
    serverSocket.current?.emit("updateCursor", designId, designerName, updatedCursor);
  };

  useEffect(() => {
    const socket = io(SERVER_URL, {
      query: { designId, designerName },
    });

    socket.on("design", (serverDesign: Design) => {
      if (serverDesign.id && serverDesign.id !== designId) {
        // if server design id is different from the one we have
        // then we should update the state
        // this is to handle the case when we create a new design
        setDesignId(serverDesign.id);
      }
      setDesign(serverDesign);
    });

    serverSocket.current = socket;

    return () => {
      socket.disconnect();
      serverSocket.current = null;
    };
  }, [designId, setDesignId, setDesign, designerName]);

  return (
    <>
      <h1>
        Welcome {designerName} to {designId}{" "}
        <button onClick={() => navigator.clipboard.writeText(designId)}>
          copy id
        </button>
      </h1>
      <BasicEditor design={design} onObjectUpdate={handleObjectUpdate} onCursorUpdate={handleCursorUpdate} />
      <button onClick={handleLeaveDesign}>Leave</button>
    </>
  );
};

export default EditorPage;
