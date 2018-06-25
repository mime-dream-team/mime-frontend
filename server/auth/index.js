const router = require('express').Router()
const { User } = require('../db')

// ignore route until there are credentials
// router.use('/google', require('./google'))

router.get('/me', (req, res, next) => {
	res.json(req.user.sanitize())
})

router.put('/login', (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then(user => {
			if (!user) res.status(401).send('User not found')
			else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password')
			else req.login(user, error => {
				if (error) next(error)
				else res.json(user.sanitize())
			})
		})
})

router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then(user => req.login(user, error => {
			if (error) next(error)
			else res.json(user.sanitize())
		}))
		.catch(next)
})

router.put('/logout', (req, res, next) => {
	req.logout()
	res.sendStatus(200)
})

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
})

module.exports = router
