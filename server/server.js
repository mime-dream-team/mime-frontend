const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('server up and running on', port)
})

app.use(morgan('dev')) // logging middleware
app.use(bodyParser.json()) // json parsing middleware
app.use(bodyParser.urlencoded({ extended: true })) // urlencoded parsing middleware

app.use(express.static(path.join(__dirname, '../public'))) // serve public files

app.use('/api', require('./api')) // api router

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((error, req, res, next) => {
	console.error(error)
	console.error(error.stack)
	res.status(error.status || 500).send(error.message || 'Internal server error.')
})
