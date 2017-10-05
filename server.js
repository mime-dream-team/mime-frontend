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
    socket.broadcast.emit('draw', start, end, color);
  });

  socket.on('disconnect', function () {
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

io.on('disconnect', socket => {
  console.log(`Socket #${socket.id} has disconnected :(`)
});

// The webpack dev middleware builds and serves our bundle
// directly from memory. This has the advantage of never serving
// a partial bundle (if, for example, you reload in the middle of
// a compilation).
app.use(require('./webpack-middleware'))

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
