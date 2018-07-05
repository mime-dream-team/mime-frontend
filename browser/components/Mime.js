import React, { Component } from 'react'
import { Stage, Layer, Circle, Rect, RegularPolygon } from 'react-konva'
import { connect } from 'react-redux'
import Whiteboard from './Whiteboard'
import { updateShape, loadMimeThunk, saveMimeThunk, deleteShape, setStage } from '../store/reducers/mimeReducer'
import 'konva'
import Share from './Share'

class Mime extends Component {
	constructor(props) {
		super(props)
		this.state = {
			windowWidthSmallerThanCanvas: false
		}
		this.stage = React.createRef()
		this.checkWindowSize = this.checkWindowSize.bind(this)
		this.renderShapes = this.renderShapes.bind(this)
		this.handleClickShapes = this.handleClickShapes.bind(this)
		this.handleAttachTransform = this.handleAttachTransform.bind(this)
		this.handleShapeDelete = this.handleShapeDelete.bind(this)
		this.handleShapeTransform = this.handleShapeTransform.bind(this)
		this.handleShapeTransformData = this.handleShapeTransformData.bind(this)
	}

	componentDidMount() {
		// Watching the window's size, so the canvas can be displayed properly when the window gets too small
		window.addEventListener('resize', this.checkWindowSize)
		this.checkWindowSize()

		this.props.setStage(this.stage)
		// Load the mime
		const { urlId } = this.props.match.params
		try {
			this.props.loadMimeThunk(urlId)
		} catch (error) {
			console.log(error)
			// To do: Create a 404 page and push to history if mime is not found
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.checkWindowSize)
		const { id, urlId, shapes } = this.props
		this.props.saveMimeThunk({ id, urlId, shapes })
	}

	handleClickShapes(e) {
		if (e.target.className === 'Image') {
			const transformers = this.stage.current._stage.find('Transformer')
			if (transformers.length) {
				transformers.forEach((trans) => {
					const layer = trans.getLayer()
					trans.destroy()
					layer.draw()
				})
			}
		}
	}

	handleDragEnd(shape) {
		return (e) => {
			// Create a copy of the shape object to avoid mutating the state
			let updatedShape = Object.assign({}, shape)
			updatedShape.x = e.target.x()
			updatedShape.y = e.target.y()
			this.props.updateShape(updatedShape)
			this.props.saveMimeThunk(this.props)
		}
	}

	handleShapeDelete(shape) {
		return (e) => {
			this.props.deleteShape(shape)
			this.props.saveMimeThunk(this.props)
		}
	}

	handleAttachTransform(shapeFromState){
		return (e) => {
			const shape = e.target
			const transformerSettings = { rotationSnaps: [ 0, 90, 180, 270, 360 ] }
			const tr = new Konva.Transformer(transformerSettings)
			const layer = shape.getLayer()
			layer.add(tr)
			tr.attachTo(e.target)
			layer.draw()

			// Attach event listener so when transform is completed, shape is updated on store
			shape.on('transformend', (event) => {
				let newProperties = this.handleShapeTransformData(shape)
				this.handleShapeTransform(shapeFromState, newProperties)
			})
		}
	}

	handleShapeTransformData(shape){
		// Return a different newProperties object depending on the shape type
		// To do: add rotation support to the state and db
		const newProperties = { x: shape.x(), y: shape.y(), rotation: shape.rotation() }
		switch (shape.className) {
		case 'Circle':
			// Multiply the radius by the largest scaled value
			newProperties.radius = shape.radius() * (shape.scaleX() > shape.scaleY() ? shape.scaleX() : shape.scaleY())
			break
		case 'Rect':
			// Multiply the height and width by the scaled values
			newProperties.width = shape.width() * shape.scaleX()
			newProperties.height = shape.height() * shape.scaleY()
			break
		default:
			break
		}
		return newProperties
	}

	handleShapeTransform(shapeFromState, newProperties){
		const updatedShape = Object.assign({}, shapeFromState, newProperties)
		this.props.updateShape(updatedShape)
		this.props.saveMimeThunk(this.props)
	}

	renderShapes() {
		if (this.props.shapes.length) {
			let mimeShapes = this.props.shapes.map((shape, index) => {
				// Handle any edge cases where radius is negative
				if (shape.radius < 0) shape.radius *= -1
				switch (shape.type) {
				case 'circle': {
					return (
						<Layer key={shape.uniqueId}>
							<Circle
								name={'shape' + index}
								key={shape.uniqueId}
								x={parseInt(shape.x, 10)}
								y={parseInt(shape.y, 10)}
								rotation={shape.rotation}
								radius={parseInt(shape.radius, 10) + 0.01}
								scaleX='1'
								scaleY='1'
								stroke='black'
								strokeWidth='2'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform(shape)}
								onDblClick={this.handleShapeDelete(shape)}
							/>
						</Layer>
					)
				}
				case 'square': {
					return (
						<Layer key={shape.uniqueId}>
							<Rect
								name={'shape' + index}
								key={shape.uniqueId}
								x={parseInt(shape.x, 10)}
								y={parseInt(shape.y, 10)}
								rotation={shape.rotation}
								width={parseInt(shape.width, 10) + 0.01}
								height={parseInt(shape.height, 10) + 0.01}
								scaleX='1'
								scaleY='1'
								stroke='black'
								strokeWidth='2'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform(shape)}
								onDblClick={this.handleShapeDelete(shape)}
							/>
						</Layer>
					)
				}
				case 'triangle': {
					return (
						<Layer key={shape.uniqueId}>
							<RegularPolygon
								key={shape.uniqueId}
								name={'shape' + index}
								x={parseInt(shape.x, 10)}
								y={parseInt(shape.y, 10)}
								rotation={shape.rotation}
								sides={3}
								radius={parseInt(shape.radius, 10) + 0.01}
								stroke='black'
								strokeWidth='2'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform}
								onDblClick={this.handleShapeDelete}
							/>
						</Layer>
					)
				}
				default: {
					return null
				}
				}
			})
			return mimeShapes
		} else {
			return null
		}
	}

	checkWindowSize(){
		if (window.innerWidth < this.props.width + 60) this.setState({ windowWidthSmallerThanCanvas: true })
		else this.setState({ windowWidthSmallerThanCanvas: false })
	}

	render() {
		return (
			<section className={`mime ${this.state.windowWidthSmallerThanCanvas ? null : 'mime--center'}`}>
				<Stage
					width={this.props.width || '768'}
					height={this.props.height || '1024'}
					ref={this.stage}
					onClick={this.handleClickShapes}
				>
					<Layer>
						<Whiteboard
							className='mime__whiteboard'
							width={this.props.width || '768'}
							height={this.props.height || '1024'}
							urlId={this.props.urlId}
						/>
					</Layer>
					{/* All wireframe shapes are placed here with their own layers */}
					{this.renderShapes()}
				</Stage>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return state
}

const mapDispatchToProps = {
	updateShape,
	loadMimeThunk,
	saveMimeThunk,
	deleteShape,
	setStage
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mime)
