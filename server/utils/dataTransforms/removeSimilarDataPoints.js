const removeSimilarDataPoints = (xYs) => {
	let xS = []
	let yS = []
	xYs.forEach(co => {
		let start = co[0]
		let end = co[1]

		xS.push(start[0], end[0])
		yS.push(start[1], end[1])
	})

	let standX = standardDeviation(xS)
	let standY = standardDeviation(yS)
	let previous = xYs[0]
	let further = xYs.filter(coords => {
		if (Math.abs(coords[1][0] - previous[1][0]) > standX) {
			previous = coords
			return false
		}
		if (Math.abs(coords[1][1] - previous[1][1]) > standY) {
			previous = coords
			return false
		}
		previous = coords
		return true
	})

	return further
}

const standardDeviation = (values) => {
	var avg = average(values)

	var squareDiffs = values.map(function(value) {
		var diff = value - avg
		var sqrDiff = diff * diff
		return sqrDiff
	})

	var avgSquareDiff = average(squareDiffs)

	var stdDev = Math.sqrt(avgSquareDiff)
	return stdDev
}

const average = (data) => {
	var sum = data.reduce(function(sum, value) {
		return sum + value
	}, 0)

	var avg = sum / data.length
	return avg
}

// Input is a spread array of alternating x, y values like [x, y, x, y, x, y, x, y]
const mapStandardDeviation = (strokes) => {
	let xValues = []
	let yValues = []

	// Create arrays of x and y values from the input array
	for (let i = 0; i < strokes.length; i++){
		if (i % 2) yValues.push(strokes[i])
		else xValues.push(strokes[i])
	}

	let xAverage = average(xValues)
	let yAverage = average(yValues)
	let deviations = []

	for (let i = 0; i < xValues.length; i++) {
		deviations.push(+(xValues[i] - xAverage).toFixed(2))
		deviations.push(+(yValues[i] - yAverage).toFixed(2))
	}

	return deviations
}

module.exports = {
	removeSimilarDataPoints,
	mapStandardDeviation
}
