const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const { User } = require('../db')

const googleConfig = {
	consumerKey: process.env.GOOGLE_CLIENT_ID,
	consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
}

const strategy = new GoogleStrategy(googleConfig, (token, tokenSecret, profile, done) => {
	const userObj = { googleId: profile.id, email: profile.emails[0] }
	User.findOrCreate({where: {googleId: profile.id}}, userObj)
		.spread((user, created) => done(null, user))
		.catch(done)
	})

passport.use(strategy)

router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/callback', passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	}))

module.exports = router
