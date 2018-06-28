import React, { Component } from 'react'
import { Stage, Layer, Image, Circle } from 'react-konva'

// These dimensions control the size of the canvas and Image component that forms the drawing surface
const drawingHeight = window.innerHeight - 25
const drawingWidth = window.innerWidth - 25

export default class Whiteboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			isDrawing: false,
			strokePool: [],
			canvas: '',
			context: ''
		}
		this.stage = React.createRef()
		this.image = React.createRef()
	}

	componentDidMount() {
		this.createCanvas()
	}

	// Note: the canvas needs to be the same size as the Image component
	createCanvas = () => {
		const canvas = document.createElement('canvas')
		canvas.width = drawingWidth
		canvas.height = drawingHeight
		const context = canvas.getContext('2d')
		this.setState({ canvas, context })
	}

	handleMouseDown = () => {
		console.log('mousedown')
		this.setState({ isDrawing: true })
		const stage = this.image.current.parent.parent
		this.lastPointerPosition = stage.getPointerPosition()
	}

	handleMouseUp = () => {
		console.log('mouseup')
		this.setState({ isDrawing: false, strokePool: [] })
	}

	handleMouseMove = () => {
		const { isDrawing, context } = this.state
		if (isDrawing) {
			console.log(this.state.strokePool)
			context.strokeStyle = '#000000'
			context.lineJoin = 'round'
			context.lineWidth = 5
			context.globalCompositeOperation = 'source-over'
			context.beginPath()
			let sample = []
			let localPos = {
				x: this.lastPointerPosition.x - this.image.current.x(),
				y: this.lastPointerPosition.y - this.image.current.y()
			}
			sample.push([ localPos.x, localPos.y ])
			context.moveTo(localPos.x, localPos.y)
			const stage = this.image.current.parent.parent
			let pos = stage.getPointerPosition()
			localPos = {
				x: pos.x - this.image.current.x(),
				y: pos.y - this.image.current.y()
			}
			context.lineTo(localPos.x, localPos.y)
			sample.push([ localPos.x, localPos.y ])
			this.setState({ strokePool: [ ...this.state.strokePool, ...sample ] })
			context.closePath()
			context.stroke()
			this.lastPointerPosition = pos
			this.image.current.getLayer().draw()
		}
	}

	render() {
		const { canvas } = this.state
		return (
			<section>
				<Stage width={window.innerWidth} height={window.innerHeight} ref={this.stage}>
					<Layer>
						<Image
							image={canvas}
							ref={this.image}
							width={drawingWidth}
							height={drawingHeight}
							stroke='black'
							onMouseDown={this.handleMouseDown}
							onMouseUp={this.handleMouseUp}
							onMouseMove={this.handleMouseMove}
						/>
					</Layer>
					{/* All wireframe shapes will be in a new layer */}
				</Stage>
			</section>
		)
	}
}
