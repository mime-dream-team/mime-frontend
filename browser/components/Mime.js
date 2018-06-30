import React, { Component } from 'react'
import { Stage, Layer, Circle, Line, Rect, RegularPolygon } from 'react-konva'
import socket from '../socket'
import { connect } from 'react-redux'
import Whiteboard from './Whiteboard'
import Transform from './Transform'
import { updateShapePosition } from '../store/reducers/mimeReducer'

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
	}

	renderShapes() {
		if (this.props.mimeObjects.length) {
			return this.props.mimeObjects.map((shape, index) => {
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
							/>
							<Transform shapeName={'shape' + index} />
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
							/>
							<Transform shapeName={'shape' + index} />
						</Layer>
					)
				}
				default: {
					return null
				}
				}
			})
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
