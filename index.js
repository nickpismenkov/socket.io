const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value',
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}(${socket.id})`);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => console.log('Listening on *:3000'));
