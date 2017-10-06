const path = require('path');
const express = require('express');
const app = express();

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

app.use(express.static(path.join(__dirname, 'public')));
