const Sequelize = require('sequelize')
const crypto = require('crypto')
const _ = require('lodash')
const db = require('../_db')

const User = db.define('user', {
	googleId: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: Sequelize.STRING,
	salt: Sequelize.STRING
})

const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt()
		user.password = User.encryptPassword(user.password, user.salt)
	}
}

User.addHook('beforeCreate', 'beforeUpdate', setSaltAndPassword)

User.generateSalt = () => crypto.randomBytes(16).toString('base64')

User.encryptPassword = (plainTxt, salt) => {
	const hash = crypto.createHash('sha1')
	hash.update(plainTxt)
	hash.update(salt)
	return hash.digest('hex')
}

User.prototype.correctPassword = function(password){
	return User.encryptPassword(password, this.salt) === this.password
}

User.prototype.sanitize = function() {
	return _.omit(this.toJSON(), ['password', 'salt'])
}

module.exports = User
