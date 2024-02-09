import React, { useRef, useEffect } from "react";
import { useStore } from "../../stores/main";
import io, { Socket } from "socket.io-client";
import { DesignObject, DesignState } from "../../types";
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
  const stateDesignId = useStore((state) => state.designId);
  const designState = useStore((state) => state.designState);
  const setDesignId = useStore((state) => state.setDesignId);
  const setDesignState = useStore((state) => state.setDesignState);
  const leaveDesign = useStore((state) => state.leaveDesign);

  const serverSocket = useRef<Socket | null>(null);

  const handleLeaveDesign = () => {
    leaveDesign();
    serverSocket.current?.disconnect();
    serverSocket.current = null;
  };

  const handleObjectUpdate = (objectData: DesignObject) => {
    if (designState === null) return;
    serverSocket.current?.emit("update", stateDesignId, objectData);
  };

  useEffect(() => {
    const socket = io(SERVER_URL, {
      query: { designId },
    });

    socket.on("design", (serverDesign: DesignState) => {
      if (serverDesign.id && serverDesign.id !== designId) {
        // if server design id is different from the one we have
        // then we should update the state
        // this is to handle the case when we create a new design
        setDesignId(serverDesign.id);
      }
      setDesignState(serverDesign);
    });

    serverSocket.current = socket;

    return () => {
      socket.disconnect();
      serverSocket.current = null;
    };
  }, [designId, setDesignId, stateDesignId, setDesignState]);

  return (
    <>
      <h1>
        Welcome to {designId}{" "}
        <button onClick={() => navigator.clipboard.writeText(designId)}>
          copy id
        </button>
      </h1>
      <BasicEditor state={designState} onObjectUpdate={handleObjectUpdate} />
      <button onClick={handleLeaveDesign}>Leave</button>
    </>
  );
};

export default EditorPage;
