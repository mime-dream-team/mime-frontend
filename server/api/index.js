const router = require('express').Router()

router.use('/users', require('./users')) // requests to /api/users/

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
})

module.exports = router
