module.exports = io => {
	io.on('connection', socket => {
		const rooms = {
			main: []
		}
		console.log(socket.id, ' has made a persistent connection to the server!')
		const roomName = getRoomName(socket)
		/* subscribe a socket to a channel so we can emit to that channel and they will hear it */
		socket.join(roomName)
		/* instantiate room if it doesn't exist */
		rooms[roomName] = rooms[roomName] || []
		/* send to the client the entire roomState (an array of drawings) */
		socket.emit('load', rooms[roomName])

		socket.on('disconnect', () => {
			console.log('BYEEEEEE')
		})

		socket.on('iJoined', payload => {
			console.log('HELLO FROM', payload.loc)
		})

		// socket.on('drawing', (...payload) => {
		// 	const roomName = getRoomName(socket)
		// 	rooms[roomName].push(payload)
		// 	socket.to(roomName).emit('someOneDrew', payload)
		// })
	})
	function getRoomName(socket) {
		console.log(socket.request.headers)
		const urlArr = socket.request.headers.referer.split('/')
		const roomName = urlArr.pop() // grabbing just the last bit of the url for the room name
		/* roomName will equal "" for main room */
		console.log('we are in room', roomName)
		return roomName
	}
}
