const {
	topLeftPoint,
	centerPoint,
	widthAndHeight
} = require('./shapeDimensions')

//Shape Creators
const creators = {
	circle: (stroke) => {
		const [width, height] = widthAndHeight(stroke)
		const [x,y] = centerPoint(stroke)
		return {
			type: 'circle',
			radius: (width + height)/4,
			x,
			y
		}
	},
	square: (stroke) => {
		const [width, height] = widthAndHeight(stroke)
		const [x, y] = topLeftPoint(stroke)
		return {
			type: 'square',
			width,
			height,
			x,
			y
		}
	},
	triangle: (stroke) => {
		const [width, height] = widthAndHeight(stroke)
		const [x,y] = centerPoint(stroke)
		return {
			type: 'triangle',
			radius: (width + height)/4,
			x,
			y,
			width,
			height,
		}
	}
}

const shapeCreator = (stroke, shape) => {
	return creators[shape](stroke)
}

module.exports = shapeCreator
