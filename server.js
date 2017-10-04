const path = require('path');
const express = require('express');
const app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
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