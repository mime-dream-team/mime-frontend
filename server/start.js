const socketio = require('socket.io')
const db = require('./db/_db')
const app = require('./server')
const port = process.env.PORT || 1337

db.sync().then(() => {
	const server = app.listen(port, () => {
		console.log(`server up and running on port ${port}`)
		const io = socketio(server) // set up socket.io to communicate between frontend & server
		require('./socket')(io)
	})
})
