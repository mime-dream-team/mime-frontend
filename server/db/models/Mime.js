const Sequelize = require('sequelize')
const uniqid = require('uniqid')
const db = require('../_db')
const Shape = require('./Shape')

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

Mime.findWithShapes = (urlId) => {
	return Mime.findOne({ where: { urlId }, include: [ { model: Shape } ] })
}

module.exports = Mime
