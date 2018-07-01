const getPrediction = require('./../model')
const processTrainingData = require('./../utils/dataTransforms/processTrainingData')
const shapeCreator = require('./../utils/shapeCreator')
const { Mime } = require('../db')

module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')

		socket.on('draw', (strokePool, urlId) => {
			let processedStroke = processTrainingData([ { stroke: [ strokePool ], type: 'unknown' } ]).shapeTrainingDataPoints[0]
			getPrediction(processedStroke)
				.then(shape => {
					const [ circle, square ] = shape
					const shapeData = shapeCreator(strokePool, circle > square ? 'circle' : 'square')
					// Save the new shape in the database before sending back to the client
					Mime.findWithShapes(urlId)
						.then(mime => mime.createShape(shapeData))
						.then(createdShape => socket.emit('addNewShape', createdShape))
						.catch(console.error)
				})
		})
	})
}
