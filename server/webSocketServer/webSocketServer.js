const http = require("http");
const express = require("express");
// const socketIo = require("socket.io");
const { Server } = require("socket.io");

const app = express();

const cors = require("cors");
app.use(cors());

// const server = http.createServer(app);
// const io = socketIo(server);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("WebSocket client connected");
  // Handle WebSocket events here
  socket.on("send_status", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_status", data);
  });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
