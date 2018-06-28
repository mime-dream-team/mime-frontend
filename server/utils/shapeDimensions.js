//Top Left
const topLeftPoint = (stroke) => {
	let lowestXValue = stroke[0][0]
	let highestYValue = stroke[0][1]

	for (let i = 0; i < stroke.length; i++){
		let x = stroke[i][0]
		let y = stroke[i][1]
		if(x < lowestXValue) lowestXValue = x
		if(y > highestYValue) highestYValue = y
	}

	return [lowestXValue, highestYValue]
}

//Center
const centerPoint = (stroke) => {
	const xValues = stroke.map(point => point[0])
	const yValues = stroke.map(point => point[1])
	
	const xAverage = xValues.reduce((sum, value) => {
		return sum + value
	}, 0) / xValues.length

	const yAverage = yValues.reduce((sum, value) => {
		return sum + value
	}, 0) / yValues.length

	return [xAverage,yAverage]
}

//Width/Height
const widthAndHeight = (stroke) => {
	const xValues = stroke.map(point => point[0]).sort()
	const yValues = stroke.map(point => point[1]).sort()

	const smallestX = xValues[0]
	const greatestX = xValues[xValues.length - 1]

	const smallestY = yValues[0]
	const greatestY = yValues[yValues.length - 1]

	const width = greatestX - smallestX
	const height = greatestY - smallestY

	return [width, height]
}


module.exports = (
	topLeftPoint,
	centerPoint,
	widthAndHeight
)