const db = require('./db/_db')
const app = require('./server')
const chalk = require('chalk')
const port = process.env.PORT || 3000

db.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.inverse(`server up and running on port ${port}`))
		})
	})
