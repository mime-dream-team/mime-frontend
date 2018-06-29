const getPrediction = require('./../model')
const processTrainingData = require('./../utils/dataTransforms/processTrainingData')
const shapeCreator = require('./../utils/shapeCreator')
module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')

		let i = 0, x = 20, y = 40, radius = 40
		socket.on('draw', strokePool => {
			// To do: send the strokePool to model for shape detection
			// To do: process strokePool with the `utils`
			// To do: emit the interpreted shape object
			// Note: these parameters are hardcoded for testing ONLY
			let processedStroke = processTrainingData([ {stroke: [ strokePool ], type: 'unknown'} ]).shapeTrainingDataPoints[0]
			getPrediction(processedStroke)
				.then(shape => {
					const [circle, square] = shape
					const shapeData = shapeCreator(strokePool, circle > square ? 'circle' : 'square')
					socket.emit('addNewShape', shapeData)
					console.log(shapeData)
					console.log(circle, square)
				})
		})

	})
}
