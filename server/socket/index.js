module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')

		let i = 0, x = 20, y = 40, radius = 40
		socket.on('draw', strokePool => {
			// To do: send the strokePool to model for shape detection
			// To do: process strokePool with the `utils`
			// To do: emit the interpreted shape object

			// Note: these parameters are hardcoded for testing ONLY
			socket.emit('addNewShape', { key: i, x, y, radius })
			i++
			x = x + 50
			y = y + 35
		})

	})
}
