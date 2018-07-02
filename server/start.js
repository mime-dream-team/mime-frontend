// require('../local')
const socketio = require('socket.io')
const db = require('./db/_db')
const app = require('./server')
const chalk = require('chalk')
const port = process.env.PORT || 1337

db.sync().then(() => {
	const server = app.listen(port, () => {
		console.log(chalk.inverse(`server up and running on port ${port}`))
		const io = socketio(server) // set up socket.io to communicate between frontend & server
		require('./socket')(io)
	})
})
