import React, { Component } from 'react'
import { Stage, Layer, Circle, Line, Rect, RegularPolygon } from 'react-konva'
import socket from '../socket'
import { connect } from 'react-redux'
import Whiteboard from './Whiteboard'
import Transform from './Transform'
import { updateShapePosition, loadMimeThunk, saveMimeThunk, deleteShape } from '../store/reducers/mimeReducer'
import 'konva'

// To do: The mime canvas will be a fixed pixel size, which will be received on props
// These dimensions control the size of the canvas and Image component that forms the drawing surface
const drawingHeight = 786
const drawingWidth = 1024

class Mime extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.stage = React.createRef()
		this.renderShapes = this.renderShapes.bind(this)
		this.handleClickShapes = this.handleClickShapes.bind(this)
		this.handleAttachTransform = this.handleAttachTransform.bind(this)
		this.handleShapeDelete = this.handleShapeDelete.bind(this)
	}

	componentDidMount(){
		const { urlId } = this.props.match.params
		try {
			this.props.loadMimeThunk(urlId)
		} catch (error) {
			console.log(error)
			// TO DO: Create a 404 page and push to history if mime is not found
		}
	}

	componentWillUnmount(){
		const { id, urlId, shapes } = this.props
		this.props.saveMimeThunk({ id, urlId, shapes })
	}

	handleClickShapes(e){
		if (e.target.className === 'Image'){
			const transformers = this.stage.current._stage.find('Transformer')
			if (transformers.length){
				transformers.forEach(trans => {
					const layer = trans.getLayer()
					trans.destroy()
					layer.draw()
				});
			}
		}
	}

	handleDragEnd(shape) {
		return (e) => {
			// Create a copy of the shape object to avoid mutating the state
			let updatedShape = Object.assign({}, shape)
			updatedShape.x = e.target.x()
			updatedShape.y = e.target.y()
			this.props.updateShapePosition(updatedShape)
		}
	}

	handleShapeDelete(shape) {
		return (e) => {
			this.props.deleteShape(shape)
		}
	}

	handleAttachTransform(e) {
		const shape = e.target
		const tr = new Konva.Transformer()
		const layer = shape.getLayer()
		layer.add(tr)
		tr.attachTo(e.target)
		layer.draw()
	}

	renderShapes() {
		if (this.props.shapes.length) {
			let mimeShapes = this.props.shapes.map((shape, index) => {
				switch (shape.type) {
				case 'circle': {
					return (
						<Layer key={shape.uniqueId}>
							<Circle
								name={'shape' + index}
								key={shape.uniqueId}
								x={parseInt(shape.x, 10)}
								y={parseInt(shape.y, 10)}
								radius={parseInt(shape.radius, 10) + .01}
								stroke='blue'
								strokeWidth='4'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform}
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
								width={parseInt(shape.width, 10) + .01}
								height={parseInt(shape.height, 10) + .01}
								stroke='red'
								strokeWidth='4'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform}
								onDblClick={this.handleShapeDelete(shape)}
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

	render() {
		return (
			<section>
				<Stage
					className='mime'
					width={drawingWidth}
					height={drawingHeight}
					ref={this.stage}
					onClick={this.handleClickShapes}
				>
					<Layer>
						<Whiteboard
							className='mime__whiteboard'
							width={drawingWidth}
							height={drawingHeight}
							urlId={this.props.urlId}
						/>
					</Layer>
					{/* All wireframe shapes need their own layer and their own Transform */}
					{this.renderShapes()}
				</Stage>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return state
}

const mapDispatchToProps = {
	updateShapePosition,
	loadMimeThunk,
	saveMimeThunk,
	deleteShape
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mime)
