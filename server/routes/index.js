const router = require('express').Router()
const { Mime, Shape } = require('../db')

// All routes begin with `/mimes`

// Create a new mime
router.post('/', (req, res, next) => {
	Mime.create({})
		.then(mime => {
			mime.shapes = []
			res.send(mime)
		})
})

// Retrieve a specific mime with shapes
router.get('/:urlId', (req, res, next) => {
	const { urlId } = req.params
	Mime.findWithShapes(urlId)
		.then(mime => res.send(mime))
		.catch(next)
})

// Add a shape to a current mime
router.post('/:urlId/shapes', (req, res, next) => {
	const { urlId } = req.params
	const { shape } = req.body
	Mime.findWithShapes(urlId)
		.then(mime => mime.createShape(shape))
		.then(createdShape => Mime.findWithShapes(urlId))
		.then(mime => res.send(mime))
		.catch(next)
})


// Update a mime with a group of shapes from the entire state
router.put('/:urlId/shapes', (req, res, next) => {
	const { urlId } = req.params
	const { shapes } = req.body
	// Find all the shapes that relate to this mime
	Promise.all(shapes.map(shape => {
		return Shape.findById(shape.id)
	}))
		.then(foundShapes => {
			// Update each shape with information from the req.body
			return Promise.all(foundShapes.map(foundShape => {
				let [ updatedShapeProperties ] = shapes.filter(shape => shape.id === foundShape.id)
				return foundShape.update(updatedShapeProperties)
			}))
		})
		.then(updatedShapes => {
			// while we have access to the shapes, find the mime and relate the shapes to it
			return Mime.findOne({ where: { urlId } })
				.then(mime => mime.setShapes(updatedShapes))
		})
		.then(mime => Mime.findWithShapes(mime.urlId)) // Refactor: Might be able to return the updated shapes array instead of finding again
		.then(mimeWithShapes => res.send(mimeWithShapes))
		.catch(next)
})

// Update the properties of a shape associated with a mime
router.put('/:urlId/shapes/:uniqueId', (req, res, next) => {
	const { urlId, uniqueId } = req.params
	const { shape } = req.body
	Shape.findOne( { where: { uniqueId } })
		.then(foundShape => foundShape.update(shape))
		.then(updatedShape => res.send(updatedShape))
		.catch(next)
})

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
})

module.exports = router
