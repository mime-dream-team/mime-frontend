const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketio(server);

const inMemoryDrawHistory = [];

io.on('connection', socket => {
  console.log('A new client has connected!');
  console.log(socket.id);

  if (inMemoryDrawHistory.length) socket.emit('load', inMemoryDrawHistory);

  socket.on('draw', function (start, end, color) {
    inMemoryDrawHistory.push({ start, end, color });
    socket.broadcast.emit('someOneDrew', start, end, color);
  });

  socket.on('disconnect', function () {
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

app.use(express.static(path.join(__dirname, 'public')));
