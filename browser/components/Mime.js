import React, { Component } from 'react'
import { Stage, Layer, Circle, Line, Rect, RegularPolygon } from 'react-konva'
import socket from '../socket'
import { connect } from 'react-redux'
import Whiteboard from './Whiteboard'
import Transform from './Transform'
import { updateShapePosition } from '../store/reducers/mimeReducer'
import 'konva';

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
	}

	handleClickShapes(e){
		if(e.target.className === 'Image'){
			const transformers = this.stage.current._stage.find('Transformer')
			if(transformers.length){
				transformers.forEach(trans => {
					const layer = trans.getLayer()
					trans.destroy()
					layer.draw()	
				});
			}
		}
	}

	handleAttachTransform(e){
		const shape = e.target
		const tr = new Konva.Transformer()
		const layer = shape.getLayer()
		layer.add(tr)
		tr.attachTo(e.target)
		layer.draw()
	}

	renderShapes() {
		if (this.props.mimeObjects.length) {
			let mimeShapes = this.props.mimeObjects.map((shape, index) => {
				switch (shape.type) {
				case 'circle': {
					return (
						<Layer>
							<Circle
								name={'shape' + index}
								key={index + 'c'}
								x={shape.x}
								y={shape.y}
								radius={shape.radius}
								stroke='blue'
								strokeWidth='4'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform}
							/>
						</Layer>
					)
				}
				case 'square': {
					return (
						<Layer>
							<Rect
								name={'shape' + index}
								key={index + 's'}
								x={shape.x}
								y={shape.y}
								width={shape.width}
								height={shape.height}
								stroke='red'
								strokeWidth='4'
								draggable='true'
								onDragEnd={this.handleDragEnd(shape)}
								onClick={this.handleAttachTransform}
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

	handleDragEnd(shape) {
		return event => {
			// Create a copy of the shape object to avoid mutating the state
			let updatedShape = Object.assign({}, shape)
			updatedShape.x = event.target.x()
			updatedShape.y = event.target.y()
			this.props.updateShapePosition(updatedShape)
		}
	} //0 mean unit variance

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
	const { mimeObjects } = state
	return { mimeObjects }
}

const mapDispatchToProps = {
	updateShapePosition
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mime)
