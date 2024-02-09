import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import { DesignObject, DesignState } from "../src/types";

const PORT = process.env.PORT || 3030;

const DEFAULT_STATE: DesignState = {
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
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// in memory object to store design data
const DESIGNS: { [key: string]: DesignState } = {};

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

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

    console.log("New design created: " + designId);
  }

  socket.join(`design ${designId}`);

  let design = DESIGNS[designId];
  design.id = designId;

  // send current design state to client
  socket.emit("design", design);

  // handle design updates
  socket.on("update", (designId: string, objectData: DesignObject) => {
    if (!DESIGNS[designId]) {
      // log that design doesn't exist
      console.log("Received update for design that doesn't exist");
      return;
    }
    // update the design state
    DESIGNS[designId].objects = DESIGNS[designId].objects.map((object) => {
      if (object.id === objectData.id) {
        return objectData;
      }
      return object;
    });
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
