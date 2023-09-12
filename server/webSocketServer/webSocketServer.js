const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('WebSocket client connected');
  // Handle WebSocket events here
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
