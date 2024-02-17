import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import { DesignObject, Design, Cursor } from "../src/types";

const PORT = process.env.PORT || 3030;

const DEFAULT_STATE: Design = {
  objects: [
    {
      id: "1",
      type: "circle",
      top: 0,
      left: 0,
      color: "magenta",
    },
    {
      id: "2",
      type: "square",
      top: 50,
      left: 50,
      color: "blue",
    },
  ],
  cursors: {},
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// in memory object to store design data
const DESIGNS: { [key: string]: Design } = {};
let userIdCounter = 0; 

app.use(cors());

io.on("connection", (socket: Socket) => {

  const userId = userIdCounter++;

  console.log("A user connected, userId: " + userId);

  let designId = socket.handshake.query.designId;
  if (!designId) {
    // set designId to socket id if not provided (new design)
    designId = socket.id;
  }

  // in case multiple designIds are provided, use the first one
  if (typeof designId !== "string") {
    designId = designId[0];
  }

  if (!DESIGNS[designId]) {
    // don't use provided names for now
    designId = socket.id;
    // initialize design state
    DESIGNS[designId] = { ...DEFAULT_STATE };
    //need to clear cursors map otherwise it will be shared between different designs
    DESIGNS[designId].cursors = {};

    console.log("New design created: " + designId);
  }

  socket.join(`design ${designId}`);

  let design = DESIGNS[designId];
  design.id = designId;

  // send current design state to client
  socket.emit("design", design, userId);

  // handle design object updates
  socket.on("updateObject", (designId: string, updatedObject: DesignObject) => {
    if (!DESIGNS[designId]) {
      // log that design doesn't exist
      console.log("Received update for design that doesn't exist");
      return;
    }
    // update the design state
    DESIGNS[designId].objects = DESIGNS[designId].objects.map((object) => {
      if (object.id === updatedObject.id) {
        return updatedObject;
      }
      return object;
    });
    socket.to(`design ${designId}`).emit("design", DESIGNS[designId]);
  });

  // handle design cursor updates
  socket.on("updateCursor", (designId: string, updatedCursor: Cursor) => {
    if (!DESIGNS[designId]) {
      // log that design doesn't exist
      console.log("Received update for design that doesn't exist");
      return;
    }
    //TODO: emit changed cursor only...
    DESIGNS[designId].cursors[updatedCursor.userId] = updatedCursor;
    socket.to(`design ${designId}`).emit("design", DESIGNS[designId]);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (_req, res) => {
  res.send("meow! 🐶");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
