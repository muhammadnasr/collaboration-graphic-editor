import React, { useRef, useEffect } from "react";
import { useStore } from "../../stores/main";
import io, { Socket } from "socket.io-client";
import { DesignObject, Design, Cursor } from "../../types";
import BasicEditor from "./BasicEditor";
import Command from "../../history/Command";

interface EditorPageProps {
  designId: string;
}

const SERVER_URL = "http://localhost:3030";

/**
 * This component is responsible for choosing a design to edit
 * or creating a new one
 */
const EditorPage: React.FC<EditorPageProps> = ({ designId }) => {
  const {
    currentUserId,
    setCurrentUserId,
    setDesignId,
    design,
    setDesign,
    leaveDesign,
    historyManager,
  } = useStore((state) => ({
    currentUserId: state.currentUserId,
    setCurrentUserId: state.setCurrentUserId,
    setDesignId: state.setDesignId,
    design: state.design,
    setDesign: state.setDesign,
    leaveDesign: state.leaveDesign,
    historyManager: state.historyManager,
  }));

  const serverSocket = useRef<Socket | null>(null);

  const updateObjectOnServer = (designId: string, updatedObject: DesignObject) => {
    if (updatedObject) {
      serverSocket.current?.emit("updateObject", designId, updatedObject);
    }
  }
  const undo = () => {
    const updatedObject: DesignObject | null = historyManager.undo();
    if (updatedObject !== null) {
      updateObjectOnServer(designId, updatedObject);
    }
  }

  const redo = () => {
    const updatedObject: DesignObject | null = historyManager.redo();
    if (updatedObject !== null) {
      updateObjectOnServer(designId, updatedObject);
    }
  }

  const handleLeaveDesign = () => {
    leaveDesign();
    serverSocket.current?.disconnect();
    serverSocket.current = null;
  };

  //TODO: extract to hooks
  const handleObjectMoving = (updatedObject: DesignObject) => {
    if (!design === null) return;
    updateObjectOnServer(designId, updatedObject);
  };

  const handleObjectMoved = (oldObject: DesignObject, updatedObject: DesignObject) => {
    if (!design === null) return;
    //only add command to history if object has actually moved
    const command = new Command(oldObject, updatedObject);
    historyManager.executeCommand(command);
    updateObjectOnServer(designId, updatedObject);
  };

  const handleCursorUpdate = (updatedCursor: Cursor) => {
    if (design === null) return;
    serverSocket.current?.emit("updateCursor", designId, updatedCursor);
  };

  useEffect(() => {
    const socket = io(SERVER_URL, {
      query: { designId },
    });

    console.log("Connecting to server with designId: " + designId);

    socket.on("design", (serverDesign: Design, currentUserId: number) => {

      if (currentUserId) {
        setCurrentUserId(currentUserId);
      }
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
      //TODO: remove user cursor from server on disconnect
      socket.disconnect();
      serverSocket.current = null;
    };
    //need to add empty dependency array to avoid multiple connections
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>
        Welcome to {designId}{" "}
        <button onClick={() => navigator.clipboard.writeText(designId)}>
          copy id
        </button>
      </h1>
      <button onClick={undo} disabled={historyManager.nothingToUndo()}>Undo</button>
      <button onClick={redo} disabled={historyManager.nothingToRedo()}>Redo</button>
      <BasicEditor
        currentUserId={currentUserId}
        design={design}
        onObjectMoving={handleObjectMoving}
        onObjectMoved={handleObjectMoved}
        onCursorUpdate={handleCursorUpdate}
      />
      <button onClick={handleLeaveDesign}>Leave</button>
    </>
  );
};

export default EditorPage;
