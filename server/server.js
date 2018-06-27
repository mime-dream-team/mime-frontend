const express = require('express')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const socketio = require('socket.io')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const { db, User } = require('./db')

const app = express()
const dbStore = new SequelizeStore({ db }) // store sessions in db
const server = http.createServer(app)

// const io = socketio(server) // set up socket.io to communicate between frontend & server
// const inMemoryDrawHistory = []

// io.on('connection', socket => {
// 	console.log('A new client has connected!', socket.id)

// 	if (inMemoryDrawHistory.length) socket.emit('load', inMemoryDrawHistory)

// 	socket.on('draw', (start, end, color) => {
// 		inMemoryDrawHistory.push({ start, end, color})
// 		socket.broadcast.emit('someoneDrew', start, end, color)
// 	})
// })

dbStore.sync() // sync so that session table gets created

app.use(morgan('dev')) // logging middleware

app.use(bodyParser.json()) // json parsing middleware
app.use(bodyParser.urlencoded({ extended: true })) // urlencoded parsing middleware

app.use(express.static(path.join(__dirname, '../public'))) // serve public files

// session settings
app.use(session({
	secret: process.env.SESSION_SECRET || 'a secret',
	store: dbStore,
	resave: false,
	saveUninitialized: false
}))

// passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
	try {
		done(null, user.id)
	} catch (error) {
		done(error)
	}
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			if (!user) return done(null, false, { message: 'Incorrect username.' })
			else done(null, user)
		})
		.catch(done)
})

// routes
app.use('/api', require('./api')) // api router
app.use('/auth', require('./auth')) // auth router

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((error, req, res, next) => {
	console.error(error)
	console.error(error.stack)
	res.status(error.status || 500).send(error.message || 'Internal server error.')
})

module.exports = app
