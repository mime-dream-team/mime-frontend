// require('../local')
const app = require('./server')
const chalk = require('chalk')
const port = process.env.PORT || 1337


const server = app.listen(port, () => {
	console.log(chalk.inverse(`server up and running on port ${port}`))
})

