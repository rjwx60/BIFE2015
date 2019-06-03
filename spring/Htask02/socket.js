const socket = require('socket.io');
const express = require('express');

const app = express();
const serve = app.listen(4000, () => {
  console.log("hi, I'm here...");
});

// 所使用的静态文件
app.use(express.static('public'));

// 初始化 socket 服务
const io = socket(serve);
io.on('connection', (socket) => {
  console.log("there is a new socket connection", socket.id);

  // Event handle
  socket.on('chat', (clientData) => {
    io.sockets.emit('chat', clientData);
  });

  socket.on('typing', (clientData) => {
    socket.broadcast.emit('typing', clientData);
  });
});