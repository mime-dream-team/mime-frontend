const Sequelize = require('sequelize')
const db = require('../_db')

const Model = db.define('model', {
	field: Sequelize.STRING
})

module.exports = Model
