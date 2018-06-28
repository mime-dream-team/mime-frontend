module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')
		let currentRoom
		const rooms = {
			main: []
		}
		socket.on('iJoined', payload => {
			let urlArr = payload.loc.split('/')
			currentRoom = urlArr.pop()
			console.log('HELLO FROM', payload.loc, currentRoom)
		})
		// const roomName = getRoomName(socket)
		/* subscribe a socket to a channel so we can emit to that channel and they will hear it */
		socket.join(currentRoom)
		/* instantiate room if it doesn't exist */
		rooms[currentRoom] = rooms[currentRoom] || []
		/* send to the client the entire roomState (in this case, an array of drawings) */
		socket.emit('load', rooms[currentRoom])
		socket.on('disconnect', () => {
			console.log('BYEEEEEE')
		})

		// socket.on('drawing', (...payload) => {
		// 	const roomName = getRoomName(socket)
		// 	rooms[roomName].push(payload)
		// 	socket.to(roomName).emit('someOneDrew', payload)
		// })
	})
	// function getRoomName(socket) {
	// 	// console.log(socket)
	// 	const urlArr = socket.request.headers.referer.split('/')
	// 	const roomName = urlArr.pop() // grabbing just the last bit of the url for the room name
	// 	/* roomName will equal "" for main room */
	// 	// console.log('we are in room', roomName)
	// 	return roomName
	// }
}
