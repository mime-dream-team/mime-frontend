const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io')

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

/* start IO */
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:roomName', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* NEEDED for ROOMS */
const rooms = {
/*	kate: [
			[
				[start],
				[end],
				color
			],

			[
				[start2],
				[end2],
				color2
			]
		],
		rohan: [
	
		]
*/
}

io.on('connection', (socket) => {

	/* NEEDED for ROOMS 
		listen for a connection to a room (like `kate`) 
		and if people are already in that room and have already drawn, 
		draw all of these things to the new person's screen 
	*/

	const roomName = getRoomName(socket);
	/* subscribe a socket to a channel so we can emit to that channel and they will hear it */
	socket.join(roomName); 
	/* instantiate room if it doesn't exist */
	rooms[roomName] = rooms[roomName] || [];
	/* send to the client the entire roomState (an array of drawings) */
	socket.emit('load', rooms[roomName])

	socket.on('disconnect', () => {
		console.log('BYEEEEEE')
	})

	socket.on('drawing', (...payload) => {// REST - you have many arguments comma separated, but now they are all 1 (ONE) and named payload --> payload === array of all arguments sent in
		
		/* Playing with Rest and Spread
			// const payload = Array.from(arguments)
			console.log('DATA: ', ...payload) // SPREAD - I have an array and now I am spreading so that they are individual params 
			// console.log('DATA: ', payload[0], payload[1], payload[2], payload[payload.length-1])
		*/

		/* WITHOUT ROOMS / NAMESPACES
			// send to all other connected clients 
			socket.broadcast.emit('someOneDrew', ...payload);
		*/

		/* NEEDED for ROOM 
			Add drawing to our saved state for the room
			Then send drawing to all others in the room
		*/
		const roomName = getRoomName(socket);
		rooms[roomName].push(payload);
		socket.to(roomName).emit('someOneDrew', payload)
	})
})

function getRoomName (socket) {
	const urlArr = socket.request.headers.referer.split('/')
	const roomName = urlArr.pop() // grabbing just the last bit of the url for the room name
	/* roomName will equal "" for main room */
	return roomName
}