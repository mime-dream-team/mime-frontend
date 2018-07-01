const getPrediction = require('./../model')
const processTrainingData = require('./../utils/dataTransforms/processTrainingData')
const shapeCreator = require('./../utils/shapeCreator')

function indexOfMax(arr) {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}

	return maxIndex;
}

module.exports = io => {
	io.on('connection', socket => {
		console.log(socket.id, ' has made a persistent connection to the server!')

		socket.on('draw', strokePool => {
			// To do: send the strokePool to model for shape detection
			// To do: process strokePool with the `utils`
			// To do: emit the interpreted shape object
			// Note: these parameters are hardcoded for testing ONLY
			let processedStroke = processTrainingData([ { stroke: [ strokePool ], type: 'unknown' } ]).shapeTrainingDataPoints[0]
			getPrediction(processedStroke)
				.then(shape => {
					const shapeName = [ 'circle', 'square', 'triangle' ]

					const predictedShapeName = shapeName[indexOfMax(shape)]
					const shapeData = shapeCreator(strokePool, predictedShapeName)
					socket.emit('addNewShape', shapeData)
				})
		})

	})
}
