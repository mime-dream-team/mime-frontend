module.exports = io => {
	io.on('connection', socket => {
		const getRoomName = locationHash => {
			let location
			if (locationHash.hasOwnProperty('loc')) location = locationHash.loc
			else location = locationHash
			console.log('LOCATION', location)
			let urlArr = location.split('/')
			let currentRoom = urlArr.pop()
			console.log(currentRoom)
			return currentRoom
		}
		console.log(socket.id, ' has made a persistent connection to the server!')

		const rooms = {}

		socket.on('enterRoom', payload => {
			console.log('ENTERING ROOM WITH LOCATION:', payload)
			let currentRoom = getRoomName(payload)
			if (currentRoom !== 'mime') {
				console.log('HELLO FROM', currentRoom)
				socket.join(currentRoom)
				// rooms[currentRoom] = rooms[currentRoom] || []
			}
		})
		/* subscribe a socket to a channel so we can emit to that channel and they will hear it */
		/* instantiate room if it doesn't exist */
		/* send to the client the entire roomState (in this case, an array of drawings) */
		// socket.emit('load', rooms[currentRoom])
		let i = 0,
			x = 20,
			y = 40,
			radius = 40
		socket.on('draw', (strokePool, location) => {
			// To do: send the strokePool to model for shape detection
			// To do: process strokePool with the `utils`
			// To do: emit the interpreted shape object

			// Note: these parameters are hardcoded for testing ONLY
			// console.log('location: ', location)
			// let currentRoom = getRoomName(location)
			// console.log('aquí--->', currentRoom)

			socket.emit('addNewShape', { key: i, x, y, radius })

			i++
			x = x + 50
			y = y + 35
		})
		socket.on('disconnect', () => {
			console.log('BYEEEEEE')
		})
	})
}
