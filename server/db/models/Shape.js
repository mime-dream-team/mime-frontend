const Sequelize = require('sequelize')
const uniqid = require('uniqid')
const db = require('../_db')

const Shape = db.define('shape', {
	uniqueId: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	x: Sequelize.DECIMAL, // All shapes
	y: Sequelize.DECIMAL, // All shapes
	x2: Sequelize.DECIMAL, // Lines
	y2: Sequelize.DECIMAL, // Lines
	radius: Sequelize.DECIMAL, // Circles and Triangles
	width: Sequelize.DECIMAL, // Rectangles
	height: Sequelize.DECIMAL, // Rectangles
	sides: Sequelize.DECIMAL, // Triangles
	points: { // Lines
		type: Sequelize.VIRTUAL,
		get(){
			return JSON.stringify([ this.getDataValue('x'), this.getDataValue('y'), this.getDataValue('x2'), this.getDataValue('y2') ])
		}
		// Needs to be an array of x and y coordinates
	}
})

// Note: This unique id is used on the frontend to identify shapes
Shape.addHook('beforeValidate', (shape, options) => {
	let uniqueId = uniqid()
	shape.uniqueId = uniqueId
})

module.exports = Shape
