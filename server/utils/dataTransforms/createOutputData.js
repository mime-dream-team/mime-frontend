const createOutputData = (shape) => {
	return [
		shape === 'circle' ? 1 : 0,
		shape === 'square' ? 1 : 0
		// shape === 'rectangle' ? 1 : 0,
		// shape === 'triangle' ? 1 : 0,
		// shape === 'line' ? 1 : 0
	  ]
}

module.exports = createOutputData