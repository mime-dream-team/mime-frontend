const Sequelize = require('sequelize')
const uniqid = require('uniqid')
const db = require('../_db')

const Mime = db.define('mime', {
	urlId: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
})

Mime.addHook('beforeValidate', (mime, options) => {
	let uniqueId = uniqid()
	mime.urlId = uniqueId
})

module.exports = Mime
