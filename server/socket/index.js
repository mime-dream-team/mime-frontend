module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')

		socket.on('draw', strokePool => {
			// To do: send the strokePool to model for shape detection
			// To do: process strokePool with the `utils`
			// To do: emit the interpreted shape object
			socket.emit('addNewShape', 'here is a new shape!')
		})

	})
}
