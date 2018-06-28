//Top Left
const topLeftPoint = (stroke) => {
	let lowestXValue = stroke[0][0]
	let lowestYValue = stroke[0][1]

	for (let i = 0; i < stroke.length; i++){
		let x = stroke[i][0]
		let y = stroke[i][1]
		if(x < lowestXValue) lowestXValue = x
		if(y < lowestYValue) lowestYValue = y
	}

	return [lowestXValue, lowestYValue]
}

//Center
const centerPoint = (stroke) => {
	const xValues = stroke.map(point => point[0]).sort()
	const yValues = stroke.map(point => point[1]).sort()

	const smallestX = xValues[0]
	const greatestX = xValues[xValues.length - 1]

	const smallestY = yValues[0]
	const greatestY = yValues[yValues.length - 1]

	const centerX = (smallestX + greatestX)/2
	const centerY = (smallestY + greatestY)/2;

	return [centerX,centerY]
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


module.exports = {
	topLeftPoint,
	centerPoint,
	widthAndHeight
}